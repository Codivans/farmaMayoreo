import React from 'react';
import { Link } from "react-router-dom";
import { VscHome, VscTable,  VscGlobe, VscPreview, VscEmptyWindow, VscLayersActive } from 'react-icons/vsc'
import Divider from '@mui/material/Divider';

export function Menu({open}){
  return(
      <ul className="drawer-vertical" syle={{position: 'relative'}}>
        <li><Link to='/crear-tienda' style={{display: open === true ? 'flex' : 'block' }}><VscEmptyWindow /> <span style={{ opacity: open === true ? 1 : 0 }}>Existencias Globales</span></Link></li>
        <li><Link to='/admanager' style={{display: open === true ? 'flex' : 'block' }}><VscTable/> <span style={{ opacity: open === true ? 1 : 0 }}> Campañas</span></Link></li>    
        <li><Link to='/admin-pedidos' style={{display: open === true ? 'flex' : 'block' }}><VscLayersActive /> <span style={{ opacity: open === true ? 1 : 0 }}>Admin Pedidos</span></Link></li>
      </ul>
  )
}