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
    <img
      src={project.imageUrl}
      alt={project.name}
      class="w-full h-48 object-cover"
    />
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
  <style>
    /* Equivalent styles for the utility classes that were previously from Tailwind */
  
    .bg-white {
      background-color: #ffffff;
    }
  
    .rounded-lg {
      border-radius: 0.5rem;
    }
  
    .shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .overflow-hidden {
      overflow: hidden;
    }
  
    .w-full {
      width: 100%;
    }
  
    /* h-48 (12rem) */
    .h-48 {
      height: 12rem;
    }
  
    .object-cover {
      object-fit: cover;
    }
  
    .p-6 {
      padding: 1.5rem;
    }
  
    .text-xl {
      font-size: 1.25rem;
      font-weight: 700; /* Often matches Tailwind's font-semibold or bold variations */
    }
    .font-semibold {
    font-weight: 600;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .text-gray-600 {
    color: #4b5563;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  /* Simulate "space-y-2": plies spacing between inner elements */
  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }

  .text-blue-600 {
    color: #2563eb;
  }

  /* Hover effect for links */
  .hover\:text-blue-800:hover {
    color: #1e3a8a;
  }

  .block {
    display: block;
  }
</style>