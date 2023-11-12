import { db } from './firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const actualizarDireccion = async ({ uid, data }) => {


  const layOutData = {
    tipo: data.nombreDireccion,
    calle: data.calle,
    numeroExterior: data.numeroExterior,
    colonia: data.colonia,
    municipioDelegacion: data.municipioDelegacion,
    entidadFederativa: data.entidadFederativa,
    codigoPostal: data.codigoPostal,
    numeroTelefonico: data.numeroTelefonico,
    referencia: data.referencia
  };

  await updateDoc(doc(db, 'users', uid),{
    direcciones: arrayUnion(layOutData)
    // direcciones: arrayUnion({[data.nombreDireccion]: layOutData})
  }

  );
};

export default actualizarDireccion;