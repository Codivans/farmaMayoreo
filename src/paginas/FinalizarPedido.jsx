import React,{ useState, useContext } from "react";
import { HeaderMenu } from "../componentes/HeaderMenu";
import { ContextoCarrito } from './../contextos/cartContext';
import { getUnixTime } from 'date-fns';
import { useAuth } from '../contextos/AuthContext';
import { useNavigate } from "react-router";
import axios from 'axios';

import { FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'
import { AiTwotoneShop } from 'react-icons/ai'
import { Button } from "@mui/material";
import formatoMoneda from "../funciones/formatoMoneda";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DetalleCarrito from "../componentes/DetalleCarrito";
import TipoDeEntrega from "../componentes/TipoDeEntrega";
import FormaDePago from "../componentes/FormaDePago";
import createOrder from "../firebase/createOrder";
import useGetUser from "../hooks/useGetUser";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Footer } from "../componentes/Footer";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FinalizarPedido(){
    // const [tipoEntrega, setTipoEntrega] = useState('pickup');
    const [id_order, setId_order] = useState(getUnixTime(new Date()))
    // const [pickUp, setPickUp] = useState('Punto de venta');
    const [open, setOpen] = useState(false)
    const [formaPago, setFormaPago] = useState('Efectivo')
    // const [dataDireccion, setDataDireccion] = useState({tipo: ''});
    const [mapa, setMapa] = useState(null);
    // const [recibe, setRecibe] = useState(null);
    const { usuario } = useAuth();
    const navigate = useNavigate()

    const { productosCarrito, importeCart, vaciarCarrito, step, setStep, tipoEntrega, 
        pickUp, dataDireccion, recibe, cobertura } = useContext(ContextoCarrito);

    const dataUser = useGetUser(usuario.email)

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangePago = (e) =>{
        setFormaPago(e.target.value)
    }
    const orderSend = [
        {
            id_order: id_order,
            fecha: id_order,
            uidUser: usuario.uid,
            importe: importeCart,
            tipo_entrega: tipoEntrega,
            punto_entrega: tipoEntrega === 'pickup' ? pickUp : dataDireccion,
            recibe: tipoEntrega === 'pickup' ? usuario.uid : recibe,
            forma_pago: formaPago,
            pedido: productosCarrito
        }
    ]
    let destinatario = usuario.email
    const handleSendOrder = async() =>{
        try {
            await createOrder({ dataUser, orderSend })
            // await axios.post("http://localhost:3001/api/message/")
            // .then(resp => {
            // console.log(resp);
            // })
            // .catch(error => {
            // console.log(error);
            // });
            const response = await axios.post('http://localhost:3001/api/emailorder/', {
                destinatario,
                asunto:`Confirmación de pedido ${id_order}`,
                contenido: productosCarrito,
            });
            setStep(0)
            setFormaPago('Efectivo')
            vaciarCarrito()
            navigate('/order/' + id_order)
            
        } catch (error) {
            alert(error)
        }
        
    }

    
    return(
        <>
            <div className="wrap-cart-details">
                <HeaderMenu />
                <div className="container-steper">
                    <div className="steper">
                        <div className="container-icon active-step" onClick={() => setStep(0)}>
                            <p className='txt-icon-buton txt-active-step'> <FaShoppingCart className="active-step"/> Resumen</p>
                        </div>
                        <div className="line-container">
                            <hr className={`${step > 0 ? 'line-complete' : 'line'}`}/>
                        </div>
                        <div className={`container-icon ${step > 0 ? 'active-step' : ''}`} onClick={() => setStep(1)}>
                            <p className={`txt-icon-buton ${step > 0 ? 'txt-active-step': ''}`}><AiTwotoneShop className={`${step > 0 ? 'active-step' : ''}`}/> Envio</p>
                        </div>
                        
                        <div className="line-container">
                            <hr className={`${step != 0 ? step > 1 ? 'line-complete' : 'line' : 'line-grey'}`} />
                        </div>
                        <div className={`container-icon ${step > 1 ? 'active-step' : ''}`} onClick={() => setStep(2)}>
                            <p className={`txt-icon-buton ${step > 1 ? 'txt-active-step': ''}`}><FaMoneyBillWave className={`${step > 1 ? 'active-step' : ''}`}/> Pago</p>
                        </div>
                    </div>
                </div>
                
                <div className="wrap-finalizar-cart">
                    <div className='container-finalizar'>
                        <div className="columna-1">
                            {
                                step != 0
                                ? step === 1
                                ?
                                <TipoDeEntrega
                                    setOpen={setOpen} 
                                    setMapa={setMapa}
                                    dataDireccion={dataDireccion}
                                    // setDataDireccion={setDataDireccion}
                                    // setRecibe={setRecibe}

                                />
                                :<FormaDePago formaPago={formaPago} handleChangePago={handleChangePago}/>
                                :<DetalleCarrito />
                            }
                        </div>
                        <div className='columna-datos'>
                            <div className="container-totales">
                                <p className="txt-importes">Subtotal: <span>{formatoMoneda(importeCart)}</span></p>
                                <hr/>
                                <p className="txt-importes">Envio: <span>{formatoMoneda(0)}</span></p>
                                {/* <p className="txt-importes">Comisión: <span>{formaPago === 'Tarjet' ? formatoMoneda(importeCart * .02) : formatoMoneda(0)}</span></p> */}
                                {formaPago === 'Tarjeta' ? <p className="txt-importes">Comision: <span>{formatoMoneda(importeCart * .02)}</span></p> : ''}
                                <p className="txt-importes importe-ground">Importe: <span>{formatoMoneda(formaPago === 'Tarjeta' ? importeCart*1.02 : importeCart)}</span></p>
                            </div>
                            <div className="button-step">
                                {
                                    step != 0
                                    ? step === 1
                                    ?
                                    <div className="container-btn-step">
                                        <button className="btn-step previus-step" onClick={() => setStep(0)}>Regresar al carrito</button>
                                        {
                                            tipoEntrega === 'domicilio'
                                            ?importeCart < 5000 || cobertura != 'Cobertura'
                                            ?<button className="btn-step next-step disabled-btn" disabled>Forma de pago</button>
                                            :<button className="btn-step next-step" onClick={() => setStep(2)}>Forma de pago</button>
                                            :<button className="btn-step next-step" onClick={() => setStep(2)}>Forma de pago</button>
                                        }
                                        
                                    </div>
                                    :
                                    <div className="container-btn-step">
                                        <button className="btn-step previus-step" onClick={() => setStep(1)}>Regresar a entrega</button>
                                        <button className="btn-step next-step" onClick={handleSendOrder}>Finalizar pedido</button>
                                    </div>
                                    :<button className="btn-step next-step" onClick={() => setStep(1)}>Seleccionar entrega</button>
                                }
                            </div>
                            <div>
                            {
                                dataDireccion != '' 
                                ? cobertura === 'Sin Cobertura'
                                ? <Alert severity="error">
                                    Lo sentimos, por el momento no contamos con cobertura en tu ciudad, estamos trabajando para poder llegar a mas lugares.
                                    selecciona otra ubicación o recoge en los puntos de entrega
                                </Alert> 
                                : '' 
                                : ''
                            }
                            <br />
                            {
                                tipoEntrega === 'domicilio'
                                ?importeCart < 5000
                                ?<Stack sx={{ width: 'auto' }}>
                                    <Alert severity="warning">Estas a {formatoMoneda(5000 - importeCart)} para que tu pedido pueda ser enviado a domicilio sin costo</Alert>
                                </Stack>
                                :<></>
                                :<></>
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth="md"
                    maxWidth="md"
                >
                    <DialogContent>
                            <div className="mapa">
                                <iframe src={mapa} width="100%" height="350" allowFullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
                
            </div>
            <Footer />
        </>
    )
}