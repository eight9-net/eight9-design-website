
<style scoped>

</style>

<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="" id="top">
    <SiteHeader />
    <main role="main" class="container mx-auto px-4 site-content">
      <router-view></router-view>
    </main>
    <SiteFooter />
  </div>
</template>
