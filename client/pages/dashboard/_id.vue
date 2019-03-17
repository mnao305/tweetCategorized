<template>
  <div>
    <v-layout style="position:relative">
      <h3 id="categoryTitle">{{ category.title }}</h3>
      <v-spacer/>
      <v-btn
        color="warning"
        small
        @click="categoryDelete()">
        delete
      </v-btn>
    </v-layout>
    <p v-if="category.description">{{ category.description }}</p>

    <v-layout
      v-masonry
      transition-duration="0s"
      item-selector=".item"
      class="masonry-container">
      <v-flex
        v-masonry-tile
        v-for="tweet in category.tweets"
        :key="tweet.id"
        class="item">
        <v-card>
          <Tweet :id="tweet.tweetID" />
          <v-card-text>
            <span v-if="edit !== tweet.id">{{ tweet.description }}</span>
            <v-textarea
              v-else
              :value="tweet.description" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="editMode(tweet.id)">
              {{ edit !== tweet.id ? 'Edit' : 'Cancel' }}
            </v-btn>
            <v-btn
              v-if="edit !== tweet.id"
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
  async asyncData({ store, route, redirect }) {
    const { id } = route.params
    const categorys = store.state.categorys.categorys
    const flag = categorys.some(e => {
      // eslint-disable-next-line eqeqeq
      return e.id == id
    })

    if (!flag) {
      redirect('/dashboard')
    }
  },
  data() {
    return {
      edit: null,
      category: []
    }
  },
  computed: {
    ...mapGetters('categorys', ['categorys'])
  },
  mounted() {
    this.category = this.categorys.filter((item, index) => {
      if (item.id === this.$route.params.id) return true
    })[0]
    console.log(this.category)

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
    },
    categoryDelete() {
      this.$store.dispatch('categorys/categoryDelete', this.$route.params.id)
    }
  }
}
</script>

<style>
.item {
  width: 280px;
  padding: 0 5px;
}

#categoryTitle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
