import "../../Assets/styles/styles-landing/Landin-styles.css";
//import 'animate.css';

export const LandingPage = () => {
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="col">
            <br />
            <br />
            <h1 className="my-5 text-center">Bienvenido</h1>
            <br />
            <br />
            <br />
            <h2 className="text-center my-5">Registro UNAH</h2>
            <br />
            <br />
            <br />

            <h2 className="text-center my-5">
              Direccion de Promoción y Permanencia | DIPP
            </h2>
          </div>
        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
