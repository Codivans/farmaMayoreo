import React,{ useState, useContext } from "react";
import { ContextoCarrito } from '../contextos/cartContext';
import formatoMoneda from "../funciones/formatoMoneda";
import { VscClose } from 'react-icons/vsc'

import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ImagenDefault } from "./ImagenDefault";



export default function DetalleCarrito() {
    const [piezas, setPiezas] = useState(0)
    const { countCart, productosCarrito, removeProductCart, deleteProductoCart, vaciarCarrito, addProductoCart } = useContext(ContextoCarrito);

    const handleChange = (e) => {
        setPiezas(e.target.value)
    }
    const handleKey = (e) => {
        if(e.keyCode === 13){
            addProductoCart(
                {
                    codigo: parseInt(e.target.dataset.codigo), 
                    nombre:e.target.dataset.nombre, 
                    pedido: piezas - e.target.placeholder,
                    precio: e.target.dataset.precio, 
                    existencia: e.target.dataset.existencia,
                    preciofijo: e.target.dataset.preciofijo,
                    tipooferta: e.target.dataset.tipooferta,
                    piezasdeoferta: e.target.dataset.piezasdeoferta
                }
            )
            e.target.value= ''
            setPiezas(0)
        }
        
    }
  return (
    <>
        <div className='columna-carrito'>
            {
                productosCarrito.map(({codigo, nombre, precio, importe, existencia, piezasdeoferta, preciofijo, tipooferta})=> {
                    return(
                        <div className="row-cart" key={codigo}>
                            <div className="details-image">
                                <img loading="lazy" onError={ImagenDefault} src={'https://farmaprontoneza.com/image/' + parseInt(codigo, 10) + '.jpg'} alt={nombre} />
                            </div>
                            <div className="details-data">
                                <h5 className="details-nombre">{nombre}</h5>
                                <p className="details-precio">
                                    {formatoMoneda(precio)} x {productosCarrito.find((item) => parseInt(item.codigo) === parseInt(codigo)).pedido}
                                    <span className="details-importe">{formatoMoneda(importe)}</span>
                                </p>
                                <div className='container-controllers controllers-mini'>
                                    <Button variant="outlined" aria-label="increase" onClick={() => removeProductCart({codigo: parseInt(codigo), nombre, pedido: 1, precio, existencia, disminuir: 1, preciofijo, tipooferta, piezasdeoferta})}>
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <input 
                                        type='text' 
                                        data-codigo={codigo}
                                        data-nombre={codigo}
                                        data-precio={precio}
                                        data-preciofijo={preciofijo}
                                        data-tipooferta={tipooferta}
                                        data-piezasdeoferta={piezasdeoferta}
                                        placeholder={productosCarrito.find((item) => parseInt(item.codigo) === parseInt(codigo)).pedido} 
                                        title='Cuantas piezas quieres sumar'
                                        onChange={handleChange} 
                                        onKeyDown={handleKey}
                                    />
                                
                                    <Button variant="outlined"
                                        aria-label="increase" 
                                        onClick={() => addProductoCart({codigo: parseInt(codigo), nombre, pedido: piezas > 0 ? piezas : 1, precio, existencia, preciofijo, tipooferta, piezasdeoferta})}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </div>

                            </div>
                            
                            <div className="btn-delete-cart-details">
                                <IconButton aria-label="delete" onClick={()=> deleteProductoCart(codigo)}>
                                    <VscClose />
                                </IconButton>
                            </div>

                        </div>
                    )
                })
            }
            
        </div>
    </>
  )
}
