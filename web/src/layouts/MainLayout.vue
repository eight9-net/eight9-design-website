<script setup>
import Header from '../components/SiteHeader.vue';
import Footer from '../components/SiteFooter.vue';
</script>

<template>
  <div class="main-layout">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
