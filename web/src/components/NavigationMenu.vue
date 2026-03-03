<script setup>
  import { shallowRef } from 'vue';
  import DropdownMenu from './DropdownMenu.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const props = defineProps({
    classes: {
      type: String,
      default: 'menu menu-horizontal text-lg font-medium px-1 mx-auto justify-center'
    },
    textSize: {
      type: String,
      default: 'text-2xl',
    },
    hover: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
  });


  const links = shallowRef({
    home: [
    ],
    projects: [
      { name: 'projects', hash: '#SanDiegoPureWaterProject', title: 'City of San Diego Pure Water Project' },
      { name: 'projects', hash: '#LawaiSolarProject', title: 'AES-KIUC Lāwaʻi Solar Project' },
      { name: 'projects', hash: '#PMRFPowerGridProject', title: 'FY16 MCON Project P-416 Energy PMRF Power Grid Consolidation' },
      { name: 'projects', hash: '#RialtoBioEnergyProject', title: 'Rialto Bio Energy Facility' },
      { name: 'projects', hash: '#CampPendletonDataCenterProject', title: 'Camp Pendleton Data Center' },
    ],
    services: [
      { name: 'services', hash: '#CommunicationsSystemsDesign', title: 'Communications Systems Design' },
      { name: 'services', hash: '#CommunicationsSystemsTroubleshooting', title: 'Communications Systems Troubleshooting' },
      { name: 'services', hash: '#BackboneInfrastructure', title: 'Configuration & Installation of Backbone Infrastructure' },
      { name: 'services', hash: '#EnhancedAccessSecurity', title: 'Enhanced Access Security' },
    ],
    contact: [
    ],
  });

  const isHorizontal = shallowRef(props.classes.includes('menu-horizontal'));

  const emit = defineEmits(['emitCloseMenu']);
  function handleCloseMenu() {
    emit('emitCloseMenu');
  }

  function goto(link, sectionMenu = false) {
    if (sectionMenu && props.isHorizontal) {
      router.push(link);
    } else if (!sectionMenu) {
      router.push(link);
      handleCloseMenu();
    }
  }
</script>

<template>
  <ul :class="props.classes">
    <a href="javascript://" @click="goto({ name: 'home' })" :class="`${props.textSize} py-1.5 px-3 rounded-md font-medium hover:text-accent active:text-accent transition-colors`"><font-awesome-icon :icon="['fas', 'house']" /> Home</a>
    <a href="javascript://" @click="goto({ name: 'home', hash: '#Services' })" :class="`${props.textSize} py-1.5 px-3 rounded-md font-medium hover:text-accent active:text-accent transition-colors`"><font-awesome-icon :icon="['fas', 'camera-retro']" /> Services</a>
    <a href="javascript://" @click="goto({ name: 'home', hash: '#ContactUs' })" :class="`${props.textSize} py-1.5 px-3 rounded-md font-medium hover:text-accent active:text-accent transition-colors`"><font-awesome-icon :icon="['fas', 'envelope']" /> Contact</a>
  </ul>
</template>


<style scoped>
  .navbar .subnav {
    margin-block-start: 0px;
  }
</style>