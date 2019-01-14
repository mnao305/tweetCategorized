<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    mobile-break-point="900"
    app>
    <no-ssr>
      <v-list>
        <template v-for="(category, index) in categorys">
          <v-list-tile
            :key="index"
            ripple
            @click="$router.push(`/dashboard/${category.id}`)">
            <v-list-tile-content>
              <v-list-tile-title>{{ category.title }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="category.description">{{ category.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>{{ category.count }}</v-list-tile-action>
            <v-list-tile-action>
              <v-menu
                open-on-hover
                offset-y>
                <v-btn
                  slot="activator"
                  icon
                >
                  <v-icon color="grey lighten-1">add_circle</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="$router.push(`/dashboard/add/fav`)">
                    <v-list-tile-title>いいねから追加</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="$router.push(`/dashboard/add/url`)">
                    <v-list-tile-title>URLから追加</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
            :key="`divider-${index}`"
            dark />
        </template>
      </v-list>
    </no-ssr>
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        persistent
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
            ref="form"
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
                      label="Title"
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
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      // テスト用
      dialog: false,
      title: '',
      description: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 10) || 'Title must be less than 10 characters'
      ],
      descriptionRules: [
        v =>
          `${v}`.length <= 30 || 'Description must be less than 30 characters'
      ],
      valid: true
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.categorys.flag
      },
      set(val) {
        this.$store.commit('categorys/toggleFlag', val)
      }
    },
    ...mapGetters('categorys', ['categorys'])
  },
  methods: {
    async addCategorySubmit() {
      if (this.$refs.form.validate()) {
        let newCategory = {
          id: this.categorys.length,
          title: this.title,
          description: this.description,
          count: 0
        }
        await this.addCategory({ newCategory })
        this.dialog = false
        this.$refs.form.reset()
      }
    },
    ...mapActions('categorys', ['addCategory'])
  }
}
</script>
