<template>
  <v-dialog
    v-model="categoryEditFlag"
    max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit</span>
      </v-card-title>
      <v-form
        ref="editCategoryForm"
        v-model="valid"
        lazy-validation>
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
              <v-flex xs12>gh
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
          <v-spacer />
          <v-btn @click="categoryEditFlag = false">Close</v-btn>
          <v-btn
            color="success"
            @click="saveCategoryEdit">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      title: '',
      description: '',
      category: [],
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
    categoryEditFlag: {
      get() {
        return this.$store.state.categorys.categoryEditFlag
      },
      set(val) {
        this.$store.commit('categorys/toggleCategoryEditFlag', val)
        this.resetFormData()
      }
    },
    ...mapGetters('categorys', ['categorys'])
  },
  mounted() {
    const categorys = this.$store.state.categorys.categorys
    this.category = categorys.filter((item, index) => {
      if (item.id === this.$route.params.id) return true
    })[0]

    this.resetFormData()
  },
  methods: {
    duplicateCheck(e) {
      if (e.id === this.$route.params.id) {
        return false
      } else {
        return e.title === this.title
      }
    },
    saveCategoryEdit() {
      const index = this.categorys.indexOf(this.category)
      const id = this.category.id
      const title = this.title
      const description = this.description

      this.editCategory({
        index,
        id,
        title,
        description
      })
      this.categoryEditFlag = false
    },
    resetFormData() {
      this.title = this.category.title
      this.description = this.category.description
    },
    ...mapActions('categorys', ['editCategory'])
  }
}
</script>
