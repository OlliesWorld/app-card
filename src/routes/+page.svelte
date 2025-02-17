<script>
// @ts-nocheck
import { account } from '$lib/appwrite';
import { goto } from '$app/navigation';
import ProjectCard from '../components/Card.svelte';
    /**
 * @type {{ name: any; $id?: string; $createdAt?: string; $updatedAt?: string; password?: string | undefined; hash?: string | undefined; hashOptions?: object | undefined; registration?: string; status?: boolean; labels?: string[]; passwordUpdate?: string; email?: string; phone?: string; emailVerification?: boolean; phoneVerification?: boolean; mfa?: boolean; prefs?: import("appwrite").Models.Preferences; targets?: import("appwrite").Models.Target[]; accessedAt?: string; } | null}
 */
    export let loggedInUser = null;
    /**
 * @type {(arg0: { name: any; $id?: string; $createdAt?: string; $updatedAt?: string; password?: string | undefined; hash?: string | undefined; hashOptions?: object | undefined; registration?: string; status?: boolean; labels?: string[]; passwordUpdate?: string; email?: string; phone?: string; emailVerification?: boolean; phoneVerification?: boolean; mfa?: boolean; prefs?: import("appwrite").Models.Preferences; targets?: import("appwrite").Models.Target[]; accessedAt?: string; } | null) => void}
 */
    export let setLoggedInUser;

    async function logout() {
        await account.deleteSession('current');
        setLoggedInUser(null);
        goto('/');
    }

    /**
 * @param {{ preventDefault: () => void; target: HTMLFormElement | undefined; submitter: { dataset: { type: any; }; }; }} e
 */
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = e.submitter.dataset.type;

        if (type === "login") {
            await login(formData.get('email'), formData.get('password'));
        } else if (type === "register") {
            await register(formData.get('email'), formData.get('password'));
        }
    }

    /**
 * @param {FormDataEntryValue | null} email
 * @param {FormDataEntryValue | null} password
 */
    async function login(email, password) {
        try {
            loggedInUser = await account.get();
        } catch (error) {
            if (email && password) {
                await account.createEmailPasswordSession(email.toString(), password.toString());
            }
            loggedInUser = await account.get();
        }
        setLoggedInUser(loggedInUser);
    }

    /**
 * @param {FormDataEntryValue | null} email
 * @param {FormDataEntryValue | null} password
 */
    async function register(email, password) {
        // @ts-ignore
        await account.create(ID.unique(), email, password);
        await login(email, password);
    }
    const data = {
        name: "this is card 1",
        description: "this is card 1 description",
        link1: "https://www.google.com",
        imageUrl: "https://plus.unsplash.com/premium_photo-1687288639548-6fd3cd35448b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    const data2 = {
        name: "this is card 2",
        description: "this is card 2 description",
        link1: "https://www.google.com",
        imageUrl: "https://images.unsplash.com/photo-1738273473785-99c1fc498c14?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    const data3 = {
        name: "this is card 3",
        description: "this is card 3 description",
        link1: "https://www.google.com",
        imageUrl: "https://plus.unsplash.com/premium_photo-1690487695956-ecef603b4249?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
</script>

<div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
    <ProjectCard project={data} />
    <ProjectCard project={data2} />
    <ProjectCard project={data3} />
</div>  
</div>