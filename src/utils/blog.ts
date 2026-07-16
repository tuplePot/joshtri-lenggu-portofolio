// Blog lives on a separate service (blog.joshtrilenggu.com) with its own base URL.
// The /api/public/posts endpoint is public (no key) — the internal X-API-Key is
// only for the Josh Vault CMS, not for reading published posts.
const BLOG_API_BASE = import.meta.env.PUBLIC_BLOG_API_URL

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  createdAt: string
  viewsCount: number
  type: { id: string; name: string } | null
  label: { id: string; name: string; color: string } | null
}

/** Fetch published posts for a given category (type) slug, e.g. "technology". */
export async function fetchBlogPosts(type: string, limit = 6): Promise<BlogPost[]> {
  if (!BLOG_API_BASE) return []
  try {
    const url = `${BLOG_API_BASE}/api/public/posts?type=${encodeURIComponent(type)}&limit=${limit}`
    const res = await fetch(url)
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []) as BlogPost[]
  } catch {
    return []
  }
}

// The blog site and its API share the same origin, so the public post URL is
// derived from the same base: {base}/{typeSlug}/{postSlug}.
export const BLOG_SITE_URL = (BLOG_API_BASE ?? 'https://blog.joshtrilenggu.com').replace(/\/$/, '')

export function blogPostUrl(typeSlug: string, postSlug: string): string {
  return `${BLOG_SITE_URL}/${typeSlug}/${postSlug}`
}

export function blogCategoryUrl(typeSlug: string): string {
  return `${BLOG_SITE_URL}/${typeSlug}`
}
