import { useAuth } from "../ctx/AuthCtx.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"

const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH

const Logout = () => {
    const { setAccessToken, user, setUser } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const logout = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_AUTH}/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ user }),
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`)
                setAccessToken(null)
                setUser(null)
            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        logout()
    }, [])

    return (<div>
        {loading && <p>Logging out...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <p>Logged out successfully... Go to <Link to="/" >Home page</Link></p>}
    </div>)
}

export default Logout