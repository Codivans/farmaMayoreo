import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import { HeaderMenu } from "../componentes/HeaderMenu";
import { MenuCuenta } from '../componentes/MenuCuenta';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import useGetUser from "../hooks/useGetUser";
import formatPhoneNumber from '../funciones/formatoNumberPhone';
import { Footer } from './../componentes/Footer';

export function PerfilUsuario(){
    const { usuario } = useAuth();
    const user = useGetUser(usuario.email);
    const dataUser = user.length > 0 ? user[0] : []

    return(
        <>
            <HeaderMenu />
            <div className='wrap-admin-cliente'>
                <main className='grid-admin'>
                    <MenuCuenta />
                    <section className="container-admin-data">
                        <h2 className='title-modulo'>Información Personal</h2>
                        <div style={{margin: '10px'}}>
                            <Grid container spacing={1} className='container-info-cuenta'>
                                <Grid xs={12}>
                                    <h4>Datos Personales</h4>
                                    <p className='label-cuenta'>Nombre:</p>
                                    <div container spacing={2} className='containes-info'>
                                        <p className='txt-cuenta'>{dataUser.nombre} {dataUser.apellidos}</p>
                                        <FiEdit style={{marginLeft: '10px'}}/>
                                    </div>

                                    <p className='label-cuenta'>Correo Electrónico:</p>
                                    <div container spacing={2} className='containes-info'>
                                        <p style={{color: '#bdbdbd'}}>{dataUser.email}</p>
                                    </div>

                                    <p className='label-cuenta'>Numero Telefonico:</p>
                                    <div container spacing={2} className='containes-info'>
                                        <p style={{color: '#bdbdbd'}}>{formatPhoneNumber(parseInt(dataUser.numero))}</p>
                                    </div>
                                    
                                </Grid>
                            </Grid>                        
                        </div>
                    </section>
                </main>

            </div>
            <Footer />
        </>
    )
}