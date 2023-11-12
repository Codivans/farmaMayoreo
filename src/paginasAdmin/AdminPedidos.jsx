import React,{ useState } from 'react';
// Mui
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader , Drawer } from '../funciones/funcionesDrawer';
import { AppBarHeader } from '../componentesAdmin/AppBarHeader';
import { Menu } from '../componentesAdmin/Menu';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useGetAllOrder from '../hooks/useGetAllOrder';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TbPrinter } from 'react-icons/tb'
import useGetOrderCliente from '../hooks/useGetOrderCliente';
import formatoMoneda from '../funciones/formatoMoneda';
import updateEstatusPedido from '../firebase/updateEstatusPedido';
import { VscSearch, VscKebabVertical } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';

import dayjs from 'dayjs';
import { format, addDays, subDays  } from 'date-fns';
import { getUnixTime, startOfDay, endOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Tabla
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleChangeStatus = async(event) => {
    const id_estatus = parseInt(event.target.dataset.idestatus)
    const estatus = event.target.dataset.estatus
    const id_orden = event.target.dataset.idorder
    await updateEstatusPedido({estatus:estatus,id_estatus:id_estatus, id_orden})    

  }

  const listStatus = [
    {estatus: 'Surtiendo', value: 1},
    {estatus: 'Ruta', value: 2},
    {estatus: 'Completo', value: 3},
    {estatus: 'Cancelado', value: 4}
  ]

  const printOrder = async (event) => {
    const id_orden = event.target.dataset.idorder
    var divToPrint=document.getElementById("imprimirOrden");
    let newWin= window.open('', 'PRINT', 'height=800,width=1200');
    newWin.document.write(`
        <style>
          table{
            font-family: sans-serif;
          }
          table > tbody{
            border: 1px solid black;
          }
          table > tbody > tr > td:nth-child(2){
            text-align: center;
          }
        </style>
    `);

    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
    if(row.id_estatus === 0){
      await updateEstatusPedido({estatus:'Surtiendo',id_estatus:1, id_orden})
    }
    
  }



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        <TableCell component="th" scope="row">{row.id_order}</TableCell>
        <TableCell align="left"><span className='txt-capitalize'>{row.Nombre}</span></TableCell>
        <TableCell align="left"><span className='txt-capitalize'>{row.tipo_entrega}</span></TableCell>
        <TableCell align="left"><span className='txt-capitalize'>{row.punto_entrega}</span></TableCell>
        <TableCell align="left"><span className='txt-capitalize'>{row.forma_pago}</span></TableCell>
        <TableCell align="right">{formatoMoneda(row.importePedido)}</TableCell>
        <TableCell align="right">{new Date(row.fecha * 1000).toLocaleDateString()}</TableCell>
        <TableCell align="left"><span className={`items-status item-${row.estatus}`}>{row.estatus}</span></TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" className='container-menu-status'>
          {
            openMenu &&
            <section className='list-status'>
              {
                row.id_estatus >= 3 ? (''):(
                  listStatus.filter((item) => item.value === row.id_estatus+1).map(({estatus, value}) => {
                    return(
                      <button data-estatus={estatus} data-idestatus={value} data-idorder={row.id_order}  onClick={handleChangeStatus}>{estatus}</button>
                    )
                  })
                )
              }
              {
                row.id_estatus === 4 || row.id_estatus === 3 ? (''):(<button data-estatus='Cancelado' data-idestatus='4' data-idorder={row.id_order} onClick={handleChangeStatus}>Cancelar</button>)
              }
            </section>
          }
          <VscKebabVertical className='icon-menu-status' onClick={handleMenu}/>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <button onClick={printOrder} data-idorder={row.id_order} ><TbPrinter /> Imprimir</button>
              </Typography>
              <Table size="small" aria-label="purchases" id='imprimirOrden'>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Codigo</TableCell>
                    <TableCell align="center">Pedido</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">importe</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.pedido.map((order) => (
                    <TableRow key={order.codigo}>
                      <TableCell align="center" style={{fontSize: '12px'}}>{order.codigo}</TableCell>
                      <TableCell align="center" style={{fontSize: '12px'}}>{order.pedido}</TableCell>
                      <TableCell align="left" style={{fontSize: '12px'}}>{order.nombre}</TableCell>
                      <TableCell align="right" style={{fontSize: '12px'}}>{formatoMoneda(order.precio)}</TableCell>
                      <TableCell align="right" style={{fontSize: '12px'}}>{formatoMoneda(order.importe)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    nombre: PropTypes.number.isRequired,
    importe: PropTypes.number.isRequired,
    fecha: PropTypes.number.isRequired
  }).isRequired,
};

export function AdminPedidos() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = useState(0);
  const [filtrar, setFiltrar] = useState(false);
  const [clickFiltrar, setClickFiltrar] = useState(false);
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(subDays(new Date(), 1));
  const fechaInicio = getUnixTime(startOfDay(addDays(startDate, 1), 'dd/MM/yyyy'));
  const fechaFinal = getUnixTime(endOfDay(addDays(endDate, 1), 'dd/MM/yyyy'));

  const pedidos = useGetAllOrder({fechaInicio, fechaFinal, step});

   
  const handleStartDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setStartDate(selectedDate);
    setClickFiltrar(true)
  };

  const handleEndDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setEndDate(selectedDate);
    setClickFiltrar(true)
  };



  let arrayPedidos = []
  const recorrerPedidos = pedidos.map(({estatus, pedido, id_order, Nombre, punto_entrega, tipo_entrega}) => {
    return(
        pedido.map(({codigo, pedido, nombre, precio, importe}) => {
            return(
                arrayPedidos.push({codigo, pedido, nombre, precio, estatus, importe, orden: id_order, cliente: Nombre, tipo_entrega, punto_entrega})
            )
        })
    )
  })

  const getEstatus = arrayPedidos.map((item) => item.estatus)
  const arrayEstatus = [... new Set(getEstatus)]

  let arrayGetPedidos = [];

  arrayEstatus.forEach((item) => {
    const filtrarAtributos = pedidos.filter((data) => data.estatus === item && data.fecha >= fechaInicio && data.fecha <= fechaFinal)
    const filtrarEstatus = pedidos.filter((data) => data.estatus === item)
    const addInArrayPedidos = {
      estatus: item,
      pedidos: filtrar ? filtrarAtributos : filtrarEstatus
    }
    if(filtrarEstatus){
      addInArrayPedidos.id_estatus = filtrarEstatus[0].id_estatus
    }else{
      addInArrayPedidos.id_estatus = 10
    }
    arrayGetPedidos.push(addInArrayPedidos)
  })

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const itemsCount = (number) => {
    return filtrar ? pedidos.filter((item) => item.id_estatus === number && item.fecha >= fechaInicio && item.fecha <= fechaFinal).length 
    : pedidos.filter((item) => item.id_estatus === number).length
  }

  const handleClean = () => {
    setFiltrar(false);
    setClickFiltrar(false);
    setStartDate(subDays(new Date(), 1))
    setEndDate(subDays(new Date(), 1))
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarHeader open={open} setOpen={setOpen}/>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Menu open={open} setOpen={setOpen}/>
      </Drawer>
      <Box component="main">
        <div className="container-admin">
            <Box sx={{ width: '100%' }}>
              <div className='cabecera-tabs'>
                <button className={`btn-tab ${step === 0 ? 'active-tab' : ''}`} onClick={() => setStep(0)}>Nuevos <span className='tab-nuevo'>{itemsCount(0)}</span></button>
                <button className={`btn-tab ${step === 1 ? 'active-tab' : ''}`} onClick={() => setStep(1)}>Surtiendo <span className='tab-surtiendo'>{itemsCount(1)}</span></button>
                <button className={`btn-tab ${step === 2 ? 'active-tab' : ''}`} onClick={() => setStep(2)}>En ruta <span className='tab-ruta'>{itemsCount(2)}</span></button>
                <button className={`btn-tab ${step === 3 ? 'active-tab' : ''}`} onClick={() => setStep(3)}>Completado <span className='tab-completo'>{itemsCount(3)}</span></button>
                <button className={`btn-tab ${step === 4 ? 'active-tab' : ''}`} onClick={() => setStep(4)}>Cancelados <span className='tab-cancelado'>{itemsCount(4)}</span></button>
                <button className={`btn-tab ${step === 10 ? 'active-tab' : ''}`} onClick={() => setStep(10)}><b>Todos</b> <span className='tab-todos'>{filtrar ? pedidos.filter((item) => item.fecha >= fechaInicio && item.fecha <= fechaFinal).length : pedidos.length}</span></button>
              </div>
              
              <div className='container-inputs-date'>
                <div className='input-range-date'>
                  <label>{startDate ? <span className='date-txt'>{format(addDays(startDate, 1), 'dd/MM/yyyy')}</span> : 'Fecha de inicio:'}</label>
                  {/* <label><span className='date-txt'>{format(startDate, 'dd/MM/yyyy')}</span></label> */}
                  <input
                    type="date"
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className='input-range-date'>
                  <label htmlFor='endDate'>{endDate ? <span className='date-txt'>{format(addDays(endDate, 1), 'dd/MM/yyyy')}</span> : 'Fecha de final:'}</label>
                  {/* <label htmlFor='endDate'><span className='date-txt'>{format(endDate, 'dd/MM/yyyy')}</span></label> */}
                  <input
                    id='endDate'
                    type="date"
                    onChange={handleEndDateChange}
                  />
                </div>
                <div className='input-search-pedidos'>
                  <VscSearch />
                  <input type='text' placeholder='Buscar'/>
                </div>
                {
                  clickFiltrar ? <button className='btn-filtrar' onClick={() => setFiltrar(!filtrar)}>Filtrar</button> : ''
                }

                {
                  clickFiltrar && filtrar &&(<button className='clear-inputs' onClick={handleClean}>Limpiar <MdDelete /></button>)
                }
                
              </div>

              <div className='container-tab-orden'>
                <Table aria-label="collapsible table">
                  <TableHead>
                  <TableRow>
                      <TableCell># Folio Pedido</TableCell>
                      <TableCell align="center">Cliente</TableCell>
                      <TableCell align="center">Tipo Entrega</TableCell>
                      <TableCell align="center">Punto Entrega</TableCell>
                      <TableCell align="center">Forma pago</TableCell>
                      <TableCell align="center">Importe</TableCell>
                      <TableCell align="center">Fecha</TableCell>
                      <TableCell align="center">Estatus</TableCell>
                      <TableCell />
                      <TableCell align="center">Opciones</TableCell>
                  </TableRow>
                  </TableHead>
                  
                  {
                    step != 10?(
                    arrayGetPedidos.filter((item) => item.id_estatus === step).map((data) => {
                      return(
                        <TableBody>
                          {data.pedidos.map((row) => (
                              <Row key={row.fecha} row={row} />
                          ))}
                        </TableBody>
                      )
                    })):(arrayGetPedidos.map((data) => {
                        return(
                          <TableBody>
                            {data.pedidos.map((row) => (
                                <Row key={row.fecha} row={row} />
                            ))}
                          </TableBody>
                        )
                      }))
                  }
                  </Table>
              </div>
            </Box>
        </div>
      </Box>
    </Box>
  )
}


