import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from 'uid';

export async function uploadBannerImg(file) {
    const storageRef = ref(storage, `bannersLaboratoriosImg/${uid(16)}`)
    await uploadBytes(storageRef, file)
    const urlBannerImg = await getDownloadURL(storageRef)
    return urlBannerImg
}
