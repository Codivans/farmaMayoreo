import React, { useState, useEffect, useContext } from 'react';
import { ContextoCarrito } from '../contextos/cartContext';
import { HeaderMenu } from './../componentes/HeaderMenu';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from 'react-icons/si';
import { getCatalogoRequest } from '../api/apiFarmaMayoreo';
import formatoMoneda from '../funciones/formatoMoneda';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { IconButton } from '@mui/material';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdShoppingCartCheckout } from 'react-icons/md';


export function CargarPedido() {
    const [pedido, setPedido] = useState([]);
    const [catalogo, setCatalogo] = useState([]);
    const { addArrayCart } = useContext(ContextoCarrito);
    const navigate = useNavigate()

    const getCatalogo = async() => {
        const response = await getCatalogoRequest()
        setCatalogo(response.data)
    }

    useEffect(() => {
      getCatalogo()
    }, [])

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
            setPedido(d);
        });
    };


    const arrayPeido = [];
    pedido.forEach((item) => {
        const buscarCodigo = catalogo.find((data) => parseInt(data.codigo) === parseInt(item.codigo))
        const addInArray = {
            codigo: item.codigo,
            pedido: item.pedido,
        }
        if(buscarCodigo){
            addInArray.nombre = buscarCodigo.nombre,
            addInArray.precio = buscarCodigo.precio,
            addInArray.importe = buscarCodigo.precio*item.pedido
            addInArray.existencia = buscarCodigo.existencia
        }else{
            addInArray.nombre = 'No se encontro ningun producto con este codigo',
            addInArray.precio = 0,
            addInArray.existencia = 0,
            addInArray.importe = 0
        }

        arrayPeido.push(addInArray)
    })
    console.log(arrayPeido);

    const handleClick = () =>{
        addArrayCart(arrayPeido.filter((item) => item.existencia > 0))
        navigate('/finalizar')
    }

  return (
    <>
        <HeaderMenu />
        <div className='wrap'>
            <div className='column-data-import'>
                <div>
                    <h3>Sube tu pedido mediante un archivo excel.</h3>
                    <p>Te explicamos acontinuación como lo puedes hacer.</p>

                    <ol>
                        <li>Descargar el <Link to='https://firebasestorage.googleapis.com/v0/b/farmamayoreo-web.appspot.com/o/formatos%2Fformato.xlsx?alt=media&token=c6426b25-1185-4a9c-bf66-e6c09bc75b10'  className='txt-link'>archivo de excel</Link></li>
                        <li>Llena el archivo unicamente con los datos que se te piden <span>No modificar nombre de cabeceras</span></li>
                        <li>Da click y selecciona tu archivo para que pueda ser leido</li>
                        <li>Da click en el boton <MdShoppingCartCheckout className='txt-link'/> para seguir el proceso de tu pedido</li>
                    </ol>
                </div>
                <div className='column-label'>
                    <label onChange={(e) => {const file = e.target.files[0]; readExcel(file);}} className='btn-file'>
                        <div>
                            <SiMicrosoftexcel /> <br/>
                            <span>Da click y sube tu archivo llenado aqui</span>
                            <input hidden accept=".xlsx" multiple type="file" />
                        </div>
                    </label>
                </div>
            </div>
            
            {
                pedido.length > 0
                ?
                <div className='container-table'>
                    <IconButton>
                        <RiDeleteBin6Line />
                    </IconButton>
                    <IconButton  onClick={handleClick}>
                        <MdShoppingCartCheckout />
                    </IconButton>
                    <table className='table-excel'>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Disponibilidad</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Importe</th>
                            <th>Estatus</th>
                        </tr>
                        <tbody>
                            {
                                arrayPeido.map((data) =>(
                                    <tr key={data.codigo}>
                                        <td>{data.codigo}</td>
                                        <td>{data.nombre}</td>
                                        <td style={{textAlign: 'center'}}>{data.existencia}</td>
                                        <td style={{textAlign: 'center'}}>{data.pedido}</td>
                                        <td style={{textAlign: 'right'}}>{formatoMoneda(data.precio)}</td>
                                        <td style={{textAlign: 'right'}}>{formatoMoneda(data.importe)}</td>
                                        <td style={{textAlign: 'center'}}>
                                            {
                                                data.existencia<data.pedido
                                                ?   data.nombre === 'No se encontro ningun producto con este codigo'
                                                ?   <span className='txt-alert error-txt'>Sin catalogar</span>
                                                :   <span className='txt-alert warning-txt'>Incompleto</span>
                                                :   <span className='txt-alert success-txt'>Completo</span>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                
                :<></>
            }
        </div>
    </>
  )
}
