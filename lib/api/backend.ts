export async function callBackend<T>(
    path: string,
    body: any,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST'
): Promise<T> {
    const isFormData = body instanceof FormData
    const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8440"
    const resp = await fetch(`${BaseUrl}${path}`, {
        method,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            'Autorization': `Bearer ${process.env.BACKEND_API_KEY}`,
        },
        body: method !== "GET" && method !== "DELETE" ? (isFormData ? body : JSON.stringify(body)) : undefined
    })
    console.log("My front-end backent.ts, Body: ", body || JSON.stringify(body))
    const data = await resp.json()
    if (!resp.ok) {
        throw new Error(data.message || "Backend API failed")
    }
    return data
}