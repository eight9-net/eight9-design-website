<script setup>
import HomeHero from '../components/HomeHero.vue';
import ContentFullSection from '../components/ContentFullSection.vue';
import ContentLeftSection from '../components/ContentLeftSection.vue';
import LandingBox from '../components/LandingBox.vue';
import ContactSection from '../components/ContactSection.vue';
import PortfolioCard from '../components/PortfolioCard.vue';

const projects = [
  {
    icon: 'lock',
    industry: 'EdTech SaaS',
    title: 'Centralized Authentication Service',
    description: 'Architected a new authentication service using an Open Source backend solution and highly customized frontend for a multi-tenant SaaS platform and accompanying microservices.',
    tags: ['Zitadel', 'React', 'Next.js', 'PostgreSQL', 'AWS ECS', 'Terraform', 'SSO', 'OAuth2', 'OpenID', 'SAML', 'MFA'],
  },
  {
    icon: 'cloud',
    industry: 'EdTech SaaS',
    title: 'Monolith Cloud Migration',
    description: 'Planned and led the cloud migration of a legacy monolith including several critical microservices to a multi-account (Dev,Stage,Prod) AWS architecture utilizing Ansible, Packer, and Terraform.',
    tags: ['PHP', 'Javascript', 'PostgreSQL', 'RabbitMQ', 'AWS EC2', 'AWS ECS', 'Terraform', 'Elasticsearch', 'NPM', 'Ansible', 'Packer', 'GitHub Actions', 'GitHub Self Hosted Runners', 'DataDog'],
  },
  {
    icon: 'compass-drafting',
    industry: 'EdTech SaaS',
    title: 'Dynamic Form Builder',
    description: 'Designed and created a Dynamic Form Building / Administration platform utilizing the open-source VueForm.js library. Implemented a custom GoLang backend for form storage and submission handling. Forms included complex conditional logic, multiple-steps, and signature inputs.',
    tags: ['GoLang', 'Vue.js', 'VueForm.js', 'PostgreSQL', 'Heroku'],
  },
  {
    icon: 'bolt-lightning',
    industry: 'Clean Energy',
    title: 'Renewable Energy Analytics Platform',
    description: 'Built a real-time monitoring dashboard for multi-vendor solar and wind turbine analytics with anomaly detection and multi-channel alerting (SMS, Push, Slack). Integrated YOLO-based AI computer vision for security monitoring and TimeScaleDB for high-frequency sensor data.',
    tags: ['PHP', 'Python', 'Node.js', 'TimeScaleDB', 'PostGIS', 'Vue.js', 'AWS', 'OpenCV', 'YOLO', 'AI', 'Queueing Systems', 'SMA', 'SunGrow', 'eGauge'],
  },
  {
    icon: 'book',
    industry: 'EdTech SaaS',
    title: 'High-Scale Student Testing Platform',
    description: 'Architected and led a 5 person engineering team delivering a standardized testing platform serving 25k–30k concurrent students at 150ms average response time. Implemented caching strategies and queueing mechanisms to sustain throughput at peak load and offload heavy processing tasks.',
    tags: ['PHP', 'MongoDB', 'PostgreSQL', 'Redis', 'Vue.js', 'AWS', 'Team Leadership'],
  },
  {
    icon: 'display',
    industry: 'AdTech',
    title: 'Advertising Analytics & Reporting Platform',
    description: 'Built multi-source ad data aggregation and reporting with serverless AWS Lambda pipelines, real-time Vue.js dashboards, and location-based analytics via PostGIS. Optimized complex PostgreSQL queries to dramatically improve report generation time.',
    tags: ['PHP', 'Node.js', 'PostgreSQL', 'PostGIS', 'Vue.js', 'AWS Lambda', 'Docker'],
  },
  {
    icon: 'atom',
    industry: 'Blockchain',
    title: 'Blockchain Validator Infrastructure',
    description: 'Deployed and automated a bare-metal server fleet in a traditional datacenter for Onomy Protocol validator nodes. Built custom provisioning tooling and a comprehensive monitoring system for validator node health and chain status.',
    tags: ['Node.js', 'Bash', 'Docker', 'Nginx', 'Libvirt', 'Blockchain', 'Onomy Protocol', 'Cosmos', 'Validator Nodes', 'Monitoring'],
  },
  {
    icon: 'screwdriver-wrench',
    industry: 'Infrastructure',
    title: 'Mining Operations Monitoring & Alerting',
    description: 'Built an ELK-stack monitoring and reporting dashboard for large-scale cryptocurrency mining operations. Developed a RabbitMQ-driven automated alerting system integrated with third-party APIs for real-time incident notification.',
    tags: ['Go', 'Python', 'Elasticsearch', 'RabbitMQ', 'Docker', 'AWS', 'CloudFormation'],
  },
  {
    icon: 'store',
    industry: 'Business Services',
    title: 'Custom Website Development',
    description: 'Designed and developed custom websites and web applications tailored to client needs. Everything from initial concept design and branding to final deployment and ongoing maintenance. Static or Dynamic websites including CMS and E-Commerce solutions.',
    tags: ['Web Design', 'HTML', 'CSS', 'Javascript', 'E-Commerce', 'Domain & Hosting', 'Maintenance'],
  }
];

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
      image="services-graphic-wide.svg"
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
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        <LandingBox v-for="cat in cats" :cat="cat" />
      </div>
    </ContentFullSection>

    <ContentFullSection
      id="Projects"
      name="projects"
      title="Portfolio"
      containerClasses="container mx-auto px-5 pb-15"
      backdropClasses=""
      image=""
      :button="false"
    >
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-stretch">
        <PortfolioCard v-for="project in projects" :key="project.title" :project="project" />
      </div>
    </ContentFullSection>

    <ContactSection />

  </div>

</template>


