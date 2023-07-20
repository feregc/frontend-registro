import React, { useEffect, useState } from 'react'
import { ProcesoSubidaNotas } from '../components/ProcesoSubidaNotas';
import { CardProcesoSubidaNotas } from '../components/CardProcesoSubidaNotas';




export const ProcesoSubidaNotasPage = () => {
    const [data, setData] = useState([]);
    const [validador, setValidador] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/proceso_subir_notas_traerTodos');
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [validador]);
    // debo evaluar cuando se cambia la variable validador


    // const handleBorrarProceso = async (procesoId) => {
    //     try {
    //         const response = await fetch(`http://localhost:8081/proceso/${procesoId}`, {
    //             method: 'DELETE',
    //         });

    //         if (response.ok) {
    //             setData(data.filter((p) => p.id !== procesoId));
    //             console.log('Proceso eliminado con éxito');
    //         } else {
    //             console.error('Error al eliminar el proceso:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error al realizar la petición:', error);
    //     }
    // };

    const handleCrearProceso = (msg) => {
        setValidador(msg)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <ProcesoSubidaNotas
                            onCrear={handleCrearProceso} />
                    </div>
                    <div className="col-4 my-2">
                        <br />
                        <br />
                        <br /><h3 >Subida de notas anteriores</h3>
                        {data.slice(-3).reverse().map((dat) => (
                            <CardProcesoSubidaNotas
                                key={dat.id}
                                procesos={dat}
                            // onBorrar={handleBorrarProceso}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
