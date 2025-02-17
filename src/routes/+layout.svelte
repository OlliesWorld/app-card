<!-- filepath: /Users/ronilockwood/Desktop/sites/app-card/src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css'; // Import your global CSS file
  import Navbar from '../components/Navbar.svelte'; // Import your Navbar component
  import { onMount } from 'svelte';
  import { account } from '$lib/appwrite';
  import type { Models } from 'appwrite';

  let loggedInUser: Models.User<Models.Preferences> | null = null;

  async function checkUser() {
    try {
      loggedInUser = await account.get();
    } catch (error) {
      loggedInUser = null;
    }
  }

  onMount(() => {
    checkUser();
  });

  function setLoggedInUser(user: any | null) {
    loggedInUser = user;
  }
</script>

<Navbar {loggedInUser} {setLoggedInUser} />
<slot />