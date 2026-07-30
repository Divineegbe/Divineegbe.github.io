import './style.css'

const GITHUB_USER = 'Divineegbe'
const EMAIL = 'divine.egbe2011@gmail.com'

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader')
  if (loader) setTimeout(() => loader.classList.add('is-hidden'), 450)
})

/* ---------- Footer year ---------- */
document.getElementById('footerYear').textContent = new Date().getFullYear()

/* ---------- Cursor glow (desktop only) ---------- */
const cursorGlow = document.getElementById('cursorGlow')
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let glowX = 0, glowY = 0, curX = 0, curY = 0
  window.addEventListener('mousemove', (e) => {
    glowX = e.clientX
    glowY = e.clientY
    cursorGlow.classList.add('is-active')
  })
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('is-active'))
  const animateGlow = () => {
    curX += (glowX - curX) * 0.12
    curY += (glowY - curY) * 0.12
    cursorGlow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
    requestAnimationFrame(animateGlow)
  }
  animateGlow()
}

/* ---------- Scroll progress + nav state ---------- */
const scrollProgress = document.getElementById('scrollProgress')
const nav = document.getElementById('nav')
const navLinks = document.querySelectorAll('.nav-link')
const sections = [...document.querySelectorAll('main section[id]')]

const onScroll = () => {
  const scrollTop = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.style.width = `${(scrollTop / docH) * 100}%`
  nav.classList.toggle('is-scrolled', scrollTop > 30)

  let current = sections[0]?.id
  for (const sec of sections) {
    if (scrollTop >= sec.offsetTop - 120) current = sec.id
  }
  navLinks.forEach((l) => {
    l.classList.toggle('is-active', l.getAttribute('href') === `#${current}`)
  })
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle')
const navLinksEl = document.getElementById('navLinks')
navToggle.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('is-open')
  navToggle.classList.toggle('is-open', open)
  navToggle.setAttribute('aria-expanded', String(open))
})
navLinksEl.querySelectorAll('.nav-link').forEach((l) =>
  l.addEventListener('click', () => {
    navLinksEl.classList.remove('is-open')
    navToggle.classList.remove('is-open')
    navToggle.setAttribute('aria-expanded', 'false')
  })
)

/* ---------- Typing animation ---------- */
const titles = [
  'Computer Science Student',
  'Aspiring Full-Stack Web Developer',
  'Always Learning • Always Building',
]
const typedEl = document.getElementById('typed')
let tIndex = 0, cIndex = 0, deleting = false

const typeLoop = () => {
  const full = titles[tIndex]
  if (deleting) {
    cIndex--
  } else {
    cIndex++
  }
  typedEl.textContent = full.slice(0, cIndex)
  let delay = deleting ? 45 : 85
  if (!deleting && cIndex === full.length) {
    delay = 1800
    deleting = true
  } else if (deleting && cIndex === 0) {
    deleting = false
    tIndex = (tIndex + 1) % titles.length
    delay = 400
  }
  setTimeout(typeLoop, delay)
}
typeLoop()

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll('.reveal')
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObs.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)
revealEls.forEach((el) => revealObs.observe(el))

/* assign stagger index */
document.querySelectorAll('.about-grid, .skills-grid, .gh-repos, .projects-grid').forEach((grid) => {
  ;[...grid.children].forEach((child, i) => child.style.setProperty('--i', i))
})

/* ---------- Skill bars ---------- */
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skill = entry.target
        const level = skill.dataset.level
        const fill = skill.querySelector('.skill-fill')
        const pct = skill.querySelector('.skill-pct')
        if (fill) fill.style.width = `${level}%`
        if (pct) countUp(pct, parseInt(level, 10))
        skillObs.unobserve(skill)
      }
    })
  },
  { threshold: 0.4 }
)
document.querySelectorAll('.skill').forEach((s) => skillObs.observe(s))

/* ---------- Number counter ---------- */
function countUp(el, target, duration = 1100) {
  const start = performance.now()
  const from = 0
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(from + (target - from) * eased)
    if (p < 1) requestAnimationFrame(step)
    else el.textContent = target
  }
  requestAnimationFrame(step)
}

const statObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target
        countUp(el, parseInt(el.dataset.count, 10) || 0)
        statObs.unobserve(el)
      }
    })
  },
  { threshold: 0.5 }
)
document.querySelectorAll('.gh-stat-num').forEach((el) => statObs.observe(el))

/* ---------- Magnetic buttons ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`
    })
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = ''
    })
  })
}

/* ---------- Back to top ---------- */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

/* ---------- Copy email ---------- */
document.getElementById('copyEmail').addEventListener('click', async (e) => {
  const btn = e.currentTarget
  try {
    await navigator.clipboard.writeText(EMAIL)
    const orig = btn.textContent
    btn.textContent = 'Copied!'
    setTimeout(() => (btn.textContent = orig), 1600)
  } catch {
    /* clipboard unavailable */
  }
})

/* ---------- Contact form ---------- */
const form = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const name = (data.get('name') || '').toString().trim()
  const email = (data.get('email') || '').toString().trim()
  const message = (data.get('message') || '').toString().trim()

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.'
    formStatus.className = 'form-status is-error'
    return
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    formStatus.textContent = 'Please enter a valid email address.'
    formStatus.className = 'form-status is-error'
    return
  }

  formStatus.textContent = `Thanks, ${name}! Opening your email app…`
  formStatus.className = 'form-status is-success'
  const subject = encodeURIComponent(`Portfolio message from ${name}`)
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  form.reset()
})

/* ---------- GitHub integration ---------- */
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  CSharp: '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Jupyter: '#DA5B0B',
  MDX: '#fcb32c',
  SCSS: '#c6538b',
}
const colorFor = (lang) => (LANG_COLORS[lang] || '#8b949e')

const ghProfileEl = document.getElementById('ghProfile')
const ghReposEl = document.getElementById('ghRepos')
const ghLangsEl = document.getElementById('ghLangs')
const ghStatsEls = document.querySelectorAll('.gh-stat-num')

const FEATURED = ['lendly', 'portfolio', 'personal-portfolio']

async function fetchGitHub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`),
    ])
    if (!userRes.ok) throw new Error('user fetch failed')
    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []

    renderProfile(user)
    setStat(0, user.public_repos || 0)
    setStat(1, user.followers || 0)
    setStat(2, user.following || 0)

    const sorted = [...repos]
      .filter((r) => !r.fork)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at))

    renderRepos(sorted.slice(0, 6))
    renderProjects(sorted)
    renderLanguages(repos)
  } catch (err) {
    renderProfileFallback()
    renderProjectsFallback()
  }
}

function setStat(i, val) {
  const el = ghStatsEls[i]
  if (el) {
    el.dataset.count = val
    countUp(el, val)
  }
}

function renderProfile(user) {
  const bio = user.bio || 'Computer Science student & aspiring full-stack web developer.'
  ghProfileEl.innerHTML = `
    <div class="gh-profile-ready">
      <img class="gh-avatar" src="${user.avatar_url}" alt="${user.login} avatar" loading="lazy" />
      <div class="gh-meta">
        <h3>${user.name || 'Divine Egbe'}</h3>
        <a class="gh-login" href="${user.html_url}" target="_blank" rel="noopener">@${user.login}</a>
        <p class="gh-bio">${escapeHtml(bio)}</p>
      </div>
    </div>
  `
}

function renderProfileFallback() {
  ghProfileEl.innerHTML = `
    <div class="gh-profile-ready">
      <div class="gh-avatar" style="display:grid;place-items:center;font-family:var(--font-display);font-weight:700;color:var(--silver);background:linear-gradient(135deg,var(--gunmetal),var(--graphite));border:1px solid var(--stroke-strong)">DE</div>
      <div class="gh-meta">
        <h3>Divine Egbe</h3>
        <a class="gh-login" href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">@${GITHUB_USER}</a>
        <p class="gh-bio">Computer Science student & aspiring full-stack web developer. GitHub data couldn't be loaded right now — visit my profile directly.</p>
      </div>
    </div>
  `
}

function renderRepos(repos) {
  if (!repos.length) {
    ghReposEl.innerHTML = `<p style="color:var(--text-dim)">No public repositories found yet.</p>`
    return
  }
  ghReposEl.innerHTML = repos
    .map(
      (r) => `
      <article class="repo-card reveal">
        <h4><a href="${r.html_url}" target="_blank" rel="noopener">${escapeHtml(r.name)}</a></h4>
        <p class="repo-desc">${escapeHtml(r.description || 'No description provided.')}</p>
        ${r.topics && r.topics.length ? `<div class="repo-topics">${r.topics.slice(0, 4).map((t) => `<span class="repo-topic">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        <div class="repo-foot">
          ${r.language ? `<span class="repo-lang"><span class="lang-dot" style="background:${colorFor(r.language)}"></span>${escapeHtml(r.language)}</span>` : ''}
          <span class="repo-stars">★ ${r.stargazers_count || 0}</span>
          <span class="repo-forks">⑂ ${r.forks_count || 0}</span>
        </div>
        <p class="repo-updated">Updated ${timeAgo(r.updated_at)}</p>
      </article>
    `
    )
    .join('')
  observeNewReveals()
}

function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid')
  const featured = repos.filter((r) => FEATURED.includes(r.name.toLowerCase()))
  const rest = repos.filter((r) => !FEATURED.includes(r.name.toLowerCase()))
  const ordered = [...featured, ...rest].slice(0, 6)

  if (!ordered.length) {
    renderProjectsFallback()
    return
  }

  grid.innerHTML = ordered
    .map((r, i) => {
      const isFeatured = FEATURED.includes(r.name.toLowerCase())
      const langs = r.language ? [r.language] : []
      const topics = (r.topics || []).slice(0, 2)
      const stack = [...langs, ...topics]
      const homepage = r.homepage && r.homepage.startsWith('http') ? r.homepage : null
      return `
        <article class="project-card reveal" style="--i:${i}">
          <div class="project-thumb">
            ${isFeatured ? '<span class="featured-badge">Featured</span>' : ''}
            <span class="project-thumb-mark">${escapeHtml(initials(r.name))}</span>
          </div>
          <div class="project-body">
            <h3>${escapeHtml(r.name)}</h3>
            <p class="project-desc">${escapeHtml(r.description || 'A project from my GitHub — check the repo for details.')}</p>
            ${stack.length ? `<div class="project-stack">${stack.map((s) => `<span>${escapeHtml(s)}</span>`).join('')}</div>` : ''}
            <div class="project-actions">
              <a href="${r.html_url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm magnetic">GitHub</a>
              ${homepage ? `<a href="${homepage}" target="_blank" rel="noopener" class="btn btn-primary btn-sm magnetic">Live Demo</a>` : ''}
            </div>
          </div>
        </article>
      `
    })
    .join('')
  observeNewReveals()
}

function renderProjectsFallback() {
  const grid = document.getElementById('projectsGrid')
  const placeholders = [
    { name: 'Lendly', desc: 'A lending-focused web application built to practice full-stack development.', stack: ['JavaScript', 'Node.js'], featured: true, url: `https://github.com/${GITHUB_USER}` },
    { name: 'Personal Portfolio', desc: 'This website — a premium dark-themed portfolio built with vanilla HTML, CSS, and JS.', stack: ['HTML', 'CSS', 'JavaScript'], featured: true, url: `https://github.com/${GITHUB_USER}` },
    { name: 'More on GitHub', desc: 'GitHub data could not be loaded. Visit my profile to explore my repositories.', stack: ['—'], featured: false, url: `https://github.com/${GITHUB_USER}` },
  ]
  grid.innerHTML = placeholders
    .map((p, i) => `
      <article class="project-card reveal" style="--i:${i}">
        <div class="project-thumb">
          ${p.featured ? '<span class="featured-badge">Featured</span>' : ''}
          <span class="project-thumb-mark">${escapeHtml(initials(p.name))}</span>
        </div>
        <div class="project-body">
          <h3>${escapeHtml(p.name)}</h3>
          <p class="project-desc">${escapeHtml(p.desc)}</p>
          <div class="project-stack">${p.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join('')}</div>
          <div class="project-actions">
            <a href="${p.url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm magnetic">GitHub</a>
          </div>
        </div>
      </article>
    `)
    .join('')
  observeNewReveals()
}

function renderLanguages(repos) {
  const counts = {}
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  })
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  if (!entries.length) {
    ghLangsEl.innerHTML = `<p style="color:var(--text-dim)">Languages will appear here once repositories are detected.</p>`
    return
  }
  ghLangsEl.innerHTML = entries
    .map(([lang]) => `<span class="lang-pill"><span class="lang-dot" style="background:${colorFor(lang)}"></span>${escapeHtml(lang)}</span>`)
    .join('')
}

/* ---------- Helpers ---------- */
function observeNewReveals() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObs.observe(el))
  document.querySelectorAll('.gh-repos, .projects-grid').forEach((grid) => {
    ;[...grid.children].forEach((child, i) => {
      if (!child.style.getPropertyValue('--i')) child.style.setProperty('--i', i)
    })
  })
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function initials(name) {
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

function timeAgo(dateStr) {
  const d = new Date(dateStr)
  const days = Math.floor((Date.now() - d.getTime()) / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

fetchGitHub()
