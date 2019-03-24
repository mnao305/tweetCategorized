<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    mobile-break-point="900"
    app>
    <no-ssr>
      <v-list>
        <template v-for="category in categorys">
          <v-list-tile
            :key="category.id"
            ripple
            @click="$router.push(`/dashboard/${category.id}`)">
            <v-list-tile-content>
              <v-list-tile-title>{{ category.title }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="category.description">{{ category.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>{{ Object.keys(category.tweets).length }}</v-list-tile-action>
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
                  <v-list-tile @click="fromCategory = category.id;$router.push(`/dashboard/add/fav`)">
                    <v-list-tile-title>いいねから追加</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="fromCategory = category.id;flag = true">
                    <v-list-tile-title>URLから追加</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
            :key="`divider-${category.id}`"
            dark />
        </template>
      </v-list>
    </no-ssr>
    <div class="text-xs-center">
      <addCategory />
    </div>
    <addTweetToURL />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import addCategory from '~/components/addCategory.vue'
import addTweetToURL from '~/components/addTweetToURL.vue'

export default {
  components: {
    addCategory,
    addTweetToURL
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
    flag: {
      get() {
        return this.$store.state.categorys.addTweetFlag
      },
      set(val) {
        this.$store.commit('categorys/toggleAddTweetFlag', val)
      }
    },
    fromCategory: {
      get() {
        return this.$store.state.categorys.fromCategory
      },
      set(fromCategory) {
        this.$store.commit('categorys/changeFromCatagory', fromCategory)
      }
    },
    ...mapGetters('categorys', ['categorys'])
  },
  mounted() {
    this.$store.dispatch('categorys/setCategorys')
  }
}
</script>
