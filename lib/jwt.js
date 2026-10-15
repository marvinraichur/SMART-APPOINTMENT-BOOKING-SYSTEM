/**
 * JWT helper using `jose` – a fully ESM-compatible library that works in
 * Next.js 15 App Router (RSC runtime) without any CJS bundler workarounds.
 *
 * Drop-in async replacements for jsonwebtoken.sign() / jsonwebtoken.verify().
 */
import { SignJWT, jwtVerify as joseJwtVerify } from "jose";

/** @returns {Uint8Array} The JWT secret encoded as bytes */
const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Sign a JWT token.  Async replacement for `jsonwebtoken.sign()`.
 *
 * @param {object} payload         - Claims to embed in the token.
 * @param {string} [_secret]       - Ignored; JWT_SECRET env var is used.
 * @param {object} [options]       - Signing options.
 * @param {string} [options.expiresIn="7d"] - Expiry duration string.
 * @returns {Promise<string>} Signed JWT string.
 */
export async function jwtSign(payload, _secret, options = {}) {
  const { expiresIn = "7d" } = options;
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

/**
 * Verify & decode a JWT token.  Async replacement for `jsonwebtoken.verify()`.
 *
 * @param {string} token     - The JWT string to verify.
 * @param {string} [_secret] - Ignored; JWT_SECRET env var is used.
 * @returns {Promise<object>} Decoded payload (includes userId, role, etc.)
 * @throws {JWTVerifyError} If the token is invalid or expired.
 */
export async function jwtVerify(token, _secret) {
  const { payload } = await joseJwtVerify(token, getSecret());
  return payload;
}
