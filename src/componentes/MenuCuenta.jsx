import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../contextos/AuthContext';
import { VscOutput } from 'react-icons/vsc';
import { FiFileText, FiHome, FiUser } from 'react-icons/fi'

export function MenuCuenta() {
  const { usuario } = useAuth();
  const user = usuario.displayName
  return (
    <aside className='menu-admin'>
        <div>
            <h2 className='name-cuenta'>Hola, {user}</h2>
        </div>
        <ul className="lista-menu">
            <li><Link to='/mis-pedidos'><VscOutput /> Pedidos</Link></li>
        </ul>
        <h4>Administra cuenta</h4>
        <ul className="lista-menu">
            <li><Link to='/perfil'><FiUser /> Información personal</Link></li>
            <li><Link to='/cuenta/direccion' name='direccion'><FiHome /> Direcciones</Link></li>
            <li><Link to='/cuenta/factura' name='facturacion'><FiFileText /> Facturación</Link></li>
        </ul>
    </aside>
  )
}
