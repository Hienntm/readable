const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: "How to Select a Puppy That's Right for You",
    body: "Though all puppies are incredibly cute, not all are a good fit for your lifestyle. With the proper research and preparation, you can find a dog who will be a great addition to the family. The decision to adopt is far too important to be based on puppy-love-at-first-sight. The incredible range of breeds, exercise needs and temperaments makes it imperative that you do your homework. All puppies eventually grow to be adults, so choosing a dog who fits your lifestyle is the best way to ensure that your decision won’t end in regret. After taking the time to research and compare dog breeds, you’ll have a better sense about which puppies are likely to grow up to be couch potatoes and which might make good jogging partners.",
    author: 'Alohaha',
    category: 'dogs',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Why Do Cats Purr?',
    body: "Purring is the most common sound cats make. Yet we know less about it than meowing, chirping, chattering, hissing, and growling. Yes, cats purr when they're content. When yours is curled up in the sun, you may hear a gentle rumble as he breathes in and out. Touch him, and you feel a little quiver. It's almost as if he's sending out waves of calm. But you shouldn't assume that sound means your cat is in a good mood. Or that it's the only time you'll hear it. Cats purr to communicate other emotions and needs, too. What if you pick your cat up and hold him? Does he purr because he likes it -- or because he's nervous? Although you'll never know exactly what yours is saying when he purrs, research from animal experts, along with considering the situation, lets you make an informed guess.",
    author: 'Alohaha',
    category: 'cats',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "7li5oo4yu7m11p83piay": {
    id: '7li5oo4yu7m11p83piay',
    timestamp: 1468479867960,
    title: "Reading your parrot's body language",
    body: "Learning to recognize your parrot’s healthy body language will help you know when he is feeling fine or when he’s ill, as well as when he wants attention or food. It will also help you avoid receiving a nasty bite. Most parrots are an open book in terms of body language. Once you know the signs, it’s not difficult to tell when your bird is happy, sleepy, terrified, or simply excited just by noticing his stance.",
    author: 'Alohaha',
    category: 'birds',
    voteScore: 45,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}