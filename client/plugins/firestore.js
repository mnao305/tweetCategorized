import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

const FieldValue = firebase.firestore.FieldValue

export { db, FieldValue }
