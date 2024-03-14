export default async function loginRequest(username, password){
    try{
        let data = {
            username: username,
            password: password
        }
        const request = await fetch(`http://192.168.1.106:3000/api/loginUser`, {
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
            ("login a failé")
            return null
        }
    }catch(error){
        (error)
    }
}