import React, { useState } from "react";
import { HeaderMenu } from "../componentes/HeaderMenu";
import { useAuth } from '../contextos/AuthContext';
import { Footer } from '../componentes/Footer';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MenuCuenta } from "../componentes/MenuCuenta";
import useGetUser from "../hooks/useGetUser";
import formatPhoneNumber from "../funciones/formatoNumberPhone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function MiCuentaCliente(){
    const { usuario } = useAuth();
    const [openModalDireccion, setOpenModalDireccion] = useState(false);
    const [openModalFactura, setOpenModalFactura] = useState(false);
    const [selectForm, setSelectForm] = useState('')
    const [tipoPersona, setTipoPersona] = useState('fisica');

    const user = useGetUser(usuario.email);
    const dataUser = user.length > 0 ? user[0] : []


    const handleClickOpen = (e) => {
        if(e.target.name === 'direccion'){
            setOpenModalDireccion(true)
        }else if(e.target.name === 'facturacion'){
            setOpenModalFactura(true)
        }
    };
    const handleClose = () => {
        setOpenModalDireccion(false)
        setOpenModalFactura(false)
    };

    const handleSubmit = () => {
        
    }

    const handleChange = (event) => {
        setTipoPersona(event.target.value);
    };

    const numeroCel = dataUser.numero

   



    return(
        <>
            <HeaderMenu />
            <div className="wrap-admin-cliente">
                <main className="grid-admin">
                    <MenuCuenta />
                
                    <section className="container-admin-data">
                        <h2 className='title-modulo'>Bienvenido a tu cuenta</h2>
                        <Grid container spacing={1} className="card-info-general">
                            <Grid xs={12} className="card-info-header">
                                <h4 style={{textTransform: 'capitalize'}}>{dataUser.nombre} {dataUser.apellidos}</h4>
                                <p>Ver mi direcciones, información de contacto y contraseña </p>
                            </Grid>
                            <Grid container spacing={2}  xs={12} className="card-info-white">
                                <Grid xs={6}>
                                    <h4>Correo electrónico</h4>
                                    <p>{dataUser.email}</p>
                                </Grid>
                                <Grid xs={6}>
                                    <h4>Número telefónico</h4>
                                    <p>{formatPhoneNumber(parseInt(numeroCel))}</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="card-info-white">
                                <Grid xs={12}>
                                    <h4>Direcciones</h4>
                                    <div className="container-cards-direcciones">
                                        {
                                            dataUser.direcciones ? dataUser.direcciones.map(({tipo, calle, colonia, codigoPostal, entidadFederativa, municipioDelegacion, numeroExterior}) => {
                                                return(
                                                    <div className="card-info-direcciones">
                                                        <h3>{tipo}</h3>
                                                        <p>Calle: {calle} # {numeroExterior}, Colonia: {colonia}, {municipioDelegacion} {entidadFederativa}</p>
                                                    </div>
                                                )
                                            }):''
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </section>
                </main>

                <Dialog
                    open={openModalFactura}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Dirección Fiscal"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="controlled-radio-buttons-group"
                                    value={tipoPersona}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="fisica" control={<Radio />} label="Persona física" />
                                    <FormControlLabel value="moral" control={<Radio />} label="Persona moral" />
                                </RadioGroup>
                            </FormControl>
                            {
                                tipoPersona === 'fisica'
                                ?
                                <form className='form-registro' name='registrar' onSubmit={handleSubmit}> 
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Nombre (s)*' onChange={handleChange}/>
                                    </div>
                                    <div className='column2-form'>
                                        <input name='nombre' placeholder='Apillido Paterno*' className='columna-input' onChange={handleChange}/>
                                        <input name='apellidos' placeholder='Apellido Materno*' className='columna-input' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='RFC*' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <select name='Regimen fiscal' onChange={handleChange}>
                                            <option>Regimen Fiscal</option>
                                            <option>Farmacéutico</option>
                                            <option>Abarrotero</option>
                                            <option>Personal</option>
                                        </select>
                                    </div>
                                    <div className='column1-form'>
                                        <select name='CFDI' onChange={handleChange}>
                                            <option>CFDI</option>
                                            <option>Farmacéutico</option>
                                            <option>Abarrotero</option>
                                            <option>Personal</option>
                                        </select>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Correo electrónico' onChange={handleChange}/>
                                    </div>
                                    <div className='column2-form'>
                                        <input name='calle' placeholder='Calle' className='columna-input' onChange={handleChange}/>
                                        <input name='numeroExterior' placeholder='Numero Exterior' className='columna-input' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Colonia' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='municipioDelegacion' type='text' placeholder='Municipio o Delegación' onChange={handleChange}/>
                                    </div>
                                    <div className='column2-form'>
                                        <input name='estadidadFederativa' placeholder='Entidad Federativa' className='columna-input' onChange={handleChange}/>
                                        <input name='codigopostal' placeholder='Codigo Postal' className='columna-input' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <button type='submit' className='btn btn-green'>Registrarme</button>
                                    </div>
                                </form>
                                :
                                <form className='form-registro' name='registrar' onSubmit={handleSubmit}> 
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Nombre de la empresa*' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='RFC*' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <select name='Regimen fiscal' onChange={handleChange}>
                                            <option>Regimen Fiscal</option>
                                            <option>Farmacéutico</option>
                                            <option>Abarrotero</option>
                                            <option>Personal</option>
                                        </select>
                                    </div>
                                    <div className='column1-form'>
                                        <select name='CFDI' onChange={handleChange}>
                                            <option>CFDI</option>
                                            <option>Farmacéutico</option>
                                            <option>Abarrotero</option>
                                            <option>Personal</option>
                                        </select>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Correo electrónico' onChange={handleChange}/>
                                    </div>
                                    <div className='column2-form'>
                                        <input name='calle' placeholder='Calle' className='columna-input' onChange={handleChange}/>
                                        <input name='numeroExterior' placeholder='Numero Exterior' className='columna-input' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='colonia' type='text' placeholder='Colonia' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <input name='municipioDelegacion' type='text' placeholder='Municipio o Delegación' onChange={handleChange}/>
                                    </div>
                                    <div className='column2-form'>
                                        <input name='estadidadFederativa' placeholder='Entidad Federativa' className='columna-input' onChange={handleChange}/>
                                        <input name='codigopostal' placeholder='Codigo Postal' className='columna-input' onChange={handleChange}/>
                                    </div>
                                    <div className='column1-form'>
                                        <button type='submit' className='btn btn-green'>Registrarme</button>
                                    </div>
                                </form>
                            }

                            

                            
                        </DialogContentText>
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