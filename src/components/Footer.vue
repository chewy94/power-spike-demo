<template>
  <v-footer app color="primary">
    <span class="caption white--text">{{ deletedTodos.length }}/{{ totalTodos }} Completed ({{ percentDone.toFixed(2) }}%)</span>
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
    ...mapState(['todos']),
    percentDone () {
      const percent = this.deletedTodos.length / this.totalTodos * 100

      return percent >= 0 ? percent : 0
    }
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
