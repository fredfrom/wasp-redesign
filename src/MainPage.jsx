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
const Bolt = ({ size = 22, className = '' }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 14H12L11 22L19.5 10H12L13 2Z" fill="#facc15" stroke="#eab308" strokeWidth="0.5"/></svg>
const GithubIcon = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
const BookIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
const SunIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const MoonIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>

// ─── Data ───────────────────────────────────────────────
const features = [
  { title: 'Open Source', desc: 'Fully open-source. No vendor lock-in. Contribute and shape the future of full-stack dev.', color: 'emerald', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, href: 'https://github.com/wasp-lang/wasp' },
  { title: 'Full-stack Auth', desc: 'Social providers or email in a few lines of code. Powerful UI helpers. No third-party lock-in.', color: 'blue', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, href: 'https://wasp.sh/blog/2023/04/12/auth-ui' },
  { title: 'RPC (Client <-> Server)', desc: 'Typesafe RPC layer that instantly brings your data models and server logic to the client.', color: 'purple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>, href: 'https://wasp.sh/docs/data-model/operations/overview' },
  { title: 'One-Command Deploy', desc: 'Deploy your app to any platform. CLI helpers for the most popular options.', color: 'orange', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>, href: 'https://wasp.sh/docs/deployment/intro' },
  { title: 'Jobs', desc: 'Define, schedule and run server tasks. Persistent, retryable, delayable.', color: 'cyan', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, href: 'https://wasp.sh/docs/advanced/jobs' },
  { title: 'Email Sending', desc: 'Connect an email provider and start sending. Built-in templates included.', color: 'pink', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>, href: 'https://wasp.sh/docs/advanced/email' },
  { title: 'Full-stack Type Safety', desc: 'Full TypeScript with auto-generated types spanning the entire stack.', color: 'yellow', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, href: 'https://wasp.sh/docs/tutorial/queries#implementing-a-query' },
  { title: 'And More', desc: 'Custom API routes, DB seeding, optimistic updates, auto cache invalidation.', color: 'indigo', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>, href: 'https://wasp.sh/docs' },
]

const testimonials = [
  { name: 'Joan Reyero', handle: '@joanreyero', initials: 'JR', source: 'Product Hunt', href: 'https://www.producthunt.com/posts/wasp-lang-beta?comment=2048094', text: 'I spent one weekend building with Wasp and it was amazing, a real pleasure. In a weekend I had time to learn Wasp, React and finish a full-stack app. This would have been impossible before.' },
  { name: 'Tim', handle: '@tskaggs', initials: 'TS', source: 'Twitter', href: 'https://twitter.com/tskaggs/status/1602513968207101954', text: 'The simplification of the main.wasp file is great. And it feels like a very light weight version of a few larger frameworks.' },
  { name: 'Attila Vago', handle: '@AttilaTheDev', initials: 'AV', source: 'Twitter', href: 'https://twitter.com/AttilaTheDev/status/1583530646047117317', text: "@WaspLang has been in the back of my mind for months now. It left an impression, and I'm really not easy to impress. That's gotta mean something\u2026" },
]

const faqs = [
  { q: 'How is Wasp different from Next.js / Nuxt.js / Gatsby?', a: 'These are frontend-first frameworks with some limited backend capabilities. Wasp is a truly full-stack framework \u2014 it brings both back-end and database next to the front-end. Think Ruby on Rails, but for React & Node.js.' },
  { q: 'How is Wasp different from Ruby on Rails or Django?', a: "While Rails and Django are full-stack, they require extra work for the modern \"desktop\" experience most web apps offer today. Wasp supports that out-of-the-box with React on the frontend, plus automatic data model sharing between database, frontend, and backend \u2014 no custom REST or GraphQL API needed." },
  { q: 'How hard is it to learn Wasp?', a: "We measured! It takes about 30 minutes to get going. The Wasp config language is intentionally simple \u2014 no loops or variables, think of it as JSON that's easier to read. You get full IDE support: syntax highlighting, auto-completion, live error reporting." },
  { q: 'Do you support only React & Node.js currently?', a: "Yes, that is currently the supported stack. But Wasp is being developed as a language/framework-agnostic tool, so we plan to add more languages and frameworks in the future." },
]

const examples = [
  { title: 'Todo App', subtitle: 'TypeScript', desc: 'The classic full-stack To-Do list with auth, implemented in TypeScript.', gradient: 'from-emerald-100 dark:from-emerald-900/30', code: 'https://github.com/wasp-lang/wasp/tree/release/examples/tutorials/TodoAppTs' },
  { title: 'CoverLetterGPT', subtitle: 'AI-powered', desc: 'Generate cover letters from your CV and job description. Powered by ChatGPT.', gradient: 'from-violet-100 dark:from-violet-900/30', code: 'https://github.com/vincanger/coverlettergpt', demo: 'https://coverlettergpt.xyz/' },
  { title: 'Realtime Voting', subtitle: 'WebSockets', desc: 'A realtime, websockets-powered voting app with Wasp and TypeScript.', gradient: 'from-blue-100 dark:from-blue-900/30', code: 'https://github.com/wasp-lang/wasp/tree/release/examples/websockets-realtime-voting', demo: 'https://websockets-voting-client.fly.dev/login' },
]

const showcase = [
  { title: 'Farnance', subtitle: 'SaaS marketplace for farmers', desc: "Won HackLBS 2021 among 250 participants.", tags: ['hackathon'], gradient: 'from-green-100 dark:from-green-900/30', href: 'https://wasp.sh/blog/2022/10/28/farnance-hackathon-winner' },
  { title: 'Grabbit', subtitle: 'Dev environment manager', desc: 'Internal tool for managing dev resources at StudentBeans.', tags: ['internal-tools'], gradient: 'from-blue-100 dark:from-blue-900/30', href: 'https://wasp.sh/blog/2022/11/26/michael-curry-usecase' },
  { title: 'Amicus', subtitle: 'Legal workflow management', desc: 'Full SaaS built as a team of one. First paying customers acquired.', tags: ['startup', 'SaaS'], gradient: 'from-purple-100 dark:from-purple-900/30', href: 'https://wasp.sh/blog/2022/11/26/erlis-amicus-usecase' },
]

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
            <button onClick={() => setTab('wasp')} className={`px-3 py-1 text-[11px] font-medium rounded-lg cursor-pointer transition-colors ${tab === 'wasp' ? 'code-tab-active' : inactive}`}>todoApp.wasp</button>
            <button onClick={() => setTab('prisma')} className={`px-3 py-1 text-[11px] font-medium rounded-lg cursor-pointer transition-colors ${tab === 'prisma' ? 'code-tab-active' : inactive}`}>schema.prisma</button>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 overflow-x-auto">
        {tab === 'wasp' ? (
          <pre className="font-mono text-[13px] leading-[1.75]"><code dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">app</span> <span class="tk-type">todoApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">title</span>: <span class="tk-str">"ToDo App"</span>,  <span class="tk-cmt">// visible in the browser tab</span>
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span> <span class="tk-cmt">// full-stack auth out-of-the-box</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span> <span class="tk-fn">google</span>: <span class="tk-br">{}</span>, <span class="tk-fn">gitHub</span>: <span class="tk-br">{}</span>, <span class="tk-fn">email</span>: <span class="tk-br">{</span>...<span class="tk-br">}</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-kw">route</span> <span class="tk-type">RootRoute</span> <span class="tk-br">{</span> <span class="tk-prop">path</span>: <span class="tk-str">"/"</span>, <span class="tk-prop">to</span>: <span class="tk-type">MainPage</span> <span class="tk-br">}</span>
<span class="tk-kw">page</span> <span class="tk-type">MainPage</span> <span class="tk-br">{</span>
  <span class="tk-prop">authRequired</span>: <span class="tk-bool">true</span>,
  <span class="tk-prop">component</span>: <span class="tk-kw">import</span> <span class="tk-type">Main</span> <span class="tk-kw">from</span> <span class="tk-str">"@client/Main"</span>
<span class="tk-br">}</span>

<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@server/tasks"</span>,
  <span class="tk-prop">entities</span>: <span class="tk-br">[</span><span class="tk-type">Task</span><span class="tk-br">]</span> <span class="tk-cmt">// Automatic cache invalidation.</span>
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

function FeatureCard({ title, desc, color, icon, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card p-5 block group">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 dark:bg-${color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>{icon}</div>
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
      <div className="px-6 pb-5">
        <p className={`text-[13px] ${t.p} leading-relaxed`}>{a}</p>
      </div>
    </details>
  )
}

// ─── Code Comparison ────────────────────────────────────
const comparisons = [
  {
    label: 'Authentication',
    desc: 'Full-stack auth with social login, email/password, and session management.',
    tabs: [
      { name: 'Wasp', lines: 6, code: `<span class="tk-kw">app</span> <span class="tk-type">myApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span> <span class="tk-fn">google</span>: <span class="tk-br">{}</span>, <span class="tk-fn">email</span>: <span class="tk-br">{</span>...<span class="tk-br">}</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>` },
      { name: 'Next.js', lines: 38, code: `<span class="tk-cmt">// auth.config.ts</span>
<span class="tk-kw">import</span> NextAuth <span class="tk-kw">from</span> <span class="tk-str">"next-auth"</span>
<span class="tk-kw">import</span> Google <span class="tk-kw">from</span> <span class="tk-str">"next-auth/providers/google"</span>
<span class="tk-kw">import</span> Credentials <span class="tk-kw">from</span> <span class="tk-str">"next-auth/providers/credentials"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> PrismaAdapter <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@auth/prisma-adapter"</span>
<span class="tk-kw">import</span> <span class="tk-br">{</span> prisma <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"./db"</span>
<span class="tk-kw">import</span> bcrypt <span class="tk-kw">from</span> <span class="tk-str">"bcryptjs"</span>

<span class="tk-kw">export const</span> <span class="tk-br">{</span> auth, handlers, signIn <span class="tk-br">}</span> = <span class="tk-fn">NextAuth</span>(<span class="tk-br">{</span>
  <span class="tk-prop">adapter</span>: <span class="tk-fn">PrismaAdapter</span>(prisma),
  <span class="tk-prop">providers</span>: [
    <span class="tk-fn">Google</span>(<span class="tk-br">{</span>
      <span class="tk-prop">clientId</span>: process.env.GOOGLE_ID,
      <span class="tk-prop">clientSecret</span>: process.env.GOOGLE_SECRET,
    <span class="tk-br">}</span>),
    <span class="tk-fn">Credentials</span>(<span class="tk-br">{</span>
      <span class="tk-kw">async</span> <span class="tk-fn">authorize</span>(credentials) <span class="tk-br">{</span>
        <span class="tk-kw">const</span> user = <span class="tk-kw">await</span> prisma.user.<span class="tk-fn">findUnique</span>(<span class="tk-br">{</span>
          <span class="tk-prop">where</span>: <span class="tk-br">{</span> <span class="tk-prop">email</span>: credentials.email <span class="tk-br">}</span>
        <span class="tk-br">}</span>)
        <span class="tk-cmt">// + password hashing, error handling,</span>
        <span class="tk-cmt">// session callbacks, middleware...</span>
      <span class="tk-br">}</span>
    <span class="tk-br">}</span>),
  ],
<span class="tk-br">}</span>)
<span class="tk-cmt">// + middleware.ts, API route, session</span>
<span class="tk-cmt">// provider, login page, signup page...</span>` },
      { name: 'Express', lines: 45, code: `<span class="tk-cmt">// passport.js + express-session</span>
<span class="tk-kw">const</span> passport = <span class="tk-fn">require</span>(<span class="tk-str">'passport'</span>)
<span class="tk-kw">const</span> GoogleStrategy = <span class="tk-fn">require</span>(<span class="tk-str">'passport-google-oauth20'</span>)
<span class="tk-kw">const</span> LocalStrategy = <span class="tk-fn">require</span>(<span class="tk-str">'passport-local'</span>)
<span class="tk-kw">const</span> session = <span class="tk-fn">require</span>(<span class="tk-str">'express-session'</span>)
<span class="tk-kw">const</span> bcrypt = <span class="tk-fn">require</span>(<span class="tk-str">'bcryptjs'</span>)

app.<span class="tk-fn">use</span>(<span class="tk-fn">session</span>(<span class="tk-br">{</span>
  <span class="tk-prop">secret</span>: process.env.SESSION_SECRET,
  <span class="tk-prop">resave</span>: <span class="tk-bool">false</span>,
  <span class="tk-prop">saveUninitialized</span>: <span class="tk-bool">false</span>,
<span class="tk-br">}</span>))
app.<span class="tk-fn">use</span>(passport.<span class="tk-fn">initialize</span>())
app.<span class="tk-fn">use</span>(passport.<span class="tk-fn">session</span>())

passport.<span class="tk-fn">use</span>(<span class="tk-kw">new</span> <span class="tk-fn">GoogleStrategy</span>(<span class="tk-br">{</span>...<span class="tk-br">}</span>))
passport.<span class="tk-fn">use</span>(<span class="tk-kw">new</span> <span class="tk-fn">LocalStrategy</span>(<span class="tk-br">{</span>...<span class="tk-br">}</span>))
<span class="tk-cmt">// + serialize, deserialize, routes,</span>
<span class="tk-cmt">// error handling, CSRF, rate limiting...</span>` },
    ],
  },
  {
    label: 'Data Fetching',
    desc: 'Type-safe client-server data layer with automatic cache invalidation.',
    tabs: [
      { name: 'Wasp', lines: 7, code: `<span class="tk-cmt">// main.wasp</span>
<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@server/tasks"</span>,
  <span class="tk-prop">entities</span>: [<span class="tk-type">Task</span>]
<span class="tk-br">}</span>
<span class="tk-cmt">// client: useQuery(getTasks) — done!</span>
<span class="tk-cmt">// Auto cache invalidation on mutations.</span>` },
      { name: 'React + Express', lines: 30, code: `<span class="tk-cmt">// server/routes/tasks.ts</span>
router.<span class="tk-fn">get</span>(<span class="tk-str">'/api/tasks'</span>, <span class="tk-kw">async</span> (req, res) <span class="tk-kw">=></span> <span class="tk-br">{</span>
  <span class="tk-kw">const</span> tasks = <span class="tk-kw">await</span> prisma.task.<span class="tk-fn">findMany</span>()
  res.<span class="tk-fn">json</span>(tasks)
<span class="tk-br">}</span>)

<span class="tk-cmt">// client/hooks/useTasks.ts</span>
<span class="tk-kw">export function</span> <span class="tk-fn">useTasks</span>() <span class="tk-br">{</span>
  <span class="tk-kw">return</span> <span class="tk-fn">useQuery</span>(<span class="tk-br">{</span>
    <span class="tk-prop">queryKey</span>: [<span class="tk-str">'tasks'</span>],
    <span class="tk-prop">queryFn</span>: () <span class="tk-kw">=></span>
      <span class="tk-fn">fetch</span>(<span class="tk-str">'/api/tasks'</span>).<span class="tk-fn">then</span>(r <span class="tk-kw">=></span> r.<span class="tk-fn">json</span>()),
  <span class="tk-br">}</span>)
<span class="tk-br">}</span>
<span class="tk-cmt">// + manual invalidation, error handling,</span>
<span class="tk-cmt">// types, auth middleware, CORS...</span>` },
      { name: 'tRPC', lines: 25, code: `<span class="tk-cmt">// server/routers/tasks.ts</span>
<span class="tk-kw">export const</span> taskRouter = router(<span class="tk-br">{</span>
  <span class="tk-prop">getAll</span>: publicProcedure
    .<span class="tk-fn">query</span>(<span class="tk-kw">async</span> (<span class="tk-br">{</span> ctx <span class="tk-br">}</span>) <span class="tk-kw">=></span> <span class="tk-br">{</span>
      <span class="tk-kw">return</span> ctx.prisma.task.<span class="tk-fn">findMany</span>()
    <span class="tk-br">}</span>),
<span class="tk-br">}</span>)

<span class="tk-cmt">// client</span>
<span class="tk-kw">const</span> <span class="tk-br">{</span> data <span class="tk-br">}</span> = trpc.task.getAll.<span class="tk-fn">useQuery</span>()
<span class="tk-cmt">// + router setup, context, AppRouter</span>
<span class="tk-cmt">// type export, provider wrapping...</span>` },
    ],
  },
]

function CodeComparison() {
  const [activeComparison, setActiveComparison] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const comp = comparisons[activeComparison]
  const tab = comp.tabs[activeTab]
  const isWasp = activeTab === 0

  return (
    <section className={`py-28 md:py-36 border-t ${t.sec}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Compare</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Less code, more power</h2>
          <p className={`${t.m} max-w-lg mx-auto text-[15px]`}>See how Wasp simplifies common full-stack patterns compared to traditional approaches.</p>
        </div>

        {/* Comparison picker */}
        <div className="flex justify-center gap-3 mb-8">
          {comparisons.map((c, i) => (
            <button key={c.label} onClick={() => { setActiveComparison(i); setActiveTab(0) }}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium cursor-pointer transition-all ${activeComparison === i
                ? 'bg-wasp-100 dark:bg-wasp-400/10 text-wasp-700 dark:text-wasp-400 border border-wasp-200 dark:border-wasp-400/20'
                : `bg-zinc-100 dark:bg-white/[0.04] ${t.m} border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08]`
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <p className={`text-center text-[14px] ${t.p} mb-8`}>{comp.desc}</p>

        {/* Code window */}
        <div className="max-w-4xl mx-auto">
          <div className={`gradient-border noise-overlay rounded-2xl bg-white dark:bg-surface-1 shadow-xl dark:shadow-2xl shadow-amber-900/5 dark:shadow-black/40 overflow-hidden`}>
            {/* Tab bar */}
            <div className={`flex items-center justify-between border-b border-zinc-100 dark:border-white/[0.05] px-5 py-3`}>
              <div className="flex items-center gap-2">
                {comp.tabs.map((tb, i) => (
                  <button key={tb.name} onClick={() => setActiveTab(i)}
                    className={`px-3 py-1.5 text-[12px] font-medium rounded-lg cursor-pointer transition-all ${i === activeTab
                      ? (i === 0 ? 'code-tab-active' : 'bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300')
                      : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
                    }`}>
                    {tb.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono ${isWasp ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-600'}`}>
                  {tab.lines} lines
                </span>
                {!isWasp && (
                  <span className="text-[10px] font-medium text-red-500/70 dark:text-red-400/50 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md">
                    {Math.round((tab.lines / comp.tabs[0].lines - 1) * 100)}% more code
                  </span>
                )}
                {isWasp && (
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    simplest
                  </span>
                )}
              </div>
            </div>
            {/* Code */}
            <div className="p-5 md:p-6 overflow-x-auto min-h-[260px]">
              <pre className="font-mono text-[13px] leading-[1.75]"><code dangerouslySetInnerHTML={{ __html: tab.code }} /></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          <a href="/" className="flex items-center gap-2.5">
            <Bolt size={24} />
            <span className={`text-[15px] font-bold tracking-tight ${t.h}`}>Wasp</span>
            <span className="text-[9px] font-semibold text-wasp-700 dark:text-wasp-400 bg-wasp-100 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider">beta</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Docs', 'Blog', 'FAQ', 'Join the list'].map(item => (
              <a key={item} href={item === 'Docs' ? 'https://wasp.sh/docs' : item === 'Blog' ? 'https://wasp.sh/blog' : item === 'FAQ' ? '#faq' : '#signup'} className={`text-[13px] ${t.link}`}>{item}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-[13px] ${t.link} px-3 py-1.5 rounded-lg`} aria-label="GitHub">
              <GithubIcon /><span>GitHub</span>
            </a>
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${t.link} cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.06]`} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary ml-1 px-4 py-2 text-[13px]">
              Get Started <Arrow />
            </a>
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
        <div className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className={`anim-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${t.brd} bg-white/80 dark:bg-white/[0.03] mb-8`}>
                <div className="w-1.5 h-1.5 rounded-full bg-wasp-400 animate-pulse" />
                <span className={`text-[12px] ${t.m}`}>Backed by</span>
                <span className={`text-[12px] font-bold ${t.accent}`}>Y Combinator</span>
              </div>

              <h1 className={`anim-2 text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-[1.06] mb-6`}>
                <span className={t.h}>Develop full-stack</span><br />
                <span className="gradient-text">web apps faster.</span>
              </h1>

              <p className={`anim-3 text-base lg:text-[17px] ${t.p} leading-relaxed mb-10 max-w-[440px]`}>
                Rails-like framework for React, Node.js and Prisma. Build your app in a day and deploy it with a single CLI command.
              </p>

              <div className="anim-4 flex flex-wrap items-center gap-3 mb-12">
                <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-6 py-3 text-sm">
                  <Bolt size={16} /> Get Started
                </a>
                <a href="https://wasp.sh/docs" className="btn-ghost px-6 py-3 text-sm">
                  <BookIcon /> Documentation
                </a>
              </div>

              <div className="anim-5 flex items-center gap-5">
                <span className={`text-[10px] ${t.f} uppercase tracking-[0.15em] font-semibold`}>Works with</span>
                <div className="flex items-center gap-1">
                  {['React', 'Node.js', 'Prisma'].map((tech, i) => (
                    <span key={tech} className="flex items-center">
                      <span className={`text-[12px] font-medium ${t.m} px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.04]`}>{tech}</span>
                      {i < 2 && <span className={`mx-1 ${t.f}`}>&middot;</span>}
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
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Built-in features,<br className="sm:hidden" /> zero boilerplate</h2>
            <p className={`${t.m} max-w-md mx-auto text-[15px]`}>Stop wiring together auth, CRUD, and deployment from scratch.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Code Comparison ── */}
      <CodeComparison />

      {/* ── How it works ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>How it works</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>How does it work?</h2>
          </div>
          <p className={`text-center ${t.p} max-w-2xl mx-auto mb-5 text-[15px] leading-relaxed`}>
            A simple <code className={`font-mono ${t.accent} text-[13px] bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded-md`}>.wasp</code> config describes your app. You write business logic in React and Node.js. The compiler generates everything else.
          </p>
          <p className={`text-center text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-16`}>This unique approach is what makes Wasp "smart" and gives it its super powers!</p>

          <div className={`gradient-border noise-overlay rounded-2xl bg-white/80 dark:bg-surface-2/30 p-8 md:p-10`}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
              <div className="space-y-3">
                {[
                  { dot: 'bg-wasp-400', file: 'todoApp.wasp', label: 'config' },
                  { dot: 'bg-blue-400', file: 'src/*.tsx', label: 'React' },
                  { dot: 'bg-emerald-400', file: 'src/*.ts', label: 'Node.js' },
                  { dot: 'bg-pink-400', file: 'schema.prisma', label: 'DB' },
                ].map(({ dot, file, label }) => (
                  <div key={file} className={`flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-surface-3 px-5 py-3.5 border border-zinc-100 dark:border-white/[0.04]`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                    <span className="font-mono text-[12px] text-zinc-700 dark:text-zinc-300">{file}</span>
                    <span className={`text-[10px] ${t.f} ml-auto font-medium uppercase tracking-wider`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <svg className={`${t.f} hidden md:block`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <div className="rounded-2xl border border-wasp-300 dark:border-wasp-400/20 bg-wasp-50 dark:bg-wasp-400/5 px-8 py-5 text-center">
                  <Bolt size={28} className="mx-auto mb-2" />
                  <p className={`text-[12px] font-bold ${t.accent}`}>Wasp Compiler</p>
                </div>
                <svg className={`${t.f} hidden md:block`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="space-y-3">
                {['React Frontend', 'Node.js Backend', 'Database Migrations', 'Deployment Config'].map(item => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 px-5 py-3.5 border border-emerald-200/60 dark:border-emerald-500/10">
                    <CheckIcon />
                    <span className="text-[12px] text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Examples ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Examples</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Show, don't tell.</h2>
            <p className={`${t.m} text-[15px]`}>See how things work and get inspired for your next project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {examples.map(ex => (
              <div key={ex.title} className="card overflow-hidden group">
                <div className={`aspect-[16/10] bg-gradient-to-br ${ex.gradient} to-zinc-50 dark:to-surface-3 flex items-center justify-center`}>
                  <span className={`text-4xl font-black ${t.f} group-hover:scale-110 transition-transform duration-300`}>{ex.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-sm font-semibold ${t.h}`}>{ex.title}</h3>
                    <span className={`text-[10px] ${t.f} bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-md font-medium`}>{ex.subtitle}</span>
                  </div>
                  <p className={`text-[13px] ${t.m} mb-4 leading-relaxed`}>{ex.desc}</p>
                  <div className="flex items-center gap-3">
                    <a href={ex.code} target="_blank" rel="noreferrer" className={`text-[12px] font-medium ${t.link}`}>See the code &rarr;</a>
                    {ex.demo && <a href={ex.demo} target="_blank" rel="noreferrer" className={`text-[12px] font-medium ${t.accent} hover:underline`}>Demo</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://github.com/wasp-lang/wasp/tree/release/examples" target="_blank" rel="noreferrer" className={`btn-ghost px-5 py-2.5 text-[13px]`}>See all examples &rarr;</a>
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
              <a key={tm.handle} href={tm.href} target="_blank" rel="noreferrer" className="card p-6 block group">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <p className={`text-[14px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6`}>"{tm.text}"</p>
                <div className="flex items-center justify-between mt-auto">
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

      {/* ── Showcase ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Showcase</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Built with Wasp</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {showcase.map(s => (
              <a key={s.title} href={s.href} target="_blank" rel="noreferrer" className="card overflow-hidden block group">
                <div className={`aspect-[16/10] bg-gradient-to-br ${s.gradient} to-zinc-50 dark:to-surface-3 flex items-center justify-center`}>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${t.h}`}>{s.title}</p>
                    <p className={`text-[12px] ${t.m} mt-1`}>{s.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`text-[13px] ${t.m} mb-3 leading-relaxed`}>{s.desc}</p>
                  <div className="flex gap-2">
                    {s.tags.map(tag => <span key={tag} className={`text-[10px] ${t.m} bg-zinc-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg font-medium`}>{tag}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="signup" className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Newsletter</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Stay up to date</h2>
          <p className={`${t.m} mb-8 text-[15px]`}>Be the first to know when we ship new features.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="you@awesomedev.com" required className={`flex-1 px-5 py-3 bg-white dark:bg-white/[0.04] border ${t.brd} rounded-xl text-sm ${t.h} placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-wasp-400/50 focus:ring-2 focus:ring-wasp-400/10 transition-all`} />
            <button type="submit" className="btn-primary px-6 py-3 text-sm whitespace-nowrap justify-center">Subscribe</button>
          </form>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>Roadmap</span>
          <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Always shipping</h2>
          <p className={`${t.m} mb-8 text-[15px]`}>Work on Wasp never stops. <a href="https://github.com/orgs/wasp-lang/projects/5" target="_blank" rel="noreferrer" className={`${t.accent} hover:underline`}>Get a glimpse</a> of what's next.</p>
          <a href="https://github.com/orgs/wasp-lang/projects/5" target="_blank" rel="noreferrer" className="btn-ghost px-6 py-3 text-sm">
            <GithubIcon /> View Roadmap
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={`py-28 md:py-36 border-t ${t.sec}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`text-[11px] font-semibold ${t.accent} uppercase tracking-[0.15em] mb-3 block`}>FAQ</span>
            <h2 className={`text-3xl md:text-[2.5rem] font-bold tracking-tight ${t.h} mb-4`}>Frequently asked questions</h2>
            <p className={t.m}>For anything not covered here, join <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className={`${t.accent} hover:underline`}>our Discord</a>!</p>
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
                <Bolt size={22} />
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
                  {col.items.map(([label, href]) => (
                    <li key={label}><a href={href} target="_blank" rel="noreferrer" className={`text-[13px] ${t.f} hover:text-zinc-900 dark:hover:text-white transition-colors`}>{label}</a></li>
                  ))}
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
