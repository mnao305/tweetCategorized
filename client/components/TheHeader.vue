<template>
  <v-toolbar
    clipped-left
    app>
    <v-toolbar-title>tweetCategorized</v-toolbar-title>
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
import firebase from '~/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  asyncData({ store }) {},
  computed: {
    ...mapGetters('users', ['isAuthenticated'])
  },
  methods: {
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          // The signed-in user info.
          const user = result.user.providerData[0]
          this.setUser(user)
          this.$router.push('/dashboard/')
        })
        .catch(error => {
          console.log(error)
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // // The email of the user's account used.
          // const email = error.email
          // // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential
          // ...
        })
    },
    logout() {
      this.$store.commit('users/logout')
      this.$router.push('/')
    },
    ...mapActions('users', ['setUser'])
  }
}
</script>
