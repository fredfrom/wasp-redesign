import { useState, useEffect } from 'react'
import './Main.css'

// ─── Theme ──────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark(d => !d)]
}

// ─── Icons ──────────────────────────────────────────────
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const ChevronDown = ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
const GithubIcon = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
const BookIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
const SunIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const MoonIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
const WaspLogo = ({ size = 28 }) => <img src="/wasp-logo.png" alt="Wasp" width={size} height={size} style={{ imageRendering: 'auto' }} />

// ─── Helpers ────────────────────────────────────────────
const t = {
  h: 'text-zinc-900 dark:text-white',
  p: 'text-zinc-600 dark:text-zinc-400',
  m: 'text-zinc-500 dark:text-zinc-500',
  f: 'text-zinc-400 dark:text-zinc-600',
  sec: 'border-zinc-200/60 dark:border-white/[0.04]',
  brd: 'border-zinc-200 dark:border-white/[0.06]',
  link: 'text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors',
  accent: 'text-wasp-600 dark:text-wasp-400',
}

// ─── Feature Data ───────────────────────────────────────
const features = [
  { title: 'Open Source', desc: 'Fully open-source, MIT licensed. No vendor lock-in.', color: 'emerald', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, href: 'https://github.com/wasp-lang/wasp' },
  { title: 'Full-stack Auth', desc: 'Google, GitHub, Discord, email + password reset & verification.', color: 'blue', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, href: 'https://wasp.sh/blog/2023/04/12/auth-ui' },
  { title: 'Typesafe RPC', desc: 'Auto-generated types spanning client and server. No manual API types.', color: 'purple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>, href: 'https://wasp.sh/docs/data-model/operations/overview' },
  { title: 'One-Command Deploy', desc: 'Deploy to Fly.io or Railway with a single CLI command.', color: 'orange', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>, href: 'https://wasp.sh/docs/deployment/intro' },
  { title: 'End-to-End TypeScript', desc: 'Full TypeScript by default. Types flow from DB schema to React components.', color: 'cyan', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, href: 'https://wasp.sh/docs/tutorial/queries#implementing-a-query' },
  { title: 'Prisma ORM Built-in', desc: 'Define schema once. Migrations, studio, and seeding all managed.', color: 'pink', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>, href: 'https://wasp.sh/docs' },
  { title: 'Background Jobs', desc: 'Persistent, retryable, schedulable with cron. Powered by PgBoss.', color: 'yellow', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, href: 'https://wasp.sh/docs/advanced/jobs' },
  { title: 'Vite + HMR', desc: 'Instant hot reload powered by Vite. Sub-second feedback loop.', color: 'indigo', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14H12L11 22L19.5 10H12L13 2Z"/></svg>, href: 'https://wasp.sh/docs' },
]

const testimonials = [
  { name: 'Joan Reyero', handle: '@joanreyero', initials: 'JR', source: 'Product Hunt', href: 'https://www.producthunt.com/posts/wasp-lang-beta?comment=2048094', text: 'I spent one weekend building with Wasp and it was amazing. In a weekend I had time to learn Wasp, React and finish a full-stack app. This would have been impossible before.' },
  { name: 'Tim', handle: '@tskaggs', initials: 'TS', source: 'Twitter', href: 'https://twitter.com/tskaggs/status/1602513968207101954', text: 'The simplification of the main.wasp file is great. And it feels like a very light weight version of a few larger frameworks.' },
  { name: 'Attila Vago', handle: '@AttilaTheDev', initials: 'AV', source: 'Twitter', href: 'https://twitter.com/AttilaTheDev/status/1583530646047117317', text: "@WaspLang has been in the back of my mind for months now. It left an impression, and I'm really not easy to impress." },
]

const faqs = [
  { q: 'How is Wasp different from Next.js / Nuxt.js / Gatsby?', a: 'These are frontend-first frameworks with some limited backend capabilities. Wasp is a truly full-stack framework \u2014 it brings both back-end and database next to the front-end. Think Ruby on Rails, but for React & Node.js.' },
  { q: 'How is Wasp different from Ruby on Rails or Django?', a: "While Rails and Django are full-stack, they require extra work for the modern \"desktop\" experience most web apps offer today. Wasp supports that out-of-the-box with React on the frontend, plus automatic data model sharing between database, frontend, and backend." },
  { q: 'How hard is it to learn Wasp?', a: "About 30 minutes to get going. The config language is intentionally simple \u2014 no loops or variables, think JSON that's easier to read. 90% of your code is still React & Node.js." },
  { q: 'Do you support only React & Node.js currently?', a: "Yes, but Wasp is designed to be framework-agnostic. The compiler architecture supports adding more languages and frameworks in the future." },
]

// ─── Code Comparisons (the big value prop) ──────────────
const comparisons = [
  {
    label: 'Authentication',
    desc: 'Full-stack auth with social login, email/password, verification & password reset.',
    tabs: [
      { name: 'Wasp', lines: 15, code: `<span class="tk-cmt">// main.wasp — this is ALL you need</span>

<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span>
      <span class="tk-fn">google</span>: <span class="tk-br">{}</span>,
      <span class="tk-fn">gitHub</span>: <span class="tk-br">{}</span>,
      <span class="tk-fn">email</span>: <span class="tk-br">{</span>
        <span class="tk-prop">fromField</span>: <span class="tk-br">{</span> <span class="tk-prop">name</span>: <span class="tk-str">"My App"</span>, <span class="tk-prop">email</span>: <span class="tk-str">"hi@myapp.com"</span> <span class="tk-br">}</span>,
        <span class="tk-prop">emailVerification</span>: <span class="tk-br">{</span> <span class="tk-prop">clientRoute</span>: <span class="tk-type">EmailVerifyRoute</span> <span class="tk-br">}</span>,
        <span class="tk-prop">passwordReset</span>: <span class="tk-br">{</span> <span class="tk-prop">clientRoute</span>: <span class="tk-type">PasswordResetRoute</span> <span class="tk-br">}</span>,
      <span class="tk-br">}</span>
    <span class="tk-br">}</span>,
    <span class="tk-prop">onAuthFailedRedirectTo</span>: <span class="tk-str">"/login"</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// Wasp generates: login/signup pages, session management,</span>
<span class="tk-cmt">// OAuth token handling, email verification flow,</span>
<span class="tk-cmt">// password reset flow, CSRF protection, and auth middleware.</span>` },
      { name: 'Next.js + Auth.js', lines: 55, code: `<span class="tk-cmt">// ── File 1: lib/auth.ts ──</span>
<span class="tk-kw">import</span> NextAuth <span class="tk-kw">from</span> <span class="tk-str">"next-auth"</span>
<span class="tk-kw">import</span> Google <span class="tk-kw">from</span> <span class="tk-str">"next-auth/providers/google"</span>
<span class="tk-kw">import</span> GitHub <span class="tk-kw">from</span> <span class="tk-str">"next-auth/providers/github"</span>
<span class="tk-kw">import</span> Credentials <span class="tk-kw">from</span> <span class="tk-str">"next-auth/providers/credentials"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> PrismaAdapter <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@auth/prisma-adapter"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> prisma <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"./db"</span>
<span class="tk-kw">import</span> bcrypt <span class="tk-kw">from</span> <span class="tk-str">"bcryptjs"</span>

<span class="tk-kw">export const</span> <span class="tk-br">{</span> auth, handlers, signIn, signOut <span class="tk-br">}</span> = <span class="tk-fn">NextAuth</span>(<span class="tk-br">{</span>
  <span class="tk-prop">adapter</span>: <span class="tk-fn">PrismaAdapter</span>(prisma),
  <span class="tk-prop">session</span>: <span class="tk-br">{</span> <span class="tk-prop">strategy</span>: <span class="tk-str">"jwt"</span> <span class="tk-br">}</span>,
  <span class="tk-prop">pages</span>: <span class="tk-br">{</span>
    <span class="tk-prop">signIn</span>: <span class="tk-str">"/login"</span>,
    <span class="tk-prop">error</span>: <span class="tk-str">"/auth/error"</span>,
  <span class="tk-br">}</span>,
  <span class="tk-prop">providers</span>: [
    <span class="tk-fn">Google</span>(<span class="tk-br">{</span>
      <span class="tk-prop">clientId</span>: process.env.GOOGLE_CLIENT_ID,
      <span class="tk-prop">clientSecret</span>: process.env.GOOGLE_CLIENT_SECRET,
    <span class="tk-br">}</span>),
    <span class="tk-fn">GitHub</span>(<span class="tk-br">{</span>
      <span class="tk-prop">clientId</span>: process.env.GITHUB_CLIENT_ID,
      <span class="tk-prop">clientSecret</span>: process.env.GITHUB_CLIENT_SECRET,
    <span class="tk-br">}</span>),
    <span class="tk-fn">Credentials</span>(<span class="tk-br">{</span>
      <span class="tk-prop">credentials</span>: <span class="tk-br">{</span>
        <span class="tk-prop">email</span>: <span class="tk-br">{</span> <span class="tk-prop">type</span>: <span class="tk-str">"email"</span> <span class="tk-br">}</span>,
        <span class="tk-prop">password</span>: <span class="tk-br">{</span> <span class="tk-prop">type</span>: <span class="tk-str">"password"</span> <span class="tk-br">}</span>,
      <span class="tk-br">}</span>,
      <span class="tk-kw">async</span> <span class="tk-fn">authorize</span>(credentials) <span class="tk-br">{</span>
        <span class="tk-kw">const</span> user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span>
          <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">email</span>: credentials.email <span class="tk-br">}</span>,
        <span class="tk-br">}</span>)
        <span class="tk-kw">if</span> (!user || !user.hashedPassword) <span class="tk-kw">return</span> <span class="tk-bool">null</span>
        <span class="tk-kw">const</span> valid = <span class="tk-kw">await</span> bcrypt.<span class="tk-fn">compare</span>(
          credentials.password, user.hashedPassword
        )
        <span class="tk-kw">if</span> (!valid) <span class="tk-kw">return</span> <span class="tk-bool">null</span>
        <span class="tk-kw">return</span> <span class="tk-br">{</span> <span class="tk-prop">id</span>: user.id, <span class="tk-prop">email</span>: user.email, <span class="tk-prop">name</span>: user.name <span class="tk-br">}</span>
      <span class="tk-br">}</span>,
    <span class="tk-br">}</span>),
  ],
  <span class="tk-prop">callbacks</span>: <span class="tk-br">{</span>
    <span class="tk-kw">async</span> <span class="tk-fn">session</span>(<span class="tk-br">{</span> session, token <span class="tk-br">}</span>) <span class="tk-br">{</span>
      session.user.id = token.sub
      <span class="tk-kw">return</span> session
    <span class="tk-br">}</span>,
  <span class="tk-br">}</span>,
<span class="tk-br">}</span>)

<span class="tk-cmt">// ── File 2: middleware.ts ──</span>
<span class="tk-kw">export</span> <span class="tk-br">{</span> auth <span class="tk-kw">as</span> default <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"./lib/auth"</span>
<span class="tk-kw">export const</span> config = <span class="tk-br">{</span>
  <span class="tk-prop">matcher</span>: [<span class="tk-str">"/((?!api|_next/static|_next/image|favicon.ico).*)"</span>],
<span class="tk-br">}</span>

<span class="tk-cmt">// ── File 3: app/api/auth/[...nextauth]/route.ts ──</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> handlers <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@/lib/auth"</span>
<span class="tk-kw">export const</span> <span class="tk-br">{</span> GET, POST <span class="tk-br">}</span> = handlers

<span class="tk-cmt">// ── File 4: app/login/page.tsx ──</span>
<span class="tk-cmt">// You build the entire login UI yourself</span>
<span class="tk-cmt">// ── File 5: app/signup/page.tsx ──</span>
<span class="tk-cmt">// You build the signup form + hash password + create user</span>
<span class="tk-cmt">// ── File 6: app/api/signup/route.ts ──</span>
<span class="tk-cmt">// POST handler: validate, hash password, create user</span>

<span class="tk-cmt">// ── Email verification? You build it from scratch. ──</span>
<span class="tk-cmt">// Generate token, store in DB, send email, verify endpoint</span>

<span class="tk-cmt">// ── Password reset? You build it from scratch. ──</span>
<span class="tk-cmt">// Generate token, store in DB, send email, reset endpoint</span>

<span class="tk-cmt">// ── Session provider wrapper ──</span>
<span class="tk-cmt">// Wrap your app in SessionProvider in layout.tsx</span>

<span class="tk-cmt">// Total: 6-8 files, ~200-300 lines of auth code</span>` },
      { name: 'Express + Passport', lines: 65, code: `<span class="tk-cmt">// ── File 1: config/passport.js ──</span>
<span class="tk-kw">const</span> passport = <span class="tk-fn">require</span>(<span class="tk-str">'passport'</span>)
<span class="tk-kw">const</span> GoogleStrategy = <span class="tk-fn">require</span>(<span class="tk-str">'passport-google-oauth20'</span>).Strategy
<span class="tk-kw">const</span> GitHubStrategy = <span class="tk-fn">require</span>(<span class="tk-str">'passport-github2'</span>).Strategy
<span class="tk-kw">const</span> LocalStrategy = <span class="tk-fn">require</span>(<span class="tk-str">'passport-local'</span>).Strategy
<span class="tk-kw">const</span> bcrypt = <span class="tk-fn">require</span>(<span class="tk-str">'bcryptjs'</span>)
<span class="tk-kw">const</span> <span class="tk-br">{</span> prisma <span class="tk-br">}</span> = <span class="tk-fn">require</span>(<span class="tk-str">'../db'</span>)

passport.<span class="tk-fn">serializeUser</span>((user, done) <span class="tk-kw">=></span> done(<span class="tk-bool">null</span>, user.id))
passport.<span class="tk-fn">deserializeUser</span>(<span class="tk-kw">async</span> (id, done) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span> <span class="tk-prop">where</span>: <span class="tk-br">{</span> id <span class="tk-br">}</span> <span class="tk-br">}</span>)
  done(<span class="tk-bool">null</span>, user)
<span class="tk-br">}</span>)

passport.<span class="tk-fn">use</span>(<span class="tk-kw">new</span> <span class="tk-fn">GoogleStrategy</span>(<span class="tk-br">{</span>
  <span class="tk-prop">clientID</span>: process.env.GOOGLE_CLIENT_ID,
  <span class="tk-prop">clientSecret</span>: process.env.GOOGLE_CLIENT_SECRET,
  <span class="tk-prop">callbackURL</span>: <span class="tk-str">"/auth/google/callback"</span>,
<span class="tk-br">}</span>, <span class="tk-kw">async</span> (accessToken, refreshToken, profile, done) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">let</span> user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span>
    <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">email</span>: profile.emails[<span class="tk-bool">0</span>].value <span class="tk-br">}</span>
  <span class="tk-br">}</span>)
  <span class="tk-kw">if</span> (!user) <span class="tk-br">{</span>
    user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">create</span>(<span class="tk-br">{</span>
      <span class="tk-prop">data</span>: <span class="tk-br">{</span>
        <span class="tk-prop">email</span>: profile.emails[<span class="tk-bool">0</span>].value,
        <span class="tk-prop">name</span>: profile.displayName,
        <span class="tk-prop">googleId</span>: profile.id,
      <span class="tk-br">}</span>
    <span class="tk-br">}</span>)
  <span class="tk-br">}</span>
  done(<span class="tk-bool">null</span>, user)
<span class="tk-br">}</span>))

passport.<span class="tk-fn">use</span>(<span class="tk-kw">new</span> <span class="tk-fn">GitHubStrategy</span>(<span class="tk-br">{</span>
  <span class="tk-prop">clientID</span>: process.env.GITHUB_CLIENT_ID,
  <span class="tk-prop">clientSecret</span>: process.env.GITHUB_CLIENT_SECRET,
  <span class="tk-prop">callbackURL</span>: <span class="tk-str">"/auth/github/callback"</span>,
<span class="tk-br">}</span>, <span class="tk-kw">async</span> (accessToken, refreshToken, profile, done) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-cmt">// Same find-or-create logic as Google above</span>
  <span class="tk-cmt">// ...repeated for each provider</span>
<span class="tk-br">}</span>))

passport.<span class="tk-fn">use</span>(<span class="tk-kw">new</span> <span class="tk-fn">LocalStrategy</span>(<span class="tk-br">{</span>
  <span class="tk-prop">usernameField</span>: <span class="tk-str">'email'</span>,
<span class="tk-br">}</span>, <span class="tk-kw">async</span> (email, password, done) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span> <span class="tk-prop">where</span>: <span class="tk-br">{</span> email <span class="tk-br">}</span> <span class="tk-br">}</span>)
  <span class="tk-kw">if</span> (!user) <span class="tk-kw">return</span> done(<span class="tk-bool">null</span>, <span class="tk-bool">false</span>)
  <span class="tk-kw">const</span> match = <span class="tk-kw">await</span> bcrypt.<span class="tk-fn">compare</span>(password, user.hashedPassword)
  <span class="tk-kw">if</span> (!match) <span class="tk-kw">return</span> done(<span class="tk-bool">null</span>, <span class="tk-bool">false</span>)
  done(<span class="tk-bool">null</span>, user)
<span class="tk-br">}</span>))

<span class="tk-cmt">// ── File 2: app.js — session + middleware setup ──</span>
<span class="tk-kw">const</span> session = <span class="tk-fn">require</span>(<span class="tk-str">'express-session'</span>)
<span class="tk-kw">const</span> PgSession = <span class="tk-fn">require</span>(<span class="tk-str">'connect-pg-simple'</span>)(session)

app.<span class="tk-fn">use</span>(<span class="tk-fn">session</span>(<span class="tk-br">{</span>
  <span class="tk-prop">store</span>: <span class="tk-kw">new</span> <span class="tk-fn">PgSession</span>(<span class="tk-br">{</span> <span class="tk-prop">pool</span>: pgPool <span class="tk-br">}</span>),
  <span class="tk-prop">secret</span>: process.env.SESSION_SECRET,
  <span class="tk-prop">resave</span>: <span class="tk-bool">false</span>,
  <span class="tk-prop">saveUninitialized</span>: <span class="tk-bool">false</span>,
  <span class="tk-prop">cookie</span>: <span class="tk-br">{</span> <span class="tk-prop">maxAge</span>: <span class="tk-bool">30</span> * <span class="tk-bool">24</span> * <span class="tk-bool">60</span> * <span class="tk-bool">60</span> * <span class="tk-bool">1000</span> <span class="tk-br">}</span>,
<span class="tk-br">}</span>))
app.<span class="tk-fn">use</span>(passport.<span class="tk-fn">initialize</span>())
app.<span class="tk-fn">use</span>(passport.<span class="tk-fn">session</span>())

<span class="tk-cmt">// ── File 3: routes/auth.js — OAuth + login routes ──</span>
router.<span class="tk-fn">get</span>(<span class="tk-str">'/auth/google'</span>, passport.<span class="tk-fn">authenticate</span>(<span class="tk-str">'google'</span>, <span class="tk-br">{</span> <span class="tk-prop">scope</span>: [<span class="tk-str">'profile'</span>, <span class="tk-str">'email'</span>] <span class="tk-br">}</span>))
router.<span class="tk-fn">get</span>(<span class="tk-str">'/auth/google/callback'</span>, passport.<span class="tk-fn">authenticate</span>(<span class="tk-str">'google'</span>), redirect)
router.<span class="tk-fn">get</span>(<span class="tk-str">'/auth/github'</span>, passport.<span class="tk-fn">authenticate</span>(<span class="tk-str">'github'</span>, <span class="tk-br">{</span> <span class="tk-prop">scope</span>: [<span class="tk-str">'user:email'</span>] <span class="tk-br">}</span>))
router.<span class="tk-fn">get</span>(<span class="tk-str">'/auth/github/callback'</span>, passport.<span class="tk-fn">authenticate</span>(<span class="tk-str">'github'</span>), redirect)
router.<span class="tk-fn">post</span>(<span class="tk-str">'/auth/login'</span>, passport.<span class="tk-fn">authenticate</span>(<span class="tk-str">'local'</span>), handleLogin)
router.<span class="tk-fn">post</span>(<span class="tk-str">'/auth/signup'</span>, handleSignup)
router.<span class="tk-fn">post</span>(<span class="tk-str">'/auth/logout'</span>, handleLogout)

<span class="tk-cmt">// ── File 4: routes/verify-email.js ──</span>
<span class="tk-cmt">// Generate crypto token, store in DB, send via nodemailer</span>
<span class="tk-cmt">// GET /verify-email?token=... validates + updates user</span>

<span class="tk-cmt">// ── File 5: routes/reset-password.js ──</span>
<span class="tk-cmt">// POST /forgot-password — generate token, send email</span>
<span class="tk-cmt">// POST /reset-password — validate token, hash new password</span>

<span class="tk-cmt">// ── File 6: middleware/auth.js ──</span>
<span class="tk-kw">const</span> <span class="tk-fn">requireAuth</span> = (req, res, next) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">if</span> (!req.isAuthenticated()) <span class="tk-kw">return</span> res.<span class="tk-fn">status</span>(<span class="tk-bool">401</span>).<span class="tk-fn">json</span>(<span class="tk-br">{</span> <span class="tk-prop">error</span>: <span class="tk-str">'Unauthorized'</span> <span class="tk-br">}</span>)
  <span class="tk-fn">next</span>()
<span class="tk-br">}</span>

<span class="tk-cmt">// Total: 6+ files, 300+ lines, plus email templates</span>` },
    ],
  },
  {
    label: 'Data Fetching',
    desc: 'Type-safe client-server data layer with automatic cache invalidation.',
    tabs: [
      { name: 'Wasp', lines: 7, code: `<span class="tk-cmt">// main.wasp — declare once</span>
<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/queries"</span>,
  <span class="tk-prop">entities</span>: [<span class="tk-type">Task</span>] <span class="tk-cmt">// auto cache invalidation</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// src/queries.ts — implement</span>
<span class="tk-kw">export const</span> <span class="tk-fn">getTasks</span> = <span class="tk-kw">async</span> (args, ctx) <span class="tk-kw">=></span>
  ctx.entities.Task.<span class="tk-fn">findMany</span>()

<span class="tk-cmt">// React — use it (types auto-generated!)</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = <span class="tk-fn">useQuery</span>(getTasks)` },
      { name: 'React + Express', lines: 18, code: `<span class="tk-cmt">// server/routes/tasks.ts</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> Router <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">'express'</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> prisma <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">'../db'</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> authMiddleware <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">'../middleware'</span>

router.<span class="tk-fn">get</span>(<span class="tk-str">'/api/tasks'</span>, authMiddleware, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>()
  res.<span class="tk-fn">json</span>(tasks)
<span class="tk-br">}</span>)

<span class="tk-cmt">// shared/types.ts — manual type definitions</span>
<span class="tk-kw">export interface</span> <span class="tk-type">Task</span> <span class="tk-br">{</span> id: <span class="tk-type">number</span>; ... <span class="tk-br">}</span>

<span class="tk-cmt">// client/hooks/useTasks.ts</span>
<span class="tk-kw">export function</span> <span class="tk-fn">useTasks</span>() <span class="tk-br">{</span>
  <span class="tk-kw">return</span> <span class="tk-fn">useQuery</span>(<span class="tk-br">{</span>
    <span class="tk-prop">queryKey</span>: [<span class="tk-str">'tasks'</span>],
    <span class="tk-prop">queryFn</span>: () <span class="tk-kw">=></span> <span class="tk-fn">fetch</span>(<span class="tk-str">'/api/tasks'</span>).<span class="tk-fn">then</span>(r <span class="tk-kw">=></span> r.<span class="tk-fn">json</span>()),
  <span class="tk-br">}</span>)
<span class="tk-br">}</span>
<span class="tk-cmt">// + manual cache invalidation on every mutation</span>
<span class="tk-cmt">// + CORS config, error boundaries, loading states</span>` },
      { name: 'tRPC + Next.js', lines: 12, code: `<span class="tk-cmt">// server/routers/tasks.ts</span>
<span class="tk-kw">export const</span> taskRouter = <span class="tk-fn">router</span>(<span class="tk-br">{</span>
  <span class="tk-prop">getAll</span>: publicProcedure.<span class="tk-fn">query</span>(<span class="tk-kw">async</span> (<span class="tk-br">{</span> ctx <span class="tk-br">}</span>) <span class="tk-kw">=></span>
    ctx.prisma.task.<span class="tk-fn">findMany</span>()
  ),
<span class="tk-br">}</span>)

<span class="tk-cmt">// server/trpc.ts — context, router, middleware</span>
<span class="tk-cmt">// server/root.ts — merge all routers</span>
<span class="tk-cmt">// utils/trpc.ts — client setup</span>
<span class="tk-cmt">// _app.tsx — provider wrapping</span>

<span class="tk-cmt">// client</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = trpc.task.getAll.<span class="tk-fn">useQuery</span>()
<span class="tk-cmt">// Better than raw Express, but still ~5 files of setup</span>` },
    ],
  },
  {
    label: 'Database',
    desc: 'Managed dev database, migrations, studio, and seeding from the CLI.',
    tabs: [
      { name: 'Wasp', lines: 4, code: `<span class="tk-cmt"># Start a managed PostgreSQL via Docker</span>
$ <span class="tk-fn">wasp</span> start db

<span class="tk-cmt"># Apply schema changes as migrations</span>
$ <span class="tk-fn">wasp</span> db migrate-dev

<span class="tk-cmt"># Browse data visually with Prisma Studio</span>
$ <span class="tk-fn">wasp</span> db studio

<span class="tk-cmt"># Seed with test data</span>
$ <span class="tk-fn">wasp</span> db seed` },
      { name: 'Manual Setup', lines: 10, code: `<span class="tk-cmt"># Install and run PostgreSQL yourself</span>
$ docker run --name mydb -e POSTGRES_PASSWORD=secret \\
    -p 5432:5432 -d postgres:16

<span class="tk-cmt"># Set DATABASE_URL in .env manually</span>
$ echo <span class="tk-str">'DATABASE_URL="postgresql://..."'</span> > .env

<span class="tk-cmt"># Install Prisma CLI</span>
$ npm install prisma @prisma/client

<span class="tk-cmt"># Run migrations</span>
$ npx prisma migrate dev --name init

<span class="tk-cmt"># Open studio separately</span>
$ npx prisma studio

<span class="tk-cmt"># Write your own seed script</span>
$ npx prisma db seed

<span class="tk-cmt"># Manage Docker lifecycle, env vars, connection</span>
<span class="tk-cmt"># pooling, reset scripts... all separate concerns</span>` },
      { name: 'Rails', lines: 4, code: `<span class="tk-cmt"># Rails is good at this too:</span>
$ rails db:create
$ rails db:migrate
$ rails db:seed
$ rails dbconsole

<span class="tk-cmt"># But you're locked into Ruby + ActiveRecord</span>
<span class="tk-cmt"># No React, no TypeScript type-safety</span>` },
    ],
  },
  {
    label: 'Deployment',
    desc: 'One command to deploy your full-stack app — frontend, backend, and database.',
    tabs: [
      { name: 'Wasp', lines: 1, code: `<span class="tk-cmt"># Deploy everything to Fly.io</span>
$ <span class="tk-fn">wasp</span> deploy fly deploy

<span class="tk-cmt"># That's it. Frontend, backend, database — done.</span>
<span class="tk-cmt"># Wasp handles Dockerfiles, configs, secrets,</span>
<span class="tk-cmt"># build steps, and health checks for you.</span>` },
      { name: 'Manual (Fly.io)', lines: 10, code: `<span class="tk-cmt"># Write a Dockerfile for your server</span>
$ touch Dockerfile

<span class="tk-cmt"># Write a fly.toml configuration</span>
$ fly launch

<span class="tk-cmt"># Create a managed Postgres instance</span>
$ fly postgres create
$ fly postgres attach

<span class="tk-cmt"># Set all env vars manually</span>
$ fly secrets set DATABASE_URL=... JWT_SECRET=...
$ fly secrets set GOOGLE_CLIENT_ID=...

<span class="tk-cmt"># Deploy server</span>
$ fly deploy

<span class="tk-cmt"># Build and deploy frontend separately</span>
$ npm run build
$ <span class="tk-cmt"># Upload to Netlify/Vercel/S3...</span>

<span class="tk-cmt"># Set up CI/CD, SSL, health checks,</span>
<span class="tk-cmt"># migrations on deploy, rollbacks...</span>` },
      { name: 'Docker Compose', lines: 15, code: `<span class="tk-cmt"># docker-compose.yml</span>
<span class="tk-prop">services</span>:
  <span class="tk-prop">server</span>:
    <span class="tk-prop">build</span>: <span class="tk-str">./server</span>
    <span class="tk-prop">ports</span>: [<span class="tk-str">"3001:3001"</span>]
    <span class="tk-prop">environment</span>:
      - <span class="tk-str">DATABASE_URL=postgresql://...</span>
    <span class="tk-prop">depends_on</span>: [<span class="tk-str">db</span>]

  <span class="tk-prop">client</span>:
    <span class="tk-prop">build</span>: <span class="tk-str">./client</span>
    <span class="tk-prop">ports</span>: [<span class="tk-str">"3000:3000"</span>]

  <span class="tk-prop">db</span>:
    <span class="tk-prop">image</span>: <span class="tk-str">postgres:16</span>
    <span class="tk-prop">volumes</span>: [<span class="tk-str">pgdata:/var/lib/postgresql/data</span>]

<span class="tk-cmt"># + Dockerfiles for each service</span>
<span class="tk-cmt"># + nginx reverse proxy config</span>
<span class="tk-cmt"># + SSL cert management</span>
<span class="tk-cmt"># + CI/CD pipeline</span>` },
    ],
  },
  {
    label: 'Full-stack Types',
    desc: 'End-to-end TypeScript from Prisma schema to React components. Zero manual types.',
    tabs: [
      { name: 'Wasp', lines: 9, code: `<span class="tk-cmt">// schema.prisma — single source of truth</span>
<span class="tk-kw">model</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>          <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">description</span> <span class="tk-type">String</span>
  <span class="tk-prop">isDone</span>      <span class="tk-type">Boolean</span> <span class="tk-fn">@default</span>(<span class="tk-bool">false</span>)
<span class="tk-br">}</span>

<span class="tk-cmt">// Server — types auto-generated from schema</span>
<span class="tk-kw">import type</span> <span class="tk-br">{</span> <span class="tk-type">GetTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/server/operations"</span>
<span class="tk-kw">export const</span> <span class="tk-fn">getTasks</span>: <span class="tk-type">GetTasks</span> = <span class="tk-kw">async</span> (args, ctx) <span class="tk-kw">=></span> <span class="tk-br">{</span>...<span class="tk-br">}</span>

<span class="tk-cmt">// Client — same types, zero effort</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> getTasks, <span class="tk-fn">useQuery</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/client/operations"</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = <span class="tk-fn">useQuery</span>(getTasks) <span class="tk-cmt">// Task[] — fully typed</span>` },
      { name: 'Manual TypeScript', lines: 14, code: `<span class="tk-cmt">// shared/types.ts — manually duplicated</span>
<span class="tk-kw">export interface</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>: <span class="tk-type">number</span>
  <span class="tk-prop">description</span>: <span class="tk-type">string</span>
  <span class="tk-prop">isDone</span>: <span class="tk-type">boolean</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// server/routes.ts — manually typed</span>
app.<span class="tk-fn">get</span>(<span class="tk-str">'/api/tasks'</span>, <span class="tk-kw">async</span> (req: <span class="tk-type">Request</span>, res: <span class="tk-type">Response</span>&lt;<span class="tk-type">Task</span>[]&gt;) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>()
  res.<span class="tk-fn">json</span>(tasks)
<span class="tk-br">}</span>)

<span class="tk-cmt">// client/api.ts — fetch with manual casting</span>
<span class="tk-kw">const</span> res = <span class="tk-kw">await</span> <span class="tk-fn">fetch</span>(<span class="tk-str">'/api/tasks'</span>)
<span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> res.<span class="tk-fn">json</span>() <span class="tk-kw">as</span> <span class="tk-type">Task</span>[]

<span class="tk-cmt">// Types can drift between client & server.</span>
<span class="tk-cmt">// Prisma types != your shared types.</span>
<span class="tk-cmt">// No compile-time guarantee they match.</span>` },
    ],
  },
  {
    label: 'CLI Workflow',
    desc: 'Every command you need to go from zero to production, built in.',
    tabs: [
      { name: 'Wasp CLI', lines: 10, code: `<span class="tk-cmt"># Create a new app</span>
$ <span class="tk-fn">wasp</span> new MyApp
$ cd MyApp

<span class="tk-cmt"># Start dev server (client + server + db)</span>
$ <span class="tk-fn">wasp</span> start

<span class="tk-cmt"># Database</span>
$ <span class="tk-fn">wasp</span> start db          <span class="tk-cmt"># spin up Postgres in Docker</span>
$ <span class="tk-fn">wasp</span> db migrate-dev    <span class="tk-cmt"># apply schema changes</span>
$ <span class="tk-fn">wasp</span> db studio         <span class="tk-cmt"># visual data browser</span>
$ <span class="tk-fn">wasp</span> db seed           <span class="tk-cmt"># populate test data</span>

<span class="tk-cmt"># Deploy</span>
$ <span class="tk-fn">wasp</span> deploy fly deploy <span class="tk-cmt"># ship to Fly.io</span>

<span class="tk-cmt"># Utilities</span>
$ <span class="tk-fn">wasp</span> clean             <span class="tk-cmt"># reset build artifacts</span>
$ <span class="tk-fn">wasp</span> build             <span class="tk-cmt"># production build</span>` },
      { name: 'Without Wasp', lines: 10, code: `<span class="tk-cmt"># Create React app + Express server + Prisma</span>
$ npx create-react-app client --template typescript
$ mkdir server && cd server && npm init -y
$ npm i express prisma @prisma/client cors
$ npm i -D typescript ts-node nodemon
$ npx prisma init

<span class="tk-cmt"># Configure TypeScript for both</span>
$ <span class="tk-cmt"># tsconfig.json x2, nodemon.json, .env x2</span>

<span class="tk-cmt"># Set up scripts in both package.jsons</span>
<span class="tk-cmt"># Set up proxy / CORS between client and server</span>
<span class="tk-cmt"># Install Docker, write docker-compose.yml</span>
<span class="tk-cmt"># Set up hot reload for server (nodemon)</span>
<span class="tk-cmt"># Configure Vite or CRA for client</span>
<span class="tk-cmt"># Write Dockerfiles for deployment</span>
<span class="tk-cmt"># Set up CI/CD pipelines</span>
<span class="tk-cmt"># Configure env vars per environment</span>

<span class="tk-cmt"># Hope nothing breaks when you update deps 🤞</span>` },
    ],
  },
]

// ─── Components ─────────────────────────────────────────
function CodeBlock() {
  const [tab, setTab] = useState('wasp')
  const inactive = 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
  return (
    <div className={`gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden`}>
      <div className={`flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-4 py-3`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/20 dark:bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/20 dark:bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-400/20 dark:bg-green-500/20" />
          </div>
          <div className="flex items-center gap-0.5 ml-2">
            <button onClick={() => setTab('wasp')} className={`px-3 py-1 text-[11px] font-medium rounded-lg cursor-pointer transition-colors ${tab === 'wasp' ? 'code-tab-active' : inactive}`}>main.wasp</button>
            <button onClick={() => setTab('prisma')} className={`px-3 py-1 text-[11px] font-medium rounded-lg cursor-pointer transition-colors ${tab === 'prisma' ? 'code-tab-active' : inactive}`}>schema.prisma</button>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 overflow-x-auto">
        {tab === 'wasp' ? (
          <pre className="font-mono text-[13px] leading-[1.75]"><code dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">wasp</span>: <span class="tk-br">{</span> <span class="tk-prop">version</span>: <span class="tk-str">"^0.16"</span> <span class="tk-br">}</span>,
  <span class="tk-prop">title</span>: <span class="tk-str">"My Full-Stack App"</span>,
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span> <span class="tk-fn">google</span>: <span class="tk-br">{}</span>, <span class="tk-fn">gitHub</span>: <span class="tk-br">{}</span>, <span class="tk-fn">email</span>: <span class="tk-br">{</span>...<span class="tk-br">}</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-kw">route</span> <span class="tk-type">HomeRoute</span> <span class="tk-br">{</span> <span class="tk-prop">path</span>: <span class="tk-str">"/"</span>, <span class="tk-prop">to</span>: <span class="tk-type">MainPage</span> <span class="tk-br">}</span>
<span class="tk-kw">page</span> <span class="tk-type">MainPage</span> <span class="tk-br">{</span>
  <span class="tk-prop">authRequired</span>: <span class="tk-bool">true</span>,
  <span class="tk-prop">component</span>: <span class="tk-kw">import</span> <span class="tk-type">Main</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/MainPage"</span>
<span class="tk-br">}</span>

<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/queries"</span>,
  <span class="tk-prop">entities</span>: <span class="tk-br">[</span><span class="tk-type">Task</span><span class="tk-br">]</span>
<span class="tk-br">}</span>` }} /></pre>
        ) : (
          <pre className="font-mono text-[13px] leading-[1.75]"><code dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">model</span> <span class="tk-type">User</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>       <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">tasks</span>    <span class="tk-type">Task</span>[]
<span class="tk-br">}</span>

<span class="tk-kw">model</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>          <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">description</span> <span class="tk-type">String</span>
  <span class="tk-prop">isDone</span>      <span class="tk-type">Boolean</span> <span class="tk-fn">@default</span>(<span class="tk-bool">false</span>)
  <span class="tk-prop">user</span>        <span class="tk-type">User</span>    <span class="tk-fn">@relation</span>(<span class="tk-prop">fields</span>: [<span class="tk-prop">userId</span>], <span class="tk-prop">references</span>: [<span class="tk-prop">id</span>])
  <span class="tk-prop">userId</span>      <span class="tk-type">Int</span>
<span class="tk-br">}</span>` }} /></pre>
        )}
      </div>
    </div>
  )
}

function CodeComparison() {
  const [activeComp, setActiveComp] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const comp = comparisons[activeComp]
  const tab = comp.tabs[activeTab]
  const isWasp = activeTab === 0

  return (
    <section className={`py-28 md:py-36 border-t ${t.sec}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Compare</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Less code, more power</h2>
          <p className={`${t.m} max-w-lg mx-auto text-[15px]`}>See how Wasp simplifies common full-stack patterns compared to doing it manually.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {comparisons.map((c, i) => (
            <button key={c.label} onClick={() => { setActiveComp(i); setActiveTab(0) }}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer transition-all ${activeComp === i
                ? 'bg-wasp-100 dark:bg-wasp-400/10 text-wasp-700 dark:text-wasp-400 border border-wasp-200 dark:border-wasp-400/20'
                : `bg-zinc-100 dark:bg-white/[0.04] ${t.m} border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08]`
              }`}>{c.label}</button>
          ))}
        </div>

        <p className={`text-center text-[14px] ${t.p} mb-8`}>{comp.desc}</p>

        <div className="max-w-4xl mx-auto">
          <div className={`gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden`}>
            <div className={`flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3`}>
              <div className="flex items-center gap-1.5">
                {comp.tabs.map((tb, i) => (
                  <button key={tb.name} onClick={() => setActiveTab(i)}
                    className={`px-3 py-1.5 text-[12px] font-medium rounded-lg cursor-pointer transition-all ${i === activeTab
                      ? (i === 0 ? 'code-tab-active' : 'bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300')
                      : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
                    }`}>{tb.name}</button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono ${isWasp ? 'text-emerald-600 dark:text-emerald-400' : t.f}`}>{tab.lines} lines of code</span>
                {!isWasp && (
                  <span className="text-[10px] font-medium text-red-500/70 dark:text-red-400/50 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md">
                    {tab.lines > comp.tabs[0].lines ? `${Math.round((tab.lines / comp.tabs[0].lines - 1) * 100)}% more` : ''}
                  </span>
                )}
                {isWasp && <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">simplest</span>}
              </div>
            </div>
            <div className="p-5 md:p-6 overflow-x-auto code-scroll">
              <pre className="font-mono text-[13px] leading-[1.75]"><code dangerouslySetInnerHTML={{ __html: tab.code }} /></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalBlock({ html }) {
  return (
    <div className="p-5 md:p-6">
      <pre className="font-mono text-[13px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

function FeatureCard({ title, desc, color, icon, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card p-5 block group">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>{icon}</div>
      <h3 className={`text-[13px] font-semibold ${t.h} mb-1.5`}>{title}</h3>
      <p className={`text-[12px] ${t.m} leading-relaxed`}>{desc}</p>
    </a>
  )
}

function FAQ({ q, a, defaultOpen = false }) {
  return (
    <details className={`group rounded-2xl border ${t.brd} bg-white dark:bg-white/[0.02]`} open={defaultOpen || undefined}>
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none">
        <span className={`text-[14px] font-medium ${t.h} pr-4`}>{q}</span>
        <ChevronDown className={`faq-chevron w-4 h-4 ${t.f} shrink-0`} />
      </summary>
      <div className="px-6 pb-5"><p className={`text-[13px] ${t.p} leading-relaxed`}>{a}</p></div>
    </details>
  )
}

// ─── Main Page ──────────────────────────────────────────
export const MainPage = () => {
  const [dark, toggleTheme] = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen light-texture">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 nav-blur bg-stone-50/80 dark:bg-surface-0/80 border-b ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <WaspLogo size={28} />
            <span className={`text-[15px] font-bold tracking-tight ${t.h}`}>Wasp</span>
            <span className="text-[9px] font-semibold text-wasp-700 dark:text-wasp-400 bg-wasp-100 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider">beta</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Docs', 'Blog', 'FAQ', 'Join the list'].map(item => (
              <a key={item} href={item === 'Docs' ? 'https://wasp.sh/docs' : item === 'Blog' ? 'https://wasp.sh/blog' : item === 'FAQ' ? '#faq' : '#signup'} className={`text-[13px] ${t.link}`}>{item}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-[13px] ${t.link} px-3 py-1.5 rounded-lg`}><GithubIcon /><span>GitHub</span></a>
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${t.link} cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.06]`} aria-label="Toggle theme">{dark ? <SunIcon /> : <MoonIcon />}</button>
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary ml-1 px-4 py-2 text-[13px]">Get Started <Arrow /></a>
          </div>
          <div className="flex md:hidden items-center gap-1">
            <button onClick={toggleTheme} className={`p-2 ${t.link} cursor-pointer`} aria-label="Toggle theme">{dark ? <SunIcon /> : <MoonIcon />}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-500 cursor-pointer" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className={`md:hidden bg-white dark:bg-surface-1 border-b ${t.sec} px-6 py-5`}>
            <div className="flex flex-col gap-4">
              <a href="https://wasp.sh/docs" className={`text-sm ${t.p}`}>Docs</a>
              <a href="https://wasp.sh/blog" className={`text-sm ${t.p}`}>Blog</a>
              <a href="#faq" className={`text-sm ${t.p}`}>FAQ</a>
              <a href="https://wasp.sh/docs/quick-start" className="btn-primary justify-center px-4 py-2.5 text-sm">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center pt-16 bg-grid overflow-hidden">
        <div className="glow-hero absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className={`anim-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${t.brd} bg-white/80 dark:bg-white/[0.03] mb-8`}>
                <div className="w-1.5 h-1.5 rounded-full bg-wasp-400 animate-pulse" />
                <span className={`text-[12px] ${t.m}`}>Backed by</span>
                <span className={`text-[12px] font-bold ${t.accent}`}>Y Combinator</span>
              </div>
              <h1 className="anim-2 text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-[1.06] mb-6">
                <span className={t.h}>Develop full-stack</span><br />
                <span className="gradient-text">web apps faster.</span>
              </h1>
              <p className={`anim-3 text-base lg:text-[17px] ${t.p} leading-relaxed mb-10 max-w-[440px]`}>
                Rails-like framework for React, Node.js and Prisma. Build your app in a day and deploy it with a single CLI command.
              </p>
              <div className="anim-4 flex flex-wrap items-center gap-3 mb-12">
                <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-6 py-3 text-sm"><WaspLogo size={16} /> Get Started</a>
                <a href="https://wasp.sh/docs" className="btn-ghost px-6 py-3 text-sm"><BookIcon /> Documentation</a>
              </div>
              <div className="anim-5 flex items-center gap-5">
                <span className={`text-[10px] ${t.f} uppercase tracking-[0.15em] font-semibold`}>Works with</span>
                <div className="flex items-center gap-1">
                  {['React', 'Node.js', 'Prisma', 'Vite'].map((tech, i) => (
                    <span key={tech} className="flex items-center">
                      <span className={`text-[12px] font-medium ${t.m} px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.04]`}>{tech}</span>
                      {i < 3 && <span className={`mx-1 ${t.f}`}>&middot;</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="anim-5"><div className="float"><CodeBlock /></div></div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className={`relative py-28 md:py-36 border-t ${t.sec}`}>
        <div className="glow-section absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Features</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Everything built-in</h2>
            <p className={`${t.m} max-w-md mx-auto text-[15px]`}>Auth, database, jobs, email, types, deploy — all handled.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Code Comparisons ── */}
      <CodeComparison />

      {/* ── AI Efficiency ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>AI-Native</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Less code means smarter AI</h2>
            <p className={`${t.m} max-w-2xl mx-auto text-[15px] leading-relaxed`}>
              Whether you write every line by hand or use AI coding tools, less code to read and write means faster, cheaper, more accurate results. We tested it.
            </p>
          </div>

          <div className={`gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-2/30 p-8 md:p-12 max-w-4xl mx-auto`}>
            <div className="text-center mb-10">
              <p className={`text-[14px] ${t.p} mb-2`}>We gave Claude Code the same feature prompt for two identical apps:</p>
              <p className={`text-[18px] font-bold ${t.h}`}>Wasp vs Next.js — same app, same feature, measured everything.</p>
              <a href="https://wasp.sh/blog/2026/03/26/nextjs-vs-wasp-40-percent-less-tokens-same-app" target="_blank" rel="noreferrer" className={`text-[13px] ${t.accent} hover:underline mt-2 inline-block`}>Read the full analysis &rarr;</a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { stat: '44%', label: 'cheaper', sub: '$2.87 vs $5.17' },
                { stat: '38%', label: 'fewer tokens', sub: '2.5M vs 4.0M' },
                { stat: '31%', label: 'fewer API calls', sub: '66 vs 96' },
                { stat: '70%', label: 'higher token efficiency', sub: 'output per token' },
                { stat: '40%', label: 'less total code', sub: 'static token count' },
                { stat: '~same', label: 'code output', sub: '5,416 vs 5,395 tokens' },
              ].map(({ stat, label, sub }) => (
                <div key={label} className={`text-center p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border ${t.brd}`}>
                  <p className={`text-2xl md:text-3xl font-black ${t.accent} mb-1`}>{stat}</p>
                  <p className={`text-[13px] font-medium ${t.h}`}>{label}</p>
                  <p className={`text-[11px] ${t.f} mt-1`}>{sub}</p>
                </div>
              ))}
            </div>

            <p className={`text-center text-[14px] ${t.p} mt-8 leading-relaxed max-w-xl mx-auto`}>
              Your framework choice is your single biggest lever for improving AI code generation. Fewer tokens to read = fewer mistakes, faster results, lower cost.
            </p>
          </div>
        </div>
      </section>

      {/* ── Claude Code Plugin ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Developer Experience</span>
              <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Your AI assistant already knows Wasp</h2>
              <p className={`${t.p} text-[15px] leading-relaxed mb-6`}>
                The official Wasp plugin for Claude Code gives your AI coding assistant deep knowledge of the framework — best practices, code patterns, and documentation — without you having to explain anything.
              </p>
              <p className={`${t.p} text-[15px] leading-relaxed mb-8`}>
                Even if you just discovered Wasp, your coding assistant is already productive with it from the first prompt.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wasp.sh/docs" target="_blank" rel="noreferrer" className="btn-primary px-5 py-2.5 text-sm">Learn more</a>
                <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className="btn-ghost px-5 py-2.5 text-sm"><GithubIcon /> View on GitHub</a>
              </div>
            </div>
            <div className={`gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden`}>
              <div className={`border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3 flex items-center gap-2`}>
                <div className="w-3 h-3 rounded-full bg-green-400/30 dark:bg-green-500/20" />
                <span className={`text-[12px] font-medium ${t.m}`}>Terminal</span>
              </div>
              <TerminalBlock html={`<span class="tk-cmt"># Official Wasp plugin for Claude Code</span>
<span class="tk-cmt"># Slash commands give your AI deep framework knowledge:</span>

$ <span class="tk-fn">/add-feature</span>         <span class="tk-cmt">Add auth, email, jobs, and more</span>
$ <span class="tk-fn">/start-dev-server</span>    <span class="tk-cmt">Start Wasp + debugging visibility</span>
$ <span class="tk-fn">/deploying-app</span>       <span class="tk-cmt">Deploy to Railway or Fly.io</span>
$ <span class="tk-fn">/expert-advice</span>       <span class="tk-cmt">Get Wasp-specific guidance</span>
$ <span class="tk-fn">/wasp-plugin-init</span>    <span class="tk-cmt">Set up docs + best practices</span>

<span class="tk-cmt"># Or just describe what you want:</span>

<span class="tk-type">You:</span> <span class="tk-str">"Add Google and GitHub auth with</span>
<span class="tk-str">      email verification and password reset"</span>

<span class="tk-type">Claude:</span> <span class="tk-cmt">Updates main.wasp auth config</span>
        <span class="tk-cmt">Adds OAuth provider env vars</span>
        <span class="tk-cmt">Creates login/signup/verify pages</span>
        <span class="tk-cmt">Configures email sender</span>
        <span class="tk-cmt">Runs wasp db migrate-dev</span>
        <span class="tk-cmt">✓ Full auth in one conversation.</span>`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Community</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>You're in good company</h2>
            <p className={t.m}>Join <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className={`${t.accent} hover:underline`}>our Discord</a> for more!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(tm => (
              <a key={tm.handle} href={tm.href} target="_blank" rel="noreferrer" className="card p-6 block">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <p className="text-[14px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">"{tm.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-wasp-200 to-wasp-400 dark:from-wasp-400/30 dark:to-wasp-600/30 flex items-center justify-center text-[11px] font-bold text-wasp-800 dark:text-wasp-300">{tm.initials}</div>
                    <div>
                      <p className={`text-[13px] font-semibold ${t.h}`}>{tm.name}</p>
                      <p className={`text-[11px] ${t.f}`}>{tm.handle}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] ${t.f} font-medium uppercase tracking-wider`}>{tm.source}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="signup" className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Stay up to date</h2>
          <p className={`${t.m} mb-8 text-[15px]`}>Be the first to know when we ship new features.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="you@awesomedev.com" required className={`flex-1 px-5 py-3 bg-white dark:bg-white/[0.04] border ${t.brd} rounded-xl text-sm ${t.h} placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-wasp-400/50 focus:ring-2 focus:ring-wasp-400/10 transition-all`} />
            <button type="submit" className="btn-primary px-6 py-3 text-sm whitespace-nowrap justify-center">Subscribe</button>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>FAQ</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Frequently asked questions</h2>
            <p className={t.m}>For anything else, join <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className={`${t.accent} hover:underline`}>our Discord</a>!</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => <FAQ key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={`relative py-28 md:py-36 border-t ${t.sec} overflow-hidden`}>
        <div className="glow-cta absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${t.h} mb-6`}>Start building today</h2>
          <p className={`text-lg ${t.p} mb-12 max-w-md mx-auto`}>Go from idea to production in a weekend, not a quarter.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-8 py-3.5 text-sm">Get Started <Arrow /></a>
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className="btn-ghost px-8 py-3.5 text-sm"><GithubIcon /> Star on GitHub</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t ${t.sec} py-16`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <WaspLogo size={22} />
                <span className={`text-sm font-bold ${t.h}`}>Wasp</span>
              </div>
              <p className={`text-[13px] ${t.f} leading-relaxed max-w-[260px] mb-4`}>The fastest way to develop full-stack web apps with React &amp; Node.js.</p>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] ${t.f}`}>Backed by</span>
                <span className={`text-[11px] font-bold ${t.accent}`}>Y Combinator</span>
              </div>
            </div>
            {[
              { title: 'Docs', items: [['Getting Started', 'https://wasp.sh/docs'], ['Todo tutorial', 'https://wasp.sh/docs/tutorial/create'], ['Language ref', 'https://wasp.sh/docs/general/language']] },
              { title: 'Community', items: [['Discord', 'https://discord.gg/rzdnErX'], ['X / Twitter', 'https://x.com/WaspLang'], ['Bluesky', 'https://bsky.app/profile/wasp.sh'], ['GitHub', 'https://github.com/wasp-lang/wasp']] },
              { title: 'Company', items: [['Blog', 'https://wasp.sh/blog'], ['Careers', 'https://wasp-lang.notion.site/Wasp-Careers-59fd1682c80d446f92be5fa65cc17672'], ['Resources', 'https://wasp.sh/resources']] },
            ].map(col => (
              <div key={col.title}>
                <h4 className={`text-[11px] font-semibold ${t.m} uppercase tracking-wider mb-4`}>{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.items.map(([label, href]) => <li key={label}><a href={href} target="_blank" rel="noreferrer" className={`text-[13px] ${t.f} hover:text-zinc-900 dark:hover:text-white transition-colors`}>{label}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className={`border-t ${t.sec} pt-6 flex flex-col md:flex-row items-center justify-between gap-4`}>
            <p className={`text-[12px] ${t.f}`}>&copy; Wasp, Inc. All rights reserved.</p>
            <a href="https://wasp.sh/privacy-policy" className={`text-[12px] ${t.f} hover:text-zinc-900 dark:hover:text-zinc-400 transition-colors`}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
