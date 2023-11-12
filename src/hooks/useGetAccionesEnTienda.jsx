import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetAccionesEnTienda = () => {
    const [dataInfo, setDataInfo] = useState([])

    useEffect(() => {

        const consultarDocumentos = () => {

            const queryData = query(
                collection(db, 'accionesEnTiendaOnline'),
                orderBy('fecha', 'asc')
            );

            const unsuscribe = onSnapshot(
                queryData,(querySnapshot) => {
                    setDataInfo(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return dataInfo; 
}

export default useGetAccionesEnTienda;