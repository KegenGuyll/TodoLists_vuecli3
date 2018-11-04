/* eslint-disable */
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from 'vue-router';
import Home from './components/Card';
import Login from './components/login';
import Register from './components/Register';
import firebase from 'firebase';
import './components/firebaseInit';


let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login', 
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register', 
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  }
];




let router = new VueRouter({
  routes
})

router.beforeEach(( to, from, next) => {
  //Check for requiedAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    //Check if NOT logged in 
    if (!firebase.auth().currentUser){
      //Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      }) 
    }
    else{
      //Proceed to the route
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){

    //Check if is logged in 
    if (firebase.auth().currentUser){
      //Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      }) 
    }
    else{
      //Proceed to the route
      next();
    }

  }
  else{
    next()
  }
})

Vue.config.productionTip = false



export default router;