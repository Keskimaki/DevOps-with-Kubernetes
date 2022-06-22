import 'dotenv/config'
import Sequelize from "sequelize"

const user = process.env.POSTGRES_USER 
const password = process.env.POSTGRES_PASSWORD

const sequelize = new Sequelize(`postgres://${user}:${password}@postgres-svc:5432`)

try {
  await sequelize.authenticate()
  await sequelize.query('CREATE TABLE IF NOT EXISTS counter (id SERIAL PRIMARY KEY, count INTEGER)')
  await sequelize.query('IF NOT EXISTS (SELECT * FROM counter) INSERT INTO counter (count) VALUES (0)')
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
