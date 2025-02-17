<!-- <script>
// @ts-nocheck

    import { loggedInUser, login, register, logout } from '$lib/auth';

    /**
	 * @param {{ preventDefault: () => void; submitter: { dataset: { type: any; }; }; target: { email: { value: any; }; password: { value: any; }; }; }} event
	 */
    async function submit(event) {
        event.preventDefault();
        const formType = event.submitter.dataset.type;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (formType === 'login') {
            await login(email, password);
        } else if (formType === 'register') {
            await register(email, password);
        }
    }
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-2xl">Welcome to Cards</h1>
        <div class="text-white flex items-center space-x-4">
            {#if loggedInUser}
                <span>Logged in as {loggedInUser.name}</span>
                <a href="/dashboard" class="hover:underline">Go to Dashboard</a>
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
</nav> -->