<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    mobile-break-point="900"
    app>
    <no-ssr>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile
            :key="index"
            ripple
            @click="$router.push(`/dashboard/${item.id}`)">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="item.description">{{ item.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>{{ item.count }}</v-list-tile-action>
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
                @click="addCategory"
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
export default {
  data() {
    return {
      // テスト用
      items: [
        {
          id: 0,
          title: 'メチャシコ',
          count: 100,
          description: 'えちえちのえち'
        },
        {
          id: 1,
          title: '有能',
          count: 25,
          description: ''
        },
        {
          id: 2,
          title: '後で見る',
          count: 1,
          description: ''
        },
        {
          id: 3,
          title: '参考メモ',
          count: 12,
          description: '技術系のもの'
        },
        {
          id: 4,
          title: '面白い',
          count: 6,
          description: ''
        }
      ],
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
        return this.$store.state.categorybar.flag
      },
      set(val) {
        this.$store.commit('categorybar/toggleFlag', val)
      }
    }
  },
  methods: {
    addCategory() {
      if (this.$refs.form.validate()) {
        let obj = {
          id: this.items.length,
          title: this.title,
          description: this.description,
          count: 0
        }
        this.items.push(obj)
        this.dialog = false
        this.$refs.form.reset()
      }
    }
  }
}
</script>
