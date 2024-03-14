export default async function searchOpponentRequest(username){
    try{
        const request = await fetch(`http://192.168.1.106:3000/api/searchOpponent?usernameToSearch=${username}`, {
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
