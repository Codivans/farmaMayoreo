import React,{ useState, useEffect } from 'react'
import { HeaderMenu } from '../componentes/HeaderMenu';
import { Footer } from './../componentes/Footer';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { MenuCuenta } from '../componentes/MenuCuenta';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { getCFDIRequest, getRegimenFiscalRequest } from '../api/apiFarmaMayoreo';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IconButton } from '@mui/material';
export function DireccionFacturas() {
    const [add, setAdd] = useState(false);
    const [tipoPersona, setTipoPersona] = useState('fisica');
    const [regimen, setRegimen] = useState([]);
    const [usoCFDI, setUsoCFDI] = useState([]);
    const [data, setData] = useState({
        nombreEmpresa:'',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rfc:'',
        regimenFiscal:'',
        cfdi:'',
        correo:'',
        calle:'',
        numeroExterior:'',
        numeroInterior: '',
        colonia: '',
        municipoDelegacion: '',
        entidadFederativa: '',
        codigoPostal: ''
    });


    const getApi = async() => {
        const responseRegimen = await getRegimenFiscalRequest();
        const responseCFDI = await getCFDIRequest();
        setRegimen(responseRegimen.data);
        setUsoCFDI(responseCFDI.data);
    }

    useEffect(() => {
      getApi()
    }, [])
    

    const handleSubmit = () => {
        
    }

    const handleChangeSelect = (event) => {
        setTipoPersona(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    };

    console.log(data)

  return (
    <>
        <HeaderMenu />
        <div className='wrap-admin-cliente'>
            <main className='grid-admin'>
                    <MenuCuenta />
                <section className='container-admin-data'>
                    <h3>Facturación</h3>
                    <div>
                        
                        
                        {
                            add === true
                            ?
                            <div>
                                <p className='addItem' onClick={() => setAdd(!add)}> - Cancelar facturación</p>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="controlled-radio-buttons-group"
                                        value={tipoPersona}
                                        onChange={handleChangeSelect}
                                    >
                                        <FormControlLabel value="fisica" control={<Radio />} label="Persona física" />
                                        <FormControlLabel value="moral" control={<Radio />} label="Persona moral" />
                                    </RadioGroup>
                                </FormControl>
                                {
                                    tipoPersona === 'fisica'
                                    ?
                                    <form className='form-registro' name='registrar' onSubmit={handleSubmit}>
                                        
                                        <p className='txt-campoobligatorio'>Campos obligatorios *</p>
                                        <div className='column1-form'>
                                            <input name='nombre' type='text' placeholder='Nombre (s)*' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='apellidoPaterno' placeholder='Apillido Paterno*' className='columna-input' onChange={handleChange}/>
                                            <input name='apellidoMaterno' placeholder='Apellido Materno*' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='rfc' type='text' placeholder='RFC*' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <select name='regimenFiscal' onChange={handleChange}>
                                                <option>Regimen Fiscal</option>
                                                {
                                                    regimen.map(({clave, regimen}) => <option key={clave}>{clave} - {regimen}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='column1-form'>
                                            <select name='cfdi' onChange={handleChange}>
                                                <option>CFDI</option>
                                                {
                                                    usoCFDI.map(({clave, cfdi}) => <option key={clave}>{clave} - {cfdi}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='correo' type='mail' placeholder='Correo electrónico' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='calle' placeholder='Calle' className='columna-input' onChange={handleChange}/>
                                            <input name='numeroExterior' placeholder='Numero Exterior' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='numeroInterior' placeholder='Numero Interior' className='columna-input' onChange={handleChange}/>
                                            <input name='colonia' type='text' placeholder='Colonia' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='municipioDelegacion' type='text' placeholder='Municipio o Delegación' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='entidadFederativa' placeholder='Entidad Federativa' className='columna-input' onChange={handleChange}/>
                                            <input name='codigoPostal' placeholder='Codigo Postal' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <button type='submit' className='btn btn-green'>Registrarme</button>
                                        </div>
                                    </form>
                                    :
                                    <form className='form-registro' name='registrar' onSubmit={handleSubmit}>
                                        <p className='addItem' onClick={() => setAdd(!add)}> - Cancelar facturación</p>
                                        <p className='txt-campoobligatorio'>Campos obligatorios *</p>
                                        <div className='column1-form'>
                                            <input name='nombreEmpresa' type='text' placeholder='Nombre de la empresa*' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='rfc' type='text' placeholder='RFC*' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <select name='regimenFiscal' onChange={handleChange}>
                                                <option>Regimen Fiscal</option>
                                                {
                                                    regimen.map(({clave, regimen}) => <option key={clave}>{clave} - {regimen}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='column1-form'>
                                            <select name='cfdi' onChange={handleChange}>
                                                <option>CFDI</option>
                                                {
                                                    usoCFDI.map(({clave, cfdi}) => <option key={clave}>{clave} - {cfdi}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='correo' type='mail' placeholder='Correo electrónico' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='calle' placeholder='Calle' className='columna-input' onChange={handleChange}/>
                                            <input name='numeroExterior' placeholder='Numero Exterior' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='numeroInterior' placeholder='Numero Interior' className='columna-input' onChange={handleChange}/>
                                            <input name='colonia' type='text' placeholder='Colonia' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <input name='municipoDelegacion' type='text' placeholder='Municipio o Delegación' onChange={handleChange}/>
                                        </div>
                                        <div className='column2-form'>
                                            <input name='entidadFederativa' placeholder='Entidad Federativa' className='columna-input' onChange={handleChange}/>
                                            <input name='codigoPostal' placeholder='Codigo Postal' className='columna-input' onChange={handleChange}/>
                                        </div>
                                        <div className='column1-form'>
                                            <button type='submit' className='btn btn-green'>Registrarme</button>
                                        </div>
                                    </form>
                                }
                            </div>
                            : 
                            <>
                                <p className='addItem' onClick={() => setAdd(!add)}> + Agregar dirección</p>
                                <div className='item-direccion'>
                                    <div>
                                        <h3>HME102343QW2</h3>
                                        <p>HLF MEDICINAS SA DE CV</p>
                                    </div>
                                    <div>
                                        <IconButton>
                                            <FiEdit />
                                        </IconButton>
                                        <IconButton>
                                            <FiTrash2 />
                                        </IconButton>
                                    </div>
                                </div>
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
