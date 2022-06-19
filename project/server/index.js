import fs from 'fs'

import 'dotenv/config'
import express from 'express'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 3003

let currentDate
let todos = [
  'TODO 1',
  'TODO 2'
]

async function downloadImage(url, filepath) {
  const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
  })
  return new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath))
  })
}

app.use(express.json())

app.use(async (req, res, next) => {
  const date = new Date().toISOString().slice(0, 10)
  if (currentDate !== date) {
    currentDate = date

    if (!fs.existsSync(`./files/${currentDate}.jpg`))
      await downloadImage('https://picsum.photos/1200', `./files/${currentDate}.jpg`)
  }
  next()
})

app.get('/api/image', (req, res) => {
  res.sendFile(`/usr/src/app/files/${currentDate}.jpg`)
})

app.get('/api/ping', (req, res) => {
  res.send('pong')
})

app.get('/api/todos', (req, res) => {
  res.send(todos)
})

app.post('/api/todos', (req, res) => {
  const { todo } = req.body
  todos = todos.concat(todo)

  res.status(201).send(todo)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
