export default async function startNewGameRequest(idGame){
    ("entreée start newGame Request : ")
    try{
        const request = await fetch(`http://10.229.32.215:3000/api/startNewGame?idGame=${idGame}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(request.ok){
            let result = await request.json()
            return result
        }else{
            return null
        }
    }catch(error){
        (error)
    }
}