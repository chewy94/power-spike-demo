<template>
  <v-hover v-slot:default="{ hover }">
    <v-card outlined :disabled="todo.deleted && todo.deleted === true">
      <div v-if="hover && todo.deleted !== true" class="todo-hover d-flex transition-fast-in-fast-out primary darken-1" style="height: 100%; cursor: pointer;" @click="removeTodo">
        <!-- <v-btn color="error" v-text="'Remove TODO'" @click="removeTodo" /> -->
        <span class="white--text">Completed?</span>
      </div>
        <v-row align="center">
          <v-col cols="auto" class="ml-3 pr-0" style="padding-left: 24px;">
            <v-avatar :color="avatarColor" v-text="todo.title.charAt(0)" />
          </v-col>
          <v-col>
            <v-card-title class="subtitle-2">
              <span v-text="todo.title" />
              <v-spacer />
              <span v-text="new Date(todo.created * 1000).toLocaleString()" />
            </v-card-title>
            <v-card-text v-text="todo.content" />
          </v-col>
        </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    todo: {
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    colors: [ 'purple lighten-2', 'green darken-1', 'red lighten-3', 'blue lighten-2' ]
  }),
  computed: {
    // Just a fun bit to generate a random color for the TODO avatar
    avatarColor () {
      return this.colors[Math.floor(Math.random() * 1000) % this.colors.length]
    }
  },
  methods: {
    ...mapActions(['deleteTodo']),
    removeTodo () {
      this.deleteTodo(this.todo.id)
    }
  }
}
</script>

<style>
.todo-hover {
  position: absolute;
  bottom: 0;
  opacity: .75;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 100
}
</style>
