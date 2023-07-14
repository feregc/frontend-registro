export function convertirCsvToJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const csvData = event.target.result;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const jsonData = [];
  
        for (let i = 1; i < lines.length; i++) {
          const currentLine = lines[i].split(',');
          const entry = {};
  
          for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = currentLine[j];
          }
  
          jsonData.push(entry);
        }
  
        resolve(jsonData);
      };
  
      reader.onerror = (event) => {
        reject(event.target.error);
      };
  
      reader.readAsText(file);
    });
  }