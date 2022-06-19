import fs from 'fs'

import 'dotenv/config'
import express from 'express'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 3000

let currentDate

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

app.use(async (req, res, next) => {
  const date = new Date().toISOString().slice(0, 10)
  if (currentDate !== date) {
    currentDate = date

    if (!fs.existsSync(`./files/${currentDate}.jpg`))
      await downloadImage('https://picsum.photos/1200', `./files/${currentDate}.jpg`)
  }
  next()
})

app.get('/image', (req, res) => {
  res.sendFile(`/usr/src/app/files/${currentDate}.jpg`)
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
