export async function callBackend<T>(
    path:string,
    body:any,
    method: 'POST' | 'Get' | 'PUT' | 'DELETE' = 'POST'
):Promise<T>{
    const resp = await fetch(`${process.env.BACKEND_URL}${path}`, {
        method,
        headers:{
            'Content-Type': 'application/json',
            'Autorization': `Bearer ${process.env.BACKEND_API_KEY}`,
        },
        body: method !== "Get" && method !== "DELETE" ? JSON.stringify(body) : undefined
    })
    if(!resp.ok){
        const errors= await resp.json()
        throw new Error(errors.message || "Backend API failed")
    }
    return resp.json() 
}