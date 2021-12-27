const express = require('express')
const app = express()
const port = 4000

//const fruitStore = ['apple', 'orange', 'grapes'] //fake db
let fruitStore = {
  'ntuc' : ['apple', 'oranges'],
  'cold storage' : ['mango', 'grapes'],
  'sheng shiong' : ['honeydew', 'cempedak'],
}

// READ - crud
app.get('/', (req, res) => {
  res.send(fruitStore)
})

// CREATE - CRUD, Adding a store/fruits
app.post('/create', (req, res) => {
  const query = req.query
  const store = query.store
  const fruit = query.fruit

  if (!(store in fruitStore)) {
    fruitStore[store] = []
  }

  // To check if a fruit is not null or undefined
  if (fruit) {
    fruitStore[store].push(fruit)
  }
  
  res.send(fruitStore)

  // const fruit = query.fruit
  // const store = query.store
  // console.log(fruit)
  // console.log(store)

  // toDoList.push(fruit)
  // res.send(toDoList)
  // res.send(`${fruit} added`)
})

// Update - CRUD, Updating a store
app.patch('/update', (req, res) => {
  const query = req.query
  const store = query.store
  const fruit = query.fruit

  if (!(store in fruitStore))
  {
    res.send('The store does not exist. Please create a store for it')
  }

  fruitStore[store].push(fruit);
  res.send(fruitStore)
})

// DELETE - crud, deleting a fruit from a store object
app.delete('/deleteFruit', (req,res) => {
  const key = req.query
  const fruit = key.fruit
  const store = key.store
  let response

  if (!(store in fruitStore)) {
    response = 'The store does not exist. Please create a store for it'
  } else if (!(fruitStore[store].includes(fruit))) {
    response = `The ${fruit} is not found in the ${store}`
  } else {
    fruitStore[store].splice(fruitStore[store].indexOf(fruit), 1)
    response = fruitStore
  }

  res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})