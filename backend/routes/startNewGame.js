const startNewGame= require('./playBoardGestion')

module.exports = (app) => {
    app.get('/api/startNewGame', function (req, res){
        const newGame = startNewGame()
        res.json({msg: "request ok", playBoard: newGame})
    })
}