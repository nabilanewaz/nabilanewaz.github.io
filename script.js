(function () {
  const d = PORTFOLIO;
  const $ = (id) => document.getElementById(id);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icons = {
    github:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    external:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  };

  // Generic livery colours for project cards and tyre compounds for skills / stints
  const liveries = ["#e10600", "#b36bff", "#2e8bff", "#ffd21f", "#2bd96b", "#ff8a1f", "#00d2be", "#ff4fa3"];
  const compounds = [
    { name: "Soft", color: "var(--soft)" },
    { name: "Medium", color: "var(--medium)" },
    { name: "Hard", color: "var(--hard)" },
    { name: "Intermediate", color: "var(--inter)" },
    { name: "Wet", color: "var(--wet)" },
  ];

  // ---- Populate content ----
  const [first, ...rest] = d.name.split(/\s+/);
  $("heroFirst").textContent = first;
  $("heroLast").textContent = rest.join(" ");
  $("heroRole").textContent = d.role;
  $("heroIntro").textContent = d.intro;
  $("logoNum").textContent = d.raceNumber;
  $("logoCode").textContent = d.driverCode;
  $("driverNum").textContent = d.raceNumber;
  $("driverCode").textContent = d.driverCode;

  const driverRows = [
    ["Team", esc(d.team)],
    ["Base", esc(d.location)],
    ["Focus", esc(d.focus)],
    ["On the grid", `${d.projects.length} projects`],
    ["Status", `<span class="status-dot"></span>${esc(d.status)}`],
  ];
  $("driverStats").innerHTML = driverRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  const resume = $("resumeBtn");
  if (d.resumeUrl) resume.href = d.resumeUrl;
  else resume.remove();

  const socialLinks = d.socials
    .map((s) => {
      const external = s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${esc(s.url)}"${external}>${esc(s.label)}</a>`;
    })
    .join("");
  $("heroSocials").innerHTML = socialLinks;
  $("footerSocials").innerHTML = socialLinks;

  $("aboutText").innerHTML = d.about.map((p) => `<p>${esc(p)}</p>`).join("");
  const sectorColors = ["var(--purple)", "var(--green)", "var(--yellow)"];
  $("stats").innerHTML = d.stats
    .map(
      (s, i) => `
      <div class="stat" style="--c:${sectorColors[i % 3]}">
        <div class="stat-sector">Sector ${i + 1}</div>
        <div class="stat-value">${esc(s.value)}${s.delta ? `<span class="stat-delta">${esc(s.delta)}</span>` : ""}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`
    )
    .join("");

  const r = d.research;
  $("research-card").innerHTML = `
    <span class="pole-badge">POLE · FASTEST LAP</span>
    <p class="research-venue">${esc(r.venue)}</p>
    <h3>${esc(r.title)}</h3>
    <ul class="research-points">${r.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
    <div class="chips" style="--chip:var(--purple)">${r.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    ${r.github ? `<a class="research-link" href="${esc(r.github)}" target="_blank" rel="noopener">${icons.github} View code on GitHub</a>` : ""}`;

  $("projectsGrid").innerHTML = d.projects
    .map((p, i) => {
      const links = [
        p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub repository" title="Source code">${icons.github}</a>` : "",
        p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="Live demo" title="Live demo">${icons.external}</a>` : "",
      ].join("");
      return `
      <article class="project reveal${p.featured ? " featured" : ""}" style="--livery:${liveries[i % liveries.length]}">
        <div class="project-top">
          <span class="grid-pos">P${i + 1}${p.featured ? "<small>POLE SITTER</small>" : ""}</span>
          <div class="project-links">${links}</div>
        </div>
        <h3>${esc(p.title)}</h3>
        ${p.subtitle ? `<p class="project-sub">${esc(p.subtitle)}</p>` : ""}
        <p class="project-desc">${esc(p.description)}</p>
        <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </article>`;
    })
    .join("");

  $("timeline").innerHTML = d.experience
    .map(
      (e, i) => `
      <li class="reveal" style="--tyre:${compounds[i % 3].color}">
        <span class="stint" title="Stint ${i + 1}">S${i + 1}</span>
        <div class="stint-box">
          <h3>${esc(e.role)} <span class="company">@ ${esc(e.company)}</span></h3>
          ${e.period ? `<p class="period">${esc(e.period)}</p>` : '<div class="period-gap"></div>'}
          <ul class="stint-points">${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </li>`
    )
    .join("");

  $("skillsGrid").innerHTML = Object.entries(d.skills)
    .map(([group, items], i) => {
      const c = compounds[i % compounds.length];
      return `
      <div class="skill-card reveal" style="--chip:${c.color}">
        <div class="skill-head">
          <span class="tyre" aria-hidden="true"></span>
          <h3>${esc(group)}<small>${c.name} compound</small></h3>
        </div>
        <div class="chips">${items.map((it) => `<span class="chip">${esc(it)}</span>`).join("")}</div>
      </div>`;
    })
    .join("");

  $("eduList").innerHTML = d.education
    .map(
      (e) => `
      <div class="edu-item reveal">
        <h3>${esc(e.degree)}</h3>
        <p class="edu-school">${esc(e.school)}</p>
        ${e.detail ? `<p class="edu-detail">${esc(e.detail)}</p>` : ""}
      </div>`
    )
    .join("");

  // "4th Place" -> P4 box, "Top 12" -> TOP 12, anything else -> small word badge
  const posBadge = (title) => {
    const place = title.match(/^(\d+)(st|nd|rd|th)\b/i);
    if (place) {
      const n = +place[1];
      return `<span class="pos ${n <= 3 ? "podium" : "points"}">P${n}</span>`;
    }
    const top = title.match(/^top\s*(\d+)/i);
    if (top) return `<span class="pos points">T${top[1]}</span>`;
    return `<span class="pos word">${esc(title)}</span>`;
  };
  $("achievements").innerHTML = d.achievements
    .map(
      (a) => `
      <div class="achievement reveal" title="${esc(a.title)}">
        ${posBadge(a.title)}
        <span>${esc(a.text)}</span>
      </div>`
    )
    .join("");

  $("contactBtn").href = `mailto:${d.email}`;
  $("contactEmail").textContent = d.email;

  // Copy the address for visitors without a mail app set up
  const copyStatus = $("copyStatus");
  $("copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(d.email);
      copyStatus.textContent = "Copied. Radio check: loud and clear ✓";
    } catch (e) {
      // Clipboard can be blocked (e.g. on file:// pages); select the text instead
      const range = document.createRange();
      range.selectNodeContents($("contactEmail"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyStatus.textContent = "Press Ctrl+C (or ⌘C) to copy";
    }
    clearTimeout(copyStatus._t);
    copyStatus._t = setTimeout(() => (copyStatus.textContent = ""), 3000);
  });
  $("footerText").textContent = `© ${new Date().getFullYear()} ${d.name} · ${d.location} · 🏁 Chequered flag`;

  // ---- Typing effect ----
  const typed = $("typed");
  if (reduceMotion || d.taglines.length < 2) {
    typed.textContent = d.taglines[0] || "";
  } else {
    let word = 0, char = 0, deleting = false;
    (function tick() {
      const current = d.taglines[word];
      char += deleting ? -1 : 1;
      typed.textContent = current.slice(0, char);
      let delay = deleting ? 40 : 85;
      if (!deleting && char === current.length) { deleting = true; delay = 1800; }
      else if (deleting && char === 0) { deleting = false; word = (word + 1) % d.taglines.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }

  // ---- Nav: scrolled state, lap bar, mobile menu ----
  const nav = document.querySelector(".nav");
  const lapBar = $("lapBar");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    lapBar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("navToggle");
  const links = $("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---- Lap counter + active nav link ----
  const laps = document.querySelectorAll("[data-lap]");
  const totalLaps = Math.max(...[...laps].map((s) => +s.dataset.lap));
  const lapCounter = $("lapCounter");
  const navAnchors = [...links.querySelectorAll("a:not(.btn)")];
  const lapObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        lapCounter.textContent = `LAP ${en.target.dataset.lap}/${totalLaps}`;
        navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  laps.forEach((s) => lapObserver.observe(s));

  // ---- Scroll reveal ----
  const startReveal = () => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
  };

  // ---- Start-lights intro (once per session) ----
  const intro = $("lightsIntro");
  let seen = false;
  try { seen = sessionStorage.getItem("lightsSeen") === "1"; } catch (e) {}

  if (reduceMotion || seen) {
    intro.remove();
    startReveal();
    return;
  }

  document.body.classList.add("intro-active");
  const gantry = $("gantry");
  gantry.innerHTML = Array.from({ length: 5 }, () => '<div class="pod"><span class="bulb"></span><span class="bulb"></span></div>').join("");
  const pods = gantry.querySelectorAll(".pod");
  const timers = [];
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    intro.classList.add("done");
    document.body.classList.remove("intro-active");
    try { sessionStorage.setItem("lightsSeen", "1"); } catch (e) {}
    startReveal();
    setTimeout(() => intro.remove(), 700);
    window.removeEventListener("keydown", finish);
  };

  pods.forEach((pod, i) => timers.push(setTimeout(() => pod.classList.add("on"), 400 + i * 600)));
  // Lights go out after a short random hold, like the real start
  const outAt = 400 + 5 * 600 + 300 + Math.random() * 600;
  timers.push(setTimeout(() => {
    pods.forEach((p) => p.classList.remove("on"));
    $("lightsText").classList.add("show");
  }, outAt));
  timers.push(setTimeout(finish, outAt + 1100));

  intro.addEventListener("click", finish);
  window.addEventListener("keydown", finish);
})();
