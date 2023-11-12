import React,{ useState } from 'react';
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
import useGetOrderCliente from '../hooks/useGetOrderCliente';
import formatoMoneda from '../funciones/formatoMoneda';

// Tabla
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.id_order}</TableCell>
        <TableCell align="center">{row.Nombre}</TableCell>
        <TableCell align="center">{row.tipo_entrega}</TableCell>
        <TableCell align="center">{row.punto_entrega}</TableCell>
        <TableCell align="center">{row.forma_pago}</TableCell>
        <TableCell align="right">{formatoMoneda(row.importePedido)}</TableCell>
        <TableCell align="center">{new Date(row.fecha * 1000).toLocaleDateString()}</TableCell>
        <TableCell align="center">{row.estatus}</TableCell>
        <TableCell align="center">:</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
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
    fecha: PropTypes.number.isRequired,
    fecha: PropTypes.number.isRequired,
    fecha: PropTypes.number.isRequired,
    fecha: PropTypes.number.isRequired,
    fecha: PropTypes.number.isRequired,
  }).isRequired,
};



// Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function MisPedidosAdmin() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pedidos = useGetAllOrder()

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
    const filtrarEstatus = pedidos.filter((data) => data.estatus === item)
    const addInArrayPedidos = {
      estatus: item,
      pedidos: filtrarEstatus
    }
    if(filtrarEstatus){
      addInArrayPedidos.id_estatus = filtrarEstatus[0].id_estatus
    }else{
      addInArrayPedidos.id_estatus = 10
    }
    arrayGetPedidos.push(addInArrayPedidos)
  })

  const ordenar = (x, y) =>{
    if(x.id_estatus < y.id_estatus) {return -1;}
    if(x.id_estatus > y.id_estatus) {return  1;}
    return 0;
  }

  return (
    <>
        <h1>Mis Pedidos</h1>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {
                arrayGetPedidos.sort(ordenar).map((data, id_estatus) => {
                  return(
                    <Tab label={data.estatus} {...a11yProps(0)} key={id_estatus}/>
                  )
                })
              }
              
            </Tabs>
          </Box>
          {
            arrayGetPedidos.map((data, id_estatus) => {
              return(
                <TabPanel value={value} index={id_estatus}>
                  <TableContainer component={Paper}>
                      <Table aria-label="collapsible table">
                          <TableHead>
                          <TableRow>
                              <TableCell />
                              <TableCell># Folio Pedido</TableCell>
                              <TableCell align="center">Cliente</TableCell>
                              <TableCell align="center">Tipo Entrega</TableCell>
                              <TableCell align="center">Punto Entrega</TableCell>
                              <TableCell align="center">Forma pago</TableCell>
                              <TableCell align="center">Importe</TableCell>
                              <TableCell align="center">Fecha</TableCell>
                              <TableCell align="center">Estatus</TableCell>
                              <TableCell align="center">Opciones</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {data.pedidos.map((row) => (
                              <Row key={row.fecha} row={row} />
                          ))}
                          </TableBody>
                      </Table>
                  </TableContainer>                     
                </TabPanel>
              )
            })
          }          
        </Box>
    </>
  )
}
