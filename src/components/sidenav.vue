<template>
<div>
  <nav>
    <div class="row">
       <a href="#" data-target="slide-out" class="sidenav-trigger left"><i class="material-icons">menu</i></a>
       <ul class="right">
          <li v-if="!isLoggedIn"><router-link to='/login'>Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to='/register'>Register</router-link></li>
          <li v-if="isLoggedIn"><span id="logout" v-on:click="logout">Logout</span></li>
       </ul>
    </div>
  </nav>
  <ul id="slide-out" class="sidenav">
  </ul>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'sidenav',
  data(){
    return{
      isLoggedIn: false,
      currentUser: false
    }
  },
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.go({path: this.$router.path})
      })
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #66b5c8 !important;
  
}

#slide-out {
  background-color: #476e76
}

#logout{
  margin-right: 3vw;
  cursor: pointer;
  color: #ffffff;
}
</style>

