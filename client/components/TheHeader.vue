<template>
  <v-toolbar
    clipped-left
    app>
    <v-toolbar-title
      style="cursor: pointer;"
      @click="$router.push('/')">tweetCategorized</v-toolbar-title>
    <v-spacer />
    <v-btn
      v-if="!isAuthenticated"
      @click="login">Login</v-btn>
    <v-btn
      v-else
      @click="$router.push('/dashboard/')">Dashboard</v-btn>
    <v-menu offset-y>
      <v-btn
        slot="activator"
        icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="$router.push('/about')">
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
import auth from '~/plugins/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  asyncData({ store }) {},
  computed: {
    ...mapGetters('users', ['isAuthenticated'])
  },
  methods: {
    login() {
      auth
        .login()
        .then(result => {
          const user = result.user.providerData[0]
          const uid = result.user.uid

          this.setUser({ user, uid })
          this.$router.push('/dashboard/')
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout() {
      this.$store.dispatch('users/logout')
      this.$router.push('/')
    },
    ...mapActions('users', ['setUser'])
  }
}
</script>
