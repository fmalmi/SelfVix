/**
 * HLS Proxy helpers — shared between addon.ts, vixsrc.ts, vixcloud.ts
 */

export const VIXSRC_HEADERS: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://vixsrc.to/',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7'
};

export const VIXCLOUD_HEADERS: Record<string, string> = {
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0'
};

export function makeProxyToken(url: string, headers: Record<string, string>, ttlMs: number = 6 * 3600 * 1000): string {
    const payload = {
        u: url,
        h: headers,
        e: Date.now() + ttlMs
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeProxyToken(token: string): { u: string; h: Record<string, string>; e: number } | null {
    try {
        return JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    } catch {
        return null;
    }
}

export function resolveUrl(base: string, relative: string): string {
    if (relative.startsWith('http://') || relative.startsWith('https://')) return relative;
    try {
        return new URL(relative, base).toString();
    } catch {
        const baseUrl = new URL(base);
        if (relative.startsWith('/')) {
            return `${baseUrl.origin}${relative}`;
        }
        const basePath = baseUrl.pathname.substring(0, baseUrl.pathname.lastIndexOf('/') + 1);
        return `${baseUrl.origin}${basePath}${relative}`;
    }
}

export function getAddonBase(req: any): string {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    return `${protocol}://${host}`;
}
