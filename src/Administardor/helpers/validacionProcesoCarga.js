export const validacionProceCarga = (formState) => {
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
  
    
    
    if (!formState.fechainicioI) {
      errors.fechainicioI = "Campo obligatorio";
      isError = true;
    }
    
    if (!formState.fechainicioII) {
      errors.fechainicioII = "Campo obligatorio";
      isError = true;
    }
    
    return isError ? errors : null;
  };