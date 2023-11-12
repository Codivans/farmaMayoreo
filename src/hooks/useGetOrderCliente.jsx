import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contextos/AuthContext';


const useGetOrderCliente = () => {
    const { usuario } = useAuth();
    const [misPedidos, setMisPedidos] = useState([]);

    useEffect(() => {
        const user = usuario.uid;
        const consultarDocumentos = () => {

            const consultarPedido = query(
                collection(db, 'orders'),
                where('uid', '==', user),
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
    }, [usuario])

    return misPedidos; 
}

export default useGetOrderCliente;