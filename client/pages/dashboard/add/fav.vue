<template>
  <div>
    <p>※非公開アカウントのツイートは取得できません。</p>
    <v-layout
      v-masonry
      v-if="favTweets != null"
      transition-duration="0s"
      item-selector=".item"
      class="masonry-container">
      <v-flex
        v-masonry-tile
        v-for="tweet in favTweets"
        :key="tweet.id_str"
        class="item">
        <v-card>
          <Tweet :id="tweet.id_str" />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              @click="addTweet(tweet)">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import axios from 'axios'
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  data() {
    return {
      favTweets: null
    }
  },
  computed: {
    token: {
      get() {
        return this.$store.state.users.token
      }
    },
    flag: {
      get() {
        return this.$store.state.categorys.addTweetFlag
      },
      set(val) {
        this.$store.commit('categorys/toggleAddTweetFlag', val)
      }
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(idToken => {
            axios
              .get(
                'https://us-central1-tweetcategorized.cloudfunctions.net/api/twitter/getfav',
                {
                  headers: {
                    accessToken: this.token.accessToken,
                    accessTokenSecret: this.token.accessTokenSecret,
                    Authorization: `Bearer ${idToken}`
                  }
                }
              )
              .then(res => {
                console.log(res.data)
                this.favTweets = res.data
                // 一回だけじゃ上手くいかないことがあったのでそれ用の対応
                let loadFlag = 0
                const intervalID = setInterval(() => {
                  if (loadFlag >= 10) {
                    clearInterval(intervalID)
                  }

                  this.$redrawVueMasonry()
                  loadFlag++
                }, 500)
              })
          })
      } else {
        this.$store.dispatch('users/logout')
        this.$router.push('/')
      }
    })
  },
  methods: {
    addTweet(tweet) {
      const url = `https://twitter.com/${tweet.user}/status/${tweet.id_str}`
      this.$store.commit('categorys/setTweetURL', url)
      this.flag = true
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
