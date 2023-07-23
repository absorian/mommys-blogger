import { db } from "$lib"
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    const docRef = doc(db, "posts", params.post);
    const docSnap = await getDoc(docRef);
    
    if(!docSnap.exists()) {
        console.log("No such document!");
    }
    
    return { post: docSnap.data()};
}