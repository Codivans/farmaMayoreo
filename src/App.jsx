import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./contextos/cartContext";
import { Busqueda, Familias, FormulariosSesion, Home, PerfilUsuario, FinalizarPedido, TiendaOficial, MiCuentaCliente, DireccionEnvio, DireccionFacturas, PrintOrder, MisPedidosCliente, MisPedidosAdmin, CargarPedido, Laboratorios, AdminLaboratorios } from './paginas/index';
import toast, { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./contextos/AuthContext";
import { ProtectedRouute } from "./componentes/ProtectedRoute";
import { CrearTienda, AdManager, AdminPedidos, CodigosPostales }  from "./paginasAdmin/indexAdmin";
import 'animate.css';


function App() {
  
  return (
    <>
    <Toaster   position="bottom-right" reverseOrder={false}/>
    <AuthProvider>
      <CarritoProvider>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sesion/' element={<FormulariosSesion />}/>
          <Route element={<ProtectedRouute />}>
            <Route path='/familia/:familia' element={<Familias />}/>
            <Route path='/resultado/:buscar' element={<Busqueda />}/>
            <Route path='/order/:idorder' element={<PrintOrder />}/>
            <Route path="/mis-pedidos" element={<MisPedidosCliente />}/>
            <Route path="/cargar-pedido" element={<CargarPedido />} />
            <Route path="/laboratorios" element={<Laboratorios />} />
          </Route>
          
          {/* Admin */}
          <Route path="/mis-pedidos-admin" element={<MisPedidosAdmin />}/>
          <Route path='/laboratorios-front' element={<AdminLaboratorios />} />
          <Route path='/admanager' element={<AdManager />} />
          <Route path='/crear-tienda' element={<CrearTienda />} />
          <Route path='/admin-pedidos' element={<AdminPedidos />} />
          <Route path='/codigos' element={<CodigosPostales />} />

          <Route path='/perfil' element={<PerfilUsuario />}/>
          <Route path='/finalizar' element={<FinalizarPedido />}/>
          <Route path='/tienda-oficial/:uidtienda' element={<TiendaOficial />} />
          <Route path='/cuenta' element={<MiCuentaCliente />} />
          <Route path='/cuenta/direccion' element={<DireccionEnvio />} />
          <Route path='/cuenta/factura' element={<DireccionFacturas />} />
        </Routes>
      </CarritoProvider>
    </AuthProvider>

    </>
  )
}

export default App
