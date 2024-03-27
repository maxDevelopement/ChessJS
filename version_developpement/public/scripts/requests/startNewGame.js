export default async function startNewGameRequest(idGame){
    const token = sessionStorage.getItem("token")
    try{
        const request = await fetch(`http://127.0.0.1:3000/api/startNewGame?idGame=${idGame}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
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