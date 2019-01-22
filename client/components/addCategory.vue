<template>
  <v-dialog
    v-model="dialog"
    max-width="600px">
    <v-btn slot="activator">
      Add Category
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">
          Add Category
        </span>
      </v-card-title>
      <v-form
        ref="addCategoryForm"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :counter="10"
                  v-model="title"
                  :rules="titleRules"
                  label="Title*"
                  required />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  :rules="descriptionRules"
                  :counter="30"
                  label="Description" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="addCategorySubmit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      title: '',
      description: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 10) || 'Title must be less than 10 characters',
        v => (v && !this.categorys.some(this.duplicateCheck)) || 'Duplicate'
      ],
      descriptionRules: [
        v =>
          `${v}`.length <= 30 || 'Description must be less than 30 characters'
      ],
      valid: true
    }
  },
  computed: {
    ...mapGetters('categorys', ['categorys'])
  },
  methods: {
    async addCategorySubmit() {
      if (this.$refs.addCategoryForm.validate()) {
        const nextID = this.categorys[0]
          ? Number(this.categorys[this.categorys.length - 1].id) + 1
          : '0'
        const payload = {
          id: `${nextID}`,
          title: this.title,
          description: this.description
        }

        await this.newCategory({ payload })
        await this.addCategory(nextID)
        this.dialog = false
        this.$refs.addCategoryForm.reset()
        this.$router.push(`/dashboard/${nextID}`)
      }
    },
    duplicateCheck(e) {
      return e.title === this.title
    },
    ...mapActions('categorys', ['newCategory']),
    ...mapActions('tweets', ['addCategory'])
  }
}
</script>
