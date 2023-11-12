import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from 'uid';

export async function uploadBanner(fileBanner) {
    const storageRef = ref(storage, `bannersTienda/${uid(16)}`)
    await uploadBytes(storageRef, fileBanner)
    const urlBanner = await getDownloadURL(storageRef)
    return urlBanner
}
