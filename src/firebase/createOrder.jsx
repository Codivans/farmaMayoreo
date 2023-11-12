import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const createOrder = async ({ dataUser, orderSend }) => {

    // console.log(orderSend[0].punto_entrega, dataUser[0].direcciones.filter((item) => item.tipo === orderSend[0].punto_entrega))
    // let direccionCliente = dataUser[0].direcciones.filter((item) => item.tipo === orderSend[0].punto_entrega)

    await setDoc(doc(db, 'orders', `${orderSend[0].id_order}`), 
        orderSend[0].tipo_entrega === 'domicilio' ?
    {
        id_order: orderSend[0].id_order,
        estatus: 'Nuevo',
        id_estatus: 0,
        fecha: orderSend[0].fecha,
        Nombre: dataUser[0].nombre + ' ' + dataUser[0].apellidos,
        uid: dataUser[0].uidUsuario,
        importePedido: orderSend[0].importe,
        tipo_entrega: orderSend[0].tipo_entrega,
        punto_entrega: orderSend[0].punto_entrega,
        forma_pago: orderSend[0].forma_pago,
        direccion: dataUser[0].direcciones.filter((item) => item.tipo === orderSend[0].punto_entrega),
        recibe: orderSend[0].recibe,
        pedido: orderSend[0].pedido
    }
    :
    {   
        id_order: orderSend[0].id_order,
        estatus: 'Nuevo',
        id_estatus: 0,
        fecha: orderSend[0].fecha,
        Nombre: dataUser[0].nombre + ' ' + dataUser[0].apellidos,
        uid: dataUser[0].uidUsuario,
        importePedido: orderSend[0].importe,
        tipo_entrega: orderSend[0].tipo_entrega,
        punto_entrega: orderSend[0].punto_entrega,
        forma_pago: orderSend[0].forma_pago,
        pedido: orderSend[0].pedido
    } 
    ); 
}

export default createOrder;