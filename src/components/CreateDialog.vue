<template>
  <v-dialog v-model="isOpen" max-width="600">
    <v-card>
      <v-card-title>Add New TODO</v-card-title>
      <v-divider />
      <v-card-text class="pt-5 pb-0">
        <v-form ref="form">
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Title"
            placeholder="Please enter TODO title"
            filled
          />
          <v-text-field
            v-model="content"
            :rules="rules"
            label="Content"
            placeholder="Please enter TODO content"
            filled
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="error" text v-text="'Cancel'" @click="isOpen = false" />
        <v-spacer />
        <v-btn color="primary" text v-text="'Submit'" @click="submit" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    content: null,
    rules: [ v => !!v || 'This field is required' ],
    title: null
  }),
  computed: {
    ...mapState(['dialog']),
    isOpen: {
      get () { return this.dialog },
      set (val) { this.setDialog(val) }
    }
  },
  methods: {
    ...mapActions(['createTodo']),
    ...mapMutations(['setDialog']),
    async submit () {
      // Check if content/title are not null and throw error if either are null
      if (this.$refs.form.validate()) {
        await this.createTodo({
          content: this.content,
          title: this.title
        })
        this.isOpen = false
        this.$refs.form.reset()
      }
    }
  }
}
</script>
