const startNewGame= require('./playBoardGestion')

module.exports = (app) => {
    app.get('/api/startNewGame', function (req, res){
        //console.log(req.query.playerColor)
        //console.log(req.query.playerOpponent)
        const newGame = startNewGame();
        res.json({msg: "request ok", playBoard: newGame})
    })
}