"use client"

export async function fetchUser() {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-me`, {
            method: "POST",
            credentials: "include",
            cache: "no-cache"
        })
        if (!resp.ok) {
            console.log("refresh token failed")
            return null
        }
        const data = await resp.json()
        // console.log("User", data)
        return data
    } catch (error: unknown) {
        console.log("refresh token failed", error instanceof Error ? error.message : error)
        return null;
    }
}