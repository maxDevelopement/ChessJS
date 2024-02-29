export default async function startNewGameRequest(idGame){
    console.log("entreée start newGame Request : ")
    try{
        const request = await fetch(`http://10.229.32.215:3000/api/startNewGame?idGame=${idGame}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(request.ok){
            let result = await request.json() 
            console.log(result)
            return result
        }else{
            console.log("insertion a failé")
            return null
        }
    }catch(error){
        console.log(error)
    }
}