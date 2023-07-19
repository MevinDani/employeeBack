const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/router')
require('dotenv').config()

const app = express()

require('./db/connection')


app.use(cors())
app.use(express.json())
app.use(router)

// export upload folder to client
// folder,folder path
app.use('/uploads', express.static('./uploads'))


const port = 4000 || process.env.port
app.listen(port, () => {
    console.log(`server connected at port ${port}`);
})