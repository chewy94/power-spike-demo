<template>
  <v-container>
    <Todo v-for="todo in allTodos" :key="todo.id" :todo="todo" class="mb-2" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Todo from './Todo'

export default {
  name: 'HelloWorld',
  components: {
    Todo
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
        const test = deleted.map(t => {
          return {
            ...t,
            deleted: true
          }
        })
        return this.todos.concat(test)
      } else {
        return this.todos
      }
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
