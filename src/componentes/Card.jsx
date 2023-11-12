import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';
import { ContextoCarrito } from './../contextos/cartContext';
import formatoMoneda from '../funciones/formatoMoneda';
import { IconButton } from '@mui/material';
import agregarAccionTiendasOnline from '../firebase/agregarAccionTiendasOnline';
import { getUnixTime } from 'date-fns';
import { MdLocalOffer } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';


export function Card({codigo, nombre, precio, existencia, piezasdeoferta, preciofijo, tipooferta, st, idTienda}){
    const [piezas, setPiezas] = useState(0)
    const { addProductoCart, removeProductCart, productosCarrito } = useContext(ContextoCarrito);

    let agregado = productosCarrito.find((item) => parseInt(item.codigo) === parseInt(codigo));

    const imagenDefault = (e) =>{
        e.target.src =  'https://farmaprontoneza.com/image/predeterminada.jpg' 
    }

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
        }
        
    }

    const handleClick = async() => {
        if(st){
            try {
                await agregarAccionTiendasOnline({idTienda, accion: st, valor: 1, codigo: parseInt(codigo), fecha: getUnixTime(new Date())})
                addProductoCart({codigo: parseInt(codigo), nombre, pedido: 1, precio, existencia, preciofijo, tipooferta, piezasdeoferta})
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                addProductoCart({codigo: parseInt(codigo), nombre, pedido: 1, precio, existencia, preciofijo, tipooferta, piezasdeoferta})
            } catch (error) {
                console.log(error)
            }
        }      
        
    }


    return(
        <div className="card animate__animated animate__jackInTheBox" title={nombre}>
             {   tipooferta === 'PRECIO ESPECIAL'
                ? (<div className='item-oferta oferta-especial'><span>¡¡ Precio especial !!</span></div> )
                : tipooferta === 'PRECIO FIJO POR PIEZAS'
                ? (<div className='item-oferta oferta-fijo'>¡¡ Precio Fijo !!</div> )
                : tipooferta === 'PIEZAS GRATIS'
                ? (<div className='item-oferta oferta-gratis'>¡¡ Piezas Gratis !!</div> )
                : ''
            }
            <div className="imagen">
                <img loading="lazy" onError={imagenDefault} src={'https://farmaprontoneza.com/image/'+ parseInt(codigo) + '.jpg'} alt='imagen' />
            </div>
            <div className="info-card">
                <span className="item-codigo">{codigo}</span>
                <p className="item-nombre">{nombre}</p>
                {
                    tipooferta === 'PIEZAS GRATIS'
                    ?(<p className="item-descripcion-oferta">{precio}</p>)
                    :(<p className="item-precio-anterior">{preciofijo > 0 ? formatoMoneda(precio) : ''}</p>)
                }
                
                <p className="item-precio">
                    {   piezasdeoferta > 1 
                    ? `${piezasdeoferta} pz x `
                    : ''}{formatoMoneda(preciofijo > 0 
                    ? preciofijo 
                    : precio)}</p>
            </div>
            <div className="footer-card">
                {
                    agregado
                    ?
                    <div className='controllers-card'>
                        <div className='container-controllers'>
                            <IconButton 
                                aria-label="increase" 
                                onClick={() => removeProductCart({codigo: parseInt(codigo), nombre, precio, disminuir: 1})}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <input 
                                type='text' 
                                data-codigo={codigo}
                                data-nombre={codigo}
                                data-precio={precio}
                                data-existencia={existencia}
                                data-preciofijo={preciofijo}
                                data-tipooferta={tipooferta}
                                data-piezasdeoferta={piezasdeoferta}
                                placeholder={agregado.pedido}
                                title='Cuantas piezas quieres sumar'
                                onChange={handleChange} 
                                onKeyDown={handleKey}
                            />
                        
                            <IconButton
                                variant='contained'
                                aria-label="increase" 
                                onClick={() => addProductoCart({codigo: parseInt(codigo), nombre, pedido: 1, precio, existencia, preciofijo, tipooferta, piezasdeoferta})}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                    :
                    <Button className="btnAgregar" variant="contained" size="small" fullWidth
                        onClick={handleClick}
                    >
                        Agregar
                    </Button>
                }
            </div>
        </div>
    )
}