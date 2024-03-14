// user1 = createur de la partie
export default async function createNewGameRequest(user1,user2, colorCreator){
    ("createnewgame request !")
    try{
        let data = {
            user1: user1,
            user2: user2,
            colorCreator: colorCreator
        }
        const request = await fetch(`http://10.229.32.215:3000/api/createNewGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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