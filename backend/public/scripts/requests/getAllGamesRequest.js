

export default async function getAllGamesOfUser(idUser){
    ("entreée searchOpponent Request : ", idUser)
    try{
        const request = await fetch(`http://10.229.32.215:3000/api/getAllGamesOfUser?idUser=${idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(request.ok){
            let result = await request.json() 
            console.log("all games : ", result)
            return result
        }else{
            return null
        }
    }catch(error){
        (error)
    }
}
