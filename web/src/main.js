import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'


import './assets/main.scss'


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
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
