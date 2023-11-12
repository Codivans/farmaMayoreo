import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

const agregarListaDeLogotipos = async ({nameShop, urlLogotipo}) => {

    const uidTienda = uid(16)

    await setDoc(doc(db, 'logotiposLaboratorios', uidTienda),{
        nombre: nameShop,
        url: urlLogotipo
    })

}
export default agregarListaDeLogotipos