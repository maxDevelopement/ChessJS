export default async function searchOpponentRequest(username){
    console.log("entreée searchOpponent Request : ", username)
    try{
        const request = await fetch(`http://192.168.1.108:3000/api/searchOpponent?usernameToSearch=${username}`, {
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
