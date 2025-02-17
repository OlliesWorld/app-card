<script>
// @ts-nocheck

    import { account } from '$lib/appwrite';
    import { goto } from '$app/navigation';
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
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-white text-4xl mr-4 hover:underline">Home</a>
        <div class="text-white">
            {#if loggedInUser}
                <span class="mr-4">Logged in as {loggedInUser.email}</span>
                <a href="/dashboard" class="mr-4 hover:underline">Go to Dashboard</a>
                <button on:click={logout} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            {:else}
                <form on:submit={submit} class="flex space-x-2">
                    <input type="email" placeholder="Email" name="email" required class="p-2 rounded" />
                    <input type="password" placeholder="Password" name="password" required class="p-2 rounded" />
                    <button type="submit" data-type="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                    <button type="submit" data-type="register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
                </form>
            {/if}
        </div>
    </div>
</nav>