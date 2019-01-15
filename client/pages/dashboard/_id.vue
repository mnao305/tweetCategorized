<template>
  <div>
    <v-layout
      v-masonry
      transition-duration="0s"
      item-selector=".item"
      class="masonry-container">
      <v-flex
        v-masonry-tile
        v-for="tw in tweets[$route.params.id].tweet"
        :key="tw.id"
        class="item">
        <v-card>
          <Tweet :id="tw.id" />
          <v-card-text>
            <span v-if="edit !== tw.id">{{ tw.description }}</span>
            <v-textarea
              v-else
              :value="tw.description" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="editMode(tw.id)">
              {{ edit !== tw.id ? 'Edit' : 'Cancel' }}
            </v-btn>
            <v-btn
              v-if="edit !== tw.id"
              color="warning">
              Delete
            </v-btn>
            <v-btn
              v-else
              color="success">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tweet
  },
  async asyncData({ store, route, error }) {
    const { id } = route.params
    const categorys = store.state.categorys.categorys
    const flag = categorys.some(e => {
      // eslint-disable-next-line eqeqeq
      return e.id == id
    })

    if (!flag) {
      error({ statusCode: 404 })
    }

    // await store.dispatch('tweets')
  },
  data() {
    return {
      edit: null
    }
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

      this.$redrawVueMasonry()
      loadFlag++
    }, 500)
  },
  methods: {
    editMode(index) {
      this.edit = this.edit !== index ? index : null
      setTimeout(() => {
        this.$redrawVueMasonry()
      }, 100)
    }
  }
}
</script>

<style>
.item {
  width: 280px;
  padding: 0 5px;
}
</style>
