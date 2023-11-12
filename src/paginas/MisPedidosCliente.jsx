import React from 'react'
import { HeaderMenu } from '../componentes/HeaderMenu';
import { MenuCuenta } from '../componentes/MenuCuenta';
import { Footer } from '../componentes/Footer';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useGetOrderCliente from '../hooks/useGetOrderCliente';
import formatoMoneda from '../funciones/formatoMoneda';

  
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
          <TableCell component="th" scope="row">#{row.id_order}</TableCell>
          <TableCell align="center">{new Date(row.fecha * 1000).toLocaleDateString()}</TableCell>
          <TableCell align="center">{row.tipo_entrega}</TableCell>
          <TableCell align="center">{row.punto_entrega}</TableCell>
          <TableCell align="right">{formatoMoneda(row.importePedido)}</TableCell>
          <TableCell align="center"><span className={`items-status item-${row.estatus}`}>{row.estatus}</span></TableCell>
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
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  

export function MisPedidosCliente() {
    const pedidos = useGetOrderCliente()
    console.log(pedidos);
  return (
    <>
        <HeaderMenu />
        <div className='wrap-admin-cliente'>
            <main className="grid-admin">
                <MenuCuenta />
                <section className="container-admin-data">
                   <h2 className='title-modulo'>Mi Historial de Pedidos</h2>
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell># Folio Pedido</TableCell>
                                    <TableCell align="center">Cliente</TableCell>
                                    <TableCell align="center">Tipo Entrega</TableCell>
                                    <TableCell align="center">Punto Entrega</TableCell>
                                    <TableCell align="center">Importe</TableCell>
                                    <TableCell align="center">Estatus</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {pedidos.map((row) => (
                                    <Row key={row.fecha} row={row} />
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>           
                </section>

            </main>
        </div>
        <Footer />
    </>
  )
}
