import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import useGetDirecciones from './../hooks/useGetDirecciones';
// import codigos from './../data/codigosPostales';
import { useAuth } from './AuthContext';
// import Alert from '@mui/material/Alert';

const ContextoCarrito = React.createContext();

const CarritoProvider = ({children}) =>{
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [click, setClick] = useState(false);
    const [step, setStep] = useState(0);
    const [tipoEntrega, setTipoEntrega] = useState('pickup');
    const [pickUp, setPickUp] = useState('Punto de venta');
    const [dataDireccion, setDataDireccion] = useState('');
    const [recibe, setRecibe] = useState(null);
    const [cobertura, setCobertura] = useState(null)
    const { usuario } = useAuth();

    // let emailCliente = usuario ? usuario.mail : ''

    // const direcciones = useGetDirecciones(emailCliente)

  useEffect(() => {
    let data = localStorage.getItem('CarritoCedifa');
    if(data != null){
      setProductosCarrito(JSON.parse(data));
    }else{
      setProductosCarrito([]);
    }
  },[click])


    //Agregar producto al carrito
    const addProductoCart = ({codigo, nombre, pedido, precio, cantidad, preciofijo, tipooferta, piezasdeoferta}) => {

      console.log(pedido, preciofijo, piezasdeoferta)

      let precioFinal = 0;

      if(tipooferta === 'PRECIO ESPECIAL'){
        precioFinal = preciofijo
      }
      if(tipooferta === 'PRECIO FIJO POR PIEZAS'){
        precioFinal = precio
      }
      if(tipooferta === null || tipooferta === undefined ){
        precioFinal = precio
      }
      if(tipooferta === 'PIEZAS GRATIS'){
        precioFinal = precio
      }

      const calcularPrecio = ({piezasAlmacenadas, piezasAgregar, preciofijo, piezasdeoferta}) => {
        let precioFijoOferta = 0

        const ofertasCompletas = Math.floor(((parseInt(piezasAlmacenadas) + parseInt(piezasAgregar)) / piezasdeoferta))

        console.log((ofertasCompletas * preciofijo) + precio, piezasAlmacenadas, piezasAgregar)

        if(Number.isInteger((piezasAlmacenadas + piezasAgregar) / 2)){
          precioFijoOferta = ((parseInt(piezasAlmacenadas) + parseInt(piezasAgregar)) / piezasdeoferta) * preciofijo
        }else{
          precioFijoOferta = (parseInt(ofertasCompletas) * preciofijo) + Number(precio)
        }

        return precioFijoOferta
      }

      
      if(!productosCarrito.find(product => product.codigo === codigo)){
          setProductosCarrito([...productosCarrito, {codigo: codigo, nombre: nombre, pedido: pedido, precio: precioFinal, importe: precioFinal * pedido, tipooferta, preciofijo, piezasdeoferta}]);
          localStorage.setItem('CarritoCedifa', JSON.stringify([...productosCarrito, {codigo: codigo, nombre: nombre, pedido: pedido, precio: precioFinal, importe: precioFinal * pedido, tipooferta, preciofijo, piezasdeoferta}]))
          setClick(!click)
          toast.success('Se agrego productos al carrito');
      }else{
          setProductosCarrito(productosCarrito.map(p => (p.codigo === codigo ? {...p, pedido: parseInt(p.pedido) + parseInt(pedido), 
            importe : tipooferta === 'PRECIO FIJO POR PIEZAS' ? calcularPrecio({piezasAlmacenadas : p.pedido, piezasAgregar: pedido, preciofijo, piezasdeoferta}) : (p.pedido + pedido) * precioFinal } : p)))
          toast.success(`Se agrego ${pedido} ${pedido > 1 ? 'piezas' : 'pieza'} más`);
      }
  }

    const removeProductCart = ({codigo, disminuir, agregados}) => {
        if(productosCarrito.find(product => product.codigo === codigo && disminuir == 1)){
            setProductosCarrito(productosCarrito.map(p => (p.codigo === codigo ? {...p, pedido: p.pedido - 1, importe: p.precio * (p.pedido - 1)} : p)))
            toast.success('Se resto 1 piezas del producto en el carrito');
        }
        if(productosCarrito.find(product => product.codigo === codigo && disminuir == 1 && agregados == 1)){
          let newProductItem = productosCarrito.filter( x => x.codigo != codigo);
          setProductosCarrito(newProductItem);
        }else if(productosCarrito.find(product => product.codigo === codigo && disminuir == 1 && product.pedido == 1)){
            let newProductItem = productosCarrito.filter( x => x.codigo != codigo);
            setProductosCarrito(newProductItem);
          }
        
    }

    const deleteProductoCart = (codigo) => {
        let newCarrito = productosCarrito.filter( x => x.codigo != codigo);
        setProductosCarrito(newCarrito);
    }
    //Vaciar carrito
    const vaciarCarrito = () => {
        localStorage.removeItem('CarritoCedifa');
        setProductosCarrito([]);
    }

    const addArrayCart = (data) => {
      console.log(data);
      if(!productosCarrito.length > 0){
        console.log(data);
        localStorage.setItem('CarritoCedifa', JSON.stringify(data))
        setClick(!click)
      }
      
    }

    let countCart = productosCarrito.reduce((a,b) => a + b.pedido, 0)
    let importeCart = productosCarrito.reduce((a,b) => a + b.importe, 0)



    const handleChangePickUp = (e) => {
      setPickUp(e.target.value)
    }
    const handleChangeTipoEntrega = (event, newTipoEntrega) => {
      setTipoEntrega(newTipoEntrega);
    };

    // const codigoSelect = dataDireccion != null ? direcciones.filter((item) => item.tipo === dataDireccion)[0].codigoPostal : ''
    // const cobertura = codigos.filter((item) => item.codigo === parseInt(codigoSelect)).length > 0 ? '' 
    // : <Alert severity="error">Lo sentimos, por el momento no contamos con cobertura en tu ciudad, estamos trabajando para poder llegar a mas lugares.</Alert>


    return(
        <ContextoCarrito.Provider value={{
            productosCarrito,
            addProductoCart, 
            removeProductCart, 
            deleteProductoCart, 
            vaciarCarrito,
            addArrayCart,
            countCart,
            importeCart,
            step,
            setStep,
            handleChangeTipoEntrega,
            tipoEntrega,
            setTipoEntrega,
            handleChangePickUp,
            pickUp,
            setPickUp,
            dataDireccion,
            setDataDireccion,
            // direcciones,
            recibe,
            setRecibe,
            cobertura,
            setCobertura
        }}>
            {children}
        </ContextoCarrito.Provider>
    )

}


export { ContextoCarrito, CarritoProvider };
