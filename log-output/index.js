import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3001

const generateRandomString = (length) => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

const getStringWithTimestamp = (string) => {
  const timestamp = new Date().toISOString()

  return `${timestamp}: ${string}`
}

const string = generateRandomString(50)

app.get('/', (req, res) => {
  const stringWithTimestamp = getStringWithTimestamp(string)

  res.send(stringWithTimestamp)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
