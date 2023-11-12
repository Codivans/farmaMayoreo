import axios from 'axios';

// let URI_FARMAMAYOREO = 'http://localhost:3001/api/';
let URI_FARMAMAYOREO = 'http://cedifa.dynalias.com:3080/api/';

export const getProductosSlider = async (parametro) => await axios.get(URI_FARMAMAYOREO + 'productos-slider/' + parametro);
export const getProductosMasVendidosRequest = async () => await axios.get(URI_FARMAMAYOREO + 'productos-mas-vendidos/');
export const getProductosPorFamiliaRequest = async (familia) => await axios.get(URI_FARMAMAYOREO + 'productos-por-familia/' + familia);
export const getProductosSearchChangeRequest = async (parametro) => await axios.get(URI_FARMAMAYOREO + 'search-change/' + parametro);
export const getProductosSearchRequest = async (parametro) => await axios.get(URI_FARMAMAYOREO + 'search/' + parametro);
export const getProductosTiendaOficialRequest = async () => await axios.get(URI_FARMAMAYOREO + 'productos-tienda-oficial/');
export const getRegimenFiscalRequest = async () => await axios.get(URI_FARMAMAYOREO + 'regimen');
export const getCFDIRequest = async () => await axios.get(URI_FARMAMAYOREO + 'cfdi');
export const getCatalogoRequest = async () => await axios.get(URI_FARMAMAYOREO + 'catalogo');
