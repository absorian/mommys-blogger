import { db } from "$lib";
import { doc, updateDoc } from "firebase/firestore";

export const actions = {
	async edit({ request }) {
        const container = await request.formData();

		const user = JSON.parse(container.get('user') as string);
		const uid = container.get('uid') as string;
        
		await updateDoc(doc(db, 'users', uid), user);
	}
};