import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { uid } from 'uid';

const agregarAccionTiendasOnline = async ({idTienda, accion, valor, fecha, codigo}) => {

    await setDoc(doc(db, "accionesEnTiendaOnline" , uid(16)), 
        accion === 'visita' ?
        {
            idTienda: idTienda,
            accion: accion,
            valor: valor,
            fecha: fecha
        }:{
            idTienda: idTienda,
            accion: accion,
            valor: valor,
            fecha: fecha,
            codigo: codigo
        }

    );
}

export default agregarAccionTiendasOnline;