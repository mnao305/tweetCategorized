<template>
  <v-dialog
    v-model="flag"
    max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">
          Add Tweet
        </span>
      </v-card-title>
      <v-form
        ref="addTweetForm"
        v-model="addTweetValid"
        lazy-validation
      >
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :counter="100"
                  v-model="URL"
                  :rules="URLRules"
                  label="TweetURL*"
                  required
                  @input="changeURL" />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :counter="100"
                  v-model="description"
                  :rules="descriptionRules"
                  label="Memo" />
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="toCategory"
                  :items="categorys"
                  item-text="title"
                  item-value="id"
                  label="to Category"
                  @input="$refs.addTweetForm.validate()"
                  @change="$refs.addTweetForm.validate()" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>

          <v-btn
            @click="$store.commit('tweets/toggleFlag', !$store.state.tweets.flag);"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="!addTweetValid"
            color="success"
            @click="addTweetSubmit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-card-actions v-if="tweetCheckFlag">
        <Tweet
          v-if="`${URL}`.split('/')[5]"
          :id="`${URL}`.split('/')[5]"
          style="margin: 0 auto;max-width: 90%;" />
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  data() {
    return {
      URL: '',
      description: '',
      addTweetValid: true,
      tweetCheckFlag: true,
      duplicate: false,
      URLRules: [
        v => !!v || 'URL is required',
        v => (v && v.length <= 100) || 'URL must be less than 70 characters',
        v =>
          (v &&
            RegExp('^https://twitter.com/[a-z0-9_]+/status/[0-9]+$', 'i').test(
              v
            )) ||
          'URL must be valid(https://twitter.com/userID/status/TweetID)',
        v => (v && this.duplicateCheck(v)) || 'Duplicate'
      ],
      descriptionRules: [
        v =>
          `${v}`.length <= 100 || 'Description must be less than 30 characters'
      ]
    }
  },
  computed: {
    flag: {
      get() {
        return this.$store.state.tweets.flag
      },
      set(val) {
        this.$store.commit('tweets/toggleFlag', val)
      }
    },
    toCategory: {
      get() {
        return this.$store.state.tweets.fromCategory
      },
      set(fromCategory) {
        this.$store.commit('tweets/changeFromCatagory', fromCategory)
      }
    },
    ...mapGetters('categorys', ['categorys']),
    ...mapGetters('tweets', ['tweets'])
  },
  methods: {
    async addTweetSubmit() {
      if (this.$refs.addTweetForm.validate()) {
        const tweetID = this.URL.split('/')[5]
        const newTweet = {
          id: tweetID,
          description: this.description
        }

        await this.addTweet({ newTweet })
        this.flag = false
        this.$refs.addTweetForm.reset()
        // 追加すると表示が崩れるのでMasonry再draw
        setTimeout(() => {
          this.$redrawVueMasonry()
        }, 500)
      }
    },
    async changeURL() {
      if (this.$refs.addTweetForm.validate()) {
        this.tweetCheckFlag = !this.tweetCheckFlag
        setTimeout(() => {
          this.tweetCheckFlag = !this.tweetCheckFlag
        }, 100)
      }
    },
    duplicateCheck(e) {
      if (this.toCategory != null) {
        let tweet = this.tweets[this.toCategory].tweet
        for (let i = 0; i < tweet.length; i++) {
          if (e.split('/')[5] === tweet[i].id) {
            return false
          }
        }
      }
      return true
    },
    ...mapActions('tweets', ['addTweet'])
  }
}
</script>
