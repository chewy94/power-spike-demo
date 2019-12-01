<template>
  <v-container>
    <todo v-for="todo in allTodos" :key="todo.id" :todo="todo" class="mb-2" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Todo from '../components/Todo'

export default {
  name: 'Home',
  components: {
    'todo': Todo
  },
  props: {
    showComplete: {
      required: true,
      default: false
    }
  },
  computed: {
    ...mapState(['todos']),
    allTodos () {
      let deleted = localStorage['deleted-todos']
      if (deleted && this.showComplete) {
        deleted = JSON.parse(localStorage['deleted-todos'])
        const removed = deleted.map(t => {
          return {
            ...t,
            deleted: true
          }
        })
        return this.todos.concat(removed)
      } else {
        return this.todos
      }
    }
  },
  watch: {
    showComplete (val) {
      localStorage['showComplete'] = val
    }
  },
  mounted () {
    this.getTodos()
  },
  methods: {
    ...mapActions(['getTodos'])
  }
}
</script>
