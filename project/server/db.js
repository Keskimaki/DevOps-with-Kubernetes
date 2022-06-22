import 'dotenv/config'
import Sequelize from "sequelize"

const user = process.env.POSTGRES_USER 
const password = process.env.POSTGRES_PASSWORD

const sequelize = new Sequelize(`postgres://${user}:${password}@postgres-svc:5432`)

try {
  await sequelize.authenticate()
  await sequelize.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, todo TEXT)')
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
