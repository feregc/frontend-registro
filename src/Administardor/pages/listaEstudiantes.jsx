import React, { useState, useEffect } from 'react';

export const EstudiantesComponentMatriculados = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroNumCuenta, setFiltroNumCuenta] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Cantidad de registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/EstudianteMatricula`);
        const data = await response.json();
        setEstudiantes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [paginaActual]);


  const estudiantesFiltrados = estudiantes.filter(estudiante =>
    estudiante.primer_nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    estudiante.num_cuenta.toString().includes(filtroNumCuenta) &&
    estudiante.nombre_carrera.toLowerCase().includes(filtroCarrera.toLowerCase())
  );

  const totalPaginas = Math.ceil(estudiantesFiltrados.length / elementosPorPagina);
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const estudiantesPaginados = estudiantesFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

  const cambiarPagina = nuevaPagina => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div>
      <h1>Lista de Estudiantes  matriculos actualmente </h1>
      <div>
       
        <input
          type="text"
          placeholder="Filtrar por número de cuenta"
          value={filtroNumCuenta}
          onChange={e => setFiltroNumCuenta(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por carrera"
          value={filtroCarrera}
          onChange={e => setFiltroCarrera(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Número de Cuenta</th>
            <th>Carrera</th>
            <th>Cantidad de Secciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesPaginados.map(estudiante => (
            <tr key={estudiante.num_cuenta}>
              <td>{estudiante.primer_nombre} {estudiante.segundo_nombre} {estudiante.primer_apellido} {estudiante.segundo_apellido}</td>
              <td>{estudiante.num_cuenta}</td>
              <td>{estudiante.nombre_carrera}</td>
              <td>{estudiante.cantidad_secciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>
    </div>
  );

};

 
