<script lang="ts">
    import { onMount } from 'svelte';
    import { Client, Databases, type Models } from 'appwrite';
    import ProjectForm from '../../components/Form.svelte';
    import ProjectCard from '../../components/Card.svelte';
    import Navbar from '../../components/Navbar.svelte';
    import { account } from '$lib/appwrite';

    let loggedInUser: Models.User<Models.Preferences> | null = null;

    async function checkUser() {
        try {
            loggedInUser = await account.get();
        } catch (error) {
            loggedInUser = null;
        }
    }

    checkUser();

    function setLoggedInUser(user: any | null) {
        loggedInUser = user;
    }
    let currentFormData = {
      name: '',
      description: '',
      link1: '',
      link2: ''
    };
    
    let projects: string | any[] = [];
    let loading = true;
    let error: string | null = null;
    
    const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(projectId);
    
    const databases = new Databases(client);
    const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
    
    async function fetchProjects() {
      try {
        loading = true;
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          // Add queries here if you need to filter by user ID
          // [Query.equal('userId', 'current-user-id')]
        );
        projects = response.documents;
      } catch (err) {
        console.error('Error fetching projects:', err);
        error = 'Failed to load projects';
      } finally {
        loading = false;
      }
    }
    
    async function handleSubmit(event: Event) {
      const customEvent = event as CustomEvent;
      const formData = customEvent.detail;
      
      try {
        const appwriteData = {
          name: formData.name,
          description: formData.description,
          link1: formData.link1 || '',
          link2: formData.link2 || '',
          imageUrl: '',
          imageId: ''
        };
    
        const response = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          'unique()',
          appwriteData
        );
        
        console.log('Project created:', response);
        
        // Refresh the projects list after creating a new one
        await fetchProjects();
        
        // Reset form data
        currentFormData = {
          name: '',
          description: '',
          link1: '',
          link2: ''
        };
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
    
    onMount(() => {
      fetchProjects();
      document.addEventListener('formsubmit', handleSubmit);
      document.addEventListener('forminput', handleFormInput);
    
      return () => {
        document.removeEventListener('formsubmit', handleSubmit);
        document.removeEventListener('forminput', handleFormInput);
      };
    });
    
    function handleFormInput(event: Event) {
      const customEvent = event as CustomEvent;
      currentFormData = customEvent.detail;
    }
</script>

<Navbar {loggedInUser} {setLoggedInUser} />
<div class="max-w-7xl mx-auto p-6">
  <div class="mb-12">
    <h1 class="text-2xl font-bold mb-6">Add New Project</h1>
    <ProjectForm />
  </div>

  <div>
    <h2 class="text-xl font-semibold mb-6">Your Projects</h2>
    {#if loading}
      <div class="text-center py-8">
        <p>Loading projects...</p>
      </div>
    {:else if error}
      <div class="text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    {:else if projects.length === 0}
      <div class="text-center py-8 text-gray-600">
        <p>No projects found. Add your first project above!</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project (project.$id)}
          <ProjectCard {project} />
        {/each}
      </div>
    {/if}
  </div>
</div>