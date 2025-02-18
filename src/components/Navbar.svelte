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


<nav class="navbar">
    <div class="container">
        <a href="/" class="home-link">Home</a>
        <div class="auth-section">
            {#if loggedInUser}
                <span class="user-email">Logged in as {loggedInUser.email}</span>
                <a href="/dashboard" class="dashboard-link">Go to Dashboard</a>
                <button on:click={logout} class="logout-button">Logout</button>
            {:else}
                <form on:submit={submit} class="auth-form">
                    <input type="email" placeholder="Email" name="email" required class="form-input" />
                    <input type="password" placeholder="Password" name="password" required class="form-input" />
                    <button type="submit" data-type="login" class="login-button">Login</button>
                    <button type="submit" data-type="register" class="register-button">Register</button>
                </form>
            {/if}
        </div>
    </div>
</nav>
<style>
    .navbar {
        background-color: #1f2937;
        padding: 1rem;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .home-link {
        color: white;
        font-size: 2.25rem;
        margin-right: 1rem;
        text-decoration: none;
    }

    .home-link:hover {
        text-decoration: underline;
    }

    .auth-section {
        color: white;
    }

    .user-email {
        margin-right: 1rem;
    }

    .dashboard-link {
        color: white;
        margin-right: 1rem;
        text-decoration: none;
    }

    .dashboard-link:hover {
        text-decoration: underline;
    }
    .auth-form {
        display: flex;
        gap: 0.5rem;
    }

    .form-input {
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: none;
    }

    .logout-button {
        background-color: #ef4444;
        color: white;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
    }

    .logout-button:hover {
        background-color: #dc2626;
    }

    .login-button {
        background-color: #3b82f6;
        color: white;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
    }

    .login-button:hover {
        background-color: #2563eb;
    }
    .register-button {
        background-color: #22c55e;
        color: white;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
    }

    .register-button:hover {
        background-color: #16a34a;
    }
</style>