import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const updateEstatusPedido = async ({estatus, id_estatus, id_orden}) => {

    console.log(estatus, id_orden, id_estatus)

    await updateDoc(doc(db, 'orders', id_orden),{
        id_estatus: id_estatus,
        estatus: estatus
    })

}
export default updateEstatusPedido