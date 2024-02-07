const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000 
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.get(('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public')});
}))

app.listen(port, () => console.log(`server run on port ${port}`))

app.use(bodyParser.json())

require('./routes/startNewGame')(app)
//require('./routes/createUser')(app)



// erreur 404 si aucunes route n'est trouvée
app.use(({req, res}) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})

