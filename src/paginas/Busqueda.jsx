import { HeaderMenu } from "../componentes/HeaderMenu";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getProductosSearchRequest } from "../api/apiFarmaMayoreo";
import { Card } from "../componentes/Card";
import { Footer } from "../componentes/Footer";

export function Busqueda (){
    const { buscar } = useParams()
    const [productos, setProductos] = useState([])

    const getProductos = async () => {
        const res = await getProductosSearchRequest(buscar)
        setProductos(res.data)
    }

    useEffect(() => {
        getProductos()
    }, [buscar]);

    return(
        <>
            <HeaderMenu />
            <main className="wrap">
                <h2 className="title-resultados">Resultado <span>({productos.length}) productos encontrados con <b>"{buscar}"</b></span></h2>
                <hr className="line-title"/>
                <div className="grid-cards">
                    {
                        productos.map(({codigo, nombre, precio, existencia, descripcion, piezasdeoferta, preciofijo, tipooferta}) => {
                            return(
                                <Card
                                    key={codigo}
                                    codigo={codigo} 
                                    nombre={nombre} 
                                    precio={precio} 
                                    existencia={existencia}
                                    descripcion={descripcion}
                                    piezasdeoferta={piezasdeoferta}
                                    preciofijo={preciofijo}
                                    tipooferta={tipooferta}
                                />
                            )
                        })
                    }
                </div>
            </main>
            <Footer />
        </>
    )
}