<template>
  <v-app>
    <create-dialog />
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center title">
        PowerSpike
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="setDialog(true)"
      >
        <span class="mr-2">New TODO</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-checkbox v-model="showComplete" class="caption" label="Show Complete?" hide-details />
      </template>
    </v-app-bar>
    <v-content>
      <home :showComplete="showComplete" />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import CreateDialog from './components/CreateDialog'
import Footer from './components/Footer'
import Home from './views/Home'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    'create-dialog': CreateDialog,
    'app-footer': Footer,
    'home': Home
  },
  data: () => ({
    showComplete: false
  }),
  mounted () {
    this.showComplete = JSON.parse(localStorage['showComplete'] || false)
  },
  methods: {
    ...mapMutations(['setDialog'])
  }
}
</script>

<style>
.caption .v-label {
  font-size: 14px !important;
}
</style>
