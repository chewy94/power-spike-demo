import Vue from 'vue'
import Vuex from 'vuex'
import api from '../lib/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: false,
    todos: []
  },
  mutations: {
    addTodo (state, payload) { state.todos.push(payload) },
    removeTodo (state, payload) {
      const index = state.todos.findIndex(t => t.id === payload)

      if (index > -1) {
        const removed = state.todos.splice(index, 1)

        let deleted = localStorage['deleted-todos']
        if (deleted) {
          deleted = JSON.parse(deleted)
          deleted.push(removed[0])
        } else deleted = removed

        localStorage['deleted-todos'] = JSON.stringify(deleted)
      }
    },
    setDialog (state, payload) { state.dialog = payload },
    setTodos (state, payload) { state.todos = payload }
  },
  actions: {
    async getTodos ({ commit }) {
      commit('setTodos', await api.getTodos())
    },
    async createTodo ({ commit, state }, payload) {
      const res = await api.createTodo(payload)

      if (res.status === 201) {
        // Have to query API to get newly created item's ID
        // as it is not returned from POST
        const newTodos = await api.getTodos()

        newTodos.forEach(nt => {
          if (state.todos.findIndex(t => t.id === nt.id) === -1) {
            commit('addTodo', nt)
          }
        })
      } else return new Error('New todo was not created')
    },
    async deleteTodo ({ commit, state }, payload) {
      const res = await api.deleteTodo(payload)

      if (res.status === 204) {
        commit('removeTodo', payload)
      } else return new Error('Todo was not deleted')
    }
  }
})
