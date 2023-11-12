import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

const agregarTienda = async ({dataSend, urlBanner, urlLogotipo}) => {

    const uidTienda = uid(16)

    await setDoc(doc(db, 'tiendasOnline', uidTienda),{
        uidTienda: uidTienda,
        nombreTienda: dataSend.nombreTienda,
        logotipo: urlLogotipo === '' ? urlLogotipo : dataSend.logotipo,
        banner: urlBanner,
        // posicion: dataSend.posicion,
        productos: dataSend.productos,
        formatoBanner: dataSend.formatoBanner
    })

}
export default agregarTienda