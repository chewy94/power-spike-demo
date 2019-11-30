import axios from 'axios'

class Api {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.VUE_APP_API_ENDPOINT,
      headers: {
        'Authorization': `Bearer ${process.env.VUE_APP_API_KEY}`
      }
    })
  }
  async getTodos () {
    try {
      const res = await this.axios.get()

      return res.data.todos
    } catch (err) {
      console.error(err)
    }
  }
  async createTodo (todo) {
    try {
      return this.axios.post('new', todo)
    } catch (err) {
      console.error(err)
    }
  }
  async deleteTodo (id) {
    try {
      return this.axios.delete(`delete/${id}`)
    } catch (err) {
      console.error(err)
    }
  }
}

export default new Api()
