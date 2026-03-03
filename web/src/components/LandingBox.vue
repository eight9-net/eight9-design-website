<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  cat: {
    type: Object,
    required: true,
  },
});

const show_more = ref(false);

const total_items = computed(() => {
  return props.cat?.items?.length ?? 0;
});

const show_items = computed(() => {
  const max = show_more.value ? total_items.value : 5;
  return props.cat?.items?.slice(0, max) ?? [];
});

const toggle_show = () => {
  show_more.value = !show_more.value;
};
</script>
<template>
  <div class="my-3">
    <div class="card bg-base-200 border border-primary/20 rounded-2xl h-full min-h-75">
      <div class="card-body text-center">
        <div class="flex justify-center mb-3">
          <div class="w-14 h-14 rounded-full bg-base-300 border border-primary/30 flex items-center justify-center text-primary text-2xl">
            <font-awesome-icon :icon="['fas', cat.icon]" />
          </div>
        </div>
        <h4 class="card-title justify-center text-base-content">{{ cat.title }}</h4>
        <div class="text-left text-sm text-base-content/80 space-y-1 mt-2">
          <div v-for="item in show_items" class="flex items-start gap-2">
            <font-awesome-icon :icon="['fas', 'right-long']" class="text-primary mt-1 shrink-0 text-xs" />
            <span>{{ item }}</span>
          </div>
          <div v-if="!show_more && total_items > 5" class="pt-1">
            <a href="javascript://" @click="toggle_show" class="link link-primary text-sm">Show More</a>
          </div>
          <div v-else-if="show_more && total_items > 5" class="pt-1">
            <a href="javascript://" @click="toggle_show" class="link link-primary text-sm">Show Less</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
