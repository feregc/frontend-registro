import "../../Assets/styles/styles-landing/Landin-styles.css";

export const SobrePage = () => {
  return (
    <>
      <div className="mt-6 d-flex flex-column align-items-center justify-content-center">
        <h3 className="mt-5">Sobre Nosotros</h3>
        <ul
          id="cargar"
          className="z-0 position-absolute top-50 start-50 translate-middle"
        >
          <li id="li1"></li>
          <li id="li2"></li>
          <li id="li3"></li>
        </ul>
      </div>
      <div className="footer z-n1 position-absolute bottom-0 start-50 translate-middle-x">
        <img src="../src/Assets/img/footer-bg.png" alt="" />
      </div>
    </>
  );
};
