# Security Guidelines and Audit Findings

This document summarizes a quick application security review of the Purple.Audio codebase and lists recommendations to harden the system. It will evolve over time.

## Summary of Findings

- Authentication and sessions use signed JWT cookies with `httpOnly`, `secure`, and `sameSite=lax` — good baseline.
- Passwords are hashed with bcrypt (salt rounds: 10) — acceptable for MVP.
- Strong password policy added (min 8 chars, uppercase, number, special) and enforced both server‑side and client‑side.
- Stripe webhook signature verification implemented.
- Environment variables used for secrets and DB connection.

Gaps and suggested improvements are below.

## High‑Priority Recommendations

1. Enforce runtime checks for critical secrets
   - Ensure `AUTH_SECRET`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` are present at boot.
   - Fail fast during startup if any are missing.

2. Strengthen cookie/session handling
   - Set `sameSite=strict` unless you rely on cross‑site flows that require `lax`.
   - Consider rotating JWT secret (`AUTH_SECRET`) periodically; add key rotation support.
   - Reduce session lifetime if feasible (e.g., 12h) and add explicit logout on password change.

3. Add Content Security Policy (CSP) and security headers
   - Add middleware to set headers:
     - `Content-Security-Policy`
     - `X-Frame-Options: DENY` (or `frame-ancestors 'none'` in CSP)
     - `Referrer-Policy: no-referrer`
     - `Permissions-Policy` (disable unused features)
     - `X-Content-Type-Options: nosniff`
     - `Strict-Transport-Security` (HSTS) in production

4. Rate limiting and basic abuse protection
   - Add rate limiting to auth endpoints and Stripe webhook to mitigate brute force and abuse.
   - Add exponential backoff or account lockout after repeated failed logins.

5. Secrets management and access controls
   - Store secrets in your platform’s encrypted secret store. Avoid committing `.env` to the repo.
   - Restrict who can read production environment variables.

6. Input validation and output encoding
   - Zod validation exists for auth flows — extend to all server actions and API routes.
   - Sanitize user‑generated content for any rendered HTML.

7. Database security
   - Use least‑privilege DB user on Neon (separate read/write roles if possible).
   - Enforce SSL (already using `sslmode=require`), rotate credentials, and enable IP allow‑listing if available.

8. Logging and monitoring
   - Centralize logs with redaction of PII and secrets.
   - Alert on suspicious activities (multiple failed logins, unexpected webhook failures).

9. Dependencies and build pipeline
   - Add automated dependency scanning (e.g., `pnpm audit`, GitHub Dependabot).
   - Pin runtime images/Node versions and set up CI to run `next build` + lint + type checks.

10. GDPR and privacy
   - Document data retention and deletion SLAs (e.g., auto‑delete uploads after N days).
   - Provide data export and deletion self‑service.

## Concrete Action Items (Roadmap)

- [ ] Add security headers middleware (CSP, HSTS, etc.).
- [ ] Implement rate limiting for `/sign-in`, `/sign-up`, and `/api/stripe/webhook`.
- [ ] Fail fast if `AUTH_SECRET` or Stripe secrets are missing.
- [ ] Move cookie `sameSite` to `strict` if compatible.
- [ ] Increase bcrypt cost to 12 (monitor performance).
- [ ] Add account lockout / captcha after 5 failed logins.
- [ ] Expand Zod schemas to all server actions and API routes.
- [ ] Introduce role‑based authorization checks where needed.
- [ ] Create a data retention policy and implement periodic purges.
- [ ] Add CI steps: `pnpm audit`, `pnpm lint`, `tsc --noEmit`.
- [ ] Enable Dependabot and renovate configuration.

## Example: Security Headers Middleware (Next.js)

Create `middleware.ts` or update it to set headers (adjust CSP for your domains):

```ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('Permissions-Policy', "camera=(), microphone=(), geolocation=()");
  // Example CSP – update hosts as needed
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // tighten in prod
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "connect-src 'self' https:",
      "font-src 'self' data:",
      "frame-ancestors 'none'",
    ].join('; ')
  );
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## Example: Simple Rate Limiting (Edge)

Use an in‑memory or KV store (e.g., Upstash) for per‑IP throttling at the edge. Pseudocode:

```ts
const key = `login:${ip}`;
const count = await kv.incr(key);
await kv.expire(key, 60);
if (count > 10) return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
```

## Incident Response

- Keep an on‑call runbook with contacts, rollback steps, and thresholds.
- Practice secret rotation and webhook key rollover.

## Reporting Vulnerabilities

If you discover a vulnerability, please email security@purple.audio with details and steps to reproduce.

