<script lang="ts">
  import { Client, Databases } from 'appwrite';
  import ProjectForm from '../../components/Form.svelte';
  
  let currentFormData = {
    name: '',
    description: '',
    link1: '',
    link2: ''
  };
  
  const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);
  
  const databases = new Databases(client);
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
  
  async function handleSubmit(event: CustomEvent) {
    try {
      const formData = event.detail;
      // console.log('Submitting form data:', formData); // Debug log
  
      // Create document in Appwrite
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        formData
      );
      
      // console.log('Project created:', response);
      currentFormData = {
        name: '',
        description: '',
        link1: '',
        link2: ''
      };
    } catch (error) {
      console.error('Error creating project:', error);
      console.error('Error details:', JSON.stringify(error, null, 2)); // Debug log
    }
  }
  console.log('Appwrite client initialized:', client);
  function handleFormInput(event: CustomEvent) {
    // console.log('Form input event:', event.detail); // Debug log
    currentFormData = event.detail;
  }
  </script>
  
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Project</h1>
    
    <ProjectForm
      on:submit={handleSubmit}
      on:forminput={handleFormInput}
    />
<!--   
    <div class="mt-8 p-4 bg-gray-50 rounded-md">
      <h2 class="text-lg font-semibold mb-2">Form Data Preview:</h2>
      <pre class="whitespace-pre-wrap">{JSON.stringify(currentFormData, null, 2)}</pre>
    </div> -->
  </div>