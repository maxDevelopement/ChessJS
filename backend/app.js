const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000 
const path = require('path')
const cors = require('cors')
const initDb = require('./db/initDb')

app.use(express.static(path.join(__dirname, 'public')))
app.get(('/', (req, res) => {
    console.log("request")
    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
}))

app.listen(port, () => console.log(`server run on port ${port}`))
initDb()

app.use(cors())
app.use(bodyParser.json())

require('./ws')(app)
require('./routes/startNewGame')(app)
require('./routes/createUser')(app)
require('./routes/loginUser')(app)
require('./routes/searchOpponent')(app)
require('./routes/createNewGame')(app)
require('./routes/getAllGamesOfUser')(app)

// erreur 404 si aucunes route n'est trouvée
app.use(({req, res}) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})

