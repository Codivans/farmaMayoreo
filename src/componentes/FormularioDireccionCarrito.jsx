import React, { useContext, useEffect } from 'react';
import { useAuth } from '../contextos/AuthContext';
import useGetDirecciones from '../hooks/useGetDirecciones';
import codigos from './../data/codigosPostales';

import { VscEdit } from 'react-icons/vsc'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ContextoCarrito } from '../contextos/cartContext';

export default function FormularioDireccionCarrito() {

    
    const { usuario } = useAuth();
    const direcciones = useGetDirecciones(usuario.email)
    const { dataDireccion, setDataDireccion, setRecibe, setCobertura } = useContext(ContextoCarrito);

    // console.log('Direcciones: ',direcciones[0].tipo)

    const handleChange = (event) => {
        setDataDireccion(event.target.value)
        
    };

    const handleChangeInput = (event) => {
        setRecibe(event.target.value)
    }

    useEffect(() => {
        const functionCobertura = () => {
            setCobertura(codigos.filter((item) => item.codigo === parseInt(codigoSelect)).length > 0 ? "Cobertura" : 'Sin Cobertura')
        }
        functionCobertura()
    }, [dataDireccion])
    

    const codigoSelect = dataDireccion != '' ? direcciones.filter((item) => item.tipo === dataDireccion)[0].codigoPostal : ''
    // const cobertura = codigos.filter((item) => item.codigo === parseInt(codigoSelect)).length > 0 ? "Cobertura" : 'Sin Cobertura'



  return (
    <div>
        <h3>Servicio a domicilio</h3>
        <FormControl sx={{ m: 1, minWidth:280 , textTransform: 'capitalize'}} size="small">
            <InputLabel id="demo-select-small">Seleccionar Dirección</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={dataDireccion}
                label="Seleccionar Dirección"
                onChange={handleChange}
                name='tipo'
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {
                    direcciones.map(({tipo, index}) => <MenuItem value={tipo} key={index}><span className='item-select-direccion'>{tipo}</span></MenuItem>)
                }
            </Select>
        </FormControl>
        <TextField
            label="Nombre de persona que recibe"
            id="outlined-size-small"
            size="small"
            sx={{ m: 1, minWidth:280, textTransform: 'uppercase' }}
            onChange={handleChangeInput}
        />
        <div>
            {
                direcciones.length > 0 ? (direcciones.filter((item) => item.tipo === dataDireccion).map(({calle, numeroExterior, colonia, municipioDelegacion, codigoPostal, numeroTelefonico, entidadFederativa, referencia}) => {
                    return(
                        <div className='item-direccion' key={calle}>
                            <p>Calle: <span>{calle}</span> Num Ext: <span>{numeroExterior}</span></p>
                            <p>Colonia: <span>{colonia}</span>, Municipio o Localidad: <span>{municipioDelegacion}</span></p>
                            <p>Entidad: <span>{entidadFederativa}</span> Código Postal: <span>{codigoPostal}</span></p>
                            <p>Referencias: <span>{referencia}</span></p>
                            <p>Contacto: <span>{numeroTelefonico}</span></p>
                        </div>
                    )
                })):('')
            }
            
        </div>

    </div>
  )
}
