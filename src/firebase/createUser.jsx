import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const createUser = async ({uidUsuario, email, nombre, apellidos, numero, giro, empresa }) => {
    await setDoc(doc(db, "users" , uidUsuario), {
        uidUsuario: uidUsuario,
        email: email,
        nombre: nombre,
        apellidos: apellidos,
        numero: numero,
        giro: giro,
        empresa: empresa
    });
}

export default createUser;