<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  const year = new Date().getFullYear();
</script>
<template>
  <footer class="fixed bottom-0 left-0 right-0 w-full logo-bg border-t border-primary/20 shadow-md py-3 z-40 text-base-content/70 text-sm">

    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div class="w-full sm:flex-1">
          <address class="not-italic"><font-awesome-icon :icon="['fas', 'location-dot']" class="text-accent mr-1" /> {{ siteProperties.companyAddress }}</address>
        </div>
        <div class="w-full sm:w-auto text-right">
          <a class="link link-primary" :href="'mailto:' + siteProperties.contactEmail + '?subject=Website Inquiry'">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-1" /> {{ siteProperties.contactEmail }}
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-base-content/10 mt-2 pt-2">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="w-full sm:flex-1">
            Copyright &copy; 2023-{{ year }} <span class="text-primary font-medium">Eight9 Design Network INC</span>
          </div>
          <div class="w-full sm:w-auto text-right">
            Developed by <a class="link link-primary" href="https://eight9.net/">Eight9 Design Network</a>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>
