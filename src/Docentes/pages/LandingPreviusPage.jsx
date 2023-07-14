import { LandingDocentePage } from "./LandingDocentePage";
import { LandingCoordiPage } from "./LandingCoordiPage";
import { LandingJefePage } from "./LandingJefePage";

export const LandingPreviusPage = () => {
  const cargo = localStorage.getItem("cargo");

  let renderedPage = null;

  if (cargo === "Docente") {
    renderedPage = <LandingDocentePage />;
  } else if (cargo === "Coordinador") {
    renderedPage = <LandingCoordiPage />;
  } else if (cargo === "Jefe de departamento") {
    renderedPage = <LandingJefePage />;
  }

  return <>{renderedPage}</>;
};
