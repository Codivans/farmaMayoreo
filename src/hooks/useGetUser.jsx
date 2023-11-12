import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const useGetUser = (email) => {
    const [user, setUser] = useState([]);
   
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
    return user;    
}

export default useGetUser;