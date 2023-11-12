import React, { useState } from 'react';
import * as XLSX from 'xlsx';


export function CodigosPostales() {
    const [data, setData] = useState([])

    const readExcel = (file) =>{
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const buffeArray = e.target.result;
                const wb = XLSX.read(buffeArray, {type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data=XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        });
        promise.then((d) => {
            setData(d);
        });
    };

    // Objeto para almacenar los datos agrupados
    
    const groupedData = {};

    // Iterar sobre el array original
    data.forEach((item) => {
    const key = `${item.codigo}_${item.estado}_${item.ciudad}_${item.municipio}`;
    
    // Verificar si la entrada ya existe
    if (groupedData[key]) {
        groupedData[key].asentamiento.push(item.asentamiento);
    } else {
        groupedData[key] = {
        codigo: item.codigo,
        estado: item.estado,
        ciudad: item.ciudad,
        municipio: item.municipio,
        asentamiento: [item.asentamiento]
        };
    }
    });

    // Convertir el objeto en un array de objetos
    const result = Object.values(groupedData);

    console.log(result)

    // Función para descargar el archivo JSON
  const downloadJsonFile = () => {
    const data = JSON.stringify(result, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.json';
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div>
        CodigosPostales
        <label onChange={(e) => {const file = e.target.files[0]; readExcel(file);}} className='btn-file'>
            <div>
                <span>Da click y sube tu archivo llenado aqui</span>
                <input hidden accept=".xlsx" multiple type="file" />
            </div>
        </label>
        <button onClick={downloadJsonFile}>Descargar JSON</button>
        {
            data.map(({codigo, municipio}) => {
                return(
                    <p>{codigo} - {municipio}</p>
                )
            })
        }
    </div>
  )
}
