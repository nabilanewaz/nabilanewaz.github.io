(function () {
  const d = PORTFOLIO;
  const p = d.pirate || {};
  const $ = (id) => document.getElementById(id);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Paths in data.js are relative to the main site; this page lives one folder down
  const fromRoot = (url) => (!url || /^([a-z]+:|\/|#)/i.test(url) ? url : `../${url}`);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Hand-drawn SVG art (original drawings of in-world objects) ----
  const sea = '<path d="M0 36 Q5.5 32 11 36 T22 36 T33 36 T44 36 V44 H0Z" fill="#2e8bff" opacity=".55"/>';
  const art = {
    hat: `<svg viewBox="0 0 64 40" aria-hidden="true"><ellipse cx="32" cy="30" rx="30" ry="8" fill="#f5c518" stroke="#b8860b" stroke-width="1.5"/><path d="M15 29 Q15 7 32 7 Q49 7 49 29 Z" fill="#f5c518" stroke="#b8860b" stroke-width="1.5"/><path d="M15.4 23 Q32 27.5 48.6 23 L49 29 Q32 33.5 15 29 Z" fill="#d7263d"/></svg>`,
    ship: `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M58 8 L58 70" stroke="#5a3a1a" stroke-width="4"/><path d="M60 12 Q92 28 60 62 Z" fill="#f4ead2" stroke="#c9b58a" stroke-width="2"/><path d="M56 18 Q34 38 56 62 Z" fill="#f4ead2" stroke="#c9b58a" stroke-width="2"/><path d="M62 30 Q78 36 62 50" fill="none" stroke="#d7263d" stroke-width="4"/><path d="M58 4 L74 8 L58 12 Z" fill="#d7263d"/><path d="M12 68 L108 68 Q100 90 80 92 L36 92 Q18 90 12 68 Z" fill="#8b5a2b" stroke="#5a3a1a" stroke-width="2"/><path d="M18 76 L102 76" stroke="#5a3a1a" stroke-width="2" opacity=".6"/><circle cx="40" cy="83" r="3" fill="#3b2412"/><circle cx="60" cy="83" r="3" fill="#3b2412"/><circle cx="80" cy="83" r="3" fill="#3b2412"/><path d="M108 68 Q118 60 114 52 Q108 50 106 58" fill="#f4ead2" stroke="#8b5a2b" stroke-width="2"/></svg>`,
    silhouette: `<svg class="silhouette" viewBox="0 0 200 170" aria-hidden="true"><path d="M30 170 Q34 120 100 116 Q166 120 170 170 Z" fill="#3b2412"/><circle cx="100" cy="82" r="38" fill="#3b2412"/><ellipse cx="100" cy="56" rx="76" ry="17" fill="#f5c518" stroke="#8a6508" stroke-width="3"/><path d="M60 55 Q60 16 100 16 Q140 16 140 55 Z" fill="#f5c518" stroke="#8a6508" stroke-width="3"/><path d="M61 44 Q100 54 139 44 L140 55 Q100 66 60 55 Z" fill="#d7263d"/><path d="M84 96 Q100 108 116 96" stroke="#f2e0b8" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    newsCoo: `<svg viewBox="0 0 48 38" aria-hidden="true"><path d="M4 20 Q14 8 24 16 Q34 6 44 14 Q34 16 30 22 Z" fill="#fff" stroke="#9fb3c8" stroke-width="1.2"/><ellipse cx="24" cy="24" rx="10" ry="8" fill="#fff" stroke="#9fb3c8" stroke-width="1.2"/><circle cx="30" cy="20" r="6" fill="#fff" stroke="#9fb3c8" stroke-width="1.2"/><path d="M35 20 L42 22 L35 23 Z" fill="#f5a623"/><circle cx="31" cy="19" r="1.2" fill="#222"/><path d="M25 15 Q30 11 35 15 L34 17 Q30 15 26 17 Z" fill="#2e5fa8"/><rect x="16" y="24" width="12" height="9" rx="1.5" fill="#8b5a2b"/><rect x="17.5" y="21" width="9" height="5" fill="#f2e0b8" stroke="#8b5a2b" stroke-width=".8"/></svg>`,
    compass: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="#f5c518" stroke-width="2"/><path d="M16 5 L19 16 L16 27 L13 16 Z" fill="#f5c518"/><path d="M16 5 L19 16 L13 16 Z" fill="#d7263d"/><circle cx="16" cy="16" r="2" fill="#081a2e"/></svg>`,
    // Den Den Mushi: transponder snail with a rotary dial on its shell and a receiver on top
    snail: `<svg viewBox="0 0 150 120" aria-hidden="true"><path d="M8 100 Q18 78 58 82 L124 88 Q142 92 138 104 Q134 112 116 110 L20 110 Q4 110 8 100 Z" fill="#9ccf6a" stroke="#4c7a2a" stroke-width="3"/><path d="M114 88 L118 50" stroke="#4c7a2a" stroke-width="4" stroke-linecap="round"/><path d="M128 90 L136 54" stroke="#4c7a2a" stroke-width="4" stroke-linecap="round"/><circle cx="118" cy="48" r="7" fill="#fff" stroke="#4c7a2a" stroke-width="2"/><circle cx="136" cy="52" r="7" fill="#fff" stroke="#4c7a2a" stroke-width="2"/><circle cx="119" cy="49" r="3" fill="#222"/><circle cx="137" cy="53" r="3" fill="#222"/><path d="M118 98 Q126 103 134 98" stroke="#4c7a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="58" cy="64" r="40" fill="#f5c518" stroke="#b8860b" stroke-width="3"/><circle cx="58" cy="64" r="24" fill="#fff4cf" stroke="#b8860b" stroke-width="2.5"/><g fill="#b8860b">${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 - Math.PI / 2; return `<circle cx="${(58 + Math.cos(a) * 16).toFixed(1)}" cy="${(64 + Math.sin(a) * 16).toFixed(1)}" r="3"/>`; }).join("")}</g><circle cx="58" cy="64" r="5" fill="#b8860b"/><path d="M26 22 Q58 0 90 22" stroke="#3b2412" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="16" y="16" width="20" height="14" rx="6" fill="#3b2412"/><rect x="80" y="16" width="20" height="14" rx="6" fill="#3b2412"/></svg>`,
    // Wrist Log Pose: glass globe with a floating needle on a strap
    logPose: `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="0" y="46" width="64" height="10" rx="5" fill="#6b4a2b"/><rect x="14" y="44" width="36" height="14" rx="4" fill="#b8860b"/><circle cx="32" cy="30" r="20" fill="rgba(160,215,255,.18)" stroke="#dbe9f5" stroke-width="2.5"/><path d="M20 20 Q26 14 34 13" stroke="rgba(255,255,255,.7)" stroke-width="2.5" fill="none" stroke-linecap="round"/><g class="lp-needle"><path d="M32 14 L35 30 L32 46 L29 30 Z" fill="#f2f2f2"/><path d="M32 14 L35 30 L29 30 Z" fill="#d7263d"/><circle cx="32" cy="30" r="2.5" fill="#3b2412"/></g></svg>`,
    fruit: (color) =>
      `<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M20 8 Q22 2 28 2" stroke="#3b5a1e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 6 Q30 0 34 6 Q28 10 22 6 Z" fill="#5c9b2e"/><circle cx="20" cy="26" r="16" fill="${color}"/><g fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2" stroke-linecap="round"><path d="M13 20 a3 3 0 1 1 3 3 a5 5 0 1 1 5 -5"/><path d="M24 29 a3 3 0 1 1 3 3 a5 5 0 1 1 5 -5"/><path d="M12 32 a2.5 2.5 0 1 1 2.5 2.5 a4 4 0 1 1 4 -4"/></g><circle cx="14" cy="19" r="3" fill="rgba(255,255,255,.35)"/></svg>`,
    islands: {
      island: `<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M8 36 Q22 24 36 36 Z" fill="#e6cc97"/><path d="M22 32 Q21 20 24 12" stroke="#8b5a2b" stroke-width="2.5" fill="none"/><path d="M24 12 Q16 8 12 14 M24 12 Q30 6 35 11 M24 12 Q20 16 17 21 M24 12 Q30 14 32 20" stroke="#3fae5a" stroke-width="3" fill="none" stroke-linecap="round"/>${sea}</svg>`,
      tree: `<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M6 36 Q22 26 38 36 Z" fill="#e6cc97"/><rect x="19" y="18" width="6" height="14" fill="#8b5a2b"/><circle cx="22" cy="14" r="11" fill="#3fae5a"/><circle cx="14" cy="18" r="6" fill="#349a4d"/><circle cx="30" cy="18" r="6" fill="#349a4d"/>${sea}</svg>`,
      city: `<svg viewBox="0 0 44 44" aria-hidden="true"><rect x="8" y="20" width="8" height="14" fill="#dbe9f5"/><rect x="18" y="12" width="9" height="22" fill="#f2e0b8"/><rect x="29" y="18" width="7" height="16" fill="#dbe9f5"/><path d="M22 8 Q22 4 26 6" stroke="#7fd6ff" stroke-width="2" fill="none"/><path d="M10 24 H14 M20 16 H25 M20 22 H25 M31 22 H34" stroke="#8b5a2b" stroke-width="1.5"/>${sea}</svg>`,
      route: `<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="20" r="13" fill="none" stroke="#f5c518" stroke-width="2"/><path d="M22 8 L25 20 L22 32 L19 20 Z" fill="#f5c518"/><path d="M22 8 L25 20 L19 20 Z" fill="#d7263d"/>${sea}</svg>`,
      bubble: `<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M8 36 Q22 26 36 36 Z" fill="#6b4a2b"/><path d="M14 34 Q12 22 18 16 M28 34 Q32 24 26 16" stroke="#8b5a2b" stroke-width="2.5" fill="none"/><ellipse cx="22" cy="14" rx="12" ry="6" fill="#3fae5a"/><circle cx="10" cy="12" r="4" fill="rgba(160,215,255,.3)" stroke="#dbe9f5"/><circle cx="34" cy="8" r="3" fill="rgba(160,215,255,.3)" stroke="#dbe9f5"/><circle cx="36" cy="20" r="2.5" fill="rgba(160,215,255,.3)" stroke="#dbe9f5"/>${sea}</svg>`,
      x: `<svg viewBox="0 0 44 44" aria-hidden="true"><path d="M6 36 Q22 22 38 36 Z" fill="#e6cc97"/><path d="M17 25 L27 33 M27 25 L17 33" stroke="#d7263d" stroke-width="3.5" stroke-linecap="round"/><path d="M22 6 L23.6 11.4 L29 13 L23.6 14.6 L22 20 L20.4 14.6 L15 13 L20.4 11.4 Z" fill="#f5c518"/>${sea}</svg>`,
    },
    github:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    external:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  };

  // The voyage: each section is an island on the route to Laugh Tale
  const islands = [
    { name: "East Blue", sect: "About", id: "about", icon: "island" },
    { name: "Ohara", sect: "Research", id: "research", icon: "tree" },
    { name: "Water 7", sect: "Projects", id: "projects", icon: "city" },
    { name: "Grand Line", sect: "Experience", id: "experience", icon: "route" },
    { name: "Rusukaina", sect: "Skills", id: "skills", icon: "island" },
    { name: "Sabaody", sect: "Achievements", id: "education", icon: "bubble" },
    { name: "Laugh Tale", sect: "Contact", id: "contact", icon: "x" },
  ];

  // Periodic wave path (period 200 across 2400 wide, so shifting by 50% loops seamlessly)
  const wavePath = (y, amp) => {
    let path = `M0 ${y}`;
    for (let x = 0; x < 2400; x += 200) path += ` Q ${x + 50} ${y - amp} ${x + 100} ${y} T ${x + 200} ${y}`;
    return `${path} L2400 120 L0 120 Z`;
  };
  $("waves").innerHTML = `<svg viewBox="0 0 2400 120" preserveAspectRatio="none">
    <path class="wave wave-1" d="${wavePath(40, 14)}" fill="#1d4f7c" opacity=".55"/>
    <path class="wave wave-2" d="${wavePath(62, 12)}" fill="#1a4670" opacity=".8"/>
    <path class="wave wave-3" d="${wavePath(84, 10)}" fill="#14395f"/>
  </svg>`;

  // ---- Populate content ----
  $("logoHat").innerHTML = art.hat;
  $("logoText").textContent = d.name.split(/\s+/).map((w) => w[0]).join("");
  $("logShip").innerHTML = art.ship;
  $("heroShip").innerHTML = art.ship;
  $("snail").innerHTML = art.snail;
  $("newsCoo").innerHTML = art.newsCoo;
  $("lpDevice").innerHTML = art.logPose;

  $("heroName").textContent = d.name;
  $("heroEpithet").innerHTML = [
    p.epithet ? `“${esc(p.epithet)}”` : "",
    p.crewRole ? `<span class="epithet-role">Crew position: ${esc(p.crewRole)}</span>` : "",
  ].join("");
  $("heroRole").textContent = d.role;
  $("heroIntro").textContent = d.intro;

  // No photo? Like a certain cook's first poster, the Marines had to use a sketch.
  const photo = $("wantedPhoto");
  if (p.photo) {
    photo.innerHTML = `<img src="${esc(fromRoot(p.photo))}" alt="${esc(d.name)}" />`;
  } else {
    photo.innerHTML = art.silhouette;
    photo.title = "Photo unavailable. The Marines drew a sketch instead.";
  }
  $("wantedName").textContent = d.name;
  $("wantedBounty").textContent = p.bounty || "???";

  const resume = $("resumeBtn");
  if (d.resumeUrl) resume.href = fromRoot(d.resumeUrl);
  else resume.remove();

  const socialLinks = d.socials
    .map((s) => {
      const external = s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${esc(s.url)}"${external}>${esc(s.label)}</a>`;
    })
    .join("");
  $("heroSocials").innerHTML = socialLinks;
  $("footerSocials").innerHTML = socialLinks;

  $("islandMap").innerHTML = islands
    .map(
      (isl, i) => `
      <li class="island" data-index="${i}">
        <a href="#${isl.id}">
          <span class="island-icon">${art.islands[isl.icon]}</span>
          <span class="island-name">${isl.name}</span>
          <span class="island-sect">${isl.sect}</span>
        </a>
      </li>`
    )
    .join("");

  $("aboutText").innerHTML = d.about.map((para) => `<p>${esc(para)}</p>`).join("");
  $("dream").innerHTML = p.dream ? `“${esc(p.dream)}”<small>My dream</small>` : "";
  if (!p.dream) $("dream").remove();

  const tilts = ["-1deg", "0.8deg", "-0.5deg"];
  $("stats").innerHTML = d.stats
    .map(
      (s, i) => `
      <div class="stat parchment" style="--tilt:${tilts[i % tilts.length]}">
        <div class="stat-label-top">✦ ✦ ✦</div>
        <div class="stat-value">${esc(s.value)}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`
    )
    .join("");

  // Decorative carved glyphs (made-up script, hidden from screen readers)
  const glyphChars = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
  const glyphs = (n, seed) => Array.from({ length: n }, (_, i) => glyphChars[(i * 7 + seed) % glyphChars.length]).join("");
  const r = d.research;
  $("researchCard").innerHTML = `
    <span class="glyph-badge">Road Poneglyph · Deciphered</span>
    <div class="glyph-band" aria-hidden="true">${glyphs(80, 3)}</div>
    <p class="research-venue">${esc(r.venue)}</p>
    <h3>${esc(r.title)}</h3>
    <ul class="research-points">${r.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
    <div class="chips">${r.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    ${r.github ? `<a class="research-link" href="${esc(r.github)}" target="_blank" rel="noopener">${art.github} Read the full text on GitHub</a>` : ""}
    <div class="glyph-band bottom" aria-hidden="true">${glyphs(80, 11)}</div>`;

  $("projectsGrid").innerHTML = d.projects
    .map((pr, i) => {
      const links = [
        pr.github ? `<a href="${esc(pr.github)}" target="_blank" rel="noopener" aria-label="GitHub repository" title="Source code">${art.github}</a>` : "",
        pr.live ? `<a href="${esc(pr.live)}" target="_blank" rel="noopener" aria-label="Live demo" title="Live demo">${art.external}</a>` : "",
      ].join("");
      return `
      <article class="arc parchment reveal${pr.featured ? " featured" : ""}">
        <span class="seal">ARC<b>${i + 1}</b></span>
        <p class="arc-label">${pr.featured ? "Main arc" : `Arc ${i + 1}`}</p>
        <h3>${esc(pr.title)}</h3>
        ${pr.subtitle ? `<p class="arc-sub">${esc(pr.subtitle)}</p>` : ""}
        <p class="arc-desc">${esc(pr.description)}</p>
        <div class="arc-foot">
          <div class="tags">${pr.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="arc-links">${links}</div>
        </div>
      </article>`;
    })
    .join("");

  $("timeline").innerHTML = d.experience
    .map(
      (e) => `
      <li class="reveal">
        <span class="voyage-marker">${art.compass}</span>
        <div class="voyage-box">
          <h3>${esc(e.role)} <span class="company">aboard ${esc(e.company)}</span></h3>
          ${e.period ? `<p class="period">${esc(e.period)}</p>` : '<div class="period-gap"></div>'}
          <ul class="voyage-points">${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </li>`
    )
    .join("");

  // Each skill group gets a Devil Fruit or Haki that suits it
  const powers = {
    Programming: { name: "Gomu Gomu no Mi", note: "Stretches to fit any problem", color: "#8e5bd6" },
    "AI / ML": { name: "Ope Ope no Mi", note: "Operates on a model's insides", color: "#e5484d" },
    "Computer Vision": { name: "Observation Haki", note: "Sees what others miss", color: "#ff4fa3" },
    Frontend: { name: "Hana Hana no Mi", note: "Makes interfaces bloom anywhere", color: "#ff8fc7" },
    "Backend & APIs": { name: "Gura Gura no Mi", note: "Shakes the foundations", color: "#dfe7ef" },
    Databases: { name: "Hie Hie no Mi", note: "Keeps data frozen in place", color: "#7fd6ff" },
    "DevOps & Cloud": { name: "Goro Goro no Mi", note: "Lightning-fast deploys", color: "#f5c518" },
    "AI-Assisted Development": { name: "Conqueror's Haki", note: "Commands a crew of AI agents", color: "#d7263d" },
    Tools: { name: "Armament Haki", note: "Everyday gear, hardened", color: "#6e7b8b" },
  };
  const fallbackPowers = [
    { name: "Zoan type", note: "", color: "#2bd96b" },
    { name: "Logia type", note: "", color: "#ff7a1a" },
    { name: "Paramecia type", note: "", color: "#2e8bff" },
  ];
  $("skillsGrid").innerHTML = Object.entries(d.skills)
    .map(([group, items], i) => {
      const pw = powers[group] || fallbackPowers[i % fallbackPowers.length];
      return `
      <div class="skill-card reveal" style="--chip:${pw.color}">
        <div class="skill-head">
          <button type="button" class="fruit" data-power="${esc(pw.name)}" data-color="${pw.color}" aria-label="What does the ${esc(pw.name)} do?">${art.fruit(pw.color)}</button>
          <h3>${esc(group)}<small>${pw.name}</small></h3>
        </div>
        ${pw.note ? `<p class="power-note">${pw.note}</p>` : ""}
        <div class="chips">${items.map((it) => `<span class="chip">${esc(it)}</span>`).join("")}</div>
      </div>`;
    })
    .join("");

  // ---- Devil Fruits: float in the hero, click to eat ----
  const fruitLore = {
    "Gomu Gomu no Mi": "Your body turned to rubber. Gear up!",
    "Mera Mera no Mi": "You can become fire itself. Hiken!",
    "Ope Ope no Mi": "ROOM! You can operate on anything inside it.",
    "Hie Hie no Mi": "Everything you touch freezes solid.",
    "Goro Goro no Mi": "You are lightning. 200 million volts!",
    "Gura Gura no Mi": "You can shake the very sea itself.",
    "Hana Hana no Mi": "Extra hands can bloom anywhere you like.",
    "Bara Bara no Mi": "You can split into pieces. Swords can't cut you!",
    "Suna Suna no Mi": "You can turn into sand. Just stay away from water.",
  };
  const fruitColors = {
    "Gomu Gomu no Mi": "#8e5bd6", "Mera Mera no Mi": "#ff7a1a", "Hie Hie no Mi": "#7fd6ff",
    "Goro Goro no Mi": "#f5c518", "Bara Bara no Mi": "#2e8bff", "Suna Suna no Mi": "#d9a45b",
  };
  // Desktop spots sit in the gap between the text and the poster; the rest float on the waves
  const floating = [
    { name: "Mera Mera no Mi", style: "top:16%;left:55%", desk: true, delay: 0 },
    { name: "Bara Bara no Mi", style: "top:46%;left:57%", desk: true, delay: 1.1 },
    { name: "Suna Suna no Mi", style: "top:74%;left:54%", desk: true, delay: 2.2 },
    { name: "Gomu Gomu no Mi", style: "bottom:44px;left:14%", desk: false, delay: 0.6 },
    { name: "Hie Hie no Mi", style: "bottom:30px;left:47%", desk: false, delay: 1.7 },
    { name: "Goro Goro no Mi", style: "bottom:52px;right:9%", desk: false, delay: 2.8 },
  ];
  $("fruitFloat").innerHTML = floating
    .map(
      (f) => `<button type="button" class="float-fruit${f.desk ? " desk-only" : ""}" data-fruit="${f.name}"
        style="${f.style};animation-delay:-${f.delay}s" aria-label="Eat the ${f.name}" title="Eat me?">${art.fruit(fruitColors[f.name])}</button>`
    )
    .join("");

  const toast = $("fruitToast");
  const showToast = (color, html) => {
    toast.innerHTML = `<span class="tf">${art.fruit(color)}</span><span>${html}</span>`;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("show"), 4200);
  };

  let eaten = 0;
  $("fruitFloat").addEventListener("click", (e) => {
    const btn = e.target.closest(".float-fruit");
    if (!btn || btn.classList.contains("eaten")) return;
    btn.classList.add("eaten");
    eaten += 1;
    const name = btn.dataset.fruit;
    const total = floating.length;
    let msg;
    if (eaten === 1) {
      msg = `You ate the <b>${name}</b>! ${fruitLore[name]}<small>Side effect: you can't swim anymore. (${eaten}/${total} found)</small>`;
    } else if (eaten < total) {
      msg = `Only Blackbeard survives eating two Devil Fruits… lucky this is just a portfolio. <b>${name}</b>: ${fruitLore[name]}<small>${eaten}/${total} found</small>`;
    } else {
      msg = `You've eaten every Devil Fruit in the sky! The seas fear you now. 🏴‍☠️<small>${total}/${total} found. Time to join the crew?</small>`;
    }
    showToast(fruitColors[name], msg);
  });

  // Skill-card fruits explain their power instead of being eaten
  $("skillsGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".fruit");
    if (!btn) return;
    btn.classList.remove("bounce");
    void btn.offsetWidth; // restart the bounce animation
    btn.classList.add("bounce");
    const name = btn.dataset.power;
    const msg = fruitLore[name]
      ? `<b>${name}</b>: ${fruitLore[name]}`
      : /haki/i.test(name)
        ? `<b>${name}</b> isn't a fruit. It's willpower, trained for two years on Rusukaina.`
        : `A <b>${name}</b> Devil Fruit. Its power is still a mystery…`;
    showToast(btn.dataset.color, msg);
  });

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

  // "4th Place" -> 4TH, "Top 12" -> TOP 12, anything else -> small word badge
  const featBadge = (title) => {
    const place = title.match(/^(\d+)(st|nd|rd|th)\b/i);
    if (place) return `<span class="feat top">${place[1]}${place[2].toUpperCase()}</span>`;
    const top = title.match(/^top\s*(\d+)/i);
    if (top) return `<span class="feat top">TOP ${top[1]}</span>`;
    return `<span class="feat word">${esc(title)}</span>`;
  };
  $("achievements").innerHTML = d.achievements
    .map((a) => `<div class="achievement parchment reveal">${featBadge(a.title)}<span>${esc(a.text)}</span></div>`)
    .join("");

  $("contactBtn").href = `mailto:${d.email}`;
  $("contactEmail").textContent = d.email;
  $("footerText").textContent = `© ${new Date().getFullYear()} ${d.name} · ${d.location} · Sailing the Grand Line ⚓`;

  const copyStatus = $("copyStatus");
  $("copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(d.email);
      copyStatus.textContent = "Vivre Card taken! It'll always lead you back to me.";
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents($("contactEmail"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyStatus.textContent = "Press Ctrl+C (or ⌘C) to copy";
    }
    clearTimeout(copyStatus._t);
    copyStatus._t = setTimeout(() => (copyStatus.textContent = ""), 3500);
  });

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
      let delay = deleting ? 45 : 90;
      if (!deleting && char === current.length) { deleting = true; delay = 1800; }
      else if (deleting && char === 0) { deleting = false; word = (word + 1) % d.taglines.length; delay = 400; }
      setTimeout(tick, delay);
    })();
  }

  // ---- Nav: scrolled state, route ship, mobile menu ----
  const nav = document.querySelector(".nav");
  const logShip = $("logShip");
  const logPose = $("logPose");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    logShip.style.left = `calc(13px + ${pct} * (100% - 26px))`;
    logPose.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
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

  // ---- Current island: highlights the map, the nav, and aims the Log Pose ----
  const navAnchors = [...links.querySelectorAll("a:not(.btn)")];
  const mapItems = [...document.querySelectorAll(".island")];
  const lpNext = $("lpNext");
  const setIsland = (idx) => {
    mapItems.forEach((li, i) => {
      li.classList.toggle("current", i === idx);
      li.classList.toggle("visited", i < idx);
    });
    const id = islands[idx].id;
    navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    const next = islands[idx + 1];
    if (next) {
      lpNext.textContent = next.name;
      logPose.href = `#${next.id}`;
      logPose.setAttribute("aria-label", `Sail to the next island: ${next.name}`);
    } else {
      lpNext.textContent = "You found it! Set sail again?";
      logPose.href = "#top";
      logPose.setAttribute("aria-label", "Back to the start of the voyage");
    }
    // The needle swings to a new bearing for each island, never quite straight
    logPose.style.setProperty("--needle", next ? `${((idx + 1) * 53) % 110 - 55}deg` : "0deg");
  };
  const islandObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && setIsland(+en.target.dataset.island)),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("[data-island]").forEach((s) => islandObserver.observe(s));

  // ---- Scroll reveal ----
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
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    io.observe(el);
  });
})();
