<template>
    <div> 
  <nav>
   <a href="#" data-target="slide-out" class="sidenav-trigger left"><i class="material-icons">menu</i></a>
  </nav>
  <ul id="slide-out" class="sidenav">
    

  </ul>
    </div>
</template>

<script>
// import card from './components/Card.vue'

export default {
  name: 'sidenav',
}
</script>

<style scoped>

nav{
  background-color: #66b5c8 !important;
  color: #7dd0e6;
}

#slide-out{
  background-color: #476e76
}
</style>

