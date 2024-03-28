export default async function loginRequest(username, password){
    try{
        let data = {
            username: username,
            password: password
        }
        const request = await fetch(`http://127.0.0.1:3000/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(request.ok){
            let result = await request.json() 
            const token = result.accessToken
            sessionStorage.setItem('token', token)
            return result
        }else{
            return null
        }
    }catch(error){
        (error)
    }
}