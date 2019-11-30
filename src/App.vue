<template>
  <v-app>
    <CreateDialog />
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
      <HelloWorld :showComplete="showComplete" />
    </v-content>
    <v-footer app color="primary">
      <span class="caption white--text">{{ deletedTodos.length }}/{{ totalTodos }} Completed ({{ (deletedTodos.length / totalTodos * 100).toFixed(2) }}%)</span>
    </v-footer>
  </v-app>
</template>

<script>
import CreateDialog from './components/CreateDialog'
import HelloWorld from './components/HelloWorld'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    CreateDialog,
    HelloWorld
  },
  data: () => ({
    deletedTodos: [],
    showComplete: false,
    totalTodos: 0
  }),
  computed: {
    ...mapState(['todos'])
  },
  mounted () {
    this.showComplete = JSON.parse(localStorage['showComplete'] || false)
  },
  watch: {
    showComplete (val) {
      localStorage['showComplete'] = val
    },
    todos: {
      immediate: true,
      handler (val) {
        const deleted = !!localStorage['deleted-todos'] && JSON.parse(localStorage['deleted-todos'])
        this.deletedTodos = deleted !== false ? deleted : []
        this.totalTodos = val.length + this.deletedTodos.length
      }
    }
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
