<template>
  <v-app>
    <sidenav/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import sidenav from './components/sidenav'
import card from './components/Card'


export default {
  name: 'App',
  components: {
    sidenav,
    card
  },
  data () {
    return {
      //
    }
  }
}
</script>
