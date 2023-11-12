import React, { useContext } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { VscMap } from 'react-icons/vsc'

import FormularioDireccionCarrito from './FormularioDireccionCarrito';
import { ContextoCarrito } from '../contextos/cartContext';

export default function TipoDeEntrega({setOpen, setMapa, dataDireccion, setDataDireccion}) {

    const { tipoEntrega, handleChangeTipoEntrega, handleChangePickUp, pickUp } = useContext(ContextoCarrito);

    // const handleChangeToggle = (event, newTipoEntrega) => {
    //     setTipoEntrega(newTipoEntrega);
    // };

    const handleClickOpen = (e) => {
        setMapa(e.target.dataset.mapa)
        setOpen(true);
      };

    const puntosDeEntrega = [
        {nombre: 'Punto de venta', direccion: 'Río Churubusco s/n central de abastos pasillo E-F local 30B, Central de Abasto, Iztapalapa, 09040 CDMX', horario: '8:00 am - 17:30 pm', mapa:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60221.378580917866!2d-99.16423337832035!3d19.376245600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fdd07624ea5b%3A0xf79e79d8f0e79305!2sFarma%20mayoreo!5e0!3m2!1ses!2smx!4v1684380416848!5m2!1ses!2smx'},
        {nombre: 'Tamemes', direccion: 'Tamemes #34, CDMX', horario: '10:00 am - 16:00 pm', mapa: 'https://www.google.com/maps/embed?pb=!4v1684382298766!6m8!1m7!1s9rQqyb5J0DUhVcGzmbO3ug!2m2!1d19.38175938164234!2d-99.08694712592039!3f14.876712051694263!4f3.853232715434018!5f0.4000000000000002'}

    ]

  return (
    <>
        <div className="step-2">
            <div className="container-toggle">
                <ToggleButtonGroup
                    color="primary"
                    value={tipoEntrega}
                    exclusive
                    onChange={handleChangeTipoEntrega}
                    aria-label="Platform"
                    className="toogleButton"
                    >
                    <ToggleButton value="pickup" size="small">Pick Up</ToggleButton>
                    <ToggleButton value="domicilio" size="small">Domicilio</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <h2>Selecciona tu punto de entrega</h2>

                {
                    tipoEntrega === 'pickup'
                    ?
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={pickUp}
                            name="radio-buttons-group"
                            onChange={handleChangePickUp}
                        >
                            {
                                puntosDeEntrega.map(({nombre, direccion, horario, mapa}) =>{
                                    return(
                                        <div className="radiobutton-div" htmlFor={nombre} key={nombre} name={nombre}>
                                            <FormControlLabel value={nombre} control={<Radio />} label={nombre} name={nombre}/>  
                                            <p>{direccion} Horario: {horario}</p>  
                                            <p className="link" data-mapa={mapa} onClick={handleClickOpen}><VscMap /> Ver dirección</p>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                    :
                    <FormularioDireccionCarrito 
                        dataDireccion={dataDireccion}
                        setDataDireccion={setDataDireccion}
                        // setRecibe={setRecibe}
                    />
                }
            </div>
        </div>
    </>
  )
}
