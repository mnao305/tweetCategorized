<template>
  <v-toolbar
    clipped-left
    app>
    <v-toolbar-side-icon @click="$store.commit('categorys/toggleFlag', !$store.state.categorys.flag)"/>
    <v-toolbar-title>tweetCategorized</v-toolbar-title>
    <v-spacer />
    <span v-if="isAuthenticated">{{ $store.state.users.user.displayName }}</span>
    <v-menu offset-y>
      <v-btn
        slot="activator"
        icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="isAuthenticated"
          @click="logout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ store }) {},
  computed: {
    ...mapGetters('users', ['isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('users/logout')
      this.$router.push('/')
    }
  }
}
</script>
