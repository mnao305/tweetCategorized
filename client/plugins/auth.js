import firebase from '~/plugins/firebase'
import 'firebase/auth'

const provider = new firebase.auth.TwitterAuthProvider()

const auth = {
  // サインイン
  login() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => resolve(result))
            .catch(error => reject(error))
        })
    })
  },
  // サインアウト
  logout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch(error => reject(error))
    })
  },
  // 認証状態の変更検知
  auth() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user))
    })
  }
}

export default auth
