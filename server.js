const express = require('express')
const app = express()
const connectDB = require('./config/db.js')

// Connect To DataBase
connectDB();

//Initialize the body-parser(MiddleWare)
app.use(express.json({
    extended: false
}))


app.get('/', (req, res) => res.send('API Running'))


app.use('/api/users', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))