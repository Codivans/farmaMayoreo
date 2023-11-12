import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

const agregarLaboratorio = async ({data, url, idLaboratorio, urlBannerImagen, productos, urlImgLogotipo, urlBannerImg}) => {
    console.log(data, url, idLaboratorio, urlBannerImg, productos)

    const datos = await productos.map(item => item.codigo);
    const products = [... new Set(datos)]
    const uidLaboratorio = idLaboratorio === null ? uid(16) : idLaboratorio

    await setDoc(doc(db, 'brandLaboratorios', uidLaboratorio),{
        id: uidLaboratorio,
        Laboratorio: data.laboratorio,
        DisplayName: data.displayName,
        lugar: parseInt(data.lugar),
        showBanner: data.showBanner,
        logotipo: idLaboratorio === null ? url : urlImgLogotipo,
        bannerImg: idLaboratorio === null ? urlBannerImg : urlBannerImg ,
        productos: products
    })

}
export default agregarLaboratorio