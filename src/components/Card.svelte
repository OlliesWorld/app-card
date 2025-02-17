<script lang="ts">
  export let project: {
    name: string;
    description: string;
    primaryLink: string;
    secondaryLink?: string;
  };
</script>

<div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-xl font-semibold">{project.name}</h2>
  <p class="mt-2 text-gray-600">{project.description}</p>
  <div class="mt-4 space-x-4">
    <a
      href={project.primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-600 hover:underline"
    >
      Primary Link
    </a>
    {#if project.secondaryLink}
      <a
        href={project.secondaryLink}
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        Secondary Link
      </a>
    {/if}
  </div>
</div>