import React,{ useState } from "react";
// Mui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader , Drawer } from '../funciones/funcionesDrawer';
import { AppBarHeader } from '../componentesAdmin/AppBarHeader';
import { Menu } from '../componentesAdmin/Menu';
import useGetAccionesEnTienda from "../hooks/useGetAccionesEnTienda";
import useGetTienda from '../hooks/useGetTienda';
import { useNavigate } from "react-router";

export function AdManager() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const dataInfo = useGetAccionesEnTienda()
  const dataTienda = useGetTienda()

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const uids = dataTienda.map(item => item.uidTienda)
  const arrayIdTiendas = [... new Set(uids)]

  const idTiendas = dataInfo.map(item => item.idTienda)
  const arrayId = [... new Set(idTiendas)]

  const arrayDataInfo = []
  arrayId.forEach((item) => {
    const addDataInfo = {
      uidTienda: item,
      visitas: dataInfo.filter((itemd) => itemd.idTienda === item && itemd.accion === 'visita'),
      carrusel:  dataInfo.filter((itemd) => itemd.idTienda === item && itemd.accion === 'carrusel'),
      tienda:  dataInfo.filter((itemd) => itemd.idTienda === item && itemd.accion === 'tienda'),
    }
    arrayDataInfo.push(addDataInfo)

  })

  const dataEnd = [];
  arrayIdTiendas.forEach((item) => {
    const buscarAcciones = arrayDataInfo.find((itemb) => itemb.uidTienda === item);
    const buscarInfoTienda = dataTienda.find((itemb) => itemb.uidTienda === item);
    const addDataEnd = {
      uidTienda: item
    }
    if(buscarInfoTienda){
      addDataEnd.nombreTienda = buscarInfoTienda.nombreTienda;
      addDataEnd.productos = buscarInfoTienda.productos
    }else{
      addDataEnd.nombreTienda = '';
      addDataEnd.productos = 0
    }
    if(buscarAcciones){
      addDataEnd.carrusel = buscarAcciones.carrusel
      addDataEnd.tienda = buscarAcciones.tienda
      addDataEnd.visitas = buscarAcciones.visitas
    }else{
      addDataEnd.carrusel = 0
      addDataEnd.tienda = 0
      addDataEnd.visitas = 0
    }



    dataEnd.push(addDataEnd)
  })

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
          <table className="table-admin">
            <thead>
              <th>Nombre Tienda</th>
              <th>Fecha Creación</th>
              <th>Total productos</th>
              <th>Clicks en carrusel</th>
              <th>Clicks en Tienda</th>
              <th>Total de visitas</th>
              <th>Data</th>
            </thead>
            <tbody>
              {
                dataEnd.map(({uidTienda, nombreTienda, productos, carrusel,tienda, visitas}) => {
                  return(
                    <tr>
                      <td>
                        <h4>{nombreTienda}</h4>
                        <span>uid: {uidTienda}</span>
                      </td>
                      <td>
                        <p>2023-08-25</p>
                      </td>
                      <td>
                        <p>{productos.length}</p> 
                        <span>Sku's</span>
                      </td>
                      <td>
                        <p>{carrusel.length}</p>
                        <span>Alcance</span>
                      </td>
                      <td>
                        <p>{tienda.length}</p>
                        <span>Alcance</span>
                      </td>
                      <td>
                        <p>{visitas.length}</p>
                        <span>Alcance</span>
                      </td>
                      <td>
                        <button className="btn-admin">Editar</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  )
}
