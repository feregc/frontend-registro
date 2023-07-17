export const validacionProce = (formState) => {
  let isError = false;
  let errors = {};

  if (!formState.anio) {
    errors.anio = "Campo obligatorio";
    isError = true;
  }

  if (!formState.periodo) {
    errors.periodo = "Selección obligatoria";
    isError = true;
  }

  if (!formState.horainicio) {
    errors.horainicio = "Campo obligatorio";
    isError = true;
  }
  if (!formState.horafin) {
    errors.horafin = "Campo obligatorio";
    isError = true;
  }
  if (!formState.indiceI) {
    errors.indiceI = "Campo obligatorio";
    isError = true;
  }
  if (!formState.fechainicioI) {
    errors.fechainicioI = "Campo obligatorio";
    isError = true;
  }
  if (!formState.indiceII) {
    errors.indiceII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.fechainicioII) {
    errors.fechainicioII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.indiceIII) {
    errors.indiceIII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.fechainicioIII) {
    errors.fechainicioIII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.indiceIIII) {
    errors.indiceIIII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.fechainicioIIII) {
    errors.fechainicioIIII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.indiceIIIII) {
    errors.indiceIIIII = "Campo obligatorio";
    isError = true;
  }
  if (!formState.fechainicioIIIII) {
    errors.fechainicioIIIII = "Campo obligatorio";
    isError = true;
  }

  return isError ? errors : null;
};
