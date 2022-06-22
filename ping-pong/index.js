import 'dotenv/config'
import express from 'express'

import sequelize from './db'

const app = express()
const port = process.env.PORT || 3002

app.get('/pingpong', (req, res) => {
  const counter = await sequelize.query('SELECT (count) FROM counter', { type: QueryTypes.SELECT })
  const count = counter[0].count
  res.send(`pong ${count}`)
  await sequelize.query(`UPDATE counter SET count = ${count + 1}`)
})

app.get('/pingpong/counter', (req, res) => {
  res.send(counter.toString())
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
