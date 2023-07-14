
const fetchNotas = async () => {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=1');
      const jsonData = await response.json();
      return jsonData;
  } catch (error) {
      console.log('Error:', error);
  }
};

const fetchAlumnos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=2');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};


const fetchClase = async () => {
  try{
  const url = 'https://jsonplaceholder.typicode.com/photos?_limit=2';
  const result = await fetch(url);
  const data = await result.json();
  return data}
  catch{
    console.log('Error:', error);
  }
}


export { fetchClase,fetchAlumnos,fetchNotas }