import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const editarTienda = async (dataEdit) => {

    console.log(dataEdit)

    const uidTienda = dataEdit.uidTienda

    await updateDoc(doc(db, 'tiendasOnline', uidTienda),{
        uidTienda: dataEdit.uidTienda,
        nombreTienda: dataEdit.nombreTienda,
        logotipo: dataEdit.logotipo,
        banner: dataEdit.banner,
        productos: dataEdit.productos,
        formatoBanner: dataEdit.formatoBanner
    })

}
export default editarTienda