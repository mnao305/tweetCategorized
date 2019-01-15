<template>
  <div>
    <div
      v-masonry
      transition-duration="0s"
      item-selector=".item"
      class="masonry-container">
      <div
        v-masonry-tile
        v-for="(tw, index) in tweets[$route.params.id]"
        :key="index"
        class="item">
        <Tweet :id="tw.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tweet
  },
  async asyncData({ store }) {
    // await store.dispatch('tweets')
  },
  computed: {
    ...mapGetters('tweets', ['tweets'])
  },
  mounted() {
    // 一回だけじゃ上手くいかないことがあったのでそれ用の対応
    let loadFlag = 0
    const intervalID = setInterval(() => {
      if (loadFlag >= 5) {
        clearInterval(intervalID)
      }
      console.log(loadFlag)

      this.$redrawVueMasonry()
      loadFlag++
    }, 500)
  }
}
</script>

<style>
.item {
  max-width: 250px;
  padding: 0 5px;
}
</style>
