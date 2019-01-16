<template>
  <div class="text-xs-center">
    <h1>Top Page!</h1>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <p>hogefugahogefugahogefugahogefugahogefugahogefuga</p>
    <v-btn
      v-if="!isAuthenticated"
      color="info"
      @click="login">
      Register / Login
    </v-btn>
    <v-btn
      v-else
      color="info"
      @click="$router.push('/dashboard/')">
      Go dashboard
    </v-btn>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'noCategoryBar',
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
    ...mapActions('users', ['setUser'])
  }
}
</script>
