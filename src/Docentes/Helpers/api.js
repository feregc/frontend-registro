const fetchClase = async (num) => {
  try {
    const url = `http://localhost:8081/clasesdocentes/${num_empleado}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch {
    console.log("Error:", error);
  }
};

export default { fetchClase };
