<!-- components/ProjectCard.svelte -->
<script lang="ts">
  export let project: {
    name: string;
    description: string;
    link1: string;
    link2: string;
    imageUrl: string;
  };
  </script>
  
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    {#if project.imageUrl}
      <img src={project.imageUrl} alt={project.name} class="w-full h-48 object-cover" />
    {/if}
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{project.name}</h3>
      <p class="text-gray-600 mb-4">{project.description}</p>
      <div class="space-y-2">
        {#if project.link1}
          <a 
            href={project.link1} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 block"
          >
            Primary Link
          </a>
        {/if}
        {#if project.link2}
          <a 
            href={project.link2} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 block"
          >
            Secondary Link
          </a>
        {/if}
      </div>
    </div>
  </div>