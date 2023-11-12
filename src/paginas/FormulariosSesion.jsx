import React,{ useState } from 'react';
import { HeaderMenu } from './../componentes/HeaderMenu';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/img/farmamayoreo.svg';
import { auth } from './../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { Footer } from '../componentes/Footer';
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
// Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import createUser from '../firebase/createUser';
import useVerifyUser from '../hooks/useVerifyUser';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export function FormulariosSesion (){
    const navigate = useNavigate();
    // State
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [registro, setRegistro] = React.useState({
      nombre: "",
      apellidos: "",
      numero: "",
      email: "",
      giro: "",
      empresa: "",
      password:''
    });

    const [valoresLogin, setValoresLogin] = React.useState({
      email:'',
      password:''
    });

    const userVerify = useVerifyUser(valoresLogin.email)

    // Abrir modal del formulario Registro
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    // Funcion para actualizar el displayName del usuario en firebase
      const actualizarNombreDeUsuario = async (nombre) => {
        console.log('Nombre User: ', nombre)
        await updateProfile(auth.currentUser, {
          displayName: nombre
        }).then(() => {
          console.log('Actualizado')
        }).catch((error) => {
          // An error occurred

        })
    }
      // LogIn
      const handleSubmit = async(evt)=> {
        evt.preventDefault();
        // Aquí puedes usar values para enviar la información
        console.log('Primer paso: ', registro.email, registro.password)
        const infoUsuario =  await createUserWithEmailAndPassword(auth, registro.email, registro.password)
        
        .then((userCredential) => {
          actualizarNombreDeUsuario(registro.nombre)
          let uidUsuario = userCredential.user.uid;
          let email = registro.email
          let nombre = registro.nombre
          let apellidos = registro.apellidos
          let numero = registro.numero
          let giro = registro.giro
          let empresa = registro.empresa         
          createUser({uidUsuario,email, nombre, apellidos, numero, giro, empresa})
          navigate('/')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    
      }
      // Registrar
      const handleSubmitLogin = async(evt)=> {
        evt.preventDefault();
        if(userVerify.length > 0){
          try {
            await signInWithEmailAndPassword(auth, userVerify[0].email, valoresLogin.password);
            navigate('/')
          } catch (error) {
            toast.error('Usuario o password erroneos, Vuelve a intentar.');
          }
          
          
        }else{
          alert('Upps')
        }
        
      }

      function handleChangeLogin(evt) {
        /*evt.target es el elemento que ejecuto el evento name identifica el input y value describe el valor actual*/
        const { target } = evt;
        const { name, value } = target;
    
        /*Este snippet: 1. Clona el estado actual, 2. Reemplaza solo el valor del input que ejecutó el evento*/
        const newValores = {
          ...valoresLogin,
          [name]: value,
        };
        // Sincroniza el estado de nuevo
        setValoresLogin(newValores);
      }

      function handleChange(evt) {
        /*evt.target es el elemento que ejecuto el evento name identifica el input y value describe el valor actual*/
        const { target } = evt;
        const { name, value } = target;
    
        /*Este snippet: 1. Clona el estado actual, 2. Reemplaza solo el valor del input que ejecutó el evento*/
        const newValues = {
          ...registro,
          [name]: value,
        };
        // Sincroniza el estado de nuevo
        setRegistro(newValues);
      }

    return(
        <>
            <HeaderMenu />
            {/* <main className='wrap-login'> */}
                <div className='conetendor-login'>
                    <div className='contenedor-texto-login'>
                        <img src={logo} alt="logo"  className='animate__animated animate__backInUp'/>
                        <p className='animate__animated animate__backInUp'>Inicia sesion o registrate para tener acceso total a nuestro catalogo, ofertas y para poder realizar tus compras.</p>
                    </div>
                    <div className='contenedor-formulario-inicio'>
                        <div className='formulario-inicio animate__animated animate__fadeInRightBig'>
                            <form onSubmit={handleSubmitLogin}> 
                                <h3>Iniciar sesión</h3>             
                                <div className='form-control'>
                                    <label>Usuario</label><br />
                                    <input type='tel' name='email' placeholder='Numero telefonico' onChange={handleChangeLogin} />
                                </div>
                                <div className='form-control'>
                                    <label>Password</label><br />
                                    <div className='input-password'>
                                      <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Contraseña' onChange={handleChangeLogin}/>
                                      {
                                        showPassword ? <VscEye onClick={() => setShowPassword(false)} /> : <VscEyeClosed onClick={() => setShowPassword(true)}/>
                                      }
                                    </div>
                                    
                                </div>
                                <button type='submit' className='btn btn-blue'>Entrar</button>
                                <a href='#' className='txt-login' >¿Olvidaste tu contraseña?</a>
                            </form>
                            <button className='btn btn-green' onClick={handleClickOpen}>Crear mi cuenta</button>
                        </div>
                    </div>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Registrate"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <form className='form-registro' name='registrar' onSubmit={handleSubmit}>
                                <div className='column2-form'>
                                    <input name='nombre' placeholder='Nombre' className='columna-input' onChange={handleChange}/>
                                    <input name='apellidos' placeholder='Apellidos' className='columna-input' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <input name='numero' type='text' placeholder='Numero de telefono' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <input name='email' type='email' placeholder='Correo Electrónico' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <select name='giro' onChange={handleChange}>
                                        <option>Selecciona un giro</option>
                                        <option>Farmacéutico</option>
                                        <option>Abarrotero</option>
                                        <option>Personal</option>
                                    </select>
                                </div>
                                <div className='column1-form'>
                                    <input name='empresa' type='text' placeholder='Nombre de empresa o negocio' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <input name='password' type='password' placeholder='Contraseña' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <button type='submit' className='btn btn-green'>Registrarme</button>
                                </div>
                                
                            </form>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            {/* </main> */}
            <Footer />
        </>
    )
}