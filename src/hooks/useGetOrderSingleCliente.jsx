import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contextos/AuthContext';


const useGetOrderSingleCliente = (order) => {
    const { usuario } = useAuth();
    const [misPedidos, setMisPedidos] = useState([]);

    console.log(order)

    useEffect(() => {
        const user = usuario.uid;
        const orden = parseInt(order)
        const consultarDocumentos = () => {
            const consultarPedido = query(
                collection(db, 'orders'),
                where('uid', '==', user),
                where('id_order', '==', orden)
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
    }, [usuario])

    return misPedidos; 
}

export default useGetOrderSingleCliente;