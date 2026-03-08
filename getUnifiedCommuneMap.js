import fs from 'fs'

import comunas from './communeMap.js';
import provincias from './provinceMap.js';
import regiones from './regionMap.js';

// 1. Invertir los diccionarios para buscar por "código" en lugar de "nombre"
const provinciasPorCodigo = Object.fromEntries(
  Object.entries(provincias).map(([nombre, codigo]) => [codigo, nombre])
);

const regionesPorCodigo = Object.fromEntries(
  Object.entries(regiones).map(([nombre, codigo]) => [codigo, nombre])
);

// 2. Construir el nuevo objeto unificado
const comunasUnificadas = {};

for (const [nombreComuna, codigoComuna] of Object.entries(comunas)) {
  
  // Extraemos los códigos basándonos en la jerarquía del código CUT chileno
  // (quitando los últimos 2 dígitos para provincia, y los últimos 3 para región)
  const codigoProvincia = codigoComuna.slice(0, -2); 
  const codigoRegion = codigoComuna.slice(0, -3);

  comunasUnificadas[nombreComuna] = {
    codigo: codigoComuna,
    provincia: provinciasPorCodigo[codigoProvincia] || 'Provincia no encontrada',
    region: regionesPorCodigo[codigoRegion] || 'Región no encontrada'
  };
}

// 3. Convertir el objeto a formato de texto (JSON formateado con 2 espacios)
const objetoComoString = JSON.stringify(comunasUnificadas, null, 2);

// 4. Crear el contenido del nuevo archivo JS
const contenidoArchivoJS = `export default ${objetoComoString};\n`;

// 5. Escribir el nuevo archivo físicamente en el disco
fs.writeFileSync('./comunasUnificadas.js', contenidoArchivoJS, 'utf-8');

console.log('¡Éxito! El archivo comunasUnificadas.js ha sido creado.');
