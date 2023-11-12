import React,{ useState, useContext } from "react";
import { ContextoCarrito } from '../contextos/cartContext';
import formatMoneda from './../funciones/formatoMoneda';
// import imgCartNotFound from './../assets/img/cart.png';
import imgCartNotFound from './../assets/img/cartnotfound.jpg';
import { useAuth } from '../contextos/AuthContext';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import { ImagenDefault } from "./ImagenDefault";

export function Carrito({state, setState, toggleDrawer}){
    const { usuario } = useAuth();
    const navigate = useNavigate()
    const { productosCarrito, importeCart, deleteProductoCart, vaciarCarrito } = useContext(ContextoCarrito);
    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 , height: '100%'}}
          role="presentation"
        >
            <div className="pleca-carrito">
                <p>Carrito de compras</p>
            </div>
            {
                productosCarrito.length > 0
                ?
                <div className='wrap-rows'>
                    {
                        productosCarrito.map(({codigo, nombre, pedido, precio, importe}) => {
                            return(
                                <div className="row-cart-show" key={codigo}>
                                    <div><img loading="lazy" onError={ImagenDefault} src={'https://farmaprontoneza.com/image/' + parseInt(codigo, 10) + '.jpg'} alt={nombre} /></div>
                                    <div className="info-cart-show">
                                        <span className="nombre-cart">{nombre}</span> <br />
                                        <span className="precio-y-piezas-cart">{pedido} x {formatMoneda(precio)}</span> <br/>
                                        <span className="importe-cart">{formatMoneda(importe)}</span> <br/>
                                    </div>
                                    <div>
                                        <IconButton aria-label="delete" onClick={()=> deleteProductoCart(codigo)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </div>
                : 
                <div className='wrap-rows img-cart-not-found'>
                    <img src={imgCartNotFound} className='img-cart'/>
                </div>
            }
          
          <div className="wrap-total-cart">
            <h3>Total: {formatMoneda(importeCart)}</h3>
            <Button  variant="outlined" endIcon={<DeleteIcon />} onClick={vaciarCarrito}>
                Vaciar Carrito
            </Button>
            <Button variant="contained" onClick={() => usuario ? navigate('/finalizar') : navigate('/sesion')} endIcon={<SendIcon />}>
                Finalizar
            </Button>
          </div>
          
        </Box>
      );
    return(
        <Drawer
            anchor='right'
            open={state['right']}
            onClose={toggleDrawer('right', false)}
        >
            {list('right')}
        </Drawer>
    )
}