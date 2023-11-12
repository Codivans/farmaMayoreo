import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const useVerifyUser = (numero) => {
    const [user, setUser] = useState([]);
   
    useEffect(() => {
         const consultarDocumentos = () => {
             const consultarUser = query(
                 collection(db, 'users'),
                 where('numero', '==', numero)
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
    }, [numero])
    return user;    
}

export default useVerifyUser;