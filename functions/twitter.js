const Twit = require('twit')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
admin.initializeApp()

const express = require('express')
const router = express.Router()

router.get('/getfav', (req, res) => {
  if (
    req.header('Authorization') &&
    req.header('accessToken') &&
    req.header('accessTokenSecret')
  ) {
    const idToken = req.header('Authorization').split(' ')[1]
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const twitter = new Twit({
          consumer_key: functions.config().twitter.apikey,
          consumer_secret: functions.config().twitter.apisecret,
          access_token: req.header('accessToken'),
          access_token_secret: req.header('accessTokenSecret')
        })
        twitter.get('favorites/list', { count: 50 }, (_, data) => {
          const favTweets = []
          for (let i = 0; i < data.length; i++) {
            // 鍵垢のツイートは除外する
            if (!data[i].user.protected) {
              const obj = {}
              obj.id_str = data[i].id_str
              obj.user = data[i].user.screen_name
              favTweets.push(obj)
            }
          }
          res.send(favTweets)
        })
      })
      .catch(() => {
        res.send('auth Error')
      })
  } else {
    res.send('non auth')
  }
})

router.get('/idcheck', (req, res) => {
  if (
    req.header('Authorization') &&
    req.header('accessToken') &&
    req.header('accessTokenSecret') &&
    req.query.id
  ) {
    const idToken = req.header('Authorization').split(' ')[1]
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async decodedToken => {
        const twitter = new Twit({
          consumer_key: functions.config().twitter.apikey,
          consumer_secret: functions.config().twitter.apisecret,
          access_token: req.header('accessToken'),
          access_token_secret: req.header('accessTokenSecret')
        })

        let statusCheck
        try {
          await twitter.get('statuses/show', {
            id: req.query.id
          })
          statusCheck = true
        } catch (e) {
          statusCheck = false
        }
        res.send(statusCheck)
      })
      .catch(() => {
        res.send('auth Error')
      })
  } else {
    res.send('non auth')
  }
})

module.exports = router
