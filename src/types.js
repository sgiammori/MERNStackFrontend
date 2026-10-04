/**
 * An idea document as returned by the API (MongoDB).
 *
 * @typedef {Object} Idea
 * @property {string} _id - MongoDB ObjectId, serialized as a string
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string[]} tags
 * @property {string} createdAt - ISO date string
 * @property {number} [__v] - Mongoose version key
 */

/**
 * The logged-in user as returned by /api/auth/login and /register.
 *
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * Value provided by AuthContext.
 *
 * @typedef {Object} AuthContextType
 * @property {string | null} accessToken
 * @property {(token: string | null) => void} setAccessToken
 * @property {AuthUser | null} user
 * @property {(user: AuthUser | null) => void} setUser
 */

export {}
