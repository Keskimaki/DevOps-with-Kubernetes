import fs from 'fs'

import 'dotenv/config'
import express from 'express'
import axios from 'axios'
import { QueryTypes } from 'sequelize'

import sequelize from './db.js'

const app = express()
const port = process.env.PORT || 3003

let currentDate

const downloadImage = async (url, filepath) => {
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

app.get('/api/todos', async (req, res) => {
  const todos = await sequelize.query('SELECT * FROM todos', { type: QueryTypes.SELECT })
  res.send(todos)
})

app.post('/api/todos', async (req, res) => {
  console.log('Adding todo...')
  const { text } = req.body
  if (text.length > 140) {
    console.log('Todo is too long, stopping...')
    return res.status(400).send('Todo is too long')
  }
  const todo = await sequelize.query(`INSERT INTO todos (todo) VALUES ('${text}')`)
  console.log('Todo added')
  res.status(201).send(todo)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
