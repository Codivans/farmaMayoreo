import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const useGetDirecciones = (email) => {
    const [user, setUser] = useState([]);

    const adress = user.map(data => data.direcciones)[0] ? user.map(data => data.direcciones)[0] : []
   
    useEffect(() => {
         const consultarDocumentos = () => {
             const consultarUser = query(
                 collection(db, 'users'),
                 where('email', '==', email)
             );

            const unsuscribe = onSnapshot(
                consultarUser,
                (querySnapshot) => {
                    setUser(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [email])
    return adress;    
}

export default useGetDirecciones;