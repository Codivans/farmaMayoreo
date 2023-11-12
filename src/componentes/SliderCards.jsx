import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from './Card';
import { getCatalogoRequest } from './../api/apiFarmaMayoreo';
import { getUnixTime } from 'date-fns';
import 'animate.css';
// Import Swiper styles
import 'swiper/swiper.min.css';

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useNavigate } from "react-router";
import agregarAccionTiendasOnline from "../firebase/agregarAccionTiendasOnline";


export default function SliderCards({itemTienda}) {
    const [productos, setProductos] = useState([]);
    const [catalogoProductos, setCatalogoProductos] = useState([])
    
    const navigate = useNavigate()

    const getCatatlogo = async () => {
        try {
            const response = await getCatalogoRequest()
            setCatalogoProductos(response.data)
        } catch (error) {
            setError(error.code === 'ERR_NETWORK' ? 'Por el momento no estamos en linea, disculpe las molestias': '')
        }
    }

    const obtenerMuestraAleatoria = (arreglo, n) => {
        const muestra = [];
        const copiaArreglo = [...arreglo]; // Hacemos una copia del arreglo original.
        
        for (let i = 0; i < n; i++) {
            if (copiaArreglo.length === 0) {
            break; // Si se quedan sin elementos, salimos del bucle.
            }
        
            const indiceAleatorio = Math.floor(Math.random() * copiaArreglo.length);
            const elementoAleatorio = copiaArreglo.splice(indiceAleatorio, 1)[0];
            muestra.push(elementoAleatorio);
        }
        
        return muestra;
    }
      
      // Obtener una muestra aleatoria de 10 productos.
    const muestraAleatoria = obtenerMuestraAleatoria(itemTienda.productos, 15);


    // VARIABLE QUE CONTENDRA LOS PRODUCTOS A MOSTRAR
    let productosSelect = []

    // Array.isArray(itemTienda.productos) === true ? productosSeleccionados === 'SERVER' ? [] : itemTienda.productos.forEach(element => {
    muestraAleatoria.forEach(element => {
        const buscarProductos = catalogoProductos.find((item) => parseInt(item.codigo) === parseInt(element.codigo))

        const addArrayProductosSelect = {
            codigo: element.codigo
        }
        if(buscarProductos){
            addArrayProductosSelect.nombre = buscarProductos.nombre,
            addArrayProductosSelect.precio = buscarProductos.precio,
            addArrayProductosSelect.existencia = buscarProductos.existencia,
            addArrayProductosSelect.descripcion = buscarProductos.descripcion,
            addArrayProductosSelect.piezasdeoferta = buscarProductos.piezasdeoferta,
            addArrayProductosSelect.preciofijo = buscarProductos.preciofijo,
            addArrayProductosSelect.tipooferta = buscarProductos.tipooferta
        }else{
            addArrayProductosSelect.nombre = null,
            addArrayProductosSelect.precio = null,
            addArrayProductosSelect.existencia = null,
            addArrayProductosSelect.descripcion = null,
            addArrayProductosSelect.piezasdeoferta = null,
            addArrayProductosSelect.preciofijo = null,
            addArrayProductosSelect.tipooferta = null
        }

        productosSelect.push(addArrayProductosSelect)
    })

    const idTienda = itemTienda.uidTienda;

    
    useEffect(() => {
        getCatatlogo()
    }, [itemTienda]);


    const handleClick = async() => {
        try {
            await agregarAccionTiendasOnline({idTienda, accion:'visita', valor: 1, fecha:getUnixTime(new Date())})
            navigate(`/tienda-oficial/${itemTienda.uidTienda}`)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='slider-cards'>
            <div className="columna-logo animate__animated animate__bounceInLeft">
                <div className="cabecera-color">
                </div>
                <img src={itemTienda.logotipo} className="animate__animated animate__backInUp"/>
                <h3>Tienda virtual</h3>
                <button className="btn-tienda" onClick={handleClick} >
                    Ver productos
                </button>
            </div>
            <div className="contenedor-slider-cards">
                <Swiper
                    slidesPerView={"auto"}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper swiper-cards"
                >
                    {
                        productosSelect.map(({codigo, nombre, precio, existencia, descripcion, piezasdeoferta, preciofijo, tipooferta}) =>{
                            return(
                                <SwiperSlide className="card-slider" key={codigo}>
                                    <Card 
                                        codigo={codigo} 
                                        nombre={nombre} 
                                        precio={precio} 
                                        existencia={existencia} 
                                        st="carrusel" 
                                        idTienda={idTienda}
                                        descripcion={descripcion}
                                        piezasdeoferta={piezasdeoferta}
                                        preciofijo={preciofijo}
                                        tipooferta={tipooferta}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }  
                </Swiper>
            </div>
        </div>
    );
}