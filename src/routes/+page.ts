import { db } from "$lib"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function load() {
    const col = collection(db, "posts");
    const docs = await getDocs(col);
    
    return { posts: docs.docs };
}