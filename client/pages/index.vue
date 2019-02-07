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
import auth from '~/plugins/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'noCategoryBar',
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
          const token = {
            accessToken: result.credential.accessToken,
            accessTokenSecret: result.credential.secret
          }

          this.setUser({ user, uid, token })
          this.$router.push('/dashboard/')
        })
        .catch(error => {
          console.log(error)
        })
    },
    ...mapActions('users', ['setUser'])
  }
}
</script>
