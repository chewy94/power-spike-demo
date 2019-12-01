<template>
  <v-footer app color="primary">
    <span class="caption white--text">{{ deletedTodos.length }}/{{ totalTodos }} Completed ({{ (deletedTodos.length / totalTodos * 100).toFixed(2) }}%)</span>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    deletedTodos: [],
    totalTodos: 0
  }),
  computed: {
    ...mapState(['todos'])
  },
  watch: {
    todos: {
      immediate: true,
      handler (val) {
        const deleted = !!localStorage['deleted-todos'] && JSON.parse(localStorage['deleted-todos'])
        this.deletedTodos = deleted !== false ? deleted : []
        this.totalTodos = val.length + this.deletedTodos.length
      }
    }
  }
}
</script>
