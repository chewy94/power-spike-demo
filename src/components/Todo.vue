<template>
  <v-hover v-slot:default="{ hover }">
    <v-card outlined :disabled="todo.deleted && todo.deleted === true">
      <div v-if="hover && todo.deleted !== true" class="todo-hover d-flex transition-fast-in-fast-out secondary" style="height: 100%; cursor: pointer;" @click="removeTodo">
        <span class="primary--text title">Completed?</span>
      </div>
        <v-row align="center">
          <v-col cols="auto" class="pr-1" style="padding-left: 16px; margin-left: 12px;">
            <v-avatar :color="avatarColor" v-text="todo.title.charAt(0)" />
          </v-col>
          <v-col>
            <v-card-title class="subtitle-2 pl-0">
              <span v-text="todo.title" />
              <v-spacer />
              <span class="caption" v-text="time" />
            </v-card-title>
            <v-card-text class="pl-0" v-text="todo.content" />
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
    },
    time () {
      const type = this.todo.deleted ? 'Complete: ' : 'Created: '
      const time = new Date(this.todo.deleted ? this.todo.completedTime * 1000 : this.todo.created * 1000).toLocaleString()

      return type + time
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
  z-index: 1
}
</style>
