export async function callBackend(
    path: string,
    body: any,
    credentials: boolean = false,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST'
) {
    const isFormData = body instanceof FormData
    const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8440"
    // console.log("BAck-end: ", BaseUrl,path) 
    const resp = await fetch(`${BaseUrl}${path}`, {
        method,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
        },
        body: method !== "GET" && method !== "DELETE" ? (isFormData ? body : JSON.stringify(body)) : undefined,
        credentials: "include"
    })
    // console.log("My front-end backent.ts, Body: ", body || JSON.stringify(body))
    // console.log(resp.headers.getSetCookie());
    // console.log(resp.headers.get("set-cookie"));
    return resp
}