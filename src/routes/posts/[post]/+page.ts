import { db, type UserData } from "$lib"
import type { BlogPostData } from "$lib/BlogPost/index.js";
import { error } from "@sveltejs/kit";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    const docRef = doc(db, "posts", params.post);
    const docSnap = await getDoc(docRef);
    
    if(!docSnap.exists()) {
        throw error(404, {
            message: 'No such post'
        });
    }
    let res = { post: docSnap.data() as BlogPostData, nick: ""}

    const userRef = doc(db, "users", res.post.author);
    const userSnap = await getDoc(userRef);
    res.nick = (userSnap.data() as UserData).nickname;
    
    return res;
}