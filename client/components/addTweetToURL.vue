<template>
  <v-dialog
    v-model="flag"
    persistent
    max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">
          Add Tweet
        </span>
      </v-card-title>
      <v-form
        ref="addTweetForm"
        v-model="valid"
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
                  required />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :counter="100"
                  v-model="description"
                  :rules="descriptionRules"
                  label="Description" />
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="toCategory"
                  :items="categorys"
                  item-text="title"
                  label="to Category" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            @click="$store.commit('tweets/toggleFlag', !$store.state.tweets.flag)"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="addTweetSubmit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      URL: '',
      description: '',
      valid: true,
      URLRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 100) || 'URL must be less than 70 characters',
        v =>
          (v &&
            RegExp('^https://twitter.com/[a-z0-9_]+/status/[0-9]+$', 'i').test(
              v
            )) ||
          'URL must be valid(https://twitter.com/userID/status/TweetID)'
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
    ...mapGetters('categorys', ['categorys'])
  },
  methods: {
    async addTweetSubmit() {
      if (this.$refs.addTweetForm.validate()) {
        const tweetID = this.URL.split('/')[5]
        const newTweet = {
          id: tweetID,
          description: this.description
        }
        // タイトルからカテゴリ配列の添字を取得
        let toCategory = this.categorys.filter((item, index) => {
          if (item.title === this.toCategory) return true
        })
        const toCategoryID = this.categorys.indexOf(toCategory[0])

        await this.addTweet({ newTweet, toCategoryID })
        this.flag = false
        this.$refs.addTweetForm.reset()
        // 追加すると表示が崩れるのでMasonry再draw
        setTimeout(() => {
          this.$redrawVueMasonry()
        }, 500)
      }
    },
    ...mapActions('tweets', ['addTweet'])
  }
}
</script>
