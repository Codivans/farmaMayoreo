import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetTienda = () => {
    const [dataTienda, setDataTienda] = useState([]);

    useEffect(() => {

        const consultarDocumentos = () => {

            const consultarPedido = query(
                collection(db, 'tiendasOnline')
            );

            const unsuscribe = onSnapshot(
                consultarPedido,(querySnapshot) => {
                    setDataTienda(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return dataTienda; 
}

export default useGetTienda;