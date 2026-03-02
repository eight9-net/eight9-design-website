import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue'
import router from './router'
import { useFormatPhone } from './composables/utils';

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse, faCameraRetro, faBook, faPhone, faEnvelope, faBars, faLocationDot, faAtom, faScrewdriverWrench, faStar, faCheck, faList,
  faAt, faQuestion, faUser, faEye, faFilePdf, faChevronLeft, faChevronRight, faXmark, faDisplay, faRightLong, faCode, faStore,
  faCompassDrafting, faCloud
} from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faCameraRetro, faBook, faPhone, faEnvelope, faBars, faLocationDot, faAtom, faScrewdriverWrench, faStar, faCheck, faList,
  faAt, faQuestion, faUser, faEye, faFilePdf, faChevronLeft, faChevronRight, faXmark, faDisplay, faRightLong, faCode, faStore,
  faCompassDrafting, faCloud
);


/* Initialize */
const app = createApp(App)
const pinia = createPinia();
app.use(pinia);



// Global Variables
let siteProperties = {
  companyName:      'Eight9 Design Network, Inc.',
  companyNameShort: 'Eight9 Design Network',
  contactEmail:     'info@eight9.net',
  contactPhone:     '+19513156113',
  companyAddress:   '1968 S. Coast Hwy #2707, Laguna Beach, CA 92651',
};
siteProperties.contactPhoneFormatted = useFormatPhone(siteProperties.contactPhone);
app.config.globalProperties.siteProperties = siteProperties;
app.provide('siteProperties', siteProperties);


// Global Components
import ContentLeftSection from './components/ContentLeftSection.vue';
import ContentRightSection from './components/ContentRightSection.vue';
import ContentFullSection from './components/ContentFullSection.vue';
import ContactButton from './components/ContactButton.vue';
app.component('ContentLeftSection', ContentLeftSection);
app.component('ContentRightSection', ContentRightSection);
app.component('ContentFullSection', ContentFullSection);
app.component('ContactButton', ContactButton);

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
