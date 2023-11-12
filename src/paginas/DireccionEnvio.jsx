import React,{ useState } from 'react'
import { HeaderMenu } from '../componentes/HeaderMenu';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { MenuCuenta } from '../componentes/MenuCuenta';
import actualizarDireccion from './../firebase/agregarDireccion';
import { useAuth } from '../contextos/AuthContext';
import useGetDirecciones from '../hooks/useGetDirecciones';
import { IconButton } from '@mui/material';
import imgServicioADomicilio from './../assets/img/servicio-a-domicilio.png';
import Swal from 'sweetalert2'
import { Footer } from './../componentes/Footer';

import { db } from './../firebase/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';



export function DireccionEnvio() {
    const { usuario } = useAuth();
    const [add, setAdd] = useState(false);
    const [data, setData] = useState({
        nombreDireccion: '',
        calle: '',
        numeroExterior: '',
        colonia: '',
        municipioDelegacion: '',
        entidadFederativa: '',
        codigoPostal: '',
        numeroTelefonico: '',
        referencia: ''
    })


    const direcciones = useGetDirecciones(usuario.email)   
    const handleSubmit = async(e) => {
        e.preventDefault();
        await actualizarDireccion({uid: usuario.uid, data}).then(() => {
            console.log('Actualizado')
           setAdd(false)
          }).catch((error) => {
            // An error occurred
          })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    };


    const uidUser = usuario.uid
    const eliminarDireccion = async(index) => {
        const nuevasDirecciones = [...direcciones];
        nuevasDirecciones.splice(index, 1);
        await updateDoc(doc(db, 'users', uidUser),{
            direcciones: nuevasDirecciones
            }
        );
    }

  return (
    <>
        <HeaderMenu />
        <div className='wrap-admin-cliente'>
            <main className='grid-admin'>
                <MenuCuenta />
                <section className='container-admin-data'>
                    <h3>Direcciones de envío</h3>
                    <div style={{marginLeft: '20px'}}>
                        {
                            add === true
                            ?
                            <form className='form-registro' name='registrar' onSubmit={handleSubmit}>
                                <p className='addItem' onClick={() => setAdd(!add)}> - Cancelar dirección</p>
                                <p className='txt-campoobligatorio'>Campos obligatorios *</p>
                                <div className='column1-form'>
                                    <input name='nombreDireccion' type='text' placeholder='Nombre de la dirección, ejm. casa, local, bodega, etc.' onChange={handleChange}/>
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
                                    <input name='entidadFederativa' placeholder='Entidad Federativa' className='columna-input' onChange={handleChange}/>
                                    <input name='codigoPostal' placeholder='Codigo Postal' className='columna-input' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <input name='numeroTelefonico' type='tel' placeholder='Numero de teléfono para contacto' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <input name='referencia' type='text' placeholder='Referencia' onChange={handleChange}/>
                                </div>
                                <div className='column1-form'>
                                    <button type='submit' className='btn btn-green'>Guardar dirección</button>
                                </div>
                            </form>
                            : 
                            <>
                                <p className='addItem' onClick={() => setAdd(!add)}> + Agregar dirección</p>
                            
                                {
                                    direcciones.length > 0
                                    ?
                                    direcciones.map((data, index) => {
                                        return(
                                            <div className='item-direccion' key={index} >
                                                <div>
                                                    <h3>{data.tipo}</h3>
                                                    <p className='txt-direccion'>Calle: {data.calle} Num. Exterior: {data.numeroExterior}, Colonia: {data.colonia}, Municipio o Delegación: {data.municipioDelegacion}</p>
                                                </div>
                                                <div>
                                                    <IconButton>
                                                        <FiEdit />
                                                    </IconButton>
                                                    <IconButton onClick={() => eliminarDireccion(index)}>
                                                        <FiTrash2 />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :(<div className='container-img-width'>
                                        <img src={imgServicioADomicilio}/>
                                    </div>)
                                } 
                            </>
                        }
                        
                    </div>
                </section>
            </main>
        </div>
        <Footer />
    </>
  )
}
