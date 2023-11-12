import React,{ useState, useContext, useEffect } from "react";
import { useAuth } from '../contextos/AuthContext';
import { Link } from "react-router-dom";
import logo from './../assets/img/farmamayoreo.svg';
import { FaUserCircle } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ContextoCarrito } from '../contextos/cartContext';
import { Carrito } from "./Carrito";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { auth } from './../firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import { SiMicrosoftexcel } from 'react-icons/si'
import { VscChevronDown } from 'react-icons/vsc'
import { PlecaAnuncios } from "./PlecaAnuncios";
import formatoMoneda from "../funciones/formatoMoneda";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export function HeaderMenu(){
  const { usuario } = useAuth();
  const navigate = useNavigate()
  const { countCart, importeCart } = useContext(ContextoCarrito);
  const [state, setState] = React.useState({right: false,});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dataChange, setDataChange] = useState('')
  const open = Boolean(anchorEl);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const imagenDefault = (e) =>{
    e.target.src =  'https://farmaprontoneza.com/image/predeterminada.jpg' 
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeInput = (e) => {
    setDataChange(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      navigate('/resultado/' + dataChange)
     }
  }

  const logout = async () => {
    navigate('/')
    await signOut(auth);
  }





  return(
      <>
      
        <header className="sticky-header">
          <PlecaAnuncios />
          <div className='container-header'>
            <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
            <div className="contenedor-input">
              <input className="search" type="text" placeholder='¿Que estas buscando?...' onKeyDown={handleKeyDown} onChange={handleChangeInput} />
              <div className="wrap-result-search">                
              </div>
            </div>
            
            <div className='container-medios'>
              <div>
                <IconButton color="success" onClick={()=> navigate('/cargar-pedido')}>
                  <SiMicrosoftexcel />
                </IconButton>
                <span className="chegerFile">Cargar pedido</span>
              </div>
              <div>
                <IconButton id="basic-button"
                  color="primary"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                    <FaUserCircle />
                    <VscChevronDown className="arrow-small"/>
                    
                </IconButton>
                <span className="displayName">{usuario ? `Hola, ${usuario.displayName}` : ''}</span>
                  {
                    usuario
                    ?
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{'aria-labelledby': 'basic-button',}}
                      ><MenuItem onClick={()=> navigate('/cuenta')}>Mi cuenta</MenuItem>
                      <MenuItem onClick={()=> navigate('/mis-pedidos')}>Mis pedidos</MenuItem>
                      <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                      
                    </Menu>
                    :
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{'aria-labelledby': 'basic-button',}}
                      >
                      <MenuItem onClick={()=> navigate('/sesion')}>Iniciar Sesión</MenuItem>
                    </Menu>
                  }
              </div>

              <IconButton aria-label="cart" onClick={toggleDrawer('right', true)}>
                <StyledBadge badgeContent={countCart} color="success">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <span className="importe-cart">{importeCart > 0 ? formatoMoneda(importeCart) : ''}</span>

            </div>
              <Carrito state={state} toggleDrawer={toggleDrawer}/>
          </div>
          <nav className="menu">
            <ul>
              <li><Link to='/familia/medicamento'>Medicamento</Link></li>
              <li><Link to='/familia/perfumeria'>Perfumeria</Link></li>
              <li><Link to='/familia/bebes'>Bebés</Link></li>
              <li><Link to='/familia/equipos y botiquin'>Equipos y Botiquin</Link></li>
              <li><Link to='/familia/sueros orales'>Sueros Orales</Link></li>
              <li><Link to='/familia/salud sexual'>Salud Sexual</Link></li>
            </ul>
          </nav>
        </header>

      </>
  )
}

