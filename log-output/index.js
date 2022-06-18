const generateRandomString = (length) => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

const printStringWithTimestamp = (string) => {
  const timestamp = new Date().toISOString()
  console.log(`${timestamp}: ${string}`)
}

const string = generateRandomString(50)

printStringWithTimestamp(string)
setInterval(() => printStringWithTimestamp(string), 5000)
