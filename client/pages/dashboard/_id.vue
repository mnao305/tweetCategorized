<template>
  <div>
    <div
      v-for="tw in tweets"
      :key="tw">
      <Tweet :id="tw" />
    </div>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  data() {
    return {
      tweets: [
        '1084378745568354304',
        '1072787982413754368',
        '1083332271292235776'
      ]
    }
  },
  mounted() {
    // this.tweets = this.$axios.$get('http://127.0.0.1:8000/api/fav')
  }
}
</script>
