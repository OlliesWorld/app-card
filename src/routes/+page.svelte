<script>
// @ts-nocheck

    import { account, ID } from '$lib/appwrite';
    import { goto } from '$app/navigation';
    /**
     * @type {{ name: any; $id?: string; $createdAt?: string; $updatedAt?: string; password?: string | undefined; hash?: string | undefined; hashOptions?: object | undefined; registration?: string; status?: boolean; labels?: string[]; passwordUpdate?: string; email?: string; phone?: string; emailVerification?: boolean; phoneVerification?: boolean; mfa?: boolean; prefs?: import("appwrite").Models.Preferences; targets?: import("appwrite").Models.Target[]; accessedAt?: string; } | null}
     */
    let loggedInUser = null;

    /**
     * @param {FormDataEntryValue | null} email
     * @param {FormDataEntryValue | null} password
     */
    async function login(email, password) {
        try {
            // Check if a session already exists
            loggedInUser = await account.get();
        } catch (error) {
            // If no session exists, create a new one
            if (email && password) {
                await account.createEmailPasswordSession(email.toString(), password.toString());
            }
            loggedInUser = await account.get();
        }
    }

    /**
	 * @param {FormDataEntryValue | null} email
	 * @param {FormDataEntryValue | null} password
	 */
    async function register(email, password) {
        // @ts-ignore
        await account.create(ID.unique(), email, password);
        login(email, password);
    }

    /**
	 * @param {{ preventDefault: () => void; target: HTMLFormElement | undefined; submitter: { dataset: { type: any; }; }; }} e
	 */
    function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = e.submitter.dataset.type;
        
        if (type === "login") {
            login(formData.get('email'), formData.get('password'));
        } else if (type === "register") {
            register(formData.get('email'), formData.get('password'));
        }
    }

    async function logout() {
        await account.deleteSession('current');
        loggedInUser = null;
    }
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl">Welcome to Cards</h1>
        <div class="text-white">
            {#if loggedInUser}
                <span class="mr-4">Logged in as {loggedInUser.name}</span>
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
<h1>Wall of cards</h1>
<div class="container grid grid-cols-12 gap-6">
    <div class="col-span-4">
        <div class="group transition-all duration-300 ease-in-out bg-white shadow-md rounded-lg overflow-hidden">
            <div class="relative z-10">
                <div class="space-y-2">
                    <img
                        src="https://images.unsplash.com/photo-1739056656210-7c3cab6fff42?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Card Profile"
                        class="w-full h-48 object-cover"
                    />
                    <h2 class="text-xl p-4">Name of Person</h2>
                </div>
            </div>
            <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-96">
                <div class="px-4 text-sm text-gray-500">
                    Card Description
                </div>
                <div class="py-4 px-4">
                    <p>Card Content goes here. This will slide up on hover!</p>
                </div>
                <div class="pb-4 px-4">
                    <p>Card Footer</p>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-4">
        <div class="group transition-all duration-300 ease-in-out bg-white shadow-md rounded-lg overflow-hidden">
            <div class="relative z-10">
                <div class="space-y-2">
                    <img
                        src="https://images.unsplash.com/photo-1734907865880-6eb669831b9e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Card Profile"
                        class="w-full h-48 object-cover"
                    />
                    <h2 class="text-xl p-4">Name of Person #2</h2>
                </div>
            </div>
            <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-96">
                <div class="px-4 text-sm text-gray-500">
                    Card Description
                </div>
                <div class="py-4 px-4">
                    <p>Card Content goes here. This will slide up on hover!</p>
                </div>
                <div class="pb-4 px-4">
                    <p>Card Footer</p>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-4">
        <div class="group transition-all duration-300 ease-in-out bg-white shadow-md rounded-lg overflow-hidden">
            <div class="relative z-10">
                <div class="space-y-2">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1690487695956-ecef603b4249?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Card Profile"
                        class="w-full h-48 object-cover"
                    />
                    <h2 class="text-xl p-4">Name of Person #3</h2>
                </div>
            </div>
            <div class="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-96">
                <div class="px-4 text-sm text-gray-500">
                    Card Description
                </div>
                <div class="py-4 px-4">
                    <p>Card Content goes here. This will slide up on hover!</p>
                </div>
                <div class="pb-4 px-4">
                    <p>Card Footer</p>
                </div>
            </div>
        </div>
    </div>
</div>