
export default async function getAllGamesOfUser(idUser){
    const token = sessionStorage.getItem("token")
    try{
        const request = await fetch(`http://127.0.0.1:3000/api/getAllGamesOfUser?idUser=${idUser}`, {
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
