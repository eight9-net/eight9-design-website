<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const MAX_TAGS = 9;
const show_all_tags = ref(false);

const visible_tags = computed(() =>
  show_all_tags.value ? props.project.tags : props.project.tags.slice(0, MAX_TAGS)
);
const has_more_tags = computed(() => props.project.tags.length > MAX_TAGS);
</script>

<template>
  <div class="my-3">
    <div class="h-full border card bg-base-200 border-primary/20 rounded-2xl">
      <div class="card-body">
        <div class="flex items-center gap-4 mb-2">
          <div class="flex items-center justify-center w-12 h-12 text-xl border rounded-full bg-base-300 border-primary/30 text-primary shrink-0">
            <font-awesome-icon :icon="['fas', project.icon]" />
          </div>
          <div class="flex flex-col items-center text-center flex-1">
            <span class="mb-1 badge badge-outline badge-sm text-primary/70 border-primary/30">{{ project.industry }}</span>
            <h4 class="text-base leading-tight card-title text-base-content">{{ project.title }}</h4>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-base-content/75">{{ project.description }}</p>
        <div class="flex flex-wrap justify-center gap-1.5 mt-3">
          <span v-for="tag in visible_tags" :key="tag" class="text-xs badge badge-ghost badge-sm">{{ tag }}</span>
          <a v-if="has_more_tags && !show_all_tags" href="javascript://" @click="show_all_tags = true" class="text-xs badge badge-ghost badge-sm link link-primary">+{{ project.tags.length - MAX_TAGS }} more</a>
          <a v-else-if="show_all_tags" href="javascript://" @click="show_all_tags = false" class="text-xs badge badge-ghost badge-sm link link-primary">show less</a>
        </div>
      </div>
    </div>
  </div>
</template>
