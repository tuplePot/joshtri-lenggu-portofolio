// API_KEY has no PUBLIC_ prefix — server-only, never exposed to the browser
const API_BASE = import.meta.env.PUBLIC_API_URL
const API_KEY  = import.meta.env.API_KEY

export async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'X-API-Key': API_KEY ?? '' },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.data ?? null) as T
  } catch {
    return null
  }
}
