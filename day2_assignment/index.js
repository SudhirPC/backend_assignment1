const express = require('express')

const app = express()

app.get('/', (req, res) => {
 
  res.send('hello')
})

const array = ['subconcious mind', 'panchatrant ki kahani','harry potter','Atime to kill']
app.get('/books', (req, res) => {
  res.send(array)

})

app.listen(3500, () => {
  console.log('listening on port 3500')
})
