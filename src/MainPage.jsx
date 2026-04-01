import { useState, useEffect, useRef, useCallback } from 'react'
import './Main.css'

// ─── Theme ──────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return true
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
const DiscordIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.099.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
const XIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const LinkedInIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const BlueskyIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.601 3.476 6.178 3.223-4.388.43-8.248 1.846-3.24 6.528 5.399 4.727 7.341-1.188 8.438-4.32.198-.563.288-.834.288-.609 0-.225.09.046.288.609 1.097 3.132 3.04 9.047 8.438 4.32 5.009-4.682 1.149-6.098-3.24-6.528 2.577.253 5.393-.596 6.178-3.223C24.298 9.418 24.676 4.458 24.676 3.768c0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.723 4.747 13.764 8.686 12.677 10.8z"/></svg>
const WaspLogo = ({ size = 28 }) => <img src="/wasp-logo.png" alt="Wasp" width={size} height={size} style={{ imageRendering: 'auto' }} />
const CopyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
const CheckSmall = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>

// ─── Helpers ────────────────────────────────────────────
const t = {
  h: 'text-zinc-900 dark:text-white',
  p: 'text-zinc-600 dark:text-zinc-400',
  m: 'text-zinc-500',
  f: 'text-zinc-400 dark:text-zinc-600',
  sec: 'border-zinc-200/60 dark:border-white/[0.04]',
  brd: 'border-zinc-200 dark:border-white/[0.06]',
  link: 'text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors',
  accent: 'text-wasp-600 dark:text-wasp-400',
}

// ─── Feature Data ───────────────────────────────────────
const features = [
  { title: 'Open Source', desc: 'Fully open-source, MIT licensed. No vendor lock-in.', color: 'emerald', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
  { title: 'Full-stack Auth', desc: 'Google, GitHub, Discord, email with verification & password reset.', color: 'blue', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> },
  { title: 'Typesafe RPC', desc: 'Auto-generated types spanning client and server. No manual API types.', color: 'purple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg> },
  { title: 'One-Command Deploy', desc: 'Deploy to Fly.io or Railway with a single CLI command.', color: 'orange', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg> },
  { title: 'End-to-End TypeScript', desc: 'Types flow from DB schema to React components. Zero config.', color: 'cyan', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: 'Prisma ORM Built-in', desc: 'Define schema once. Migrations, studio, and seeding all managed.', color: 'pink', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { title: 'Background Jobs', desc: 'Persistent, retryable, schedulable with cron. Powered by PgBoss.', color: 'yellow', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { title: 'Vite + HMR', desc: 'Instant hot reload powered by Vite. Sub-second feedback loop.', color: 'indigo', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14H12L11 22L19.5 10H12L13 2Z"/></svg> },
]

const testimonials = [
  { name: 'Joan Reyero', handle: '@joanreyero', initials: 'JR', source: 'Product Hunt', href: 'https://www.producthunt.com/posts/wasp-lang-beta?comment=2048094', text: 'I spent one weekend building with Wasp and it was amazing. In a weekend I had time to learn Wasp, React and finish a full-stack app. This would have been impossible before.' },
  { name: 'Tim', handle: '@tskaggs', initials: 'TS', source: 'Twitter', href: 'https://twitter.com/tskaggs/status/1602513968207101954', text: 'The simplification of the main.wasp file is great. And it feels like a very light weight version of a few larger frameworks.' },
  { name: 'Attila Vago', handle: '@AttilaTheDev', initials: 'AV', source: 'Twitter', href: 'https://twitter.com/AttilaTheDev/status/1583530646047117317', text: "@WaspLang has been in the back of my mind for months now. It left an impression, and I'm really not easy to impress." },
]

const faqs = [
  { q: 'How is Wasp different from Next.js / Nuxt.js / Gatsby?', a: "These are frontend-first frameworks with some limited backend capabilities. Wasp is a truly full-stack framework \u2014 it brings both back-end and database next to the front-end. You can think of it as Ruby on Rails, but for React & Node.js. Next.js, Gatsby and others started as frontend frameworks for static sites. Although some now offer serverless functions, you still have to bring your own database and you'll need a separate backend for complex operations like background jobs, auth flows, or email sending." },
  { q: 'How is Wasp different from Ruby on Rails or Django?', a: "Rails and Django are full-stack, but they require extra work for the modern single-page app experience most web apps offer today \u2014 think expanding a post on Twitter or dragging a Trello card without the whole page reloading. Wasp supports this out-of-the-box with React on the frontend. One of the biggest time savers is automatic sharing of data models between the database, frontend, and backend \u2014 with Rails or Django you'd typically have to implement a custom REST or GraphQL API, while with Wasp you can skip that step entirely." },
  { q: 'How hard is it to learn Wasp?', a: "We measured \u2014 it takes about 30 minutes to get going, and most users find it pretty straightforward. Since the majority of your coding is still done with React & Node.js, it's a marginal change to what you're used to. The Wasp config language is intentionally simple: no loops, no variables \u2014 think of it as a JSON that's easier to read and a bit smarter. You get full IDE support too: syntax highlighting, auto-completion, and live error reporting." },
  { q: 'Do you support only React & Node.js currently?', a: "Yes, that is currently the supported stack. But Wasp is being developed as a language/framework and architecture-agnostic tool, so we plan to add support for more languages and frameworks in the future. This is something we're pretty excited about and think could be a unique opportunity due to the compiler approach we're taking." },
  { q: 'How does Wasp work with AI coding tools like Claude Code or Cursor?', a: "Wasp's declarative config acts as a high-level specification that both you and AI tools already understand. In benchmarks, Claude Code used 38% fewer tokens and cost 44% less building the same feature in Wasp vs Next.js. There's also an official Wasp plugin for Claude Code with slash commands like /add-feature and /deploying-app that give AI deep framework knowledge. Less code to read and write means fewer hallucinations, faster results, and lower cost." },
  { q: 'What is OpenSaaS and how does it relate to Wasp?', a: "OpenSaaS is a free, open-source SaaS starter template built on Wasp. It comes pre-configured with Stripe/Polar.sh/Lemon Squeezy payments, an Astro-powered blog with SEO, an admin dashboard with analytics, AWS S3 file uploads, email sending, and cron jobs. It's used in production by companies like Kivo, Searchcraft, and Prompt Panda. Think of it as the fastest path from zero to a production SaaS \u2014 just add your business logic." },
  { q: 'How does deployment work?', a: "One command: wasp deploy fly deploy ships your entire app \u2014 frontend, backend, and database \u2014 to Fly.io. Wasp generates the Dockerfiles, configs, and handles secrets for you. You can also deploy to Railway, or self-host anywhere Node.js runs. For the frontend, you can optionally use Netlify or any static host. There's no vendor lock-in because you own all the generated code." },
  { q: 'How does the database and Prisma integration work?', a: "You define your data models once in schema.prisma and Wasp handles everything else. Run wasp start db to spin up a managed PostgreSQL in Docker. Run wasp db migrate-dev to apply schema changes as migrations. Run wasp db studio to browse your data visually in Prisma Studio. Run wasp db seed to populate test data. The types from your Prisma schema automatically flow through to your server operations and React components \u2014 full end-to-end type safety with zero manual type definitions." },
  { q: 'What auth methods are supported?', a: "Wasp supports username/password, email (with built-in email verification and password reset flows), Google, GitHub, Discord, Slack, Microsoft, and Keycloak. All you need is a few lines in main.wasp \u2014 Wasp generates the login/signup UI, handles session management, OAuth token exchange, CSRF protection, and auth middleware. You can use SMTP, Mailgun, or SendGrid for sending verification and reset emails." },
  { q: 'Is Wasp production-ready?', a: "Yes. Wasp is used in production by startups and companies that have won hackathons, raised funding, and acquired paying customers. The OpenSaaS template alone has dozens of production apps built on it. Wasp is backed by Y Combinator and has an active open-source community. The framework is in beta, meaning the API may still evolve, but the core is stable and battle-tested." },
]

const blogPosts = [
  { title: 'Next.js vs Wasp: 40% Less Tokens for the Same App', author: 'Vince Canger', time: '10 min read', href: 'https://wasp.sh/blog/2026/03/26/nextjs-vs-wasp-40-percent-less-tokens-same-app', img: 'https://wasp.sh/img/nextjs-wasp-tokens/nextjs-vs-wasp-tokens.webp' },
  { title: 'Claude Code for Fullstack Development: The 3 Things You Actually Need', author: 'Vince Canger', time: '21 min read', href: 'https://wasp.sh/blog/2025/12/18/claude-code-for-fullstack-development', img: 'https://wasp.sh/img/claude-code-fullstack/banner.webp' },
  { title: 'The Claude Code Plugin for Wasp is Here', author: 'Vince Canger', time: '5 min read', href: 'https://wasp.sh/blog/2025/12/12/claude-code-plugin-for-wasp', img: 'https://wasp.sh/img/cc-plugin/banner.webp' },
]

// ─── Code Comparisons ───────────────────────────────────
// Line counts = actual code lines only (no comments, no blanks)
const comparisons = [
  {
    label: 'Auth',
    desc: 'Full-stack auth with social login, email/password, verification & password reset.',
    tabs: [
      { name: 'Wasp', lines: 15, code: `<span class="tk-cmt">// main.wasp \u2014 this is ALL you need</span>

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
      { name: 'Next.js + Auth.js', lines: 55, code: `<span class="tk-cmt">// File 1 of 6+: lib/auth.ts</span>
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
  <span class="tk-prop">pages</span>: <span class="tk-br">{</span> <span class="tk-prop">signIn</span>: <span class="tk-str">"/login"</span>, <span class="tk-prop">error</span>: <span class="tk-str">"/auth/error"</span> <span class="tk-br">}</span>,
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
        <span class="tk-kw">const</span> valid = <span class="tk-kw">await</span> bcrypt.<span class="tk-fn">compare</span>(credentials.password, user.hashedPassword)
        <span class="tk-kw">if</span> (!valid) <span class="tk-kw">return</span> <span class="tk-bool">null</span>
        <span class="tk-kw">return</span> <span class="tk-br">{</span> <span class="tk-prop">id</span>: user.id, <span class="tk-prop">email</span>: user.email <span class="tk-br">}</span>
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

<span class="tk-cmt">// File 2: middleware.ts</span>
<span class="tk-kw">export</span> <span class="tk-br">{</span> auth <span class="tk-kw">as</span> default <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"./lib/auth"</span>
<span class="tk-kw">export const</span> config = <span class="tk-br">{</span> <span class="tk-prop">matcher</span>: [<span class="tk-str">"/((?!api|_next/static|favicon.ico).*)"</span>] <span class="tk-br">}</span>

<span class="tk-cmt">// File 3: app/api/auth/[...nextauth]/route.ts</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> handlers <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@/lib/auth"</span>
<span class="tk-kw">export const</span> <span class="tk-br">{</span> GET, POST <span class="tk-br">}</span> = handlers

<span class="tk-cmt">// + You still need to build from scratch:</span>
<span class="tk-cmt">// - Login page UI</span>
<span class="tk-cmt">// - Signup page + password hashing + user creation</span>
<span class="tk-cmt">// - Email verification (generate token, send email, verify endpoint)</span>
<span class="tk-cmt">// - Password reset (generate token, send email, reset endpoint)</span>
<span class="tk-cmt">// - SessionProvider wrapper in layout.tsx</span>` },
    ],
  },
  {
    label: 'Page Guards',
    desc: 'Protect pages so only logged-in users can access them.',
    tabs: [
      { name: 'Wasp', lines: 4, code: `<span class="tk-cmt">// main.wasp</span>

<span class="tk-kw">page</span> <span class="tk-type">DashboardPage</span> <span class="tk-br">{</span>
  <span class="tk-prop">authRequired</span>: <span class="tk-bool">true</span>,
  <span class="tk-prop">component</span>: <span class="tk-kw">import</span> <span class="tk-type">Dashboard</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/Dashboard"</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// That's it. Unauthenticated users are automatically</span>
<span class="tk-cmt">// redirected to your login route. The page component</span>
<span class="tk-cmt">// receives the \`user\` object as a prop.</span>` },
      { name: 'Next.js', lines: 18, code: `<span class="tk-cmt">// middleware.ts</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> auth <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"./lib/auth"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> NextResponse <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"next/server"</span>

<span class="tk-kw">export default</span> auth((req) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">if</span> (!req.auth && req.nextUrl.pathname.<span class="tk-fn">startsWith</span>(<span class="tk-str">"/dashboard"</span>)) <span class="tk-br">{</span>
    <span class="tk-kw">return</span> NextResponse.<span class="tk-fn">redirect</span>(<span class="tk-kw">new</span> <span class="tk-fn">URL</span>(<span class="tk-str">"/login"</span>, req.url))
  <span class="tk-br">}</span>
<span class="tk-br">}</span>)

<span class="tk-kw">export const</span> config = <span class="tk-br">{</span>
  <span class="tk-prop">matcher</span>: [<span class="tk-str">"/dashboard/:path*"</span>, <span class="tk-str">"/settings/:path*"</span>],
<span class="tk-br">}</span>

<span class="tk-cmt">// app/dashboard/page.tsx</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> auth <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@/lib/auth"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> redirect <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"next/navigation"</span>

<span class="tk-kw">export default async function</span> <span class="tk-fn">Dashboard</span>() <span class="tk-br">{</span>
  <span class="tk-kw">const</span> session = <span class="tk-kw">await</span> <span class="tk-fn">auth</span>()
  <span class="tk-kw">if</span> (!session) <span class="tk-fn">redirect</span>(<span class="tk-str">"/login"</span>)
  <span class="tk-kw">return</span> &lt;div&gt;Welcome <span class="tk-br">{</span>session.user.name<span class="tk-br">}</span>&lt;/div&gt;
<span class="tk-br">}</span>` },
      { name: 'Express', lines: 12, code: `<span class="tk-cmt">// middleware/auth.js</span>
<span class="tk-kw">const</span> <span class="tk-fn">requireAuth</span> = (req, res, next) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">if</span> (!req.isAuthenticated()) <span class="tk-br">{</span>
    <span class="tk-kw">return</span> res.<span class="tk-fn">status</span>(<span class="tk-bool">401</span>).<span class="tk-fn">json</span>(<span class="tk-br">{</span> <span class="tk-prop">error</span>: <span class="tk-str">"Unauthorized"</span> <span class="tk-br">}</span>)
  <span class="tk-br">}</span>
  <span class="tk-fn">next</span>()
<span class="tk-br">}</span>

<span class="tk-cmt">// Apply to every protected route manually:</span>
router.<span class="tk-fn">get</span>(<span class="tk-str">"/dashboard"</span>, requireAuth, dashboardHandler)
router.<span class="tk-fn">get</span>(<span class="tk-str">"/settings"</span>, requireAuth, settingsHandler)
router.<span class="tk-fn">get</span>(<span class="tk-str">"/profile"</span>, requireAuth, profileHandler)

<span class="tk-cmt">// For React SPA: also need client-side route guards,</span>
<span class="tk-cmt">// redirect logic, and loading states.</span>` },
    ],
  },
  {
    label: 'Email',
    desc: 'Send emails with built-in provider support. Used for verification, reset, and custom emails.',
    tabs: [
      { name: 'Wasp', lines: 12, code: `<span class="tk-cmt">// main.wasp</span>
<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">emailSender</span>: <span class="tk-br">{</span>
    <span class="tk-prop">provider</span>: <span class="tk-type">SMTP</span>,
    <span class="tk-prop">defaultFrom</span>: <span class="tk-br">{</span> <span class="tk-prop">name</span>: <span class="tk-str">"My App"</span>, <span class="tk-prop">email</span>: <span class="tk-str">"hi@myapp.com"</span> <span class="tk-br">}</span>,
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// src/actions.ts \u2014 send an email anywhere</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> emailSender <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/server/email"</span>

<span class="tk-kw">await</span> emailSender.<span class="tk-fn">send</span>(<span class="tk-br">{</span>
  <span class="tk-prop">to</span>: user.email,
  <span class="tk-prop">subject</span>: <span class="tk-str">"Welcome!"</span>,
  <span class="tk-prop">text</span>: <span class="tk-str">"Thanks for signing up."</span>,
  <span class="tk-prop">html</span>: <span class="tk-str">"Thanks for &lt;strong&gt;signing up&lt;/strong&gt;."</span>,
<span class="tk-br">}</span>)

<span class="tk-cmt">// Providers: SMTP, Mailgun, SendGrid, Dummy (dev)</span>
<span class="tk-cmt">// Auth emails (verify, reset) are sent automatically.</span>` },
      { name: 'Node.js + Nodemailer', lines: 28, code: `<span class="tk-cmt">// config/email.ts</span>
<span class="tk-kw">import</span> nodemailer <span class="tk-kw">from</span> <span class="tk-str">"nodemailer"</span>

<span class="tk-kw">const</span> transporter = nodemailer.<span class="tk-fn">createTransport</span>(<span class="tk-br">{</span>
  <span class="tk-prop">host</span>: process.env.SMTP_HOST,
  <span class="tk-prop">port</span>: <span class="tk-fn">Number</span>(process.env.SMTP_PORT),
  <span class="tk-prop">secure</span>: <span class="tk-bool">true</span>,
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span>
    <span class="tk-prop">user</span>: process.env.SMTP_USER,
    <span class="tk-prop">pass</span>: process.env.SMTP_PASS,
  <span class="tk-br">}</span>,
<span class="tk-br">}</span>)

<span class="tk-kw">export async function</span> <span class="tk-fn">sendEmail</span>(opts: <span class="tk-type">EmailOptions</span>) <span class="tk-br">{</span>
  <span class="tk-kw">await</span> transporter.<span class="tk-fn">sendMail</span>(<span class="tk-br">{</span>
    <span class="tk-prop">from</span>: <span class="tk-str">'"My App" &lt;hi@myapp.com&gt;'</span>,
    <span class="tk-prop">to</span>: opts.to,
    <span class="tk-prop">subject</span>: opts.subject,
    <span class="tk-prop">text</span>: opts.text,
    <span class="tk-prop">html</span>: opts.html,
  <span class="tk-br">}</span>)
<span class="tk-br">}</span>

<span class="tk-cmt">// For auth emails you also need to:</span>
<span class="tk-cmt">// - Generate crypto tokens for verify/reset</span>
<span class="tk-cmt">// - Store tokens in DB with expiry</span>
<span class="tk-cmt">// - Create API endpoints to validate tokens</span>
<span class="tk-cmt">// - Design HTML email templates</span>
<span class="tk-cmt">// - Handle token expiry and cleanup</span>` },
    ],
  },
  {
    label: 'Auto CRUD',
    desc: 'Generate a full CRUD API from a single declaration. Override any operation.',
    tabs: [
      { name: 'Wasp', lines: 12, code: `<span class="tk-cmt">// main.wasp</span>
<span class="tk-kw">crud</span> <span class="tk-type">Tasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">entity</span>: <span class="tk-type">Task</span>,
  <span class="tk-prop">operations</span>: <span class="tk-br">{</span>
    <span class="tk-fn">getAll</span>: <span class="tk-br">{</span> <span class="tk-prop">isPublic</span>: <span class="tk-bool">true</span> <span class="tk-br">}</span>,
    <span class="tk-fn">get</span>: <span class="tk-br">{}</span>,
    <span class="tk-fn">create</span>: <span class="tk-br">{</span>
      <span class="tk-prop">overrideFn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">createTask</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/tasks"</span>,
    <span class="tk-br">}</span>,
    <span class="tk-fn">update</span>: <span class="tk-br">{}</span>,
    <span class="tk-fn">delete</span>: <span class="tk-br">{}</span>,
  <span class="tk-br">}</span>,
<span class="tk-br">}</span>

<span class="tk-cmt">// Client usage \u2014 fully typed, zero boilerplate:</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> Tasks <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/client/crud"</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = Tasks.getAll.<span class="tk-fn">useQuery</span>()
<span class="tk-kw">const</span> createAction = Tasks.create.<span class="tk-fn">useAction</span>()` },
      { name: 'Express + Prisma', lines: 40, code: `<span class="tk-cmt">// routes/tasks.ts \u2014 every endpoint by hand</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> Router <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"express"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> prisma <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"../db"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> requireAuth <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"../middleware"</span>
<span class="tk-kw">const</span> router = <span class="tk-fn">Router</span>()

router.<span class="tk-fn">get</span>(<span class="tk-str">"/tasks"</span>, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>()
  res.<span class="tk-fn">json</span>(tasks)
<span class="tk-br">}</span>)

router.<span class="tk-fn">get</span>(<span class="tk-str">"/tasks/:id"</span>, requireAuth, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> task = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span>
    <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">id</span>: <span class="tk-fn">parseInt</span>(req.params.id) <span class="tk-br">}</span>
  <span class="tk-br">}</span>)
  <span class="tk-kw">if</span> (!task) <span class="tk-kw">return</span> res.<span class="tk-fn">status</span>(<span class="tk-bool">404</span>).<span class="tk-fn">json</span>(<span class="tk-br">{</span> <span class="tk-prop">error</span>: <span class="tk-str">"Not found"</span> <span class="tk-br">}</span>)
  res.<span class="tk-fn">json</span>(task)
<span class="tk-br">}</span>)

router.<span class="tk-fn">post</span>(<span class="tk-str">"/tasks"</span>, requireAuth, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> task = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">create</span>(<span class="tk-br">{</span>
    <span class="tk-prop">data</span>: <span class="tk-br">{</span> <span class="tk-prop">description</span>: req.body.description, <span class="tk-prop">isDone</span>: <span class="tk-bool">false</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>)
  res.<span class="tk-fn">status</span>(<span class="tk-bool">201</span>).<span class="tk-fn">json</span>(task)
<span class="tk-br">}</span>)

router.<span class="tk-fn">put</span>(<span class="tk-str">"/tasks/:id"</span>, requireAuth, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> task = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">update</span>(<span class="tk-br">{</span>
    <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">id</span>: <span class="tk-fn">parseInt</span>(req.params.id) <span class="tk-br">}</span>,
    <span class="tk-prop">data</span>: req.body,
  <span class="tk-br">}</span>)
  res.<span class="tk-fn">json</span>(task)
<span class="tk-br">}</span>)

router.<span class="tk-fn">delete</span>(<span class="tk-str">"/tasks/:id"</span>, requireAuth, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">delete</span>(<span class="tk-br">{</span>
    <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">id</span>: <span class="tk-fn">parseInt</span>(req.params.id) <span class="tk-br">}</span>
  <span class="tk-br">}</span>)
  res.<span class="tk-fn">status</span>(<span class="tk-bool">204</span>).<span class="tk-fn">end</span>()
<span class="tk-br">}</span>)

<span class="tk-cmt">// + validation, error handling, pagination, types,</span>
<span class="tk-cmt">// React Query hooks, cache invalidation...</span>` },
    ],
  },
  {
    label: 'Jobs',
    desc: 'Background jobs with scheduling, retries, and persistence. No infrastructure to manage.',
    tabs: [
      { name: 'Wasp', lines: 14, code: `<span class="tk-cmt">// main.wasp</span>
<span class="tk-kw">job</span> <span class="tk-type">emailReminder</span> <span class="tk-br">{</span>
  <span class="tk-prop">executor</span>: <span class="tk-type">PgBoss</span>,
  <span class="tk-prop">perform</span>: <span class="tk-br">{</span>
    <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">sendReminder</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/workers/reminder"</span>
  <span class="tk-br">}</span>,
  <span class="tk-prop">entities</span>: [<span class="tk-type">User</span>, <span class="tk-type">Task</span>],
  <span class="tk-prop">schedule</span>: <span class="tk-br">{</span>
    <span class="tk-prop">cron</span>: <span class="tk-str">"0 9 * * *"</span>  <span class="tk-cmt">// every day at 9am</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// src/workers/reminder.ts</span>
<span class="tk-kw">import type</span> <span class="tk-br">{</span> <span class="tk-type">EmailReminder</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/server/jobs"</span>

<span class="tk-kw">export const</span> <span class="tk-fn">sendReminder</span>: <span class="tk-type">EmailReminder</span> = <span class="tk-kw">async</span> (args, ctx) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> users = <span class="tk-kw">await</span> ctx.entities.User.<span class="tk-fn">findMany</span>()
  <span class="tk-kw">for</span> (<span class="tk-kw">const</span> user <span class="tk-kw">of</span> users) <span class="tk-br">{</span>
    <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> ctx.entities.Task.<span class="tk-fn">findMany</span>(<span class="tk-br">{</span>
      <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">userId</span>: user.id, <span class="tk-prop">isDone</span>: <span class="tk-bool">false</span> <span class="tk-br">}</span>
    <span class="tk-br">}</span>)
    <span class="tk-kw">if</span> (tasks.length > <span class="tk-bool">0</span>) <span class="tk-kw">await</span> <span class="tk-fn">sendEmail</span>(user, tasks)
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// Or trigger manually:</span>
<span class="tk-kw">await</span> emailReminder.<span class="tk-fn">submit</span>(<span class="tk-br">{}</span>)
<span class="tk-kw">await</span> emailReminder.<span class="tk-fn">delay</span>(<span class="tk-bool">60</span>).<span class="tk-fn">submit</span>(<span class="tk-br">{}</span>) <span class="tk-cmt">// 60 sec delay</span>` },
      { name: 'Node.js + BullMQ', lines: 35, code: `<span class="tk-cmt">// config/queue.ts</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> Queue, Worker <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"bullmq"</span>
<span class="tk-kw">import</span> Redis <span class="tk-kw">from</span> <span class="tk-str">"ioredis"</span>

<span class="tk-kw">const</span> redis = <span class="tk-kw">new</span> <span class="tk-fn">Redis</span>(process.env.REDIS_URL)
<span class="tk-kw">const</span> emailQueue = <span class="tk-kw">new</span> <span class="tk-fn">Queue</span>(<span class="tk-str">"email-reminders"</span>, <span class="tk-br">{</span> <span class="tk-prop">connection</span>: redis <span class="tk-br">}</span>)

<span class="tk-cmt">// Schedule the recurring job</span>
<span class="tk-kw">await</span> emailQueue.<span class="tk-fn">add</span>(<span class="tk-str">"daily-reminder"</span>, <span class="tk-br">{}</span>, <span class="tk-br">{</span>
  <span class="tk-prop">repeat</span>: <span class="tk-br">{</span> <span class="tk-prop">pattern</span>: <span class="tk-str">"0 9 * * *"</span> <span class="tk-br">}</span>,
<span class="tk-br">}</span>)

<span class="tk-cmt">// workers/reminder.ts</span>
<span class="tk-kw">const</span> worker = <span class="tk-kw">new</span> <span class="tk-fn">Worker</span>(<span class="tk-str">"email-reminders"</span>, <span class="tk-kw">async</span> (job) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> users = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findMany</span>()
  <span class="tk-kw">for</span> (<span class="tk-kw">const</span> user <span class="tk-kw">of</span> users) <span class="tk-br">{</span>
    <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>(<span class="tk-br">{</span>
      <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">userId</span>: user.id, <span class="tk-prop">isDone</span>: <span class="tk-bool">false</span> <span class="tk-br">}</span>
    <span class="tk-br">}</span>)
    <span class="tk-kw">if</span> (tasks.length > <span class="tk-bool">0</span>) <span class="tk-kw">await</span> <span class="tk-fn">sendEmail</span>(user, tasks)
  <span class="tk-br">}</span>
<span class="tk-br">}</span>, <span class="tk-br">{</span> <span class="tk-prop">connection</span>: redis <span class="tk-br">}</span>)

worker.<span class="tk-fn">on</span>(<span class="tk-str">"failed"</span>, (job, err) <span class="tk-kw">=></span> console.<span class="tk-fn">error</span>(err))

<span class="tk-cmt">// You also need:</span>
<span class="tk-cmt">// - Redis instance running (separate infrastructure)</span>
<span class="tk-cmt">// - Worker process running alongside your server</span>
<span class="tk-cmt">// - Health checks, graceful shutdown</span>
<span class="tk-cmt">// - Dashboard for monitoring (Bull Board)</span>` },
    ],
  },
  {
    label: 'Database',
    desc: 'Managed dev database, migrations, studio, and seeding from the CLI.',
    tabs: [
      { name: 'Wasp CLI', lines: 4, code: `$ <span class="tk-fn">wasp</span> start db          <span class="tk-cmt"># spin up Postgres in Docker</span>
$ <span class="tk-fn">wasp</span> db migrate-dev    <span class="tk-cmt"># apply schema changes</span>
$ <span class="tk-fn">wasp</span> db studio         <span class="tk-cmt"># visual data browser</span>
$ <span class="tk-fn">wasp</span> db seed           <span class="tk-cmt"># populate test data</span>` },
      { name: 'Manual Setup', lines: 10, code: `<span class="tk-cmt"># Install and run PostgreSQL yourself</span>
$ docker run --name mydb -e POSTGRES_PASSWORD=secret \\
    -p 5432:5432 -d postgres:16
$ echo <span class="tk-str">'DATABASE_URL="postgresql://..."'</span> &gt; .env
$ npm install prisma @prisma/client
$ npx prisma init
$ npx prisma migrate dev --name init
$ npx prisma studio
$ npx prisma db seed

<span class="tk-cmt"># Manage Docker lifecycle, env vars, connection</span>
<span class="tk-cmt"># pooling, reset scripts... all separate concerns</span>` },
    ],
  },
  {
    label: 'Deploy',
    desc: 'One command to ship frontend, backend, and database.',
    tabs: [
      { name: 'Wasp', lines: 1, code: `$ <span class="tk-fn">wasp</span> deploy fly deploy

<span class="tk-cmt"># That's it. Wasp generates Dockerfiles, fly.toml,</span>
<span class="tk-cmt"># provisions Postgres, sets secrets, builds, and deploys</span>
<span class="tk-cmt"># both frontend and backend.</span>` },
      { name: 'Manual (Fly.io)', lines: 10, code: `$ touch Dockerfile
$ fly launch
$ fly postgres create
$ fly postgres attach
$ fly secrets set DATABASE_URL=... JWT_SECRET=...
$ fly secrets set GOOGLE_CLIENT_ID=...
$ fly deploy

<span class="tk-cmt"># Build and deploy frontend separately</span>
$ npm run build
<span class="tk-cmt"># Upload to Netlify/Vercel/S3...</span>

<span class="tk-cmt"># Set up CI/CD, SSL, health checks,</span>
<span class="tk-cmt"># migrations on deploy, rollbacks...</span>` },
    ],
  },
  {
    label: 'Types',
    desc: 'End-to-end TypeScript from Prisma schema to React components.',
    tabs: [
      { name: 'Wasp', lines: 9, code: `<span class="tk-cmt">// schema.prisma \u2014 single source of truth</span>
<span class="tk-kw">model</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>          <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">description</span> <span class="tk-type">String</span>
  <span class="tk-prop">isDone</span>      <span class="tk-type">Boolean</span> <span class="tk-fn">@default</span>(<span class="tk-bool">false</span>)
<span class="tk-br">}</span>

<span class="tk-cmt">// Server \u2014 types auto-generated from schema</span>
<span class="tk-kw">import type</span> <span class="tk-br">{</span> <span class="tk-type">GetTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/server/operations"</span>
<span class="tk-kw">export const</span> <span class="tk-fn">getTasks</span>: <span class="tk-type">GetTasks</span> = <span class="tk-kw">async</span> (args, ctx) <span class="tk-kw">=></span>
  ctx.entities.Task.<span class="tk-fn">findMany</span>()

<span class="tk-cmt">// Client \u2014 same types, zero effort</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> getTasks, <span class="tk-fn">useQuery</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"wasp/client/operations"</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = <span class="tk-fn">useQuery</span>(getTasks) <span class="tk-cmt">// Task[] \u2014 fully typed</span>` },
      { name: 'Manual TypeScript', lines: 14, code: `<span class="tk-cmt">// shared/types.ts \u2014 manually duplicated</span>
<span class="tk-kw">export interface</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>: <span class="tk-type">number</span>
  <span class="tk-prop">description</span>: <span class="tk-type">string</span>
  <span class="tk-prop">isDone</span>: <span class="tk-type">boolean</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// server/routes.ts</span>
app.<span class="tk-fn">get</span>(<span class="tk-str">"/api/tasks"</span>, <span class="tk-kw">async</span> (req: <span class="tk-type">Request</span>, res: <span class="tk-type">Response</span>&lt;<span class="tk-type">Task</span>[]&gt;) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>()
  res.<span class="tk-fn">json</span>(tasks)
<span class="tk-br">}</span>)

<span class="tk-cmt">// client/api.ts</span>
<span class="tk-kw">const</span> res = <span class="tk-kw">await</span> <span class="tk-fn">fetch</span>(<span class="tk-str">"/api/tasks"</span>)
<span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> res.<span class="tk-fn">json</span>() <span class="tk-kw">as</span> <span class="tk-type">Task</span>[]

<span class="tk-cmt">// Types can drift between client &amp; server.</span>
<span class="tk-cmt">// Prisma types != your shared types.</span>
<span class="tk-cmt">// No compile-time guarantee they match.</span>` },
    ],
  },
]

// ─── Components ─────────────────────────────────────────
function CodeBlock() {
  const [tab, setTab] = useState('wasp')
  const inactive = 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
  return (
    <div className="gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-4 py-3">
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
          <pre className="font-mono text-[13px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
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
<span class="tk-br">}</span>` }} />
        ) : (
          <pre className="font-mono text-[13px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">model</span> <span class="tk-type">User</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>       <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">tasks</span>    <span class="tk-type">Task</span>[]
<span class="tk-br">}</span>

<span class="tk-kw">model</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>          <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">description</span> <span class="tk-type">String</span>
  <span class="tk-prop">isDone</span>      <span class="tk-type">Boolean</span> <span class="tk-fn">@default</span>(<span class="tk-bool">false</span>)
  <span class="tk-prop">user</span>        <span class="tk-type">User</span>    <span class="tk-fn">@relation</span>(<span class="tk-prop">fields</span>: [<span class="tk-prop">userId</span>], <span class="tk-prop">references</span>: [<span class="tk-prop">id</span>])
  <span class="tk-prop">userId</span>      <span class="tk-type">Int</span>
<span class="tk-br">}</span>` }} />
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
          <p className={`${t.m} max-w-lg mx-auto text-[15px]`}>See how Wasp simplifies common full-stack patterns.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {comparisons.map((c, i) => (
            <button key={c.label} onClick={() => { setActiveComp(i); setActiveTab(0) }}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer transition-all ${activeComp === i
                ? 'bg-wasp-100 dark:bg-wasp-400/10 text-wasp-700 dark:text-wasp-400 border border-wasp-200 dark:border-wasp-400/20'
                : `bg-zinc-100 dark:bg-white/[0.04] ${t.m} border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08]`
              }`}>{c.label}</button>
          ))}
        </div>

        <p className={`text-center text-[14px] ${t.p} mb-8`}>{comp.desc}</p>

        <div className="max-w-4xl mx-auto">
          <div className="gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3">
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
                {!isWasp && tab.lines > comp.tabs[0].lines && (
                  <span className="text-[10px] font-medium text-red-500/70 dark:text-red-400/50 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md">
                    {Math.round((tab.lines / comp.tabs[0].lines - 1) * 100)}% more
                  </span>
                )}
                {isWasp && <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">simplest</span>}
              </div>
            </div>
            <div className="p-5 md:p-6 overflow-x-auto code-scroll">
              <pre className="font-mono text-[13px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: tab.code }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CLI Demo ──────────────────────────────────────────
const cliDemoSteps = [
  {
    cmd: 'curl -sSL https://get.wasp.sh/installer.sh | sh',
    description: 'Install Wasp globally with a single command. Works on macOS, Linux, and WSL.',
    terminalOutput: `  ____                  _
 / ___|  ___  ___  _ __ | |_
 \\___ \\ / _ \\/ __|| '_ \\| __|
  ___) |  __/\\__ \\| |_) | |_
 |____/ \\___||___/| .__/ \\__|
                  |_|

 ── Installing Wasp v0.16 ──────────────────

 Downloading wasp-linux-x86_64.tar.gz...
 ███████████████████████████████████  100%

 ✓ Extracted to ~/.local/bin/wasp
 ✓ Added wasp to PATH
 ✓ Installation complete!

 Run 'wasp new' to create your first app.`,
    browserContent: 'install',
  },
  {
    cmd: 'wasp new my-app -t basic',
    description: 'Scaffold a new full-stack app from a starter template. Includes auth, DB, and example pages.',
    terminalOutput: ` 🐝 --- Creating your Wasp app from template... ──

  → Project name: my-app
  → Template: basic

 Creating directory my-app...
 Setting up project files...

  my-app/
  ├── main.wasp          # App config
  ├── schema.prisma      # Database schema
  ├── src/
  │   ├── MainPage.jsx   # Landing page
  │   └── operations.ts  # Server logic
  └── .env.server        # Server secrets

 ✓ Project created successfully!

 To start developing:
   cd my-app
   wasp start db
   wasp start`,
    browserContent: 'new',
  },
  {
    cmd: 'wasp start db',
    description: 'Spins up a managed PostgreSQL database in Docker. No manual setup, connection strings, or config needed.',
    terminalOutput: ` 🐝 --- Starting development database... ──────

 Pulling postgres:16-alpine image...
 ✓ Image ready

 Starting PostgreSQL container...
 ✓ Container wasp-dev-db-my-app running

 PostgreSQL 16.2 on port 5432
 Database: my-app-dev
 User: wasp

 ✓ Database is ready and accepting connections.
 ✓ DATABASE_URL configured automatically.`,
    browserContent: 'db-start',
  },
  {
    cmd: 'wasp start',
    description: 'Launches the full-stack dev server with hot reload. Frontend on :3000, backend on :3001, all wired up.',
    terminalOutput: ` 🐝 --- Starting Wasp app in dev mode... ──────

 [ Wasp ] Compiling wasp project...
 ✓ Project compiled successfully.

 [Client] Starting Vite dev server...
 [Server] Starting Express server...
 [Server] Prisma client generated.
 [Server] PgBoss job runner started.

 [Client]  ✓ ready in 847ms

   ➜ Client:  http://localhost:3000
   ➜ Server:  http://localhost:3001

 Watching for file changes...`,
    browserContent: 'start',
  },
  {
    cmd: 'wasp db migrate-dev --name "add-tasks"',
    description: 'Creates and applies a database migration from your Prisma schema changes. Keeps your DB in sync with your code.',
    terminalOutput: ` 🐝 --- Running database migration... ────────

 Prisma schema loaded from schema.prisma

 ✓ Generated migration: add-tasks
   migrations/
   └── 20260401_add_tasks/
       └── migration.sql

 Applying migration \`add-tasks\`...

 CREATE TABLE "Task" (
   "id" SERIAL PRIMARY KEY,
   "description" TEXT NOT NULL,
   "isDone" BOOLEAN DEFAULT false,
   "userId" INTEGER REFERENCES "User"("id")
 );

 ✓ Migration applied successfully.
 ✓ Prisma Client regenerated.`,
    browserContent: 'migrate',
  },
  {
    cmd: 'wasp db studio',
    description: 'Opens Prisma Studio — a visual database browser. View, edit, and filter your data without writing SQL.',
    terminalOutput: ` 🐝 --- Opening Prisma Studio... ─────────────

 Prisma Studio is starting...

 Environment loaded from .env.server

 ✓ Prisma Studio is running on
   http://localhost:5555

 Connected to database: my-app-dev
 Models available:
   → User (3 records)
   → Task (12 records)`,
    browserContent: 'studio',
  },
  {
    cmd: 'wasp db seed',
    description: 'Runs your seed functions to populate the database with test data. Great for development and demos.',
    terminalOutput: ` 🐝 --- Seeding database... ──────────────────

 Running seed: devSeed

 Seeding Users...
   ✓ Created user alice@example.com
   ✓ Created user bob@example.com
   ✓ Created user carol@example.com

 Seeding Tasks...
   ✓ Created 4 tasks for alice
   ✓ Created 3 tasks for bob
   ✓ Created 5 tasks for carol

 ✓ Database seeded successfully.
   3 users, 12 tasks created.`,
    browserContent: 'seed',
  },
  {
    cmd: 'wasp build',
    description: 'Compiles your entire app into deployable code — Dockerfiles, optimized bundles, migrations, and configs included.',
    terminalOutput: ` 🐝 --- Building wasp project... ─────────────

 Compiling wasp config...
 ✓ Config validated

 [Client] Building React app with Vite...
 ✓ 214 modules transformed
 ✓ Build: index.js (142 kB gzip)
 ✓ Build: index.css (7.5 kB gzip)

 [Server] Bundling Express server...
 ✓ Server bundle ready

 [Docker] Generating Dockerfile...
 ✓ Multi-stage Dockerfile created

 ✓ Build complete! Output in .wasp/build/
   Ready for deployment.`,
    browserContent: 'build',
  },
  {
    cmd: 'wasp deploy fly deploy',
    description: 'Ships your entire stack to Fly.io — frontend, backend, database, secrets, SSL — all in one command.',
    terminalOutput: ` 🐝 --- Deploying to Fly.io... ───────────────

 Building Docker image...
 ✓ Image built (247 MB)

 Deploying server...
 ✓ Server deployed: my-app-server.fly.dev

 Provisioning Postgres...
 ✓ Database: my-app-db (256 MB, sjc region)

 Running migrations...
 ✓ All migrations applied

 Deploying client...
 ✓ Client deployed: my-app-client.fly.dev

 Setting secrets...
 ✓ DATABASE_URL, JWT_SECRET configured

 ✓ App is live!
   https://my-app-client.fly.dev`,
    browserContent: 'deploy',
  },
  {
    cmd: 'wasp clean',
    description: 'Wipes all generated code, caches, and node_modules. The Wasp equivalent of "have you tried turning it off and on again?"',
    terminalOutput: ` 🐝 --- Cleaning project... ──────────────────

 Removing .wasp/out/...        ✓
 Removing .wasp/build/...      ✓
 Removing node_modules/...     ✓
 Removing .wasp/cache/...      ✓

 ✓ Project cleaned successfully.

 Run 'wasp start' to regenerate everything.`,
    browserContent: 'clean',
  },
]

function CLIDemoBrowserContent({ type }) {
  if (type === 'install') return (
    <div className="p-5 flex flex-col items-center justify-center h-full min-h-[280px]">
      <div className="w-16 h-16 mb-4 rounded-2xl bg-wasp-100 dark:bg-wasp-400/10 flex items-center justify-center"><WaspLogo size={36} /></div>
      <div className={`text-[15px] font-semibold ${t.h} mb-1`}>Welcome to Wasp</div>
      <div className={`text-[12px] ${t.m} mb-4`}>Full-stack framework installed</div>
      <div className="flex gap-2">
        <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">v0.16.7</span>
        <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.04] text-zinc-500 border border-zinc-200 dark:border-white/[0.06]">Node 20+</span>
      </div>
    </div>
  )
  if (type === 'new') return (
    <div className="p-5 min-h-[280px]">
      <div className={`text-[11px] font-semibold ${t.accent} mb-3`}>Project created</div>
      <div className="space-y-1.5">
        {[
          { name: 'main.wasp', desc: 'App config — routes, auth, jobs', color: 'text-wasp-600 dark:text-wasp-400' },
          { name: 'schema.prisma', desc: 'Database models', color: 'text-emerald-600 dark:text-emerald-400' },
          { name: 'src/MainPage.jsx', desc: 'Your first page', color: 'text-purple-600 dark:text-purple-400' },
          { name: 'src/operations.ts', desc: 'Server queries & actions', color: 'text-blue-600 dark:text-blue-400' },
          { name: '.env.server', desc: 'Server environment vars', color: 'text-zinc-500' },
        ].map(f => (
          <div key={f.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.04]`}>
            <span className={`text-[11px] font-mono font-medium ${f.color} min-w-[130px]`}>{f.name}</span>
            <span className={`text-[10px] ${t.f}`}>{f.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
  if (type === 'db-start') return (
    <div className="p-5 flex flex-col items-center justify-center h-full min-h-[280px]">
      <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>
      </div>
      <div className={`text-[14px] font-semibold ${t.h} mb-1`}>PostgreSQL Running</div>
      <div className={`text-[11px] ${t.m} mb-3`}>Managed dev database ready</div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className={`px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05] ${t.m}`}>Port: <span className={t.h}>5432</span></div>
        <div className={`px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05] ${t.m}`}>DB: <span className={t.h}>my-app</span></div>
      </div>
    </div>
  )
  if (type === 'start') return (
    <div className="p-5 min-h-[280px]">
      <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] overflow-hidden mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.04]">
          <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400/60"/><div className="w-2 h-2 rounded-full bg-yellow-400/60"/><div className="w-2 h-2 rounded-full bg-green-400/60"/></div>
          <div className={`flex-1 text-center text-[9px] font-mono ${t.f}`}>localhost:3000</div>
        </div>
        <div className="p-4 bg-white dark:bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-wasp-400/20 flex items-center justify-center"><WaspLogo size={14} /></div>
            <span className={`text-[12px] font-semibold ${t.h}`}>My App</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded bg-zinc-100 dark:bg-white/[0.06] w-3/4" />
            <div className="h-2 rounded bg-zinc-100 dark:bg-white/[0.06] w-1/2" />
            <div className="h-8 rounded bg-wasp-100 dark:bg-wasp-400/10 mt-3 flex items-center justify-center">
              <span className="text-[9px] font-medium text-wasp-700 dark:text-wasp-400">Sign in with Google</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-[10px]">
        <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">HMR active</span>
        <span className={`px-2 py-1 rounded bg-zinc-50 dark:bg-white/[0.03] ${t.m} border border-zinc-100 dark:border-white/[0.05]`}>Vite 6.x</span>
      </div>
    </div>
  )
  if (type === 'migrate') return (
    <div className="p-5 min-h-[280px]">
      <div className={`text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-3`}>Migration applied</div>
      <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] overflow-hidden font-mono text-[10px]">
        <div className="px-3 py-2 bg-zinc-50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.04]">
          <span className={t.f}>migrations/20260401_add_tasks/</span>
        </div>
        <div className="p-3 space-y-0.5">
          <div><span className="text-blue-500">CREATE TABLE</span> <span className="text-emerald-600 dark:text-emerald-400">"Task"</span> (</div>
          <div className="pl-4"><span className={t.m}>"id"</span> <span className="text-purple-500">SERIAL PRIMARY KEY</span>,</div>
          <div className="pl-4"><span className={t.m}>"description"</span> <span className="text-purple-500">TEXT NOT NULL</span>,</div>
          <div className="pl-4"><span className={t.m}>"isDone"</span> <span className="text-purple-500">BOOLEAN DEFAULT false</span>,</div>
          <div className="pl-4"><span className={t.m}>"userId"</span> <span className="text-purple-500">INTEGER REFERENCES</span> <span className="text-emerald-600 dark:text-emerald-400">"User"</span></div>
          <div>);</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span className={`text-[10px] ${t.m}`}>Prisma Client regenerated with new types</span>
      </div>
    </div>
  )
  if (type === 'studio') return (
    <div className="p-5 min-h-[280px]">
      <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.04]">
          <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400/60"/><div className="w-2 h-2 rounded-full bg-yellow-400/60"/><div className="w-2 h-2 rounded-full bg-green-400/60"/></div>
          <div className={`flex-1 text-center text-[9px] font-mono ${t.f}`}>localhost:5555</div>
        </div>
        <div className="bg-white dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-100 dark:border-white/[0.04]">
            <span className="text-[10px] font-semibold text-zinc-800 dark:text-zinc-200">Prisma Studio</span>
            <span className={`text-[9px] ${t.f}`}>my-app-dev</span>
          </div>
          <div className="flex">
            <div className="w-24 border-r border-zinc-100 dark:border-white/[0.04] p-2 space-y-1">
              <div className="px-2 py-1 rounded text-[9px] font-medium bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">User</div>
              <div className="px-2 py-1 rounded text-[9px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Task</div>
            </div>
            <div className="flex-1 p-2">
              <table className="w-full text-[8px]">
                <thead><tr className={`${t.f} border-b border-zinc-100 dark:border-white/[0.04]`}><th className="text-left py-1 px-1">id</th><th className="text-left py-1 px-1">description</th><th className="text-left py-1 px-1">isDone</th></tr></thead>
                <tbody className={t.m}>
                  <tr className="border-b border-zinc-50 dark:border-white/[0.02]"><td className="py-1 px-1">1</td><td className="py-1 px-1">Buy groceries</td><td className="py-1 px-1">false</td></tr>
                  <tr className="border-b border-zinc-50 dark:border-white/[0.02]"><td className="py-1 px-1">2</td><td className="py-1 px-1">Deploy app</td><td className="py-1 px-1">true</td></tr>
                  <tr><td className="py-1 px-1">3</td><td className="py-1 px-1">Write tests</td><td className="py-1 px-1">false</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  if (type === 'seed') return (
    <div className="p-5 flex flex-col items-center justify-center h-full min-h-[280px]">
      <div className="w-14 h-14 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div className={`text-[14px] font-semibold ${t.h} mb-1`}>Database Seeded</div>
      <div className={`text-[11px] ${t.m} mb-4`}>Test data ready for development</div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="px-3 py-2 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05]">
          <div className={`text-[16px] font-bold ${t.h}`}>3</div>
          <div className={`text-[9px] ${t.f}`}>Users</div>
        </div>
        <div className="px-3 py-2 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05]">
          <div className={`text-[16px] font-bold ${t.h}`}>12</div>
          <div className={`text-[9px] ${t.f}`}>Tasks</div>
        </div>
        <div className="px-3 py-2 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05]">
          <div className={`text-[16px] font-bold ${t.h}`}>1</div>
          <div className={`text-[9px] ${t.f}`}>Seed fn</div>
        </div>
      </div>
    </div>
  )
  if (type === 'build') return (
    <div className="p-5 min-h-[280px]">
      <div className={`text-[11px] font-semibold ${t.accent} mb-3`}>Build output</div>
      <div className="space-y-2">
        {[
          { label: 'React SPA', size: '142 kB', bar: 65, color: 'bg-purple-400' },
          { label: 'CSS bundle', size: '7.5 kB', bar: 15, color: 'bg-blue-400' },
          { label: 'Server bundle', size: '89 kB', bar: 40, color: 'bg-emerald-400' },
          { label: 'Dockerfile', size: '1.2 kB', bar: 5, color: 'bg-orange-400' },
        ].map(b => (
          <div key={b.label}>
            <div className="flex justify-between mb-1">
              <span className={`text-[10px] font-medium ${t.p}`}>{b.label}</span>
              <span className={`text-[10px] font-mono ${t.f}`}>{b.size} gzip</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.06] overflow-hidden">
              <div className={`h-full rounded-full ${b.color}/60`} style={{ width: `${b.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span className={`text-[10px] ${t.m}`}>Ready for deployment</span>
      </div>
    </div>
  )
  if (type === 'deploy') return (
    <div className="p-5 min-h-[280px]">
      <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] overflow-hidden mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.04]">
          <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400/60"/><div className="w-2 h-2 rounded-full bg-yellow-400/60"/><div className="w-2 h-2 rounded-full bg-green-400/60"/></div>
          <div className={`flex-1 text-center text-[9px] font-mono ${t.f}`}>my-app-client.fly.dev</div>
        </div>
        <div className="p-4 bg-white dark:bg-zinc-900/50 text-center">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div className={`text-[12px] font-semibold ${t.h}`}>App is live!</div>
          <div className={`text-[10px] ${t.m} mt-0.5`}>SSL enabled, all services running</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[9px] text-center">
        <div className={`px-2 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20`}>Client</div>
        <div className={`px-2 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20`}>Server</div>
        <div className={`px-2 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20`}>Database</div>
      </div>
    </div>
  )
  if (type === 'clean') return (
    <div className="p-5 flex flex-col items-center justify-center h-full min-h-[280px]">
      <div className="w-14 h-14 mb-4 rounded-xl bg-zinc-100 dark:bg-white/[0.06] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={t.m}><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
      </div>
      <div className={`text-[14px] font-semibold ${t.h} mb-1`}>Project Cleaned</div>
      <div className={`text-[11px] ${t.m} mb-4 text-center`}>Fresh start — run <code className="font-mono text-wasp-600 dark:text-wasp-400">wasp start</code> to rebuild</div>
      <div className="flex flex-wrap justify-center gap-2 text-[9px]">
        {['.wasp/out/', '.wasp/build/', 'node_modules/', '.wasp/cache/'].map(p => (
          <span key={p} className={`px-2 py-1 rounded-md bg-zinc-50 dark:bg-white/[0.03] ${t.f} border border-zinc-100 dark:border-white/[0.05] line-through`}>{p}</span>
        ))}
      </div>
    </div>
  )
  return null
}

function CLIDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [typedCmd, setTypedCmd] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  const step = cliDemoSteps[activeStep]

  const startTyping = useCallback((stepIndex) => {
    const cmd = cliDemoSteps[stepIndex].cmd
    setTypedCmd('')
    setShowOutput(false)
    setIsTyping(true)

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setTypedCmd(cmd.slice(0, i))
      if (i >= cmd.length) {
        clearInterval(intervalRef.current)
        timeoutRef.current = setTimeout(() => {
          setShowOutput(true)
          setIsTyping(false)
        }, 400)
      }
    }, 35)
  }, [])

  useEffect(() => {
    startTyping(activeStep)
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [activeStep, startTyping])

  // Auto-advance
  useEffect(() => {
    if (!showOutput) return
    const timer = setTimeout(() => {
      setActiveStep(prev => (prev + 1) % cliDemoSteps.length)
    }, 4000)
    return () => clearTimeout(timer)
  }, [showOutput])

  return (
    <section className={`py-28 md:py-36 border-t ${t.sec}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>CLI</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>One CLI to rule them all</h2>
          <p className={`${t.m} max-w-lg mx-auto text-[15px]`}>Install to deploy — every step handled by a single command.</p>
        </div>

        {/* Step selector */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {cliDemoSteps.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(i)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono cursor-pointer transition-all ${activeStep === i
                ? 'bg-wasp-100 dark:bg-wasp-400/10 text-wasp-700 dark:text-wasp-400 border border-wasp-200 dark:border-wasp-400/20'
                : `bg-zinc-100 dark:bg-white/[0.04] ${t.f} border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08]`
              }`}>
              {s.cmd.split(' ').slice(0, s.cmd.startsWith('curl') ? 1 : 3).join(' ')}
            </button>
          ))}
        </div>

        {/* Main demo area */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Browser preview */}
            <div className="gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-white/[0.05] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/20 dark:bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/20 dark:bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-400/20 dark:bg-green-500/20" />
                </div>
                <span className={`text-[11px] font-medium ${t.m} ml-2`}>Preview</span>
              </div>
              <CLIDemoBrowserContent type={step.browserContent} />
            </div>

            {/* Right: Terminal */}
            <div className="gradient-border noise-overlay rounded-2xl bg-zinc-900 dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                </div>
                <span className="text-[11px] font-medium text-zinc-500 ml-2">Terminal</span>
              </div>
              <div className="p-4 font-mono text-[11px] leading-[1.7] min-h-[280px] overflow-hidden">
                <div className="flex">
                  <span className="text-emerald-400 mr-2 select-none">$</span>
                  <span className="text-zinc-100">{typedCmd}</span>
                  {isTyping && <span className="inline-block w-[7px] h-[14px] bg-zinc-400 ml-0.5 animate-pulse" />}
                </div>
                {showOutput && (
                  <pre className="text-zinc-500 mt-2 whitespace-pre-wrap cli-demo-fade-in">{step.terminalOutput}</pre>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`text-center mt-6 text-[13px] ${t.p} max-w-2xl mx-auto leading-relaxed cli-demo-fade-in`}>
            <code className={`font-mono ${t.accent} bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded text-[12px]`}>{step.cmd.length > 40 ? step.cmd.slice(0, 40) + '...' : step.cmd}</code>
            <span className="mx-2">—</span>
            {step.description}
          </div>
        </div>
      </div>
    </section>
  )
}

function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const cmd = 'npm i -g @wasp.sh/wasp-cli@latest'
  return (
    <section className={`py-20 border-t ${t.sec}`}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${t.h} mb-4`}>Get started in seconds</h2>
        <div className={`flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-surface-2 border ${t.brd} px-5 py-3.5 font-mono text-[13px] ${t.p} max-w-lg mx-auto mb-4`}>
          <span className={t.f}>$</span>
          <span className="flex-1 text-left overflow-x-auto whitespace-nowrap">{cmd}</span>
          <button onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className={`p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-white/[0.06] ${t.link} cursor-pointer shrink-0`} aria-label="Copy">
            {copied ? <CheckSmall /> : <CopyIcon />}
          </button>
        </div>
        <p className={`text-[13px] ${t.m}`}>Then run <code className={`font-mono ${t.accent} bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded`}>wasp new</code> to create your first app. <a href="https://wasp.sh/docs/quick-start" target="_blank" rel="noreferrer" className={`${t.accent} hover:underline`}>Full guide &rarr;</a></p>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className={`py-28 md:py-36 border-t ${t.sec}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>How it works</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>You write this. Wasp builds the rest.</h2>
          <p className={`${t.m} max-w-xl mx-auto text-[15px] leading-relaxed`}>A small config file and your business logic go in. A full production app comes out.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <div className="gradient-border rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-wasp-400" /><span className={`text-[12px] font-semibold ${t.accent}`}>What you write</span></div>
              <span className={`text-[11px] font-mono ${t.f}`}>~30 lines</span>
            </div>
            <div className="p-5 code-scroll">
              <pre className="font-mono text-[12px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: `<span class="tk-cmt">// main.wasp</span>
<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">title</span>: <span class="tk-str">"My SaaS"</span>,
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span> <span class="tk-fn">google</span>: <span class="tk-br">{}</span>, <span class="tk-fn">email</span>: <span class="tk-br">{</span>...<span class="tk-br">}</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>,
  <span class="tk-prop">emailSender</span>: <span class="tk-br">{</span> <span class="tk-prop">provider</span>: <span class="tk-type">SMTP</span> <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-kw">route</span> <span class="tk-type">DashRoute</span> <span class="tk-br">{</span> <span class="tk-prop">path</span>: <span class="tk-str">"/dashboard"</span>, <span class="tk-prop">to</span>: <span class="tk-type">Dashboard</span> <span class="tk-br">}</span>
<span class="tk-kw">page</span> <span class="tk-type">Dashboard</span> <span class="tk-br">{</span> <span class="tk-prop">authRequired</span>: <span class="tk-bool">true</span>, <span class="tk-prop">component</span>: <span class="tk-kw">import</span> <span class="tk-type">Dash</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/Dash"</span> <span class="tk-br">}</span>

<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/queries"</span>,
  <span class="tk-prop">entities</span>: [<span class="tk-type">Task</span>]
<span class="tk-br">}</span>

<span class="tk-kw">job</span> <span class="tk-type">dailyReport</span> <span class="tk-br">{</span>
  <span class="tk-prop">executor</span>: <span class="tk-type">PgBoss</span>,
  <span class="tk-prop">perform</span>: <span class="tk-br">{</span> <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">report</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@src/jobs"</span> <span class="tk-br">}</span>,
  <span class="tk-prop">schedule</span>: <span class="tk-br">{</span> <span class="tk-prop">cron</span>: <span class="tk-str">"0 9 * * *"</span> <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// schema.prisma</span>
<span class="tk-kw">model</span> <span class="tk-type">Task</span> <span class="tk-br">{</span>
  <span class="tk-prop">id</span>          <span class="tk-type">Int</span>     <span class="tk-fn">@id</span> <span class="tk-fn">@default</span>(<span class="tk-fn">autoincrement</span>())
  <span class="tk-prop">description</span> <span class="tk-type">String</span>
  <span class="tk-prop">isDone</span>      <span class="tk-type">Boolean</span> <span class="tk-fn">@default</span>(<span class="tk-bool">false</span>)
  <span class="tk-prop">user</span>        <span class="tk-type">User</span>    <span class="tk-fn">@relation</span>(<span class="tk-prop">fields</span>: [<span class="tk-prop">userId</span>], <span class="tk-prop">references</span>: [<span class="tk-prop">id</span>])
  <span class="tk-prop">userId</span>      <span class="tk-type">Int</span>
<span class="tk-br">}</span>

<span class="tk-cmt">// src/queries.ts</span>
<span class="tk-kw">export const</span> <span class="tk-fn">getTasks</span> = <span class="tk-kw">async</span> (args, ctx) <span class="tk-kw">=></span>
  ctx.entities.Task.<span class="tk-fn">findMany</span>(<span class="tk-br">{</span>
    <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">userId</span>: ctx.user.id <span class="tk-br">}</span>
  <span class="tk-br">}</span>)` }} />
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/10 bg-white dark:bg-emerald-500/[0.02] shadow-xl dark:shadow-2xl shadow-emerald-900/5 dark:shadow-black/40 overflow-hidden">
            <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-500/10 px-5 py-3">
              <div className="flex items-center gap-2"><CheckIcon /><span className="text-[12px] font-semibold text-emerald-700 dark:text-emerald-400">What Wasp compiles into</span></div>
              <span className={`text-[11px] font-mono ${t.f}`}>auto-generated</span>
            </div>
            <div className="p-5 code-scroll">
              <pre className="font-mono text-[12px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: `<span class="tk-cmt">.wasp/out/</span>
<span class="tk-cmt">\u251c\u2500\u2500 web-app/</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/router.tsx</span>           <span class="tk-cmt"># React Router config</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/auth/</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">LoginPage.tsx</span>        <span class="tk-cmt"># generated login UI</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">SignupPage.tsx</span>       <span class="tk-cmt"># generated signup UI</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">EmailVerify.tsx</span>      <span class="tk-cmt"># verification flow</span>
<span class="tk-prop">\u2502   \u2502   \u2514\u2500\u2500</span> <span class="tk-fn">PasswordReset.tsx</span>    <span class="tk-cmt"># reset flow</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/operations/</span>
<span class="tk-prop">\u2502   \u2502   \u2514\u2500\u2500</span> <span class="tk-fn">getTasks.ts</span>          <span class="tk-cmt"># typed RPC client hook</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-fn">vite.config.ts</span>            <span class="tk-cmt"># Vite build config</span>
<span class="tk-prop">\u2502   \u2514\u2500\u2500</span> <span class="tk-fn">package.json</span>              <span class="tk-cmt"># all deps managed</span>
<span class="tk-cmt">\u251c\u2500\u2500 server/</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/auth/</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">providers/google.ts</span>  <span class="tk-cmt"># OAuth token exchange</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">providers/email.ts</span>   <span class="tk-cmt"># email/password flow</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">session.ts</span>           <span class="tk-cmt"># session management</span>
<span class="tk-prop">\u2502   \u2502   \u2514\u2500\u2500</span> <span class="tk-fn">middleware.ts</span>        <span class="tk-cmt"># auth middleware</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/routes/</span>
<span class="tk-prop">\u2502   \u2502   \u251c\u2500\u2500</span> <span class="tk-fn">operations.ts</span>        <span class="tk-cmt"># typed API endpoints</span>
<span class="tk-prop">\u2502   \u2502   \u2514\u2500\u2500</span> <span class="tk-fn">auth.ts</span>              <span class="tk-cmt"># login/signup/OAuth</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-type">src/jobs/</span>
<span class="tk-prop">\u2502   \u2502   \u2514\u2500\u2500</span> <span class="tk-fn">dailyReport.ts</span>       <span class="tk-cmt"># PgBoss worker</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-fn">src/email/sender.ts</span>       <span class="tk-cmt"># SMTP transport</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-fn">src/server.ts</span>             <span class="tk-cmt"># Express + Helmet + CORS</span>
<span class="tk-prop">\u2502   \u2514\u2500\u2500</span> <span class="tk-fn">package.json</span>
<span class="tk-cmt">\u251c\u2500\u2500 db/</span>
<span class="tk-prop">\u2502   \u251c\u2500\u2500</span> <span class="tk-fn">schema.prisma</span>             <span class="tk-cmt"># full schema + client</span>
<span class="tk-prop">\u2502   \u2514\u2500\u2500</span> <span class="tk-fn">migrations/</span>               <span class="tk-cmt"># auto migrations</span>
<span class="tk-cmt">\u251c\u2500\u2500</span> <span class="tk-fn">Dockerfile</span>                     <span class="tk-cmt"># production Docker</span>
<span class="tk-cmt">\u2514\u2500\u2500</span> <span class="tk-fn">sdk/wasp/</span>                      <span class="tk-cmt"># typed SDK</span>

<span class="tk-cmt"># What the browser gets:</span>
<span class="tk-str">React SPA</span> \u2192 routing, auth guards, typed hooks
<span class="tk-str">Express API</span> \u2192 /api/auth/*, /api/operations/*
<span class="tk-str">PostgreSQL</span> \u2192 managed migrations, Prisma client
<span class="tk-str">Background</span> \u2192 PgBoss job queue, cron scheduler
<span class="tk-str">Email</span> \u2192 SMTP transport, verify + reset templates` }} />
            </div>
          </div>
        </div>
        <p className={`text-center text-[14px] ${t.m} mt-8`}>You own 100% of the generated code. No lock-in. <code className={`font-mono ${t.accent} bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded text-[12px]`}>wasp build</code> outputs a standard Node.js + React project.</p>
      </div>
    </section>
  )
}

// ─── Architecture Diagram ──────────────────────────────
function ArchitectureDiagram() {
  const middleRef = useRef(null)
  const svgRef = useRef(null)

  const drawLines = useCallback(() => {
    const mid = middleRef.current
    const svg = svgRef.current
    if (!mid || !svg) return

    while (svg.firstChild) svg.removeChild(svg.firstChild)

    const mr = mid.getBoundingClientRect()
    const W = mr.width, H = mr.height
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svg.style.width = W + 'px'
    svg.style.height = H + 'px'

    const cx = W / 2, cy = H / 2
    const ns = 'http://www.w3.org/2000/svg'

    function el(tag, attrs) {
      const e = document.createElementNS(ns, tag)
      if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v))
      return e
    }

    function ry(selector) {
      const cards = mid.closest('.arch-flow').querySelectorAll(selector)
      return [...cards].map(c => {
        const r = c.getBoundingClientRect()
        return r.top + r.height / 2 - mr.top
      })
    }

    function makePath(x0, y0, x1, y1, side) {
      const r = 8
      if (side === 'left') {
        if (Math.abs(y0 - cy) < 4) return `M${x0},${y0} L${x1},${y1}`
        const dir = y0 < cy ? 1 : -1
        return `M${x0},${y0} L${cx - r},${y0} Q${cx},${y0} ${cx},${y0 + dir * r} L${cx},${cy}`
      } else {
        if (Math.abs(y1 - cy) < 4) return `M${x0},${y0} L${x1},${y1}`
        const dir = y1 > cy ? 1 : -1
        return `M${cx},${cy} L${cx},${y1 - dir * r} Q${cx},${y1} ${cx + r},${y1} L${x1},${y1}`
      }
    }

    function addTrack(d, color) {
      svg.appendChild(el('path', { d, fill: 'none', stroke: color, 'stroke-width': '0.5', 'stroke-opacity': '0.12' }))
    }

    function addParticle(d, color, delay, dur) {
      const p = el('path', {
        d, fill: 'none', stroke: color, 'stroke-width': '1', 'stroke-linecap': 'round',
        'stroke-dasharray': '4 400', 'stroke-dashoffset': '1'
      })
      p.style.animation = `arch-particle ${dur}s linear ${delay}s infinite`
      svg.appendChild(p)
    }

    function addJunction(x, y, color) {
      const outer = el('circle', { cx: x, cy: y, r: '2.5', fill: color, 'fill-opacity': '0.2' })
      outer.style.animation = 'arch-node-pulse 2s ease-in-out infinite'
      svg.appendChild(outer)
      svg.appendChild(el('circle', { cx: x, cy: y, r: '1.2', fill: color, 'fill-opacity': '0.6' }))
    }

    const iY = ry('.arch-input-card')
    const oY = ry('.arch-output-card')
    const colors = {
      wasp: '#EF9F27', tsx: '#AFA9EC', prisma: '#5DCAA5',
      frontend: '#AFA9EC', backend: '#5DCAA5', deploy: '#F0997B'
    }

    const inputs = [
      { y: iY[0], c: colors.wasp, delays: [0, 0.9, 1.8] },
      { y: iY[1], c: colors.tsx, delays: [0.25, 1.15, 2.05] },
      { y: iY[2], c: colors.prisma, delays: [0.5, 1.4, 2.3] },
    ]

    inputs.forEach(({ y, c, delays }) => {
      const d = makePath(0, y, cx, cy, 'left')
      addTrack(d, c)
      delays.forEach(dl => addParticle(d, c, dl, 2.7))
      addJunction(0, y, c)
    })

    addJunction(cx, cy, colors.wasp)

    const outputs = [
      { y: oY[0], c: colors.frontend, delays: [0.15, 1.05, 1.95] },
      { y: oY[1], c: colors.backend, delays: [0.4, 1.3, 2.2] },
      { y: oY[2], c: colors.deploy, delays: [0.65, 1.55, 2.45] },
    ]

    outputs.forEach(({ y, c, delays }) => {
      const d = makePath(cx, cy, W, y, 'right')
      addTrack(d, c)
      delays.forEach(dl => addParticle(d, c, dl, 2.7))
      addJunction(W, y, c)
    })

    // Bus lines
    const topY = Math.min(...iY)
    addTrack(`M${cx},${topY} L${cx},${cy}`, 'rgba(239,159,39,0.3)')
    const rTopY = Math.min(...oY), rBotY = Math.max(...oY)
    addTrack(`M${cx},${cy} L${cx},${rTopY} M${cx},${cy} L${cx},${rBotY}`, 'rgba(255,255,255,0.06)')
  }, [])

  useEffect(() => {
    const timer = setTimeout(drawLines, 150)
    window.addEventListener('resize', drawLines)
    return () => { clearTimeout(timer); window.removeEventListener('resize', drawLines) }
  }, [drawLines])

  return (
    <section className={`py-28 md:py-36 border-t ${t.sec}`}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Architecture</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>One compiler. Full-stack output.</h2>
          <p className={`${t.m} max-w-xl mx-auto text-[15px] leading-relaxed`}>Your config and business logic flow through the Wasp compiler, which generates a complete, production-ready app.</p>
        </div>

        <div className="arch-flow grid grid-cols-1 lg:grid-cols-[1fr_160px_1fr] items-stretch gap-0">

          {/* ── INPUTS ── */}
          <div className="flex flex-col gap-3 lg:pr-0">
            <div className={`text-[9px] tracking-[2px] uppercase ${t.f} mb-1 font-mono`}>written by developer</div>

            {/* main.wasp */}
            <div className="arch-input-card rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <div className="flex gap-1.5">
                  <div className="w-[7px] h-[7px] rounded-full bg-red-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-yellow-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-green-400/70" />
                </div>
                <span className="ml-2 text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/[0.1]">main.wasp</span>
              </div>
              <div className="px-3.5 py-3">
                <pre className="font-mono text-[9px] leading-[1.8]"><span className="tk-kw">app</span> myApp {'{'}{'\n'}  <span className="tk-prop">title</span>: <span className="tk-str">"My SaaS"</span>,{'\n'}  <span className="tk-kw">auth</span>: {'{'}{'\n'}    <span className="tk-prop">userEntity</span>: <span className="tk-type">User</span>,{'\n'}    <span className="tk-prop">methods</span>: {'{'} <span className="tk-prop">google</span>: {'{'}{'}'}  {'}'}{'\n'}  {'}'}{'\n'}{'}'}{'\n'}<span className="tk-kw">route</span> <span className="tk-type">DashRoute</span> {'{'}{'\n'}  <span className="tk-prop">path</span>: <span className="tk-str">"/dashboard"</span>,{'\n'}  <span className="tk-prop">to</span>: <span className="tk-type">Dashboard</span>{'\n'}{'}'}</pre>
                <div className="flex gap-1 mt-2.5">
                  <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">.wasp</span>
                </div>
              </div>
            </div>

            {/* React + queries */}
            <div className="arch-input-card rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <div className="flex gap-1.5">
                  <div className="w-[7px] h-[7px] rounded-full bg-red-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-yellow-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-green-400/70" />
                </div>
                <span className="ml-2 text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/[0.1]">Dashboard.tsx</span>
                <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-transparent text-zinc-300 dark:text-zinc-600 border border-transparent">queries.ts</span>
              </div>
              <div className="px-3.5 py-3">
                <pre className="font-mono text-[9px] leading-[1.8]"><span className="tk-kw">export default</span> () =&gt; ({'\n'}  &lt;<span className="tk-str">Dashboard</span> /&gt;{'\n'}){'\n'}{'\n'}<span className="tk-kw">export const</span> <span className="tk-fn">getTasks</span>: <span className="tk-type">GetTasks</span> ={'\n'}  <span className="tk-kw">async</span> (args, ctx) =&gt; {'{'}{'\n'}    <span className="tk-kw">return</span> ctx.entities.<span className="tk-type">Task</span>.<span className="tk-fn">findMany</span>(){'\n'}  {'}'}</pre>
                <div className="flex gap-1 mt-2.5">
                  <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">.tsx</span>
                  <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">.ts</span>
                </div>
              </div>
            </div>

            {/* schema.prisma */}
            <div className="arch-input-card rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <div className="flex gap-1.5">
                  <div className="w-[7px] h-[7px] rounded-full bg-red-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-yellow-400/70" />
                  <div className="w-[7px] h-[7px] rounded-full bg-green-400/70" />
                </div>
                <span className="ml-2 text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/[0.1]">schema.prisma</span>
              </div>
              <div className="px-3.5 py-3">
                <pre className="font-mono text-[9px] leading-[1.8]"><span className="tk-kw">model</span> <span className="tk-str">Task</span> {'{'}{'\n'}  <span className="tk-prop">id</span>    <span className="tk-type">Int</span>     <span className="tk-cmt">@id @default(autoincrement())</span>{'\n'}  <span className="tk-prop">title</span> <span className="tk-type">String</span>{'\n'}  <span className="tk-prop">done</span>  <span className="tk-type">Boolean</span> <span className="tk-cmt">@default(false)</span>{'\n'}{'}'}</pre>
                <div className="flex gap-1 mt-2.5">
                  <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">.prisma</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE (compiler + SVG lines) ── */}
          <div ref={middleRef} className="hidden lg:flex flex-col items-center justify-center relative">
            <svg ref={svgRef} className="absolute inset-0 overflow-visible pointer-events-none" />

            {/* Compiler card */}
            <div className="relative z-10 w-[118px]">
              <div className="rounded-xl overflow-hidden border border-wasp-400/20 dark:border-wasp-400/20 bg-wasp-50/50 dark:bg-wasp-400/[0.04] shadow-lg shadow-wasp-400/5 dark:shadow-black/40">
                <div className="flex items-center gap-[5px] px-2.5 py-[7px] border-b border-wasp-200/40 dark:border-wasp-400/10 bg-wasp-50/30 dark:bg-wasp-400/[0.03]">
                  <div className="w-[6px] h-[6px] rounded-full bg-wasp-400/80" style={{ animation: 'arch-dot-pulse 2.4s ease-in-out infinite' }} />
                  <div className="w-[6px] h-[6px] rounded-full bg-wasp-400/30" style={{ animation: 'arch-dot-pulse 2.4s ease-in-out infinite 0.4s' }} />
                  <div className="w-[6px] h-[6px] rounded-full bg-wasp-400/12" style={{ animation: 'arch-dot-pulse 2.4s ease-in-out infinite 0.8s' }} />
                  <span className="ml-auto text-[7px] font-mono text-wasp-400/30 tracking-wide">Haskell compiler</span>
                </div>
                <div className="px-2.5 py-2.5">
                  <div className="font-mono text-[7.5px] leading-[1.5]">
                    <div><span className="text-wasp-600/40 dark:text-wasp-400/30">$ </span><span className="text-wasp-700/70 dark:text-wasp-400/70">wasp build</span></div>
                    <div className="text-zinc-300 dark:text-zinc-700 mt-0.5">› parsing .wasp</div>
                    <div className="text-zinc-300 dark:text-zinc-700">› type checking</div>
                    <div className="text-zinc-300 dark:text-zinc-700">› codegen</div>
                    <div className="mt-2 h-px bg-zinc-100 dark:bg-white/[0.04] rounded overflow-hidden">
                      <div className="h-full bg-wasp-400/60" style={{ animation: 'arch-prog 2.4s ease-in-out infinite' }} />
                    </div>
                    <div className="arch-ok-fade mt-1.5">✓ build complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile compiler (shown on small screens) ── */}
          <div className="flex lg:hidden justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-zinc-200 dark:bg-white/[0.06]" />
              <div className="px-4 py-2.5 rounded-xl border border-wasp-400/20 bg-wasp-50/50 dark:bg-wasp-400/[0.04] font-mono text-[10px] text-wasp-700 dark:text-wasp-400/70">
                <span className="text-wasp-400/40">$ </span>wasp build
              </div>
              <div className="h-px w-12 bg-zinc-200 dark:bg-white/[0.06]" />
            </div>
          </div>

          {/* ── OUTPUTS ── */}
          <div className="flex flex-col lg:pl-0">
            <div className={`text-[9px] tracking-[2px] uppercase ${t.f} mb-3 font-mono lg:text-right`}>generated by wasp</div>

            {/* Frontend */}
            <div className="arch-output-card flex-1 rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <span className="text-[8px] font-semibold tracking-[1.5px] uppercase text-purple-500/60 dark:text-purple-400/50">front-end</span>
                <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">generated</span>
              </div>
              <div className="px-4 py-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      { name: 'React', color: '#61DAFB' },
                      { name: 'Tailwind', color: '#38BDF8' },
                      { name: 'Vite', color: '#646CFF' },
                      { name: 'Auth UI', color: '#8b85c1' },
                      { name: 'Router', color: '#8b85c1' },
                      { name: 'RPC hooks', color: '#8b85c1' },
                    ].map(tech => (
                      <span key={tech.name} className="flex items-center gap-1.5 text-[8.5px] font-mono px-2 py-1 rounded bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.05] text-zinc-500 dark:text-zinc-500">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: tech.color }} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                <pre className={`font-mono text-[8px] leading-[1.7] ${t.f}`}>{`web-app/src/
├── router.tsx
├── auth/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── PasswordReset.tsx
├── operations/getTasks.ts
└── vite.config.ts`}</pre>
              </div>
            </div>

            {/* Backend */}
            <div className="arch-output-card flex-1 rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none mt-3 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <span className="text-[8px] font-semibold tracking-[1.5px] uppercase text-emerald-500/60 dark:text-emerald-400/50">back-end</span>
                <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">generated</span>
              </div>
              <div className="px-4 py-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      { name: 'Node.js', color: '#68A063' },
                      { name: 'Prisma', color: '#5DCAA5' },
                      { name: 'Express', color: '#555' },
                      { name: 'Auth logic', color: '#4a9e82' },
                      { name: 'Migrations', color: '#4a9e82' },
                    ].map(tech => (
                      <span key={tech.name} className="flex items-center gap-1.5 text-[8.5px] font-mono px-2 py-1 rounded bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.05] text-zinc-500 dark:text-zinc-500">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: tech.color }} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                <pre className={`font-mono text-[8px] leading-[1.7] ${t.f}`}>{`server/src/
├── auth/
│   ├── providers/google.ts
│   ├── session.ts
│   └── middleware.ts
├── routes/operations.ts
├── jobs/dailyReport.ts
└── server.ts`}</pre>
              </div>
            </div>

            {/* Deployment */}
            <div className="arch-output-card flex-1 rounded-xl border border-zinc-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none mt-3 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
                <span className="text-[8px] font-semibold tracking-[1.5px] uppercase text-orange-400/60 dark:text-orange-400/50">deployment</span>
                <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/[0.06]">generated</span>
              </div>
              <div className="px-4 py-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      { name: 'Docker', color: '#2496ED' },
                      { name: 'Fly.io', color: '#7B3FE4' },
                      { name: 'Railway', color: '#c07860' },
                      { name: 'Dockerfile', color: '#555' },
                    ].map(tech => (
                      <span key={tech.name} className="flex items-center gap-1.5 text-[8.5px] font-mono px-2 py-1 rounded bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.05] text-zinc-500 dark:text-zinc-500">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: tech.color }} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                <pre className={`font-mono text-[8px] leading-[1.7] ${t.f}`}>{`Dockerfile
fly.toml
db/
├── schema.prisma
└── migrations/`}</pre>
              </div>
            </div>
          </div>
        </div>

        <p className={`text-center text-[13px] ${t.m} mt-10 font-mono`}>
          you own 100% of the generated code &nbsp;·&nbsp;
          <code className={`${t.accent} bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded text-[11px]`}>wasp build</code> outputs a standard Node.js + React project &nbsp;·&nbsp; no lock-in
        </p>
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

function FeatureCard({ title, desc, color, icon }) {
  return (
    <div className="card p-5 group">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>{icon}</div>
      <h3 className={`text-[13px] font-semibold ${t.h} mb-1.5`}>{title}</h3>
      <p className={`text-[12px] ${t.m} leading-relaxed`}>{desc}</p>
    </div>
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
      <nav className={`fixed top-0 left-0 right-0 z-50 nav-blur bg-[#fafaf8]/80 dark:bg-surface-0/80 border-b ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <WaspLogo size={28} />
            <span className={`text-[15px] font-bold tracking-tight ${t.h}`}>Wasp</span>
            <span className="text-[9px] font-semibold text-wasp-700 dark:text-wasp-400 bg-wasp-100 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider">beta</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[['Docs', 'https://wasp.sh/docs'], ['Blog', 'https://wasp.sh/blog'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className={`text-[13px] ${t.link}`}>{label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${t.link}`} aria-label="GitHub"><GithubIcon /></a>
            <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${t.link}`} aria-label="Discord"><DiscordIcon /></a>
            <a href="https://x.com/WaspLang" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${t.link}`} aria-label="X"><XIcon /></a>
            <a href="https://www.linkedin.com/company/wasp-sh" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${t.link}`} aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://bsky.app/profile/wasp.sh" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${t.link}`} aria-label="Bluesky"><BlueskyIcon /></a>
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${t.link} cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.06]`} aria-label="Toggle theme">{dark ? <SunIcon /> : <MoonIcon />}</button>
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary ml-2 px-4 py-2 text-[13px]">Get Started <Arrow /></a>
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
                <img src="/wasp-logo.png" alt="" width={14} height={14} className="animate-pulse" style={{ imageRendering: 'auto' }} />
                <span className={`text-[12px] ${t.m}`}>Backed by</span>
                <a href="https://www.ycombinator.com/companies/wasp" target="_blank" rel="noreferrer" className={`text-[12px] font-bold ${t.accent} hover:underline`}>Y Combinator</a>
              </div>
              <h1 className="anim-2 text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-[1.06] mb-6">
                <span className={t.h}>Develop full-stack</span><br />
                <span className="gradient-text">web apps faster.</span>
              </h1>
              <p className={`anim-3 text-base lg:text-[17px] ${t.p} leading-relaxed mb-10 max-w-[440px]`}>
                Rails-like framework for React, Node.js and Prisma. Build your app in a day and deploy it with a single CLI command.
              </p>
              <div className="anim-4 flex flex-wrap items-center gap-3 mb-12">
                <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-6 py-3 text-sm"><Arrow /> Get Started</a>
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

      {/* ── 1. Code Comparisons (prove it immediately) ── */}
      <CodeComparison />

      {/* ── 2. Testimonials ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Community</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>You're in good company</h2>
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

      {/* ── 3. Features ── */}
      <section className={`relative py-28 md:py-36 border-t ${t.sec}`}>
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

      {/* ── 5. OpenSaaS ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Starter Template</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Go to production in days</h2>
            <p className={`${t.m} max-w-2xl mx-auto text-[15px]`}>
              <a href="https://opensaas.sh" target="_blank" rel="noreferrer" className={`${t.accent} font-semibold hover:underline`}>OpenSaaS</a> is a free, open-source SaaS starter built on Wasp. Payments, auth, blog, admin dashboard — all pre-wired.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'Stripe / Polar / Lemon Squeezy', desc: 'Pre-configured checkout and webhooks. Choose a provider, start charging.', icon: '💳' },
              { title: 'Blog with Astro', desc: 'Markdown blog with automatic SEO optimization and fast static pages.', icon: '📝' },
              { title: 'Admin Dashboard', desc: 'Analytics, user management, revenue graphs. Plausible or Google.', icon: '📊' },
              { title: 'File Uploads (S3)', desc: 'AWS S3 presigned URL uploads, fully documented and working.', icon: '📁' },
              { title: 'Email + Cron Jobs', desc: 'Built-in email sending with scheduled automation.', icon: '📧' },
              { title: 'AI-Ready', desc: 'Agent rules and tools for AI coding assistants built in.', icon: '🤖' },
            ].map(item => (
              <div key={item.title} className="card p-6">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className={`text-[14px] font-semibold ${t.h} mb-2`}>{item.title}</h3>
                <p className={`text-[13px] ${t.m} leading-relaxed`}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://opensaas.sh" target="_blank" rel="noreferrer" className="btn-primary px-6 py-2.5 text-sm">Try OpenSaaS</a>
              <a href="https://docs.opensaas.sh" target="_blank" rel="noreferrer" className="btn-ghost px-6 py-2.5 text-sm"><BookIcon /> Docs</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Efficiency ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>AI-Native</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Less code means smarter AI</h2>
            <p className={`${t.m} max-w-2xl mx-auto text-[15px]`}>Whether you hand-write every line or use AI, less code = faster, cheaper, more accurate results.</p>
          </div>
          <div className="gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-2/30 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className={`text-[14px] ${t.p} mb-2`}>Claude Code built the same feature in two identical apps:</p>
              <p className={`text-[18px] font-bold ${t.h}`}>Wasp vs Next.js — same app, measured everything.</p>
              <a href="https://wasp.sh/blog/2026/03/26/nextjs-vs-wasp-40-percent-less-tokens-same-app" target="_blank" rel="noreferrer" className={`text-[13px] ${t.accent} hover:underline mt-2 inline-block`}>Read the full analysis &rarr;</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { stat: '44%', label: 'cheaper', sub: '$2.87 vs $5.17' },
                { stat: '38%', label: 'fewer tokens', sub: '2.5M vs 4.0M' },
                { stat: '31%', label: 'fewer API calls', sub: '66 vs 96' },
                { stat: '70%', label: 'higher efficiency', sub: 'output per token' },
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
          </div>
        </div>
      </section>

      {/* ── Claude Code Plugin ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Developer Experience</span>
              <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Your AI already knows Wasp</h2>
              <p className={`${t.p} text-[15px] leading-relaxed mb-6`}>
                Wasp ships with an official plugin for Claude Code — with slash commands, framework knowledge, and best practices built in. The project also includes <code className={`font-mono ${t.accent} text-[13px] bg-wasp-50 dark:bg-wasp-400/10 px-1 py-0.5 rounded`}>AGENTS.md</code> and <code className={`font-mono ${t.accent} text-[13px] bg-wasp-50 dark:bg-wasp-400/10 px-1 py-0.5 rounded`}>CLAUDE.md</code> files that any AI coding tool (Cursor, Copilot, Windsurf, Gemini) can read to understand your project.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wasp.sh/docs" target="_blank" rel="noreferrer" className="btn-primary px-5 py-2.5 text-sm">Learn more</a>
                <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className="btn-ghost px-5 py-2.5 text-sm"><GithubIcon /> GitHub</a>
              </div>
            </div>
            <div className="gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden">
              <div className="border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400/30 dark:bg-green-500/20" />
                <span className={`text-[12px] font-medium ${t.m}`}>Terminal</span>
              </div>
              <TerminalBlock html={`<span class="tk-cmt"># Wasp plugin slash commands:</span>
$ <span class="tk-fn">/add-feature</span>         <span class="tk-cmt">Add auth, email, jobs</span>
$ <span class="tk-fn">/start-dev-server</span>    <span class="tk-cmt">Start Wasp + debug</span>
$ <span class="tk-fn">/deploying-app</span>       <span class="tk-cmt">Deploy to Fly.io/Railway</span>
$ <span class="tk-fn">/expert-advice</span>       <span class="tk-cmt">Wasp-specific guidance</span>

<span class="tk-cmt"># Or just describe what you want:</span>

<span class="tk-type">You:</span> <span class="tk-str">"Add Google auth with email</span>
<span class="tk-str">      verification and password reset"</span>

<span class="tk-type">Claude:</span> <span class="tk-cmt">Updates main.wasp auth config</span>
        <span class="tk-cmt">Configures email sender</span>
        <span class="tk-cmt">Creates verify + reset pages</span>
        <span class="tk-cmt">Runs wasp db migrate-dev</span>
        <span class="tk-cmt">\u2713 Full auth in one conversation.</span>`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. How it Works (for the architecturally curious) ── */}
      <HowItWorks />

      {/* ── 8b. Architecture Diagram ── */}
      <ArchitectureDiagram />

      {/* ── 8c. CLI Demo ── */}
      <CLIDemo />

      {/* ── 9. Install ── */}
      <InstallCommand />

      {/* ── 10. Community + FAQ ── */}
      <section id="faq" className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            {/* Community sidebar */}
            <div>
              <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Community</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${t.h} mb-4`}>Join thousands of developers</h2>
              <p className={`${t.p} text-[15px] leading-relaxed mb-8`}>
                Be part of one of the most welcoming open-source communities. Get help, share what you're building, and shape the future of Wasp.
              </p>
              <div className="space-y-3">
                <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><DiscordIcon /></div>
                  <div>
                    <p className={`text-[14px] font-semibold ${t.h}`}>Discord</p>
                    <p className={`text-[12px] ${t.m}`}>Chat, get help, share projects</p>
                  </div>
                </a>
                <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center"><GithubIcon size={18} /></div>
                  <div>
                    <p className={`text-[14px] font-semibold ${t.h}`}>GitHub</p>
                    <p className={`text-[12px] ${t.m}`}>Star, contribute, report issues</p>
                  </div>
                </a>
                <a href="https://x.com/WaspLang" target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center"><XIcon /></div>
                  <div>
                    <p className={`text-[14px] font-semibold ${t.h}`}>X / Twitter</p>
                    <p className={`text-[12px] ${t.m}`}>Updates, tips, announcements</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/company/wasp-sh" target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><LinkedInIcon /></div>
                  <div>
                    <p className={`text-[14px] font-semibold ${t.h}`}>LinkedIn</p>
                    <p className={`text-[12px] ${t.m}`}>Company updates, hiring</p>
                  </div>
                </a>
                <a href="https://bsky.app/profile/wasp.sh" target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-4 group">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center"><BlueskyIcon /></div>
                  <div>
                    <p className={`text-[14px] font-semibold ${t.h}`}>Bluesky</p>
                    <p className={`text-[12px] ${t.m}`}>Follow us on the open web</p>
                  </div>
                </a>
              </div>
            </div>
            {/* FAQ */}
            <div>
              <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>FAQ</span>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${t.h} mb-8`}>Frequently asked questions</h2>
              <div className="space-y-3">
                {faqs.map((f, i) => <FAQ key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Blog</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Latest from the blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts.map(post => (
              <a key={post.title} href={post.href} target="_blank" rel="noreferrer" className="card overflow-hidden block group">
                <div className="aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-surface-3">
                  <img src={post.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className={`text-[15px] font-semibold ${t.h} mb-2 leading-snug`}>{post.title}</h3>
                  <p className={`text-[12px] ${t.f}`}>{post.author} &middot; {post.time}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://wasp.sh/blog" target="_blank" rel="noreferrer" className="btn-ghost px-5 py-2.5 text-[13px]">Read more on the blog &rarr;</a>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {[
              { title: 'Docs', items: [['Getting Started', 'https://wasp.sh/docs'], ['Todo app tutorial', 'https://wasp.sh/docs/tutorial/create'], ['Language reference', 'https://wasp.sh/docs/general/language']] },
              { title: 'Community', items: [['Discord', 'https://discord.gg/rzdnErX'], ['X / Twitter', 'https://x.com/WaspLang'], ['Bluesky', 'https://bsky.app/profile/wasp.sh'], ['GitHub', 'https://github.com/wasp-lang/wasp']] },
              { title: 'Company', items: [['Blog', 'https://wasp.sh/blog'], ['Careers', 'https://wasp-lang.notion.site/Wasp-Careers-59fd1682c80d446f92be5fa65cc17672'], ['Company', 'https://www.linkedin.com/company/wasp-sh'], ['Resources', 'https://wasp.sh/resources']] },
            ].map(col => (
              <div key={col.title}>
                <h4 className={`text-[13px] font-semibold ${t.h} mb-4`}>{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.items.map(([label, href]) => <li key={label}><a href={href} target="_blank" rel="noreferrer" className={`text-[13px] ${t.f} hover:text-zinc-900 dark:hover:text-white transition-colors`}>{label}</a></li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 className={`text-[13px] font-semibold ${t.h} mb-4`}>Stay up to date</h4>
              <p className={`text-[13px] ${t.f} leading-relaxed mb-4`}>Join our mailing list and be the first to know when we ship new features and updates!</p>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" type="email" placeholder="you@awesomedev.com" required className={`flex-1 min-w-0 px-3 py-2 bg-white dark:bg-white/[0.04] border ${t.brd} rounded-lg text-[12px] ${t.h} placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-wasp-400/50 focus:ring-2 focus:ring-wasp-400/10 transition-all`} />
                <button type="submit" className="btn-primary px-4 py-2 text-[11px] whitespace-nowrap justify-center">Subscribe</button>
              </form>
              <div className="flex items-center gap-2 mt-4">
                <span className={`text-[11px] ${t.f}`}>Backed by</span>
                <a href="https://www.ycombinator.com/companies/wasp" target="_blank" rel="noreferrer" className={`text-[11px] font-bold ${t.accent} hover:underline`}>Y Combinator</a>
              </div>
            </div>
          </div>
          <div className={`border-t ${t.sec} pt-6 flex flex-col md:flex-row items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <WaspLogo size={18} />
                <span className={`text-[12px] font-semibold ${t.f}`}>Wasp</span>
              </div>
              <p className={`text-[12px] ${t.f}`}>&copy; Wasp, Inc. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className={`${t.link}`}><GithubIcon /></a>
              <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className={`${t.link}`}><DiscordIcon /></a>
              <a href="https://x.com/WaspLang" target="_blank" rel="noreferrer" className={`${t.link}`}><XIcon /></a>
              <a href="https://www.linkedin.com/company/wasp-sh" target="_blank" rel="noreferrer" className={`${t.link}`}><LinkedInIcon /></a>
              <a href="https://bsky.app/profile/wasp.sh" target="_blank" rel="noreferrer" className={`${t.link}`}><BlueskyIcon /></a>
              <span className={`text-[12px] ${t.f} ml-2`}>·</span>
              <a href="https://wasp.sh/privacy-policy" className={`text-[12px] ${t.f} hover:text-zinc-900 dark:hover:text-zinc-400 transition-colors`}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
