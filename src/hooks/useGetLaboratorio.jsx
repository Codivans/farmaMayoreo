import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetLaboratorio = (id) => {
    const [data, setData] = useState([]);
    useEffect(() => {

        const consultarDocumentos = () => {

            const consultarPedido = query(
                collection(db, 'brandLaboratorios'),
                where('id', '==', id),
                orderBy('lugar', 'asc')
            );

            const unsuscribe = onSnapshot(
                consultarPedido,(querySnapshot) => {
                    setData(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [id])

    return data; 
}

export default useGetLaboratorio;