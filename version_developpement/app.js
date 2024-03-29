const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const path = require('path')
const initDb = require('./db/initDb')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.get(('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
}))

app.listen(port, () => console.log(`server run on port ${port}`))
initDb()

require('./routes/createUser')(app)
require('./routes/loginUser')(app)
app.use(authenticateToken)
require('./ws')(app)
require('./routes/startNewGame')(app)
require('./routes/searchOpponent')(app)
require('./routes/createNewGame')(app)
require('./routes/getAllGamesOfUser')(app)

// erreur 404 si aucunes route n'est trouvée
app.use((req, res) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){ return res.sendStatus(401) }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){ return res.sendStatus(401) }
        req.user = user
        next()
    })
}