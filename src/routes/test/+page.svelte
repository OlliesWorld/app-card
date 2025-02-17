<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { account } from '$lib/appwrite';
    import ImageUpload from '../../components/ImageUpload.svelte';
    /**
     * @type {{ email: any; $id?: string; $createdAt?: string; $updatedAt?: string; name?: string; password?: string | undefined; hash?: string | undefined; hashOptions?: object | undefined; registration?: string; status?: boolean; labels?: string[]; passwordUpdate?: string; phone?: string; emailVerification?: boolean; phoneVerification?: boolean; mfa?: boolean; prefs?: import("appwrite").Models.Preferences; targets?: import("appwrite").Models.Target[]; accessedAt?: string; } | null}
     */
    let loggedInUser = null;

    onMount(async () => {
        try {
            loggedInUser = await account.get();
            // console.log('Logged in user:', loggedInUser.email);
        } catch (error) {
            goto('/');
        }
    });
</script>

{#if loggedInUser}
    <nav class="bg-gray-800 p-4 text-white">
        <div class="container mx-auto flex items-center justify-between">
            <h1 class="text-2xl">Dashboard</h1>
            <p class="text-2xl">Welcome, {loggedInUser.email}!</p>
            <a href="/" class="mr-4 hover:underline">Home</a>
        </div>
    </nav>
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Create New Item</h2>
        <ImageUpload formAction="?/upload" />
    </div>
{:else}
    <p>Loading...</p>
{/if}