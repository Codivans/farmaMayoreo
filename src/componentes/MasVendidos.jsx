import { useEffect, useState } from "react";
import { getProductosMasVendidosRequest } from "../api/apiFarmaMayoreo";
import { Card } from "./Card";
import 'animate.css';

export function MasVendidos(){
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");

    const getProductosMasVendidos = async () => {
        try {
            const res = await getProductosMasVendidosRequest()
            setProductos(res.data)    
        } catch (error) {
           setError(error.code === 'ERR_NETWORK' ? 'Por el momento no estamos en linea, disculpe las molestias': '')
        }
        
    }

    useEffect(() => {
        getProductosMasVendidos()
    }, []);

    return(
        <section className="wrap-vendidos">
            <div className='container-vendidos'>
                <h3 className="txt-title">Los productos que mas compran nuestros clientes</h3>
                <span>{error}</span>
                <div className='grid-cards grid-center'>
                    {
                        productos.map(({codigo, nombre, precio, existencias, descripcion, piezasdeoferta, preciofijo, tipooferta}) => {
                            return(
                                <Card 
                                    key={codigo} 
                                    codigo={codigo} 
                                    nombre={nombre} 
                                    precio={precio} 
                                    existencia={existencias}
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
        </section>
    )
}