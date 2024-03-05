import mongoose from 'mongoose'
import User from './models/user'
import 'dotenv/config'

const uri: string | undefined = process.env.CONNECTION

async function main (): Promise<void> {
  if (uri !== undefined) {
    console.log(`Connecting with URL "${uri}"`)
    const conn = await mongoose.connect(uri)
    console.log(`Connected to database "${conn.connection.name}"`)

    await User.deleteMany({})
    console.log('Deleted all users.')
    await User.create({
      username: 'demo-user-1',
      password: 'password'
    })
    console.log('Created demo user.')

    console.log('Nothing left to do, closing connection.')
    void mongoose.connection.close()
  }
}

main().catch((e) => console.error.bind(console, e))
