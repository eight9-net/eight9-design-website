<script>
  export default {
    name: 'landing-box',
    props: [
      'cat',
    ],
    data() {
      return {
        show_more: false,
      }
    },
    computed: {
      total_items() {
        return this.cat.items.length;
      },
      show_items() {
        let items = [];
        let max = this.show_more ? this.total_items : 5;
        for (let i = 0; i < max; i++) {
          items.push(this.cat.items[i]);
        }
        return items;
      },
    },
    methods: {
      toggle_show() {
        this.show_more = !this.show_more;
      },
    },
  }
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
