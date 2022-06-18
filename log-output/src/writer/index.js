import fs from 'fs'

const generateTimeStamp = () => new Date().toISOString()

const saveToFile = () => {
  const timestamp = generateTimeStamp()

  fs.writeFile('./files/log.txt', timestamp, err => {
    if (err)
      console.log(err)
  })
}

setInterval(saveToFile, 5000)
