import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';

export default function FormaDePago({handleChangePago, formaPago}) {
  return (
    <div>
        <h2>Selecciona tu forma de pago</h2>

        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={formaPago}
                onChange={handleChangePago}
                name="radio-buttons-group"
            >
              <div className='container-square'>
                <div className='square-pago'>
                  <FaMoneyBillAlt /><br />
                  <FormControlLabel value='Efectivo' control={<Radio />} label='Efectivo' name='efectivo' />
                </div>
                <div className='square-pago'>
                  <FaCreditCard /><br />
                  <FormControlLabel value='Tarjeta' control={<Radio />} label='Tarjeta' name='tarjeta' />
                </div>
                <div className='square-pago'>
                  <BiTransfer /><br />
                  <FormControlLabel value='Transferencia' control={<Radio />} label='Transferencia' name='transferencia' />
                </div>
              </div>
            </RadioGroup>
        </FormControl>
    </div>
  )
}
