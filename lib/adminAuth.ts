async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

function toBase64url(buf: ArrayBuffer): string {
  return Buffer.from(buf).toString('base64url')
}

function fromBase64url(str: string): Uint8Array {
  return new Uint8Array(Buffer.from(str, 'base64url'))
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function signAdminCookie(secret: string): Promise<string> {
  const key = await getKey(secret)
  const day = todayStr()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(day))
  return `${toBase64url(sig)}.${day}`
}

export async function verifyAdminCookie(cookie: string, secret: string): Promise<boolean> {
  try {
    const [sigB64, day] = cookie.split('.')
    if (!sigB64 || !day) return false
    const key = await getKey(secret)
    return crypto.subtle.verify('HMAC', key, fromBase64url(sigB64), new TextEncoder().encode(day))
  } catch {
    return false
  }
}
