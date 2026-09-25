(function () {
  const d = PORTFOLIO;
  const t = d.aot || {};
  const $ = (id) => document.getElementById(id);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Paths in data.js are relative to the main site; this page lives one folder down
  const fromRoot = (url) => (!url || /^([a-z]+:|\/|#)/i.test(url) ? url : `../${url}`);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Original drawings ----
  const art = {
    // A simple pair of wings (not the official emblem)
    wings: `<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M31 40 C20 34 7 29 2 10 C9 15 15 15 19 11 C19 19 24 23 31 24 Z" fill="#f4f1ea"/><path d="M33 40 C44 34 57 29 62 10 C55 15 49 15 45 11 C45 19 40 23 33 24 Z" fill="#3b5f8a"/><path d="M8 17 C14 24 22 27 30 29 M12 24 C18 29 24 32 30 34" stroke="#b9b3a6" stroke-width="1.4" fill="none"/><path d="M56 17 C50 24 42 27 34 29 M52 24 C46 29 40 32 34 34" stroke="#2a4466" stroke-width="1.4" fill="none"/></svg>`,
    // Giant silhouette peering over the wall, with steam
    giant: `<svg viewBox="0 0 300 210" aria-hidden="true">
      <circle class="steam" cx="110" cy="40" r="26" fill="#e8e2d8" opacity=".4"/>
      <circle class="steam" cx="190" cy="30" r="22" fill="#e8e2d8" opacity=".4"/>
      <circle class="steam" cx="150" cy="18" r="18" fill="#e8e2d8" opacity=".4"/>
      <!-- skinless head: exposed muscle with dark striations -->
      <path d="M78 210 C68 118 94 46 150 44 C206 46 232 118 222 210 Z" fill="#6b2a22"/>
      <g stroke="#3f140f" stroke-width="3" fill="none" opacity=".75">
        <path d="M96 200 C92 150 100 100 122 62"/><path d="M110 204 C108 156 116 108 134 56"/>
        <path d="M204 200 C208 150 200 100 178 62"/><path d="M190 204 C192 156 184 108 166 56"/>
        <path d="M150 46 L150 96"/><path d="M84 176 C100 172 112 176 120 186"/><path d="M216 176 C200 172 188 176 180 186"/>
      </g>
      <path d="M88 150 C96 120 104 100 116 86 M212 150 C204 120 196 100 184 86" stroke="#a54a3a" stroke-width="2" fill="none" opacity=".6"/>
      <!-- deep sockets, tiny glowing pupils -->
      <ellipse cx="124" cy="120" rx="17" ry="11" fill="#1a0907"/><ellipse cx="176" cy="120" rx="17" ry="11" fill="#1a0907"/>
      <g class="giant-eyes"><circle cx="126" cy="121" r="3.2" fill="#ffe08a"/><circle cx="174" cy="121" r="3.2" fill="#ffe08a"/></g>
      <path d="M140 138 L150 150 L160 138" stroke="#3f140f" stroke-width="3" fill="none"/>
      <!-- the lipless titan grin -->
      <path d="M100 160 Q150 196 200 160 Q150 178 100 160 Z" fill="#1a0907"/>
      <g fill="#e8dcc8">${Array.from({ length: 11 }, (_, i) => `<rect x="${106 + i * 8.4}" y="${164 + Math.sin((i / 10) * Math.PI) * 9}" width="6.5" height="${7 - Math.abs(i - 5) * 0.4}" rx="1.5"/>`).join("")}</g>
      <path d="M100 160 Q150 176 200 160" stroke="#3f140f" stroke-width="2" fill="none"/>
      <g fill="#6b2a22" stroke="#3f140f" stroke-width="2"><rect x="14" y="176" width="16" height="34" rx="8"/><rect x="32" y="168" width="16" height="42" rx="8"/><rect x="50" y="170" width="16" height="40" rx="8"/><rect x="68" y="180" width="14" height="30" rx="7"/>
      <rect x="218" y="180" width="14" height="30" rx="7"/><rect x="234" y="170" width="16" height="40" rx="8"/><rect x="252" y="168" width="16" height="42" rx="8"/><rect x="270" y="176" width="16" height="34" rx="8"/></g>
    </svg>`,
    // Scout on an ODM cable
    scout: `<svg viewBox="0 0 70 260" aria-hidden="true"><line x1="35" y1="0" x2="35" y2="206" stroke="#c7ccd1" stroke-width="1.5"/><circle cx="35" cy="2" r="3" fill="#8a9199"/>
      <path d="M22 214 Q35 204 48 214 L56 248 Q35 256 14 248 Z" fill="#2f4b3a"/><circle cx="35" cy="210" r="7" fill="#e3c9a8"/><path d="M28 207 Q35 199 42 207 L42 205 Q35 196 28 205 Z" fill="#2a2520"/>
      <rect x="12" y="228" width="10" height="7" rx="2" fill="#8a9199"/><rect x="48" y="228" width="10" height="7" rx="2" fill="#8a9199"/><path d="M58 232 L68 226 M12 232 L2 226" stroke="#c7ccd1" stroke-width="2"/></svg>`,
    hooded: `<svg viewBox="0 0 96 110" aria-hidden="true"><path d="M8 110 Q12 70 48 64 Q84 70 88 110 Z" fill="#2f4b3a"/><path d="M26 58 Q24 22 48 18 Q72 22 70 58 Q60 72 48 72 Q36 72 26 58 Z" fill="#2f4b3a"/><ellipse cx="48" cy="48" rx="15" ry="18" fill="#3a2d25"/><path d="M40 82 L48 92 L56 82" fill="#f4f1ea"/></svg>`,
    blades: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 26 L22 6 L25 8 L9 28 Z" fill="#c7ccd1"/><path d="M26 26 L10 6 L7 8 L23 28 Z" fill="#8a9199"/><rect x="4" y="25" width="7" height="4" rx="1" fill="#7a5230" transform="rotate(-50 7 27)"/><rect x="21" y="25" width="7" height="4" rx="1" fill="#7a5230" transform="rotate(50 25 27)"/></svg>`,
    teacup: `<svg viewBox="0 0 120 100" aria-hidden="true">
      <path class="tea-steam" d="M44 30 Q38 20 44 10 Q50 0 44 -8" stroke="#c7ccd1" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path class="tea-steam" d="M60 28 Q54 18 60 8 Q66 -2 60 -10" stroke="#c7ccd1" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path class="tea-steam" d="M76 30 Q70 20 76 10 Q82 0 76 -8" stroke="#c7ccd1" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="88" rx="52" ry="9" fill="#e9e1cf"/><path d="M24 40 L96 40 Q94 80 60 84 Q26 80 24 40 Z" fill="#f4f1ea" stroke="#c9bfa8" stroke-width="2"/>
      <ellipse cx="60" cy="40" rx="36" ry="6" fill="#7a4a24"/><path d="M96 48 Q112 50 106 62 Q100 70 92 66" stroke="#c9bfa8" stroke-width="5" fill="none"/></svg>`,
    bolt: `<svg viewBox="0 0 100 400" aria-hidden="true"><path d="M62 0 L30 150 L56 150 L22 290 L46 290 L12 400 L84 214 L58 214 L88 86 L64 86 Z" fill="#fff3b0"/></svg>`,
    feather: (c) => `<svg viewBox="0 0 22 44" aria-hidden="true"><path d="M11 4 C2 12 2 30 11 40 C20 30 20 12 11 4 Z" fill="${c}"/><path d="M11 44 L11 6" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/><path d="M11 14 L5 18 M11 20 L4 25 M11 26 L5 31 M11 14 L17 18 M11 20 L18 25 M11 26 L17 31" stroke="rgba(0,0,0,.15)" stroke-width=".8"/></svg>`,
    dust: `<svg viewBox="0 0 30 30" aria-hidden="true"><g fill="#8b8f8a"><circle cx="15" cy="16" r="7"/><circle cx="10" cy="13" r="4.5"/><circle cx="20" cy="12" r="4"/><circle cx="21" cy="19" r="4"/><circle cx="9" cy="20" r="3.5"/></g><circle cx="4" cy="6" r="1.4" fill="#8b8f8a"/><circle cx="26" cy="5" r="1" fill="#8b8f8a"/><circle cx="27" cy="25" r="1.3" fill="#8b8f8a"/></svg>`,
    gear: {
      blade: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><path d="M8 32 L30 6 L33 9 L11 35 Z" fill="${c}"/><rect x="3" y="30" width="10" height="5" rx="1.5" fill="#7a5230" transform="rotate(-50 8 32)"/></svg>`,
      spear: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><path d="M6 32 L28 10" stroke="#8a9199" stroke-width="3"/><rect x="22" y="4" width="8" height="16" rx="3" fill="${c}" transform="rotate(45 26 12)"/><path d="M31 3 L36 2 L35 7 Z" fill="${c}"/></svg>`,
      flare: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><path d="M8 34 Q14 20 26 10" stroke="${c}" stroke-width="3" fill="none" opacity=".5"/><circle cx="28" cy="9" r="6" fill="${c}"/><circle cx="28" cy="9" r="10" fill="${c}" opacity=".25"/></svg>`,
      wings: () => art.wings,
      canister: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><rect x="8" y="12" width="22" height="18" rx="6" fill="${c}"/><rect x="16" y="6" width="6" height="7" fill="#8a9199"/><path d="M30 21 L37 21" stroke="#c7ccd1" stroke-width="2"/><path d="M12 18 H26" stroke="rgba(0,0,0,.25)" stroke-width="2"/></svg>`,
      crate: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><rect x="6" y="10" width="26" height="22" fill="${c}"/><path d="M6 10 L32 32 M32 10 L6 32" stroke="rgba(0,0,0,.3)" stroke-width="2"/><rect x="6" y="10" width="26" height="22" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2"/></svg>`,
      horseshoe: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><path d="M9 8 L9 20 Q9 32 19 32 Q29 32 29 20 L29 8" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#131a17"><circle cx="9" cy="14" r="1.2"/><circle cx="29" cy="14" r="1.2"/><circle cx="11" cy="24" r="1.2"/><circle cx="27" cy="24" r="1.2"/></g></svg>`,
      broom: (c) => `<svg viewBox="0 0 38 38" aria-hidden="true"><path d="M30 4 L16 22" stroke="#a0703f" stroke-width="3" stroke-linecap="round"/><path d="M14 20 L20 26 L12 36 Q6 34 4 30 Z" fill="${c}"/><path d="M8 30 L14 24 M10 33 L16 27" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/></svg>`,
    },
    github:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    external:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  };

  const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // ---- Populate content ----
  $("logoWings").innerHTML = art.wings;
  $("fileWings").innerHTML = art.wings;
  $("logoText").textContent = d.name.split(/\s+/).map((w) => w[0]).join("");
  $("giant").innerHTML = art.giant;
  $("scoutSwing").innerHTML = art.scout;
  $("tea").innerHTML = art.teacup;

  $("heroSquad").textContent = t.squad || "";
  $("heroName").textContent = d.name;
  $("heroEpithet").textContent = t.epithet ? `“${t.epithet}”` : "";
  $("heroRole").textContent = d.role;
  $("heroIntro").textContent = d.intro;

  const photo = (d.pirate && d.pirate.photo) || "";
  $("filePhoto").innerHTML = photo ? `<img src="${esc(fromRoot(photo))}" alt="${esc(d.name)}" />` : art.hooded;
  const fields = [
    ["Name", d.name],
    ["Rank", t.rank],
    ["Squad", t.squad],
    ["Specialty", d.role],
    ["Base", d.location],
    ["Bugs slain", t.bugsSlain],
  ].filter(([, v]) => v);
  $("fileFields").innerHTML = fields.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

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

  $("aboutText").innerHTML = d.about.map((para) => `<p>${esc(para)}</p>`).join("");
  $("stats").innerHTML = d.stats
    .map((s) => `<div class="stat"><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`)
    .join("");

  const r = d.research;
  $("researchCard").innerHTML = `
    <div class="lab-head">
      <p class="lab-label">Experiment log · ${esc(r.venue)}</p>
      <span class="classified">Classified</span>
    </div>
    <h3>${esc(r.title)}</h3>
    <p class="lab-note">Subject: reasoning models. Hypothesis: they can be steered from the inside. Result: they can.</p>
    <ul class="research-points">${r.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
    <div class="chips">${r.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join("")}</div>
    ${r.github ? `<a class="research-link" href="${esc(r.github)}" target="_blank" rel="noopener">${art.github} Read the full research notes on GitHub</a>` : ""}`;

  $("projectsGrid").innerHTML = d.projects
    .map((pr, i) => {
      const links = [
        pr.github ? `<a href="${esc(pr.github)}" target="_blank" rel="noopener" aria-label="GitHub repository" title="Source code">${art.github}</a>` : "",
        pr.live ? `<a href="${esc(pr.live)}" target="_blank" rel="noopener" aria-label="Live demo" title="Live demo">${art.external}</a>` : "",
      ].join("");
      return `
      <article class="exp reveal${pr.featured ? " featured" : ""}">
        <div class="exp-top">
          <span class="exp-no">${ordinal(57 + i)} Expedition Beyond the Walls</span>
          <span class="returned">Returned ✓</span>
        </div>
        <h3>${esc(pr.title)}</h3>
        ${pr.subtitle ? `<p class="exp-sub">${esc(pr.subtitle)}</p>` : ""}
        <p class="exp-desc">${esc(pr.description)}</p>
        <div class="exp-foot">
          <div class="tags">${pr.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
          <div class="exp-links">${links}</div>
        </div>
      </article>`;
    })
    .join("");

  $("timeline").innerHTML = d.experience
    .map(
      (e) => `
      <li class="reveal">
        <span class="deploy-marker">${art.blades}</span>
        <div class="deploy-box">
          <h3>${esc(e.role)} <span class="company">· ${esc(e.company)}</span></h3>
          ${e.period ? `<p class="period">${esc(e.period)}</p>` : '<div class="period-gap"></div>'}
          <ul class="deploy-points">${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </li>`
    )
    .join("");

  // Each skill group becomes a piece of ODM gear
  const loadout = {
    Programming: { name: "Ultrahard steel blades", note: "The core weapon. Always sharp.", icon: "blade", color: "#c7ccd1" },
    "AI / ML": { name: "Thunder Spears", note: "Heavy firepower for the hardest targets.", icon: "spear", color: "#e0664a" },
    "Computer Vision": { name: "Signal flares", note: "Spot what's coming before anyone else.", icon: "flare", color: "#6fd08c" },
    Frontend: { name: "Survey Corps cloak", note: "What everyone sees first.", icon: "wings", color: "#6f9c7f" },
    "Backend & APIs": { name: "ODM gas & anchors", note: "What keeps everything in the air.", icon: "canister", color: "#9fb8d8" },
    Databases: { name: "Supply depot", note: "Every resource stored safely.", icon: "crate", color: "#d9b45a" },
    "DevOps & Cloud": { name: "Horse corps", note: "Fast, reliable delivery to the front.", icon: "horseshoe", color: "#c08a52" },
    "AI-Assisted Development": { name: "Levi Squad", note: "A squad of elites at my back.", icon: "wings", color: "#b7c7ff" },
    Tools: { name: "Cleaning supplies", note: "Captain Levi insists.", icon: "broom", color: "#e9e1cf" },
  };
  $("skillsGrid").innerHTML = Object.entries(d.skills)
    .map(([group, items]) => {
      const g = loadout[group] || { name: "Standard issue", note: "", icon: "blade", color: "#c7ccd1" };
      return `
      <div class="skill-card reveal" style="--chip:${g.color}">
        <div class="skill-head">
          <span class="gear-icon">${art.gear[g.icon](g.color)}</span>
          <h3>${esc(group)}<small>${g.name}</small></h3>
        </div>
        ${g.note ? `<p class="gear-note">${g.note}</p>` : ""}
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

  // "4th Place" -> #4, "Top 12" -> TOP 12, anything else -> small word badge
  const medal = (title) => {
    const place = title.match(/^(\d+)(st|nd|rd|th)\b/i);
    if (place) return `<span class="medal">#${place[1]}</span>`;
    const top = title.match(/^top\s*(\d+)/i);
    if (top) return `<span class="medal">TOP ${top[1]}</span>`;
    return `<span class="medal word">${esc(title)}</span>`;
  };
  $("achievements").innerHTML = d.achievements
    .map((a) => `<div class="achievement reveal">${medal(a.title)}<span>${esc(a.text)}</span></div>`)
    .join("");

  $("contactBtn").href = `mailto:${d.email}`;
  $("contactEmail").textContent = d.email;
  $("footerText").textContent = `© ${new Date().getFullYear()} ${d.name} · ${d.location} · Shinzou wo sasageyo!`;

  const copyStatus = $("copyStatus");
  $("copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(d.email);
      copyStatus.textContent = "Copied. Tch… at least you're efficient.";
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

  // ---- Captain Levi's inspection: dust specks hidden around the page ----
  const toast = $("toast");
  const showToast = (html) => {
    toast.innerHTML = html;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("show"), 3800);
  };
  const dustSpots = [
    { section: "about", style: "top:48px;right:4%" },
    { section: "research", style: "bottom:36px;left:2%" },
    { section: "projects", style: "top:60px;right:3%" },
    { section: "experience", style: "bottom:44px;right:12%" },
    { section: "skills", style: "top:56px;right:6%" },
    { section: "education", style: "bottom:32px;left:46%" },
  ];
  const remarks = [
    "Tch. Filthy.",
    "You call this clean?",
    "Missed a spot. Again.",
    "Better. Don't get cocky.",
    "Almost acceptable.",
  ];
  $("dustTotal").textContent = dustSpots.length;
  let cleaned = 0;
  dustSpots.forEach((spot) => {
    const host = $(spot.section);
    if (!host) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dust";
    btn.style.cssText = spot.style;
    btn.setAttribute("aria-label", "Clean this dust");
    btn.title = "Clean me";
    btn.innerHTML = art.dust;
    btn.addEventListener("click", () => {
      btn.classList.add("cleaned");
      cleaned += 1;
      if (cleaned < dustSpots.length) {
        showToast(`<b>Captain Levi:</b> “${remarks[(cleaned - 1) % remarks.length]}”<small>Dust cleaned: ${cleaned}/${dustSpots.length}</small>`);
      } else {
        showToast(`<b>Spotless.</b> Captain Levi approves. That's the highest honor there is. 🍵<small>All ${dustSpots.length} specks cleaned</small>`);
      }
    });
    host.appendChild(btn);
  });

  // ---- Atmosphere: feathers, lightning, ODM cables, signal flares ----
  if (!reduceMotion) {
    // Wings-of-freedom feathers drifting through the hero
    const feathers = $("feathers");
    for (let i = 0; i < 9; i++) {
      const f = document.createElement("span");
      f.className = "feather";
      f.style.left = `${Math.random() * 100}%`;
      f.style.setProperty("--dur", `${10 + Math.random() * 9}s`);
      f.style.setProperty("--delay", `-${Math.random() * 18}s`);
      f.style.setProperty("--drift", `${-80 + Math.random() * 240}px`);
      f.style.setProperty("--spin", `${120 + Math.random() * 240}deg`);
      f.innerHTML = art.feather(i % 3 === 0 ? "#3b5f8a" : "#f1ede4");
      feathers.appendChild(f);
    }

    // Distant lightning, like a titan shifting somewhere beyond the wall
    const skyFlash = $("skyFlash"), skyBolt = $("skyBolt");
    skyBolt.innerHTML = art.bolt;
    const strike = () => {
      skyBolt.style.left = `${8 + Math.random() * 80}%`;
      [skyFlash, skyBolt].forEach((el) => { el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); });
      setTimeout(strike, 7000 + Math.random() * 6000);
    };
    setTimeout(strike, 4500);

    // ODM gear: click empty space and two grappling cables fire at that spot
    const odm = $("odmLayer");
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs) => { const el = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); return el; };
    document.addEventListener("click", (e) => {
      if (e.target.closest("a, button, input, textarea, select, dialog, label, .intro, .dust")) return;
      if (String(window.getSelection())) return;
      const w = window.innerWidth, h = window.innerHeight;
      odm.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const g = mk("g", {});
      [[-1, w / 2 - 70], [1, w / 2 + 70]].forEach(([side, ox]) => {
        const tx = e.clientX + side * 12, ty = e.clientY;
        const len = Math.hypot(tx - ox, ty - h);
        const line = mk("line", { x1: ox, y1: h + 4, x2: tx, y2: ty, class: "odm-cable", "stroke-dasharray": len, "stroke-dashoffset": len });
        const hook = mk("circle", { cx: tx, cy: ty, r: 3.5, class: "odm-hook", opacity: 0 });
        const gas = mk("circle", { cx: ox, cy: h - 6, r: 10, class: "odm-gas" });
        g.append(line, hook, gas);
        line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0, offset: 0.25 }, { strokeDashoffset: 0, offset: 0.7 }, { strokeDashoffset: -len }], { duration: 900, easing: "ease-out", fill: "forwards" });
        hook.animate([{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], { duration: 900, fill: "forwards" });
        gas.style.transformBox = "fill-box";
        gas.style.transformOrigin = "center";
        gas.animate([{ transform: "scale(0.4)", opacity: 0.9 }, { transform: "scale(2.6)", opacity: 0 }], { duration: 700, easing: "ease-out", fill: "forwards" });
      });
      odm.appendChild(g);
      setTimeout(() => g.remove(), 950);
    });

    // Signal flares fire the first time you reach each section (black = abnormal, for Hange's lab)
    const flareColors = { research: "black" };
    const flareObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          flareObserver.unobserve(en.target);
          const fl = document.createElement("span");
          fl.className = `flare ${flareColors[en.target.id] || ""}`;
          fl.innerHTML = '<span class="flare-smoke"></span><span class="flare-ball"></span>';
          en.target.appendChild(fl);
          setTimeout(() => fl.remove(), 9000);
        }),
      { threshold: 0.35 }
    );
    document.querySelectorAll("main section[id]").forEach((s) => flareObserver.observe(s));
  }

  // ---- Cinematic opening (once per visit) ----
  const intro = $("intro");
  let introSeen = false;
  try { introSeen = sessionStorage.getItem("aotIntro") === "1"; } catch (e) {}
  if (reduceMotion || introSeen) {
    intro.remove();
  } else {
    document.body.classList.add("intro-active");
    $("introBolt").innerHTML = art.bolt;
    $("introGiant").innerHTML = art.giant;
    $("introName").textContent = d.name;
    $("introEpithet").textContent = t.epithet ? `“${t.epithet}”` : "";
    const line = $("introLine");
    const narration = "On that day, humanity received a grim reminder…";
    const timers = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      intro.classList.add("done");
      document.body.classList.remove("intro-active");
      try { sessionStorage.setItem("aotIntro", "1"); } catch (e) {}
      setTimeout(() => intro.remove(), 800);
      window.removeEventListener("keydown", finish);
    };
    [...narration].forEach((ch, i) => timers.push(setTimeout(() => (line.textContent += ch), 300 + i * 42)));
    const typedEnd = 300 + narration.length * 42;
    timers.push(setTimeout(() => intro.classList.add("bolt"), typedEnd + 500));
    timers.push(setTimeout(() => intro.classList.add("rise"), typedEnd + 700));
    timers.push(setTimeout(() => intro.classList.add("title"), typedEnd + 2000));
    timers.push(setTimeout(finish, typedEnd + 3700));
    intro.addEventListener("click", finish);
    window.addEventListener("keydown", finish);
  }

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

  // ---- Nav, ODM cable progress, gas gauge ----
  const nav = document.querySelector(".nav");
  const cableLine = $("cableLine");
  const gas = $("gasGauge"), gasFill = $("gasFill"), gasPct = $("gasPct");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    cableLine.style.width = `${pct * 100}%`;
    const left = Math.round(100 - pct * 100);
    gasFill.style.width = `${left}%`;
    gasFill.classList.toggle("low", left < 25);
    gasPct.textContent = `${left}%`;
    gas.classList.toggle("show", window.scrollY > window.innerHeight * 0.5);
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

  const navAnchors = [...links.querySelectorAll("a:not(.btn)")];
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

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
