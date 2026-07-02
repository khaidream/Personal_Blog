import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

// 确保环境变量在创建连接池前加载
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
