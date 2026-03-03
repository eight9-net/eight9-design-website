<script setup>
import HomeHero from '../components/HomeHero.vue';
import ContentFullSection from '../components/ContentFullSection.vue';
import ContentLeftSection from '../components/ContentLeftSection.vue';
import LandingBox from '../components/LandingBox.vue';
import ContactSection from '../components/ContactSection.vue';
import Gallery from '../components/Gallery.vue';

const cats = [
  {
    title: 'Custom Websites',
    icon: 'display',
    items: [
      'Professional Design & Brand Identity',
      'Mobile & Tablet Responsive Layouts',
      'SEO-Optimized Structure & Performance',
      'Static Sites, CMS, or Dynamic Content',
      'Domain, Hosting & SSL Setup',
      'Business E-Mail & DNS Configuration',
      'Ongoing Maintenance & Updates',
    ],
  },
  {
    title: 'Custom Web Applications',
    icon: 'code',
    items: [
      'Designed Around Your Workflow',
      'User Authentication, Roles & Permissions',
      'Dashboards, Reporting & Data Analytics',
      'REST APIs & Third-Party Integrations',
      'Shopping Cart, Inventory & E-Commerce',
      'Database Design & Query Optimization',
      'Real-Time Data & Background Job Queues',
      'Geospatial Mapping & GPS Analytics (PostGIS)',
      'AI Image Recognition (OpenCV)',
      'Localization & i18n Language Support',
      'Charts, DataTables & PDF Generation',
      'Logging & Monitoring (Prometheus, ELK, Timescale)',
      'Application Performance Tuning',
    ],
  },
  {
    title: 'Off-The-Shelf Applications',
    icon: 'store',
    items: [
      'WordPress & WooCommerce',
      'InvenTree Inventory Management',
      'X-Cart & E-Commerce Platforms',
      'Custom Configuration & Theme Development',
      'Plugin & Extension Development',
      'Installation, Updates & Ongoing Maintenance',
      'Cloud or On-Premise Hosting',
    ],
  },
  {
    title: 'System Architecture',
    icon: 'compass-drafting',
    items: [
      'Scalable, Resilient System Design',
      'Microservices & API Architecture',
      'Database, Caching, & Message Queues',
      'Docker & Kubernetes Deployments',
      'Performance Optimization, Load & Capacity Planning',
      'Security Design & Best Practices',
      'Technology Evaluation & Roadmapping',
    ],
  },
  {
    title: 'Server & Desktop Builds',
    icon: 'screwdriver-wrench',
    items: [
      'Custom Servers & Workstation Builds',
      'On-Site & Datacenter Deployment',
      'NAS & Network Storage Solutions',
      'Industrial Raspberry Pi Projects',
      'Blockchain Node & Validator Setup',
    ],
  },
  {
    title: 'Cloud Services',
    icon: 'cloud',
    items: [
      'AWS, Azure, Google Cloud, DigitalOcean, Heroku, & More',
      'Cloud Architecture Design & Cost Optimization',
      'Auto-Scaling & High Availability',
      'Global CDN & Edge Deployment',
      'Automated Backup & Disaster Recovery',
      'Cost Analysis & Spend Optimization',
      'Azure Virtual Desktops & Remote Applications',
    ],
  },
];
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
      image="services-graphic-sq.svg"
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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <LandingBox v-for="cat in cats" :cat="cat" />
      </div>
    </ContentFullSection>

    <ContentFullSection
      id="Projects"
      name="projects"
      title="Project Gallery"
      containerClasses="container mx-auto px-5 pb-15"
      backdropClasses=""
      image=""
      :button="false"
    >
      <Gallery
        cols="4"
        :images="[
          { src: 'airworkscoolingsolutions.png', alt: 'Airworks Cooling Solutions' },
          { src: 'scadasolutions.png', alt: 'SCADA Solutions' },
          { src: 'atlasintegratedsystems.png', alt: 'Atlas Integrated Systems' },
          { src: 'request-a-quote.png', alt: 'Request a Quote' },
        ]"
      />
    </ContentFullSection>

    <ContactSection />

  </div>

</template>


