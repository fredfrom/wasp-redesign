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
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)
const ChevronDown = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
)
const Bolt = ({ size = 22, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 14H12L11 22L19.5 10H12L13 2Z" fill="#facc15" stroke="#eab308" strokeWidth="0.5"/></svg>
)
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
)
const BookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
)
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
)
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
)

// ─── Data ───────────────────────────────────────────────
const features = [
  { title: 'Open Source', desc: 'Fully open-source. No vendor lock-in. Contribute and shape the future of full-stack dev.', color: 'emerald', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, href: 'https://github.com/wasp-lang/wasp' },
  { title: 'Full-stack Auth', desc: 'Social providers or email in a few lines of code. Powerful UI helpers. No third-party lock-in.', color: 'blue', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, href: 'https://wasp.sh/blog/2023/04/12/auth-ui' },
  { title: 'RPC (Client <-> Server)', desc: 'Typesafe RPC layer that instantly brings your data models and server logic to the client.', color: 'purple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>, href: 'https://wasp.sh/docs/data-model/operations/overview' },
  { title: 'One-Command Deploy', desc: 'Deploy your app to any platform. Wasp offers CLI helpers for the most popular options.', color: 'orange', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>, href: 'https://wasp.sh/docs/deployment/intro' },
  { title: 'Jobs', desc: 'Easily define, schedule and run specialized server tasks. Persistent, retryable, delayable.', color: 'cyan', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, href: 'https://wasp.sh/docs/advanced/jobs' },
  { title: 'Email Sending', desc: 'All you need to do is connect an email provider and you can send emails!', color: 'pink', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>, href: 'https://wasp.sh/docs/advanced/email' },
  { title: 'Full-stack Type Safety', desc: 'Full TypeScript support with auto-generated types that span the whole stack.', color: 'yellow', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, href: 'https://wasp.sh/docs/tutorial/queries#implementing-a-query' },
  { title: 'And More!', desc: 'Custom API routes, database seeding, optimistic updates, automatic cache invalidation.', color: 'indigo', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>, href: 'https://wasp.sh/docs' },
]

const testimonials = [
  { name: 'Joan Reyero', handle: '@joanreyero', initials: 'JR', source: 'Product Hunt', href: 'https://www.producthunt.com/posts/wasp-lang-beta?comment=2048094', text: 'I spent one weekend building with Wasp and it was amazing, a real pleasure. I normally develop in Vue.js, but in a weekend I had time to learn Wasp, React and finish a full-stack app (only missing styling). This would have been impossible before.' },
  { name: 'Tim', handle: '@tskaggs', initials: 'TS', source: 'Twitter', href: 'https://twitter.com/tskaggs/status/1602513968207101954', text: 'The simplification of the main.wasp file is great. And it feels like a very light weight version of a few larger frameworks.' },
  { name: 'Attila Vago', handle: '@AttilaTheDev', initials: 'AV', source: 'Twitter', href: 'https://twitter.com/AttilaTheDev/status/1583530646047117317', text: "@WaspLang has been in the back of my mind for months now. It left an impression, and I'm really not easy to impress. That's gotta mean something\u2026" },
]

const faqs = [
  { q: 'How is Wasp different from Next.js / Nuxt.js / Gatsby?', a: 'These are frontend-first frameworks with some limited backend capabilities. Wasp is a truly full-stack framework \u2014 it brings both back-end and database next to the front-end. Think Ruby on Rails, but for React & Node.js. Next.js and others started as static site frameworks. Although some offer serverless functions, you still bring your own database and need a separate server for complex operations.' },
  { q: 'How is Wasp different from Ruby on Rails or Django?', a: "While Rails and Django are full-stack, they require extra work for the modern \"desktop\" experience most web apps offer today. Wasp supports that out-of-the-box with React on the frontend, plus automatic data model sharing between database, frontend, and backend \u2014 no custom REST or GraphQL API needed." },
  { q: 'How hard is it to learn Wasp?', a: "We measured! It takes about 30 minutes to get going, and most users find it pretty straightforward. The Wasp config language is intentionally simple \u2014 no loops or variables, think of it as JSON that's easier to read. Since 90% of your coding is still React & Node.js, it's a marginal change. You get full IDE support: syntax highlighting, auto-completion, live error reporting." },
  { q: 'Do you support only React & Node.js currently?', a: "Yes, that is currently the supported stack. But Wasp is being developed as a language/framework and architecture-agnostic tool, so we plan to add support for more languages and frameworks in the future. The compiler architecture is designed for it." },
]

const examples = [
  { title: 'Todo App', subtitle: 'TypeScript', desc: 'The classic full-stack To-Do list with auth, implemented in TypeScript.', gradient: 'from-emerald-100 dark:from-emerald-900/30', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300 dark:text-zinc-700"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, code: 'https://github.com/wasp-lang/wasp/tree/release/examples/tutorials/TodoAppTs' },
  { title: 'CoverLetterGPT', subtitle: 'AI-powered', desc: 'Generate cover letters from your CV and job description. Powered by ChatGPT.', gradient: 'from-violet-100 dark:from-violet-900/30', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300 dark:text-zinc-700"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, code: 'https://github.com/vincanger/coverlettergpt', demo: 'https://coverlettergpt.xyz/' },
  { title: 'Realtime Voting', subtitle: 'WebSockets', desc: 'A realtime, websockets-powered voting app built with Wasp and TypeScript.', gradient: 'from-blue-100 dark:from-blue-900/30', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-300 dark:text-zinc-700"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>, code: 'https://github.com/wasp-lang/wasp/tree/release/examples/websockets-realtime-voting', demo: 'https://websockets-voting-client.fly.dev/login' },
]

const showcase = [
  { title: 'Farnance', subtitle: 'SaaS marketplace for farmers', desc: "Won HackLBS 2021 among 250 participants. Wasp was instrumental for the team's victory.", tags: ['hackathon', 'material-ui'], gradient: 'from-green-100 dark:from-green-900/30', href: 'https://wasp.sh/blog/2022/10/28/farnance-hackathon-winner' },
  { title: 'Grabbit', subtitle: 'Manage dev environments', desc: 'Internal tool for managing dev resources at StudentBeans. Built and deployed by one developer.', tags: ['internal-tools'], gradient: 'from-blue-100 dark:from-blue-900/30', href: 'https://wasp.sh/blog/2022/11/26/michael-curry-usecase' },
  { title: 'Amicus', subtitle: 'Legal workflow management', desc: 'Fully-fledged SaaS built as a team of one in record time. First paying customers acquired.', tags: ['startup', 'SaaS'], gradient: 'from-purple-100 dark:from-purple-900/30', href: 'https://wasp.sh/blog/2022/11/26/erlis-amicus-usecase' },
]

// ─── Shared classname helpers ────────────────────────────
const cx = {
  heading: 'text-zinc-900 dark:text-white',
  body: 'text-zinc-600 dark:text-zinc-400',
  muted: 'text-zinc-500 dark:text-zinc-500',
  faint: 'text-zinc-400 dark:text-zinc-600',
  section: 'border-zinc-100 dark:border-white/[0.04]',
  surface: 'bg-zinc-50 dark:bg-surface-2/50',
  surfaceAlt: 'bg-zinc-50 dark:bg-surface-2/40',
  surfaceCard: 'bg-white dark:bg-surface-3',
  border: 'border-zinc-200 dark:border-white/[0.06]',
  borderFaint: 'border-zinc-100 dark:border-white/[0.04]',
  navLink: 'text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors',
  code: 'bg-white dark:bg-surface-1 border-zinc-200 dark:border-white/[0.06]',
}

// ─── Components ─────────────────────────────────────────
function CodeBlock() {
  const [tab, setTab] = useState('wasp')
  return (
    <div className={`rounded-xl border ${cx.code} shadow-xl dark:shadow-2xl shadow-zinc-200/50 dark:shadow-black/40 overflow-hidden`}>
      <div className={`flex items-center justify-between border-b ${cx.borderFaint} px-4 py-2.5`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex items-center gap-0.5">
            <button onClick={() => setTab('wasp')} className={`px-2.5 py-1 text-[11px] font-medium rounded-md cursor-pointer transition-colors ${tab === 'wasp' ? 'code-tab-active' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'}`}>todoApp.wasp</button>
            <button onClick={() => setTab('prisma')} className={`px-2.5 py-1 text-[11px] font-medium rounded-md cursor-pointer transition-colors ${tab === 'prisma' ? 'code-tab-active' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'}`}>schema.prisma</button>
          </div>
        </div>
      </div>
      <div className="p-5 overflow-x-auto">
        {tab === 'wasp' ? (
          <pre className="font-mono text-[13px] leading-[1.7]"><code dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">app</span> <span class="tk-type">todoApp</span> <span class="tk-br">{</span>
  <span class="tk-prop">title</span>: <span class="tk-str">"ToDo App"</span>,  <span class="tk-cmt">// visible in the browser tab</span>
  <span class="tk-prop">auth</span>: <span class="tk-br">{</span> <span class="tk-cmt">// full-stack auth out-of-the-box</span>
    <span class="tk-prop">userEntity</span>: <span class="tk-type">User</span>,
    <span class="tk-prop">methods</span>: <span class="tk-br">{</span> <span class="tk-fn">google</span>: <span class="tk-br">{}</span>, <span class="tk-fn">gitHub</span>: <span class="tk-br">{}</span>, <span class="tk-fn">email</span>: <span class="tk-br">{</span>...<span class="tk-br">}</span> <span class="tk-br">}</span>
  <span class="tk-br">}</span>
<span class="tk-br">}</span>

<span class="tk-kw">route</span> <span class="tk-type">RootRoute</span> <span class="tk-br">{</span> <span class="tk-prop">path</span>: <span class="tk-str">"/"</span>, <span class="tk-prop">to</span>: <span class="tk-type">MainPage</span> <span class="tk-br">}</span>
<span class="tk-kw">page</span> <span class="tk-type">MainPage</span> <span class="tk-br">{</span>
  <span class="tk-prop">authRequired</span>: <span class="tk-bool">true</span>, <span class="tk-cmt">// Limit access to logged in users.</span>
  <span class="tk-prop">component</span>: <span class="tk-kw">import</span> <span class="tk-type">Main</span> <span class="tk-kw">from</span> <span class="tk-str">"@client/Main"</span>
<span class="tk-br">}</span>

<span class="tk-kw">query</span> <span class="tk-type">getTasks</span> <span class="tk-br">{</span>
  <span class="tk-prop">fn</span>: <span class="tk-kw">import</span> <span class="tk-br">{</span> <span class="tk-fn">getTasks</span> <span class="tk-br">}</span> <span class="tk-kw">from</span> <span class="tk-str">"@server/tasks"</span>,
  <span class="tk-prop">entities</span>: <span class="tk-br">[</span><span class="tk-type">Task</span><span class="tk-br">]</span> <span class="tk-cmt">// Automatic cache invalidation.</span>
<span class="tk-br">}</span>` }} /></pre>
        ) : (
          <pre className="font-mono text-[13px] leading-[1.7]"><code dangerouslySetInnerHTML={{ __html: `<span class="tk-kw">model</span> <span class="tk-type">User</span> <span class="tk-br">{</span>
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
    <a href={href} target="_blank" rel="noreferrer" className={`card ${cx.surface} p-5 block`}>
      <div className={`w-9 h-9 rounded-lg bg-${color}-500/10 flex items-center justify-center mb-3.5`}>{icon}</div>
      <h3 className={`text-[13px] font-semibold ${cx.heading} mb-1`}>{title}</h3>
      <p className={`text-[12px] ${cx.muted} leading-relaxed`}>{desc}</p>
    </a>
  )
}

function FAQ({ q, a, defaultOpen = false }) {
  return (
    <details className={`group rounded-xl border ${cx.border} ${cx.surfaceAlt}`} open={defaultOpen || undefined}>
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none">
        <span className={`text-[13px] font-medium ${cx.heading} pr-4`}>{q}</span>
        <ChevronDown className={`faq-chevron w-4 h-4 ${cx.faint} shrink-0`} />
      </summary>
      <div className="px-5 pb-4">
        <p className={`text-[13px] ${cx.body} leading-relaxed`}>{a}</p>
      </div>
    </details>
  )
}

// ─── Main Page ──────────────────────────────────────────
export const MainPage = () => {
  const [dark, toggleTheme] = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 nav-blur bg-white/80 dark:bg-surface-0/80 border-b ${cx.borderFaint}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Bolt size={24} />
            <span className={`text-[15px] font-semibold tracking-tight ${cx.heading}`}>Wasp</span>
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 py-0.5 rounded">beta</span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            <a href="https://wasp.sh/docs" className={`text-[13px] ${cx.navLink}`}>Docs</a>
            <a href="https://wasp.sh/blog" className={`text-[13px] ${cx.navLink}`}>Blog</a>
            <a href="#faq" className={`text-[13px] ${cx.navLink}`}>FAQ</a>
            <a href="#signup" className={`text-[13px] ${cx.navLink}`}>Join the list</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-[13px] ${cx.navLink}`} aria-label="GitHub">
              <GithubIcon /><span>Star on GitHub</span>
            </a>
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${cx.navLink} cursor-pointer`} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary ml-1 px-4 py-2 text-[13px]">
              Get Started <ChevronRight />
            </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 ${cx.navLink} cursor-pointer`} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-500 cursor-pointer" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className={`md:hidden bg-white dark:bg-surface-1 border-b ${cx.borderFaint} px-6 py-4`}>
            <div className="flex flex-col gap-4">
              <a href="https://wasp.sh/docs" className={`text-sm ${cx.body}`}>Docs</a>
              <a href="https://wasp.sh/blog" className={`text-sm ${cx.body}`}>Blog</a>
              <a href="#faq" className={`text-sm ${cx.body}`}>FAQ</a>
              <a href="https://wasp.sh/docs/quick-start" className="btn-primary justify-center px-4 py-2.5 text-sm">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center pt-16 bg-grid overflow-hidden">
        <div className="glow-hero absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className={`anim-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${cx.border} bg-zinc-50 dark:bg-white/[0.02] mb-7`}>
                <span className="text-[11px] text-zinc-500">Backed by</span>
                <span className="text-[11px] font-bold text-wasp-600 dark:text-wasp-400">Y Combinator</span>
              </div>
              <h1 className={`anim-2 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] ${cx.heading} mb-5`}>
                Develop full-stack<br />web apps faster.
              </h1>
              <p className={`anim-3 text-base lg:text-lg ${cx.body} leading-relaxed mb-8 max-w-lg`}>
                Rails-like framework for React, Node.js and Prisma. Build your app in a day and deploy it with a single CLI command.
              </p>
              <div className="anim-4 flex flex-wrap items-center gap-3 mb-10">
                <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-5 py-2.5 text-sm">
                  <Bolt size={15} /> Get Started
                </a>
                <a href="https://wasp.sh/docs" className="btn-ghost px-5 py-2.5 text-sm">
                  <BookIcon /> Documentation
                </a>
              </div>
              <div className="anim-5 flex items-center gap-6">
                <span className={`text-[11px] ${cx.faint} uppercase tracking-widest font-medium`}>Works with</span>
                <div className={`flex items-center gap-4 ${cx.muted} text-[11px] font-medium`}>
                  <span>React</span>
                  <span className={cx.faint}>/</span>
                  <span>Node.js</span>
                  <span className={cx.faint}>/</span>
                  <span>Prisma</span>
                </div>
              </div>
            </div>
            <div className="anim-5"><CodeBlock /></div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className={`relative py-24 md:py-32 border-t ${cx.section}`}>
        <div className="glow-section absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Built-in features, zero boilerplate</h2>
            <p className={`${cx.muted} max-w-lg mx-auto`}>Stop wiring together auth, CRUD, and deployment from scratch. Wasp handles the plumbing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>How does it work?</h2>
          </div>
          <p className={`text-center ${cx.body} max-w-2xl mx-auto mb-4 leading-relaxed`}>
            A simple <code className="font-mono text-wasp-600 dark:text-wasp-400 text-[13px] bg-wasp-50 dark:bg-wasp-400/10 px-1.5 py-0.5 rounded">.wasp</code> config describes your app's high-level structure. You write your business logic in React and Node.js. The Wasp compiler generates everything else.
          </p>
          <p className={`text-center text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-14`}>This unique approach is what makes Wasp "smart" and gives it its super powers!</p>

          <div className={`rounded-xl border ${cx.border} bg-zinc-50/50 dark:bg-surface-2/30 p-6 md:p-8`}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="space-y-3">
                {[
                  { dot: 'bg-wasp-400', file: 'todoApp.wasp', label: 'config' },
                  { dot: 'bg-blue-400', file: 'src/*.tsx', label: 'React' },
                  { dot: 'bg-emerald-400', file: 'src/*.ts', label: 'Node.js' },
                  { dot: 'bg-pink-400', file: 'schema.prisma', label: 'DB' },
                ].map(({ dot, file, label }) => (
                  <div key={file} className={`flex items-center gap-3 rounded-lg ${cx.surfaceCard} px-4 py-3 border ${cx.borderFaint}`}>
                    <div className={`w-2 h-2 rounded-full ${dot}`} />
                    <span className={`font-mono text-[12px] text-zinc-700 dark:text-zinc-300`}>{file}</span>
                    <span className={`text-[10px] ${cx.faint} ml-auto`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-3">
                <svg className={`${cx.faint} hidden md:block`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <div className="rounded-xl border border-wasp-300 dark:border-wasp-400/20 bg-wasp-50 dark:bg-wasp-400/5 px-6 py-4 text-center">
                  <Bolt size={22} className="mx-auto mb-1.5" />
                  <p className="text-[11px] font-bold text-wasp-600 dark:text-wasp-400">Wasp Compiler</p>
                </div>
                <svg className={`${cx.faint} hidden md:block`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="space-y-3">
                {['React Frontend', 'Node.js Backend', 'Database Migrations', 'Deployment Config'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 px-4 py-3 border border-emerald-200 dark:border-emerald-500/10">
                    <CheckIcon />
                    <span className="text-[12px] text-zinc-700 dark:text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Examples ── */}
      <section className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Show, don't tell.</h2>
            <p className={cx.muted}>See how things work and get inspired for your next project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examples.map((ex) => (
              <div key={ex.title} className={`card ${cx.surfaceAlt} overflow-hidden`}>
                <div className={`aspect-[16/10] bg-gradient-to-br ${ex.gradient} to-zinc-50 dark:to-surface-3 flex items-center justify-center`}>{ex.icon}</div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-sm font-semibold ${cx.heading}`}>{ex.title}</h3>
                    <span className={`text-[10px] ${cx.faint} bg-zinc-100 dark:bg-white/[0.04] px-1.5 py-0.5 rounded`}>{ex.subtitle}</span>
                  </div>
                  <p className={`text-[12px] ${cx.muted} mb-4`}>{ex.desc}</p>
                  <div className="flex items-center gap-3">
                    <a href={ex.code} target="_blank" rel="noreferrer" className={`text-[11px] font-medium ${cx.navLink}`}>See the code &rarr;</a>
                    {ex.demo && <a href={ex.demo} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-wasp-600 dark:text-wasp-400 hover:underline">Demo</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://github.com/wasp-lang/wasp/tree/release/examples" target="_blank" rel="noreferrer" className={`text-sm ${cx.navLink}`}>See all examples &rarr;</a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>You're in good company</h2>
            <p className={cx.muted}>Here's what folks using Wasp say. Join <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className="text-wasp-600 dark:text-wasp-400 hover:underline">our Discord</a> for more!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <a key={t.handle} href={t.href} target="_blank" rel="noreferrer" className={`card ${cx.surfaceAlt} p-6 block`}>
                <p className={`text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5`}>"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-wasp-100 dark:bg-surface-4 flex items-center justify-center text-[10px] font-bold text-wasp-600 dark:text-wasp-400">{t.initials}</div>
                    <div>
                      <p className={`text-[12px] font-semibold ${cx.heading}`}>{t.name}</p>
                      <p className={`text-[11px] ${cx.faint}`}>{t.handle}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] ${cx.faint}`}>{t.source}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase ── */}
      <section className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Showcase Gallery</h2>
            <p className={cx.muted}>See what others are building with Wasp.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {showcase.map((s) => (
              <a key={s.title} href={s.href} target="_blank" rel="noreferrer" className={`card ${cx.surfaceAlt} overflow-hidden block`}>
                <div className={`aspect-[16/10] bg-gradient-to-br ${s.gradient} to-zinc-50 dark:to-surface-3 flex items-center justify-center`}>
                  <div className="text-center">
                    <p className={`text-base font-bold ${cx.heading}`}>{s.title}</p>
                    <p className={`text-[11px] ${cx.muted} mt-1`}>{s.subtitle}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className={`text-[12px] ${cx.muted} mb-3`}>{s.desc}</p>
                  <div className="flex gap-1.5">
                    {s.tags.map((tag) => <span key={tag} className={`text-[10px] ${cx.muted} bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-full`}>{tag}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="signup" className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Stay up to date</h2>
          <p className={`${cx.muted} mb-8`}>Be the first to know when we ship new features and updates!</p>
          <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="you@awesomedev.com" required className={`flex-1 px-4 py-2.5 ${cx.surfaceCard} border ${cx.border} rounded-lg text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-wasp-400/50 focus:ring-1 focus:ring-wasp-400/20 transition-all`} />
            <button type="submit" className="btn-primary px-6 py-2.5 text-sm whitespace-nowrap justify-center">Subscribe</button>
          </form>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Roadmap</h2>
          <p className={`${cx.muted} mb-8`}>Work on Wasp never stops: <a href="https://github.com/orgs/wasp-lang/projects/5" target="_blank" rel="noreferrer" className="text-wasp-600 dark:text-wasp-400 hover:underline">get a glimpse</a> of what's coming next!</p>
          <a href="https://github.com/orgs/wasp-lang/projects/5" target="_blank" rel="noreferrer" className="btn-ghost px-6 py-2.5 text-sm">
            <GithubIcon /> View Roadmap on GitHub
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={`py-24 md:py-32 border-t ${cx.section}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${cx.heading} mb-3`}>Frequently asked questions</h2>
            <p className={cx.muted}>For anything not covered here, join <a href="https://discord.gg/rzdnErX" target="_blank" rel="noreferrer" className="text-wasp-600 dark:text-wasp-400 hover:underline">our Discord</a>!</p>
          </div>
          <div className="space-y-2.5">
            {faqs.map((f, i) => <FAQ key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={`relative py-24 md:py-32 border-t ${cx.section} overflow-hidden`}>
        <div className="glow-cta absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${cx.heading} mb-5`}>Start building today</h2>
          <p className={`text-lg ${cx.body} mb-10 max-w-md mx-auto`}>Go from idea to production in a weekend, not a quarter.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wasp.sh/docs/quick-start" className="btn-primary px-7 py-3 text-sm">Get Started <ChevronRight /></a>
            <a href="https://github.com/wasp-lang/wasp" target="_blank" rel="noreferrer" className="btn-ghost px-7 py-3 text-sm"><GithubIcon /> Star on GitHub</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t ${cx.section} py-16`}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Bolt size={20} />
                <span className={`text-sm font-semibold ${cx.heading}`}>Wasp</span>
              </div>
              <p className={`text-[12px] ${cx.faint} leading-relaxed max-w-[240px] mb-3`}>The fastest way to develop full-stack web apps with React &amp; Node.js.</p>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] ${cx.faint}`}>Backed by</span>
                <span className="text-[11px] font-bold text-wasp-600 dark:text-wasp-400">Y Combinator</span>
              </div>
            </div>
            <div>
              <h4 className={`text-[11px] font-semibold ${cx.muted} uppercase tracking-wider mb-3`}>Docs</h4>
              <ul className="space-y-2">
                <li><a href="https://wasp.sh/docs" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Getting Started</a></li>
                <li><a href="https://wasp.sh/docs/tutorial/create" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Todo app tutorial</a></li>
                <li><a href="https://wasp.sh/docs/general/language" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Language reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-[11px] font-semibold ${cx.muted} uppercase tracking-wider mb-3`}>Community</h4>
              <ul className="space-y-2">
                <li><a href="https://discord.gg/rzdnErX" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Discord</a></li>
                <li><a href="https://x.com/WaspLang" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>X / Twitter</a></li>
                <li><a href="https://bsky.app/profile/wasp.sh" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Bluesky</a></li>
                <li><a href="https://github.com/wasp-lang/wasp" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-[11px] font-semibold ${cx.muted} uppercase tracking-wider mb-3`}>Company</h4>
              <ul className="space-y-2">
                <li><a href="https://wasp.sh/blog" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Blog</a></li>
                <li><a href="https://wasp-lang.notion.site/Wasp-Careers-59fd1682c80d446f92be5fa65cc17672" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Careers</a></li>
                <li><a href="https://wasp.sh/resources" className={`text-[12px] ${cx.faint} hover:text-zinc-900 dark:hover:text-white transition-colors`}>Resources</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${cx.borderFaint} pt-6 flex flex-col md:flex-row items-center justify-between gap-4`}>
            <p className={`text-[11px] ${cx.faint}`}>&copy; Wasp, Inc. All rights reserved.</p>
            <a href="https://wasp.sh/privacy-policy" className={`text-[11px] ${cx.faint} hover:text-zinc-900 dark:hover:text-zinc-400 transition-colors`}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
