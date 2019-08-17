import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID=1
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default }

// const database = firebase.database()

// const expenses = [
//     {
//         description: 'Bubble Gum',
//         note: '',
//         amount: 120,
//         createdAt: 0
//     }, {
//         description: 'Rent',
//         note: '',
//         amount: 59000,
//         createdAt: 125412321
//     }, {
//         description: 'Gas Bill',
//         note: '',
//         amount: 15000,
//         createdAt: 0
//     }    
// ]

// database.ref('expenses').on('child_changed', (snap) => {
//     console.log(snap.val())
// })

// expenses.forEach(expense => {
//     database.ref('expenses').push(expense)
// })

// database.ref('expenses')
//     .on('value', (snap) => {
//         let expenses = []
//         snap.forEach(childSnap => {
//             expenses.push({
//                 id: childSnap.key,
//                 ...childSnap.val()
//             })
//         })
//         console.log(expenses)
//     })

// database.ref('expenses')
//     .once('value')
//     .then((snap) => {
//         let expenses = [];
//         snap.forEach(childSnap => {
//             expenses.push({
//                 id: childSnap.key,
//                 ...childSnap.val()
//             })
//         })
//         console.log(expenses)
//     })

// const onvalueChange = database.ref().on('value', (snap) => {
//     const val = snap.val()
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// }, (err) => { console.error('error fetching data:', err)})


// database.ref().set({
//     name: "tru",
//     age: 20,
//     isSingle: true,
//     stresslevel: 6,
//     location: {
//         city: 'Scranton',
//         country: 'United States'
//     },
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     }
// }).then(() => {
//     console.log('data saved.')
// }).catch((err) => {
//     console.log('data failed to save', err)
// })

// database.ref().update({
//     stresslevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// database.ref('age').set(21);
// database.ref('location/city').set('Stanford');

// database.ref('attributes').set({
//     height: 6.1,
//     weight: 80
// }).then(() => {
//     console.log('attributes added')
// }).catch((err) => {
//     console.log('failed to write attributes.', err)
// })

// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('data removed successfully')
//     }).catch(() => {
//         console.log('failed to remove data')
//     })

// database.ref('isSingle')
//     .set(null)

// database.ref().update({
//     name: 'draego',
//     age: 19,
//     job: 'Dev',
//     'location/city': 'Boston',
//     isSingle: null
// })

