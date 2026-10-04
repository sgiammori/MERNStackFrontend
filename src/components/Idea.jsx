import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import './Idea.css'

const API_URL_IDEAS = import.meta.env.VITE_API_URL_IDEAS
  
export function meta() {
  return [
    { title: "React | Idea Page" },
    { name: "description", content: "My Idea!" },
  ];
}

const Idea = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  /** @type {[import('../types').Idea | null, Function]} */
  const [idea, setIdea] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', summary: '', description: '', tags: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL_IDEAS}/${id}`)
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const data = await response.json()
        setIdea(data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const startEditing = () => {
    setForm({
      title: idea.title,
      summary: idea.summary,
      description: idea.description,
      tags: idea.tags.join(', '),
    })
    setEditing(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL_IDEAS}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      })
      if (!response.ok) throw new Error(`Update failed (${response.status})`)
      const data = await response.json()
      setIdea(data)
      setEditing(false)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${idea.title}"?`)) return
    setError(null)
    try {
      const response = await fetch(`${API_URL_IDEAS}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error(`Delete failed (${response.status})`)
      navigate('/ideas')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  return (
    <div>
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status status--error">Error: {error}</p>}
        {!loading && idea && !editing && (
        <article className="idea-detail">
          <h1>{idea.title}</h1>
          <p className="idea-detail__summary">{idea.summary}</p>
          <p className="idea-detail__description">{idea.description}</p>
          <ul className="tags">
            {idea.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
          </ul>
          <div className="idea-detail__actions">
            <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>← Back</button>
            <button type="button" className="btn" onClick={startEditing}>Edit</button>
            <button type="button" className="btn btn--danger" onClick={handleDelete}>Delete</button>
          </div>
        </article>
      )}
        {!loading && idea && editing && (
        <form className="idea-detail idea-form" onSubmit={handleUpdate}>
          <h1>Edit Idea</h1>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Summary
            <input name="summary" value={form.summary} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea name="description" rows="5" value={form.description} onChange={handleChange} required />
          </label>
          <label>
            Tags (comma separated)
            <input name="tags" value={form.tags} onChange={handleChange} />
          </label>
          <div className="idea-detail__actions">
            <button type="button" className="btn btn--secondary" onClick={() => setEditing(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Idea
