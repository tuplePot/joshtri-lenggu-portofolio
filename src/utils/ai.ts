// Browser-side client for the public AI assistant endpoints. Unlike utils/api.ts
// (build-time, server key), this runs in the visitor's browser at runtime and
// hits the PUBLIC, keyless /ai routes.
const API_BASE = import.meta.env.PUBLIC_API_URL ?? ''

export interface AskSource {
  id: string
  title: string
  type?: string
}

export interface AskResult {
  answer: string
  intent: string
  sources: AskSource[]
}

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T | null
}

export class AiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
  }
}

/** Ask the portfolio assistant. Throws AiError on failure (incl. rate limits). */
export async function askAI(prompt: string): Promise<AskResult> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/api/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
  } catch {
    throw new AiError('network', 0)
  }

  if (res.status === 429) throw new AiError('rate_limited', 429)
  if (!res.ok) throw new AiError('server', res.status)

  const json = (await res.json()) as ApiEnvelope<AskResult>
  if (!json.success || !json.data) throw new AiError(json.message || 'error', res.status)
  return json.data
}

/** Bilingual starter questions for the chat panel. Returns [] on failure. */
export async function getSuggestions(): Promise<{ en: string[]; id: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/suggestions`)
    if (!res.ok) return { en: [], id: [] }
    const json = (await res.json()) as ApiEnvelope<{ en: string[]; id: string[] }>
    return json.data ?? { en: [], id: [] }
  } catch {
    return { en: [], id: [] }
  }
}
