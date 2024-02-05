const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000 
const { createNewGame } = require('./routes/displayBoard')

app.use(bodyParser.json())

require('./routes/createUser')

app.get('/', (req, res) => {
    console.log(createNewGame())
})

// erreur 404 si aucunes route n'est trouvée
app.use(({res}) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})

app.listen(port, () => console.log(`server run on port ${port}`))