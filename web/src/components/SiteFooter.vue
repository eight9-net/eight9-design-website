<style>

</style>
<script setup>
  import NavLinks from './NavigationMenu.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  const year = new Date().getFullYear();
</script>
<template>
  <footer class="fixed bottom-0 left-0 right-0 w-full bg-gray-100 py-3 z-40">
    <!-- footer -->
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">

        <div class="w-full sm:flex-1">
          <div class="nav-item"><address class="m-0"><font-awesome-icon :icon="['fas', 'location-dot']" /> {{ siteProperties.address }}</address></div>
        </div>
        <div class="w-full sm:w-auto text-right">
          <div class="nav-item"><a class="misc-link" :href="'mailto:' + siteProperties.email + '?subject=Website Inquiry'"><font-awesome-icon :icon="['fas', 'envelope']" /> {{ siteProperties.email }}</a></div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="w-full sm:flex-1">
            <div class="nav-item">Copyright &copy; 2023-{{ year }} <span class="text-standout">Eight9 Design Network INC</span></div>
          </div>
          <div class="w-full sm:w-auto text-right">
            <div class="nav-item">Developed by <a class="misc-link" href="https://eight9.net/">Eight9 Design Network</a></div>
          </div>
        </div>
      </div>
    </div>

  </footer>

</template>
