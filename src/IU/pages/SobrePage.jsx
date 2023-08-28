import "../../Assets/styles/styles-landing/Landin-styles.css";

const regresar = () => {
  window.history.back();
}

export const SobrePage = () => {
  return (
    <>
      <div className="container">
        <button className="btn btn-success my-4" onClick={regresar}>
          Atrás
        </button>
        <h2 className="my-5 text-center">Sobre Nosotros</h2>
        <div className="row my-5">
          <div className="col">
            <img
              src="../src/Assets/img/angel.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
            />
            <div className="row my-4 d-flex justify-content-center">
              <h4 className="text-center mb-2">Ángel Fortin</h4>
              <br />
              <h5 className="text-center my-2">Scrum Master</h5>
              <br />
              <h5 className="text-center my-2">Desarrollador FullStack</h5>
            </div>
          </div>
          <div className="col">
            <img
              src="../src/Assets/img/fer.jpeg"
              className="img-thumbnail rounded-circle"
              alt=""
            />
            <div className="row my-4 d-flex justify-content-center">
              <h4 className="text-center">Fernando Garcia</h4>
              <br />
              <h5 className="text-center my-2">Desarrollador Frontend</h5>
            </div>
          </div>
          <div className="col">
            <img
              src="../src/Assets/img/cristal.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
            />
            <div className="row my-4 d-flex justify-content-center">
              <h4 className="text-center">Jackeline Padilla</h4>
              <br />
              <h5 className="text-center my-2">Desarrollador FullStack</h5>
            </div>
          </div>
          <div className="col">
            <img
              src="../src/Assets/img/roberto.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
            />
            <div className="row my-4 d-flex justify-content-center">
              <h4 className="text-center">Jorge Orellana</h4>
              <br />
              <h5 className="text-center my-2">Desarrollador Frontend</h5>
            </div>
          </div>
          <div className="col">
            <img
              src="../src/Assets/img/carlos.jpg"
              className="img-thumbnail rounded-circle"
              alt=""
            />
            <div className="row my-4 d-flex justify-content-center">
              <h4 className="text-center ">Carlos Castro</h4>
              <br />
              <h5 className="text-center my-2">Desarrollador Backend</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
