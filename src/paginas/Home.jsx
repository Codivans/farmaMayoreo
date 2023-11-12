import { HeaderMenu } from './../componentes/HeaderMenu';
import SliderCards from './../componentes/SliderCards';
import SliderSwip from './../componentes/SliderSwip';
import { MenuIconos } from './../componentes/MenuIconos';
import SliderLaboratorios from '../componentes/SliderLaboratorios';
import { MasVendidos } from '../componentes/MasVendidos';
import { TfiWindow, TfiShoppingCartFull, TfiMapAlt, TfiPackage, TfiIdBadge } from 'react-icons/tfi';
import bgcompra from './../assets/img/circle-bg.png';
import { Link } from 'react-router-dom';
import useGetTienda from '../hooks/useGetTienda';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

import imgregistrate from './../assets/img/registrate.png'

import { Footer } from '../componentes/Footer';


export function Home(){

    const dataTienda = useGetTienda()

    const size = screen.width
    $(window).on('load', function () {
        setTimeout(function () {
      $(".loader-page").css({visibility:"hidden",opacity:"0"})
    }, 3000);
  });


    return(
        <>
            <HeaderMenu />
            <SliderSwip />
            <div className='wrap'>
                <article className='pasos-compra'>
                    <h2>Estos son los pasos para generar tu pedido.</h2>
                    <ul>
                        <li>
                            <div style={{ backgroundImage: `url(${bgcompra})` }} className='animate__animated animate__backInUp'>
                                <TfiIdBadge />
                                <h4>Registrate</h4>
                                <p>Para tener acceso a todo el catalogo, lista de precios, ofertas y más.</p>
                            </div>
                        </li>

                        <li>
                            <div style={{ backgroundImage: `url(${bgcompra})` }} className='animate__animated animate__backInUp'>
                                <TfiWindow />
                                <h4>Consulta</h4>
                                <p>Consulta en nuestro sitio los productos que necesitas.</p>
                            </div>
                        </li>
                        <li>
                            <div style={{ backgroundImage: `url(${bgcompra})` }} className='animate__animated animate__backInUp'>
                                <TfiShoppingCartFull />
                                <h4>Seleccionar</h4>
                                <p>Agrega productos a tu carrito.</p>
                            </div>
                        </li>
                        <li>
                            <div style={{ backgroundImage: `url(${bgcompra})` }} className='animate__animated animate__backInUp'>
                                <TfiMapAlt />
                                <h4>Punto de Entrega</h4>
                                <p>Selecciona el punto de entrega que mejor te convenga</p>
                            </div>
                        </li>
                        <li>
                            <div style={{ backgroundImage: `url(${bgcompra})` }} className='animate__animated animate__backInUp'>
                                <TfiPackage />
                                <h4>Recibe</h4>
                                <p>Tu pedido en el punto seleccionado y realiza o entrega tu comprobante de pago.</p>
                            </div>
                        </li>
                    </ul>
                </article>
                {dataTienda.length > 0 ? <SliderCards itemTienda={dataTienda[0]}/>:''}
            </div>
            <MasVendidos />
            <div className='wrap'>
                <SliderLaboratorios />
                {
                    dataTienda.length > 0 ? dataTienda.slice(1).map((itemTienda, index) => {
                        return <SliderCards key={index} itemTienda={itemTienda}/>
                    })
                    :''
                }
            </div>
            <Footer />
            
        </>
    )
}