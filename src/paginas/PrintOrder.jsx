import React from 'react'
import { HeaderMenu } from '../componentes/HeaderMenu'
import { useParams, useNavigate } from 'react-router'
import { MdOutlineArrowBackIos, MdOutlinePrint } from 'react-icons/md';
import { Button } from '@mui/material';
import useGetOrderSingleCliente from '../hooks/useGetOrderSingleCliente';
import logo from './../assets/img/farmamayoreo.svg';
import formatoMoneda from '../funciones/formatoMoneda';
import confetti from "canvas-confetti";
import 'animate.css';
import axios from 'axios';
// const confettiBtn = document.querySelector(".canvas-confetti-btn");

export function PrintOrder() {
    let { idorder } = useParams();
    const pedidos = useGetOrderSingleCliente(idorder)
    const navigate = useNavigate();

    var end = Date.now() + (2 * 1000);

    // go Buckeyes!
    var colors = ['#0baeb5', '#364571'];
    
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    const printData =() =>{
        var divToPrint=document.getElementById("printOrder");
        if(pedidos.length > 0){
            let newWin= window.open('', 'PRINT', 'height=800,width=1200');
            newWin.document.write(`
                <style>
                    .printOrder{
                        width: 100%;
                        margin: 0px auto;
                        font-family: Sans-serif;
                    }
                    
                    .cabecera-order{
                        display: flex;
                        justify-content: space-between;
                        padding: 20px;
                        align-items: center;
                        color: #363636;
                        border-bottom: 1px solid #cccccc;
                    }
                    .cabecera-order p b{
                        color: #054483;
                    }
                    .cabecera-order img{
                        width: 200px;
                    }
                    .info-order h3{
                        color: #363636;
                    }
                    .info-order ul{
                        margin: 0px;
                        padding: 0px;
                        list-style: none;
                    }
                    .info-order ul li{
                        color: #363636;
                    }
                    
                    .info-order ul li span{
                        font-weight: 500;
                        color: #696969;
                        margin-left: 5px;
                    }
                    
                    .printOrder table{
                        width: 100%;
                        margin-top: 20px;
                        border-collapse: collapse;
                    }
                    
                    .printOrder table tr{
                        border-bottom: 1px solid #cccccc;
                    }
                    .printOrder table tr th{
                        font-weight: 600px;
                        text-align: center;
                        color: #373737;
                        padding: 10px;
                    }
                    .printOrder table tr td img{
                        width: 80px;
                    }
                    .printOrder table tbody tr{
                        border-bottom: 1px solid #cacaca;
                    }
                    .printOrder table tbody tr td{
                        font-size: 14px;
                        color: #363636;
                    }
                    .printOrder table tbody tr td:nth-child(3){
                        width: 100px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .printOrder table tbody tr td:nth-child(n+4){
                        text-align: center;
                    }
                </style>
            `);
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }else{
            // toast.error("Oops! No hay nada que imprimir.");
        }        
    }
    console.log(pedidos)




  return (
    <>
        <HeaderMenu />
        <div className='wrap'>
            <div className='wrap-succes'>
                <div className='succesfuly-order'>
                    <div class="success-checkmark">
                            <div class="check-icon">
                                <span class="icon-line line-tip"></span>
                                <span class="icon-line line-long"></span>
                                <div class="icon-circle"></div>
                                <div class="icon-fix"></div>
                            </div>
                        </div>
                        <div>
                            <h2>¡Gracias por su compra!</h2>
                            <p>Con este id podras darle seguimiento a tu pedido</p>
                            <p className='txt-idorder'>{ idorder }</p>
                            <p>recibiras en tu correo <span className='txt-idorder'>compras@farmaprontocentro.com</span> el detalle de tu pedido, nos pondremos en contacto por telefono en caso de algun inconveniente.</p>
                            <Button variant='outlined' color='success' startIcon={<MdOutlineArrowBackIos />} onClick={() => navigate('/')}>Seguir comprando</Button>
                            <Button variant='contained' color='success' startIcon={<MdOutlinePrint />} onClick={printData}>Imprimir pedido</Button>
                        </div>
                </div>
            </div>
            <div className='printOrder' id="printOrder">
                <div className='cabecera-order'>
                    <img src={logo} />
                    <p>Folio Pedido: <b>#{idorder}</b></p>
                </div>
                {
                    pedidos.map(({Nombre, forma_pago, tipo_entrega, punto_entrega, fecha, importePedido}) => {
                        return(
                            <div className='info-order'>
                                  <h3>Datos de Entrega</h3>              
                                  <ul>
                                    <li>Nombre: <span>{Nombre}</span></li>
                                    <li>Tipo de entrega: <span>{tipo_entrega}</span></li>
                                    <li>Punto de entrega: <span>{punto_entrega}</span></li>
                                    <li>Forma de pago: <span>{forma_pago}</span></li>
                                    <li>Importe: <span>{formatoMoneda(importePedido)}</span></li>
                                    <li>Fecha: <span>{new Date(fecha * 1000).toLocaleDateString()}</span></li>
                                  </ul>
                            </div>
                        )
                    })
                }
                
                <table>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Pedido</th>
                        <th>Precio</th>
                        <th>Importe</th>
                    </tr>
                    <tbody>
                        {
                            pedidos.map((row) =>{
                                return(
                                    row.pedido.map((item) => (
                                        <tr key={item.codigo} className='row-data'>
                                            <td>{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.pedido}</td>
                                            <td>{formatoMoneda(item.precio)}</td>
                                            <td>{formatoMoneda(item.importe)}</td>
                                        </tr>
                                    ))
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='footer-order'>
                    <p>Se pondra en contacto con usted un representante para indicarle </p>
                </div>
            </div>
            
        </div>
    </>
  )
}
