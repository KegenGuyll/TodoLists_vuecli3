<template>
<div>
  <nav>
    <div class="row">
       <a href="#" data-target="slide-out" class="sidenav-trigger left"><i class="material-icons">menu</i></a>
       <input id="textbox" type="text" v-model="item_search">
    </div>
  </nav>
  <ul id="slide-out" class="sidenav">
  </ul>
</div>
</template>

<script>
// import db from './firebaseInit'
export default {
  name: 'sidenav',
  data(){
    return{
      item_search: ''
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #66b5c8 !important;
  color: #7dd0e6;
}

#slide-out {
  background-color: #476e76
}

#textbox{
  background-color: #476e766e;
    flex: auto;
    height: 0%;
    width: 50%;
    border-radius: 10px;
    align-content: center;
    margin-left: 13%;
    border-bottom: hidden;
    color: #ffffff
}
</style>

