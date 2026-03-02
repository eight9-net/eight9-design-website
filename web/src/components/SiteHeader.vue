<style>
  .nav-item {
    margin: 0.2em .5em;
  }
</style>
<script>
  import NavLinks from '../components/NavLinks.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'site-header',
    components: {
      NavLinks,
    },
    data() {
      return {
        isMenuOpen: false,
      }
    },
    computed: {
      ...mapGetters([
        'get_site_info',
      ]),
      site() {
        return this.get_site_info;
      },
    },
  }
</script>
<template>
  <header class="">

    <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900 sitehead">
      <div class="px-4 w-full">
        <div class="flex items-center justify-between h-14">
          <a class="text-white font-semibold text-lg sitehead-brand" href="#">Eight9 Design Network</a>

          <button
            class="md:hidden text-gray-300 hover:text-white p-2"
            type="button"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Toggle Navigation"
          >
            <font-awesome-icon :icon="['fas', isMenuOpen ? 'xmark' : 'bars']" />
          </button>

          <div class="hidden md:flex items-center justify-center nav-sitehead">
            <NavLinks />
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-show="isMenuOpen" class="md:hidden pb-3 nav-sitehead">
          <NavLinks />
        </div>
      </div>
    </nav>

  </header>

  </template>
