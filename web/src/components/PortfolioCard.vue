<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="my-3">
    <div class="card bg-base-200 border border-primary/20 rounded-2xl h-full">
      <div class="card-body">
        <div class="flex items-start gap-4 mb-2">
          <div class="w-12 h-12 rounded-full bg-base-300 border border-primary/30 flex items-center justify-center text-primary text-xl shrink-0">
            <font-awesome-icon :icon="['fas', project.icon]" />
          </div>
          <div>
            <span class="badge badge-outline badge-sm text-primary/70 border-primary/30 mb-1">{{ project.industry }}</span>
            <h4 class="card-title text-base text-base-content leading-tight">{{ project.title }}</h4>
          </div>
        </div>
        <p class="text-sm text-base-content/75 leading-relaxed">{{ project.description }}</p>
        <div class="flex flex-wrap gap-1.5 mt-3">
          <span v-for="tag in project.tags" :key="tag" class="badge badge-ghost badge-sm text-xs">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
