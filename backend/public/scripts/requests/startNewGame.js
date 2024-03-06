export default async function startNewGameRequest(idGame){
    console.log("entreée start newGame Request : ")
    try{
        const request = await fetch(`http://192.168.1.108:3000/api/startNewGame?idGame=${idGame}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(request.ok){
            let result = await request.json()
            return result
        }else{
            console.log("insertion a failé")
            return null
        }
    }catch(error){
        console.log(error)
    }
}