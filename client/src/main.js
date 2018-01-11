import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
import moment from 'moment';

import Header from './components/header.vue';
import Footer from './components/footer.vue';
import Home from './components/home.vue';
import GalleryFlowers from './components/gallery.vue';
import AboutFlower from './components/about-flower.vue';
import Articles from './components/articles.vue';
import OneArticle from './components/article.vue';
import Registration from './components/registration.vue';
import Authorization from './components/authorization.vue';
import AddArticle from './components/admin/add-article.vue';
import EditArticle from './components/admin/edit-article.vue';
import PasswordRecovery from './components/password-recovery.vue';

Vue.use(VueRouter);

import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation);
export const  Validator = SimpleVueValidation.Validator;

const router = new VueRouter({
  routes:[

    {path:'/', component: Home},
    { path: '/gallery', component: GalleryFlowers},
    { path: '/catalog/:id', component: AboutFlower},
    { path: '/articles', component: Articles},
    { path: '/article/:id', component: OneArticle},
    { path: '/registration', component: Registration},
    { path: '/authorization', component: Authorization},
    { path: '/add-article', component: AddArticle},
    { path: '/edit-article/:id', component: EditArticle},
    { path: '/password-recovery', component: PasswordRecovery}
  ]
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
