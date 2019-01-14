<template>
  <div>
    <div
      v-masonry
      transition-duration="0s"
      item-selector=".item"
      class="masonry-container">
      <div
        v-masonry-tile
        v-for="(tw, index) in tweets"
        :key="index"
        class="item">
        <Tweet :id="tw" />
      </div>
    </div>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  async asyncData() {
    return {
      // テストデータ
      tweets: [
        '1084378745568354304',
        '1072787982413754368',
        '1083332271292235776',
        '1083320027539894272',
        '1083602018294411266',
        '1084367818198474752',
        '1084363838907019266',
        '1079307918401368064'
      ]
    }
  },
  mounted() {
    // 一回だけじゃ上手くいかないことがあったのでそれ用の対応
    let loadFlag = 0
    const intervalID = setInterval(() => {
      if (loadFlag >= 10) {
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
