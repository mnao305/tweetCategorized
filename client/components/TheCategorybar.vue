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
      <addCategory />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import addCategory from '~/components/addCategory.vue'

export default {
  components: {
    addCategory
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
  }
}
</script>
