import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from 'uid';

export async function uploadLogotipo(file) {
    const storageRef = ref(storage, `logotiposLaboratorios/${uid(16)}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}
