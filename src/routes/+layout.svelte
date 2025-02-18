<script lang="ts">
  import '../app.css';
  import Navbar from '../components/Navbar.svelte';
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