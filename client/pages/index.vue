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
      color="info"
      @click="login">
      Register / Login
    </v-btn>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  layout: 'noCategoryBar',
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
          const token = result.credential.accessToken
          const secret = result.credential.secret
          this.setUser(user)
          this.setToken({ token, secret })
          this.$router.push('/dashboard/0')
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
    ...mapActions('users', ['setUser', 'setToken'])
  }
}
</script>
