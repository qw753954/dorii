import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import CKEditor from '@ckeditor/ckeditor5-vue';

import AOS from 'aos';
import 'aos/dist/aos.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, {
  Autoplay, Navigation, Thumbs, Mousewheel, Pagination, Scrollbar,
} from 'swiper';

import App from './App.vue';
import router from './router';

import toCurrency from './assets/javascript/toCurrency';
import toLocalDate from './assets/javascript/toLocalDate';
import httpMsgState from './assets/javascript/pushMsgState';

import CustomLoading from './components/Loading.vue';

defineRule('required', required);
defineRule('email', email);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  velidateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW');

// sweetalert
const options = {
  toast: true,
  position: 'center',
  showConfirmButton: false,
  confirmButtonColor: '#ff7674',
  cancelButtonColor: '#aaa',
  cancelButtonText: '取消',
  timer: 2000,
};

// swiper
SwiperCore.use([Navigation, Pagination, Mousewheel, Thumbs, Scrollbar, Autoplay]);

// aos
AOS.init({
  offset: 100,
  duration: 600,
  easing: 'ease-in-out',
  // once: true,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.use(VueSweetalert2, options);
app.use(pinia);

app.component('Loading', Loading);
app.component('CustomLoading', CustomLoading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('swiper', Swiper);
app.component('swiper-slide', SwiperSlide);

// 加到 vue 的全域屬性下
app.config.globalProperties.$toCurrency = toCurrency;
app.config.globalProperties.$toLocalDate = toLocalDate;
app.config.globalProperties.$httpMsgState = httpMsgState;

app.mount('#app');
