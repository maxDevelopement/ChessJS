export default async function loginRequest(username, password){
    console.log("entreée subscribeRequest : ", username, " ", password)
    try{
        let data = {
            username: username,
            password: password
        }
        const request = await fetch(`http://192.168.1.108:3000/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(request.ok){
            let result = await request.json() 
            console.log(result)
            return result
        }else{
            console.log("login a failé")
            return null
        }
    }catch(error){
        console.log(error)
    }
}