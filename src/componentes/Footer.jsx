import React from 'react'
import { Link } from 'react-router-dom'


export const Footer = () => {
  return (
    <footer>
        <div className='wrap-footer'>
            <div className='column-footer'>
                <h4>Atención al cliente</h4>
                <ul>
                    <li><Link to='/'>Puntos de entrega</Link></li>
                    <li><Link to='/'>Bolsa de Trabajo</Link></li>
                    <li><Link to='/'>Contacto</Link></li>
                </ul>
            </div>
            <div className='column-footer'>
                <h4>Navegación</h4>
                <ul>
                    <li><Link to='/'>Medicamento</Link></li>
                    <li><Link to='/'>Perfumeria</Link></li>
                    <li><Link to='/'>Bebés</Link></li>
                    <li><Link to='/'>Equipos y Botiquin</Link></li>
                    <li><Link to='/'>Salud Sexual</Link></li>
                </ul>
            </div>
            <div className='column-footer'>
                <h4>Políticas</h4>
                <ul>
                    <li><Link to='/'>Preguntas frecuentes</Link></li>
                    <li><Link to='/'>Avisos de privacidad</Link></li>
                    <li><Link to='/'>Terminos y condiciones</Link></li>
                </ul>
            </div>
            <div className='column-footer'>
                <h4>Redes Sociales</h4>
                <ul>
                    <li><Link to='/'>Facebook</Link></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}
