import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetAllOrder = () => {
    const [misPedidos, setMisPedidos] = useState([]);

    useEffect(() => {

        const consultarDocumentos = () => {
            const consultarPedido = query(
                collection(db, 'orders'),
                orderBy('fecha', 'desc')
            );

            const unsuscribe = onSnapshot(
                consultarPedido,(querySnapshot) => {
                    setMisPedidos(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return misPedidos; 
}

export default useGetAllOrder;