import { db } from "$lib"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import type { UserData } from '$lib';
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const docRef = doc(db, "users", params.user);
    const docSnap = await getDoc(docRef);
    
    if(!docSnap.exists()) {
        throw error(404, {
            message: 'No such user'
        });
    }
    
    const q = query(collection(db, "posts"), where("author", "==", params.user));
    const postsSnapshot = await getDocs(q);

    return { user: docSnap.data() as UserData, posts: postsSnapshot};
}