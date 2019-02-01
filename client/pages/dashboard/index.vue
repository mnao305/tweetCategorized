<template>
  <div>
    左から選択してね
  </div>
</template>

<script>
import auth from '~/plugins/auth'

export default {
  async mounted() {
    auth.auth().then(user => {
      if (!user) {
        this.$router.push('/')
      }
    })
  }
}
</script>
