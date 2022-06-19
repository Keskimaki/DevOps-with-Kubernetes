import fs from 'fs'

import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3002

let counter = 0

app.get('/pingpong', (req, res) => {
  res.send(`pong ${counter}`)

  fs.writeFile('./pingpong/log.txt', counter.toString(), err => {
    if (err)
      console.log(err)
  })
  counter++
})

app.get('/pingpong/counter', (req, res) => {
  res.send(counter.toString())
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
