export const CardProcMatricula = ({ onBorrar, procesos }) => {
  const { anio, periodo, fechainicioI, fechainicioIIIII } = procesos;

  const handleBorrar = () => {
    onBorrar(procesos.id);
  };
  const a = new Date(anio).toISOString().split("T")[0];
  const aa = new Date(a);
  const aaa = aa.getUTCFullYear();
  const fechaInicio = new Date(fechainicioI).toISOString().split("T")[0];
  const fechaFin = new Date(fechainicioIIIII).toISOString().split("T")[0];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-2">
              <div className="card-body">
                <p>
                  Periodo: {periodo} {aaa}
                </p>
                <p>Fecha inicio: {fechaInicio}</p>
                <p>Fecha fin: {fechaFin}</p>
                {/* <p>Fecha de finalización: {fechaFin}</p> */}
                {/* <button className="btn btn-danger" onClick={handleBorrar}>Borrar</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
