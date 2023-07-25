import { db } from "$lib"
import type { BlogPostData } from "$lib/BlogPost";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function load() {
    const taskPosts = async () => {
		const col = collection(db, "posts");
        const docs = await getDocs(col);
        return docs.docs.map((v) => ({ post: v.data() as BlogPostData, id: v.id }));
	};

    return { posts: taskPosts()};
}