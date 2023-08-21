import "../../Assets/styles/styles-landing/Landin-styles.css";
import 'animate.css';

export const LandingPage = () => {
  return (
    <>
      <div className="mt-6 d-flex flex-column align-items-center bg-primary ">
        <br />
        <br />
        {/* <ul id="cargar" className="z-1 position-absolute top-50 start-50 translate-middle">
          <li id="li1"></li>
          <li id="li2"></li>
          <li id="li3"></li>
        </ul> */}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="img-size3">
          <img src="../src/Assets/img/calendario-0.jpg" alt="" className="img-fluid img-thumbnail" />
        </div>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
