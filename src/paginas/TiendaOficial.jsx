import React, { useEffect, useState } from "react";
import { HeaderMenu } from "../componentes/HeaderMenu";
import { useParams } from "react-router";
import { Card } from '../componentes/Card';
import { getProductosTiendaOficialRequest, getCatalogoRequest } from '../api/apiFarmaMayoreo';
import useGetLaboratoriosFront from "../hooks/useGetLaboraoriosFront";
import useGetTienda from "../hooks/useGetTienda";


export function TiendaOficial(){
    let { uidtienda } = useParams();
    const [productos, setProductos] = useState([]);
    const [catalogoProductos, setCatalogoProductos] = useState([])
    // const data = useGetLaboratoriosFront()

    const dataTienda = useGetTienda()

    let dataProducto = dataTienda.filter((item) => item.uidTienda === uidtienda)
    let laboratorio = dataProducto.length > 0 ? dataProducto[0].productos : ''
    let productosCargados = dataProducto.length > 0 ? dataProducto[0].productos : []

    const getCatatlogo = async () => {
        try {
            const response = await getCatalogoRequest()
            setCatalogoProductos(response.data)
        } catch (error) {
            setError(error.code === 'ERR_NETWORK' ? 'Por el momento no estamos en linea, disculpe las molestias': '')
        }
    }

    const getProductos = async () => {
        const res = await getProductosTiendaOficialRequest(laboratorio)
        setProductos(res.data);
    }
    
    useEffect(() => {
        getProductos()
        getCatatlogo()
    }, []);

    let productosSeleccionados = Array.isArray(productosCargados) === true ? productosCargados : 'SERVER'


    let productosSelect = []

    Array.isArray(productosCargados) === true ? productosSeleccionados === 'SERVER' ? [] : productosCargados.forEach(element => {
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
    : ''

    return(
        <>
            <HeaderMenu />
            <React.Fragment>      
                {
                    dataProducto.length > 0
                    ?
                    <div>
                        {
                            dataProducto[0].formatoBanner === 'video'
                            ?
                            <div className='container-video'>
                                <video loop autoPlay muted>
                                    <source src={dataProducto[0].banner} type="video/mp4" />
                                </video>
                            </div>
                            
                            :
                            <div className="container-img">
                                <img src={dataProducto[0].banner}/>
                            </div>
                        }
                    </div>
                    :''
                }
            </React.Fragment>
            <div className='wrap'>
                <div className='container-avatar'>
                    <div className='avatar-lab'>
                        {
                            dataProducto.length > 0
                            ?<img src={dataProducto[0].logotipo}/>
                            :''
                        }
                        
                    </div>
                    <h3 className="txt-nombre-tienda">{dataProducto.length > 0 ? dataProducto[0].nombreTienda : ''}</h3>
                </div>

                <div className="container-cards-tienda">
                    {
                        productosSelect.filter((item) => item.nombre != null).map(({codigo, nombre, precio, existencia, descripcion, piezasdeoferta, preciofijo, tipooferta}) =>{
                            return(
                                <Card 
                                    key={codigo} 
                                    codigo={codigo} 
                                    nombre={nombre} 
                                    precio={precio} 
                                    existencia={existencia} 
                                    st='tienda' 
                                    idTienda={uidtienda}
                                    descripcion={descripcion}
                                    piezasdeoferta={piezasdeoferta}
                                    preciofijo={preciofijo}
                                    tipooferta={tipooferta}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}