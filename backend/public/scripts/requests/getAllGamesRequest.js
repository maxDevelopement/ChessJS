

export default async function getAllGamesOfUser(idUser){
    console.log("entreée searchOpponent Request : ", idUser)
    try{
        const request = await fetch(`http://192.168.1.108:3000/api/getAllGamesOfUser?idUser=${idUser}`, {
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
