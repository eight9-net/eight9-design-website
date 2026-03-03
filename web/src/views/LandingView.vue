<style scoped>

</style>
<script>
  import HomeHero from '../components/HomeHero.vue';
  import ContentFullSection from '../components/ContentFullSection.vue';
  import ContentLeftSection from '../components/ContentLeftSection.vue';
  import LandingBox from '../components/LandingBox.vue';
  import ContactSection from '../components/ContactSection.vue';
  export default {
    name: 'landing-view',
    components: {
      HomeHero,
      ContentFullSection,
      ContentLeftSection,
      LandingBox,
      ContactSection,
    },
    computed: {

    },
    data() {
      return {
        cats: [
          {
            title: 'Custom Websites',
            icon: 'display',
            items: [
              'Professional Design',
              'Mobile & Tablet Responsive Designs',
              'Static or Dynamic',
              'Hosting & E-Mail Services',
            ],
          },
          {
            title: 'Custom Web Applications',
            icon: 'code',
            items: [
              'Custom Built - Designed for your company',
              'User Authentication',
              'Shopping Cart',
              'Inventory',
              'APIs, Database, Data Logging, Reporting, Mapping, etc',
              'Localization - i18n Language Templates & Numerical Formatting',
              'OpenCV - AI Image Recognition',
              'VueJS - High Performance Javascript Websites',
              'Postgres - Advanced Queries, Data Analytics, & Aggregation',
              'Reporting - Charts, DataTables, & PDF Generation',
              'MQTT / Postgres - Data & Job Queueing Background Services',
              'PostGIS - GPS Mapping & Geography Queries & Analytics',
              'Logging - Timescaledb / ElasticSearch / Prometheus',
              'Application Performance Monitoring & Optimization',
            ],
          },
          {
            title: 'Off-The-Shelf Web Applications',
            icon: 'store',
            items: [
              'Commercial or Open Source',
              'Installation & Maintenance',
              'Custom Configuration',
              'WordPress, InvenTree, X-Cart, WooCommerce, etc',
              'Cloud / On-Premise Hosting',
            ],
          },
          {
            title: 'System Architecture',
            icon: 'compass-drafting',
            items: [
              'Databases, Caches, Queues, & Microservices',
              'Keep it Simple Approach',
              'Performance & Scalability',
              'Modern & Proven Technologies',
              'Docker & Kubernetes',
            ],
          },
          {
            title: 'Server & Desktop Builds',
            icon: 'screwdriver-wrench',
            items: [
              'Custom Built Servers or Gaming PC',
              'On Site / Datacenter Installation',
              'Raspberry/Orange Pi Micro Computers',
              'Blockchain Validator Initialization & Maintenance',
            ],
          },
          {
            title: 'Cloud Services',
            icon: 'cloud',
            items: [
              'Custom Designed Architecture',
              'AWS, Azure, Google CP, DigitalOcean, Linode, etc',
              'Cost Optimization',
              'Autoscaling - Scale up Servers on demand',
              'Geographically Distributed - CDN Setup',
              'Automated Offsite Backups',
              'Azure Virtal Desktops & Virtual Applications',
            ],
          },
        ],
      }
    },
  }
</script>

<template>

  <div class="pb-12 bg-accent/5">

    <HomeHero
      id="home"
      name="home"
      title="Custom Web Design, Web Applications, & Cloud Services"
    />

    <ContentLeftSection
      id="WhatWeDo"
      name="what-we-do"
      title="Services Tailored to Your Business Needs"
      image="services-graphic.svg"
      bgClasses="bg-contain bg-no-repeat"
    >
      <p>We build custom websites and web applications for businesses of all sizes. We specialize in custom web design, development, and hosting services. We also offer a wide range of off-the-shelf web applications that can be customized to fit your business needs.</p>
    </ContentLeftSection>

    <ContentFullSection
      id="Services"
      name="services"
      title="Custom Web Design & Development Services"
      containerClasses="container mx-auto px-5 py-25"
      sectionClasses="mt-10 pt-10"
      image=""
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <LandingBox v-for="cat in cats" :cat="cat" />
      </div>
    </ContentFullSection>

    <ContactSection />

  </div>

</template>


