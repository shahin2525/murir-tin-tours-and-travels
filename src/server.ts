import app from './app'

// getting-started.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.database_url)

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => console.log(err))
