const token = sessionStorage.getItem("token")
export default async function startNewGameRequest(idGame){
    try{
        const request = await fetch(`http://657371.web24.swisscenter.com/api/startNewGame?idGame=${idGame}`, {
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