// Server-only data client. API_KEY has no NEXT_PUBLIC_ prefix, so it is never
// exposed to the browser — only import this from Server Components.
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

// Cache API responses and revalidate hourly (ISR). CMS updates go live without
// a redeploy.
const REVALIDATE_SECONDS = 3600;

export async function fetchApi<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(`${API_BASE}${path}`, {
			headers: { "X-API-Key": API_KEY ?? "" },
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!res.ok) return null;
		const json = await res.json();
		return (json.data ?? null) as T;
	} catch {
		return null;
	}
}
