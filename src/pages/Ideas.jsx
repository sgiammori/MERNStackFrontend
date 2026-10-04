import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './Ideas.css'
  
const API_URL_IDEAS = import.meta.env.VITE_API_URL_IDEAS

export function meta() {
  return [
    { title: "React | Ideas Page" },
    { name: "description", content: "Mine Ideas!" },
  ];
}

const Ideas = () => {

  /** @type {[import('../types').Idea[], Function]} */
  const [ideas, setIdeas] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL_IDEAS}`)
        const data = await response.json()
        console.log(data)
        setIdeas(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Ideas</h1>
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status status--error">Error: {error}</p>}
      {!loading && !error && (
        <ul className="ideas-list">
          {ideas.map((idea) => (
            <li key={idea._id} className="idea-card">
              <h2 className="idea-card__title">{idea.title}</h2>
              <span className="idea-card__date">{new Date(idea.createdAt).toLocaleDateString()}</span>
              <p className="idea-card__summary">{idea.summary}</p>
              <p className="idea-card__description">{idea.description}</p>
              <ul className="tags">
                {idea.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
              </ul>
              <Link to={`/ideas/${idea._id}`} className="idea-card__link">View Idea →</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Ideas