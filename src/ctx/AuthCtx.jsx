import { createContext, useState, useContext } from "react"

/** @type {import('react').Context<import('../types').AuthContextType | undefined>} */
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
    /** @type {[string | null, Function]} */
    const [accessToken, setAccessToken] = useState(null)
    /** @type {[import('../types').AuthUser | null, Function]} */
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
        {children}
        </AuthContext.Provider>
    )
}

/** @returns {import('../types').AuthContextType} */
//eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}

export default AuthProvider
