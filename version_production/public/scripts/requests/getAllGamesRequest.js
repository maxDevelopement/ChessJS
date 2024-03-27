const token = sessionStorage.getItem("token")
export default async function getAllGamesOfUser(idUser){
    ("entreée searchOpponent Request : ", idUser)
    try{
        const request = await fetch(`http://657371.web24.swisscenter.com/api/getAllGamesOfUser?idUser=${idUser}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
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
