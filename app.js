(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const small = () => innerWidth < 860;
  const WA = "https://wa.me/923226660052?text=";
  const root = document.documentElement;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- content ---------- */
  const TAGS = { talk: "Talking head", "3d": "3D animation", ads: "AI & UGC ads", motion: "Motion graphics", estate: "Real estate", med: "Medical", home: "Home services", coach: "Coaching & SaaS" };
  const WORK = [
    { id: "14", feat: 1, title: "The Fix", kind: "3D animation", who: "Plumbing ad for a home-services app", tags: ["3d", "home"],
      desc: "A Pixar-style commercial. The kitchen sink gives up just before the parents arrive, and a plumber is booked in a tap.",
      points: ["Script, characters and storyboard", "The same cast in every shot", "Sound design and final edit"] },
    { id: "01", feat: 1, title: "From lab coat to burnout", kind: "Talking head", who: "Founder reel on mental performance", tags: ["talk", "coach"],
      desc: "A founder tells her own story to camera. I cut it, captioned it and built the b-roll around her words.",
      points: ["Cut for retention", "Captions timed to the voice", "B-roll matched line by line"] },
    { id: "11", feat: 1, title: "Your weekend back", kind: "UGC ad", who: "Cleaning ad for a home-services app", tags: ["ads", "home"],
      desc: "A creator-style ad for a deep-cleaning service, with the booking flow shown on screen.",
      points: ["Presenter-led script", "App screens cut into the story", "Built for Reels and TikTok"] },
    { id: "17", feat: 1, title: "Dubai by the numbers", kind: "Talking head", who: "Dubai real estate", tags: ["talk", "estate"],
      desc: "Market stats from a presenter, with an animated number on every beat.",
      points: ["Presenter-led script", "Animated stat callouts", "Vertical for social"] },
    { id: "18", feat: 1, title: "Glow Up", kind: "3D animation", who: "Hair transplant clinic", tags: ["3d", "med"],
      desc: "A 3D story that follows one patient from the mirror, to the clinic, to a first date.",
      points: ["Story and character bible", "Pixar-style 3D look", "The procedure shown clearly"] },
    { id: "02", feat: 1, title: "Nine out of ten", kind: "Motion graphics", who: "Voice AI product", tags: ["motion", "coach"],
      desc: "A product explainer made entirely from type and interface animation.",
      points: ["Script to screen", "Animated UI and data", "Clean, brand-led design"] },
    { id: "05", feat: 1, title: "Property in Canada", kind: "Talking head", who: "Canadian real estate", tags: ["talk", "estate"],
      desc: "A property explainer to camera, with prices and comparisons animated as she speaks.",
      points: ["Talking-head edit", "On-screen price callouts", "B-roll inserts"] },
    { id: "15", feat: 1, title: "The Cost You Can’t See", kind: "3D animation", who: "Cognyth", tags: ["3d", "coach"],
      desc: "A 3D promo about decision fatigue that ends inside the product’s own assessment.",
      points: ["Two lead characters", "Story-led product reveal", "Edit and sound"] },
    { id: "13", title: "Veneers, explained", kind: "Talking head", who: "Dental clinic", tags: ["talk", "med"],
      desc: "A dentist explains treatment options, with bilingual captions and animated callouts.",
      points: ["Talking-head edit", "Two-language captions", "Animated callouts"] },
    { id: "12", title: "What your mouth is hiding", kind: "AI video", who: "Dental health", tags: ["ads", "med"],
      desc: "A short AI-generated explainer on what causes bad breath.",
      points: ["AI-generated visuals", "Word-by-word captions", "Hook in the first second"] },
    { id: "09", title: "Measured across the city", kind: "AI ad", who: "Toronto ad for a home-services app", tags: ["ads", "home"],
      desc: "A point-of-view ad that runs a tape measure across the city, straight into the app.",
      points: ["Viral-format concept", "AI-generated footage", "Product reveal at the end"] },
    { id: "04", title: "The one-stop shop", kind: "Talking head", who: "Property management", tags: ["talk", "estate"],
      desc: "A talking-head reel with motion graphics that turn each point into a visual.",
      points: ["Storyboard-first edit", "Motion design over the speaker", "Split-screen product moments"] },
    { id: "20", feat: 1, title: "How to get registered", kind: "Talking head", who: "Host reel for a student conference", tags: ["talk"],
      desc: "A presenter walks through how to register, cut with captions and callouts.",
      points: ["Talking-head edit", "Captions and callouts", "Made for Instagram"] },
    { id: "07", title: "Still hasn’t started", kind: "AI video", who: "Cognyth", tags: ["ads", "coach"],
      desc: "A cinematic reel about a task that never gets started, closing on a quiz question.",
      points: ["Script and shot plan", "Realistic AI footage", "Edit and type design"] },
    { id: "06", feat: 1, title: "Registration walkthrough", kind: "Motion graphics", who: "Walkthrough reel for a student conference", tags: ["motion"],
      desc: "A step-by-step registration walkthrough, animated screen by screen.",
      points: ["Screen-by-screen animation", "Clear step numbering", "Made for Instagram"] },
    { id: "03", title: "Paint your wall", kind: "Motion graphics", who: "Event reel", tags: ["motion"],
      desc: "An event reel built from type, texture and a single empty wall.",
      points: ["Concept and copy", "Animated type", "Made for Instagram"] },
  ];
  const RING = [
    { type: "img", src: "media/g1.jpg", title: "Mission: 008", kind: "Birthday poster", desc: "A birthday poster dressed up as a spy film." },
    { type: "img", src: "media/g2.jpg", title: "Take Yours", kind: "Campaign poster", desc: "A point-of-view poster shot from inside the bag." },
    { type: "img", src: "media/g3.jpg", title: "Who Are We?", kind: "Social post", desc: "An intro post staged like an empty set." },
    { type: "img", src: "media/g4.jpg", title: "Coming Soon", kind: "Launch teaser", desc: "The teaser I made for Peelify’s own launch." },
    { type: "vid", id: "03", src: "media/v03.jpg", title: "Paint Your Wall", kind: "Event reel", desc: "An event reel built from type, texture and a single empty wall." },
    { type: "vid", id: "06", src: "media/v06.jpg", title: "Registration Walkthrough", kind: "Motion design", desc: "A step-by-step registration walkthrough, animated screen by screen." },
  ];
  const spark = '<svg viewBox="0 0 60 60"><path d="M6 46l12-8 10 4 12-16 14-12"/></svg>';
  const ROWS = [
    { t: "Talking-head reels", d: "You record on your phone. I cut, caption, animate and score it.", fan: ["v01", "v05", "v17"], filter: "talk" },
    { t: "3D animated videos", d: "Pixar-style characters that carry your story from the first scene to the last.", fan: ["v14", "v18", "v15"], filter: "3d" },
    { t: "AI & UGC ads", d: "Product ads made shot by shot. No crew, no location, ready for Meta and TikTok.", fan: ["v11", "v09", "v12"], filter: "ads" },
    { t: "Instagram & design", d: "Posters, reels and carousels that make a feed look like one brand.", fan: ["g2", "g1", "g4"], go: "#design" },
    { t: "Websites", d: "Fast, animated sites and web apps, built in code.", tiles: ["Cognyth", "AdForge", "Sawari"], go: "#web" },
    { t: "SEO, GEO & AEO", d: "Get found on Google and inside AI answers.", tiles: ["Search", spark, "AI answers"], go: "#gsc" },
  ];

  const FILTERS = [["sel", "Selected"], ["talk", "Talking head"], ["3d", "3D animation"], ["ads", "AI & UGC ads"], ["motion", "Motion graphics"], null, ["estate", "Real estate"], ["med", "Medical"], ["home", "Home services"], ["all", "Everything"]];
  const QUOTES = [
    { q: "Bravo, it’s absolutely outstanding. You really did an excellent job. Well done, and thank you.", n: "Helene G.", c: "YouTube channel" },
    { q: "10/10, very, very good! I really appreciate the sound design and the music. Let’s do the first contract.", n: "Joel T.", c: "2D historical series" },
    { q: "This is very, very impressive. I’m sharing your video with the team.", n: "Zack F.", c: "UGC and brand video" },
    { q: "Love it! Let me post it right away.", n: "Aiza", c: "Bright Kids Planet" },
    { q: "The videos are great. Already thinking about the next one.", n: "Anna R.", c: "Recurring content client" },
  ];
  const BONUS = { type: "vid", id: "10", title: "Bonus reel unlocked", kind: "Hidden reel", who: "You found it", desc: "A brain that won’t stop talking. One from the experiments folder.", points: [], tags: [] };

  /* ---------- preferences ---------- */
  const store = { get(k, d) { try { return localStorage.getItem("peelify:" + k) || d; } catch { return d; } }, set(k, v) { try { localStorage.setItem("peelify:" + k, v); } catch {} } };
  let soundOn = false;
  function seg(id, key, def, apply, allowed) {
    const box = $(id);
    let cur = key ? store.get(key, def) : def;
    if (allowed && !allowed.includes(cur)) cur = def;
    const set = (v, save) => { $$("button", box).forEach((b) => { const on = b.dataset.v === v; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); }); apply(v); if (save && key) store.set(key, v); };
    box.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { set(b.dataset.v, true); tap(); } });
    set(cur, false);
  }
  seg("#theme-seg", "theme", "cream", (v) => { root.dataset.theme = v; }, ["cream", "black", "wine"]);
  seg("#bg-seg", "bg", "glow", (v) => { root.dataset.bg = v; }, ["plain", "glow", "shards"]);
  seg("#snd-seg", "sound", "off", (v) => { soundOn = v === "on"; }, ["off", "on"]);

  /* ---------- soft tap sound (off by default) ---------- */
  let actx = null;
  function tap(freq = 520) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = "sine"; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.09);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.13);
    } catch {}
  }

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  function go(target) {
    const node = typeof target === "string" ? $(target) : target;
    if (!node) return;
    if (lenis) lenis.scrollTo(node, { offset: node.id === "home" ? 0 : -76, duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else node.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    closeMenu();
    go(a.getAttribute("href"));
    tap();
  });
  $$("[data-wa]").forEach((a) => { a.href = WA + encodeURIComponent(a.dataset.wa); });

  /* ---------- ticker, rows ---------- */
  const tick = ["Talking head", "made to be watched", "3D animation", "no film crew", "AI & UGC ads", "one person", "Real estate", "start to finish", "Medical", "not an agency", "Home services", "every format"];
  $("#ticker").innerHTML = [...tick, ...tick].map((t) => `<span>${t}</span>`).join("");
  const tools = ["Veo", "Kling", "Seedance", "Higgsfield", "Midjourney", "Nano Banana", "ElevenLabs", "HeyGen", "After Effects", "Premiere Pro", "CapCut", "React"];
  $("#tools").innerHTML = [...tools, ...tools].map((t) => `<span>${t}</span>`).join("");

  const arrow = '<svg viewBox="0 0 24 24"><path d="M6 18L18 6M8 6h10v10"/></svg>';
  const rowsBox = $("#rows");
  ROWS.forEach((r, i) => {
    const fan = r.fan ? r.fan.map((f) => `<span><img src="media/${f}.jpg" alt="" loading="lazy"></span>`).join("") : r.tiles.map((t, k) => `<span class="tile ${"abc"[k]}">${t}</span>`).join("");
    const b = el("button", "rowi", `<span class="n">0${i + 1}</span><b>${r.t}</b><p>${r.d}</p><span class="fan" aria-hidden="true">${fan}</span>${arrow}`);
    b.dataset.rise = "";
    b.addEventListener("click", () => { tap(); if (r.filter) { setFilter(r.filter); go("#work"); } else go(r.go); });
    rowsBox.append(b);
  });

  /* ---------- player ---------- */
  const player = $("#player");
  let pList = [], pIdx = 0;
  function fillPlayer() {
    const it = pList[pIdx], m = $("#p-media");
    m.className = "p-media" + (it.type === "img" ? " img" : "");
    m.replaceChildren();
    if (it.type === "vid") {
      const v = el("video"); v.src = `media/v${it.id}.mp4`; v.poster = `media/v${it.id}.jpg`; v.controls = true; v.playsInline = true; v.autoplay = true; v.loop = true;
      m.append(v); v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
    } else { const im = el("img"); im.src = it.src; im.alt = it.title; m.append(im); }
    $("#p-n").textContent = `${it.kind}, ${pIdx + 1} of ${pList.length}`;
    $("#p-title").textContent = it.title;
    $("#p-desc").textContent = [it.who && it.who !== it.kind ? it.who + "." : "", it.desc || ""].join(" ").trim();
    $("#p-points").replaceChildren(...(it.points || []).map((p) => el("li", "", p)));
    $("#p-tags").replaceChildren(...(it.tags || []).map((t) => el("span", "", t)));
    $("#p-cta").href = WA + encodeURIComponent(`Hi Umar, I saw "${it.title}" in your portfolio and I'd like something similar.`);
    $("#p-next").hidden = pList.length < 2;
    if (!reduce) gsap.fromTo([m, ...$(".p-info").children], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05 });
  }
  function openPlayer(items, i) {
    pList = items; pIdx = i;
    player.hidden = false;
    player.scrollTop = 0;
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    $$(".hero video, .rail video").forEach((v) => v.pause());
    gsap.fromTo(player, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    fillPlayer();
    $("#p-x").focus();
  }
  function closePlayer() {
    if (player.hidden) return;
    $$("video", player).forEach((v) => v.pause());
    gsap.to(player, { opacity: 0, duration: 0.25, onComplete: () => { player.hidden = true; $("#p-media").replaceChildren(); heroVideos(); railVideo(); } });
    document.body.style.overflow = "";
    if (lenis) lenis.start();
  }
  $("#p-x").addEventListener("click", closePlayer);
  $("#p-next").addEventListener("click", () => { tap(); pIdx = (pIdx + 1) % pList.length; player.scrollTop = 0; fillPlayer(); });
  player.addEventListener("click", (e) => { if (e.target === player) closePlayer(); });
  $("#bonus").addEventListener("click", () => { tap(880); openPlayer([BONUS], 0); });

  /* ---------- reel rail: convex arc, drag with inertia, the front card plays ---------- */
  const rail = $("#rail"), filtersBox = $("#filters"), rs = { pos: 0 };
  let list = [], cards = [], railActive = -1, railVisible = false;
  const asItem = (w) => ({ type: "vid", id: w.id, title: w.title, kind: w.kind, who: w.who, desc: w.desc, points: w.points, tags: w.tags.map((t) => TAGS[t]) });
  FILTERS.forEach((f) => {
    if (!f) { filtersBox.append(el("i", "sep")); return; }
    const b = el("button", "chip", f[1]);
    b.dataset.f = f[0];
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => { tap(600); setFilter(f[0]); });
    filtersBox.append(b);
  });
  function railGeo() {
    const w = cards[0] ? cards[0].offsetWidth : 260, R = small() ? 520 : 900, gap = small() ? 12 : 20;
    return { R, step: (2 * Math.asin((w + gap) / (2 * R)) * 180) / Math.PI };
  }
  function railRender() {
    if (!cards.length) return;
    const { R, step } = railGeo();
    cards.forEach((c, i) => {
      const d = i - rs.pos, a = Math.abs(d);
      if (a > 5) { c.style.visibility = "hidden"; return; }
      c.style.visibility = "visible";
      c.style.transform = `translateZ(${-R}px) rotateY(${d * step}deg) translateZ(${R}px) scale(${1 + (1 - Math.min(a, 1)) * 0.05})`;
      c.style.zIndex = String(100 - Math.round(a * 10));
      c.style.opacity = String(clamp(1 - (a - 3.4) / 1.2, 0, 1));
      c.style.filter = a < 0.05 ? "none" : `brightness(${1 - Math.min(a, 3) * 0.15})`;
    });
    const act = clamp(Math.round(rs.pos), 0, list.length - 1);
    if (act !== railActive) {
      railActive = act;
      const w = list[act];
      $("#rail-title").textContent = w.title;
      $("#rail-who").textContent = `${w.kind}. ${w.who}`;
      $("#rail-bar").style.transform = `scaleX(${(act + 1) / list.length})`;
      $("#rail-prev").disabled = act === 0; $("#rail-next").disabled = act === list.length - 1;
      railVideo();
    }
  }
  function railVideo() {
    cards.forEach((c, i) => {
      let v = $("video", c);
      if (i === railActive && railVisible && player.hidden && !reduce) {
        if (!v) { v = el("video"); v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto"; v.src = `media/v${list[i].id}.mp4`; c.insertBefore(v, c.children[1]); }
        v.play().then(() => c.classList.add("playing")).catch(() => {});
      } else if (v) { v.pause(); c.classList.remove("playing"); }
    });
  }
  function railTo(i, dur = 0.9) {
    gsap.to(rs, { pos: clamp(i, 0, list.length - 1), duration: dur, ease: "power3.out", onUpdate: railRender, overwrite: true });
  }
  function setFilter(f) {
    $$(".chip", filtersBox).forEach((c) => { const on = c.dataset.f === f; c.classList.toggle("on", on); c.setAttribute("aria-selected", on); });
    list = f === "sel" ? WORK.filter((w) => w.feat) : f === "all" ? WORK : WORK.filter((w) => w.tags.includes(f));
    cards = list.map((w, i) => {
      const c = el("div", "card", `<img src="media/v${w.id}.jpg" alt="" draggable="false"><div class="c-top"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="k label">${w.kind}</span></div><div class="c-bot"><b>${w.title}</b><span class="label">${w.who}</span></div>`);
      c.dataset.cur = "play";
      return c;
    });
    rail.replaceChildren(...cards);
    railActive = -1;
    gsap.killTweensOf(rs);
    const start = Math.min(1, list.length - 1);
    if (reduce) { rs.pos = start; railRender(); }
    else { rs.pos = start + 2.4; railRender(); gsap.to(rs, { pos: start, duration: 1.3, ease: "expo.out", onUpdate: railRender }); gsap.fromTo(cards, { y: 60 }, { y: 0, duration: 1, ease: "expo.out", stagger: 0.04 }); }
  }
  {
    let down = null;
    rail.addEventListener("pointerdown", (e) => { down = { x: e.clientX, pos: rs.pos, moved: 0, t: performance.now(), lastX: e.clientX, v: 0 }; rail.classList.add("grab"); gsap.killTweensOf(rs); });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const w = (cards[0]?.offsetWidth || 260) + 20, now = performance.now();
      down.moved = Math.max(down.moved, Math.abs(e.clientX - down.x));
      down.v = (e.clientX - down.lastX) / Math.max(1, now - down.t); down.lastX = e.clientX; down.t = now;
      rs.pos = clamp(down.pos - (e.clientX - down.x) / w, -0.4, list.length - 0.6);
      railRender();
    }, { passive: true });
    const up = (e) => {
      if (!down) return;
      const d = down; down = null; rail.classList.remove("grab");
      if (d.moved < 7) {
        const i = cards.indexOf(e.target.closest?.(".card"));
        if (i === railActive) { tap(440); openPlayer(list.map(asItem), i); }
        else if (i >= 0) { tap(); railTo(i); }
        else railTo(Math.round(rs.pos));
        return;
      }
      railTo(Math.round(rs.pos - d.v * 1.1));
    };
    addEventListener("pointerup", up); addEventListener("pointercancel", up);
    let wheelT = 0;
    rail.addEventListener("wheel", (e) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY) || Math.abs(dx) < 1) return;
      e.preventDefault(); e.stopPropagation();
      gsap.killTweensOf(rs);
      rs.pos = clamp(rs.pos + dx / ((cards[0]?.offsetWidth || 260) * 1.25), -0.3, list.length - 0.7);
      railRender();
      clearTimeout(wheelT); wheelT = setTimeout(() => railTo(Math.round(rs.pos), 0.6), 130);
    }, { passive: false });
    $("#rail-prev").addEventListener("click", () => { tap(); railTo(railActive - 1); });
    $("#rail-next").addEventListener("click", () => { tap(); railTo(railActive + 1); });
    rail.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") railTo(railActive - 1); if (e.key === "ArrowRight") railTo(railActive + 1); if (e.key === "Enter") openPlayer(list.map(asItem), railActive); });
    ScrollTrigger.create({ trigger: rail, start: "top 80%", end: "bottom 20%", onToggle: (st) => { railVisible = st.isActive; railVideo(); } });
    addEventListener("resize", railRender);
  }

  /* ---------- design ring: tilted, two tiers, always turning ---------- */
  {
    const ring = $("#ring"), spin = $("#spin"), N = RING.length, slots = [];
    RING.forEach((it, k) => {
      const c = el("div", "rc"), im = el("img");
      im.src = it.src; im.alt = ""; im.draggable = false; c.append(im);
      c.dataset.k = k;
      spin.append(c);
      slots.push({ c, k, tier: 0, base: (360 / N) * k });
    });
    let angle = 0, vel = 0, front = -1, visible = false, typing = 0;
    const BASE = reduce ? 0 : 9;
    function layout() {
      const cw = slots[0].c.offsetWidth, ch = slots[0].c.offsetHeight, r = cw / (2 * Math.tan(Math.PI / N)) + cw * 0.16;
      slots.forEach((s) => { s.c.style.transform = `rotateY(${s.base}deg) translateZ(${r}px)`; });
    }
    function title(k) {
      const node = $("#ring-title"), text = `${RING[k].title}, ${RING[k].kind.toLowerCase()}`;
      clearInterval(typing);
      if (reduce) { node.textContent = text; return; }
      let n = 0; node.textContent = "";
      typing = setInterval(() => { n += 1; node.textContent = text.slice(0, n); if (n >= text.length) clearInterval(typing); }, 26);
    }
    let last = performance.now();
    gsap.ticker.add(() => {
      const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible) return;
      vel += (BASE - vel) * Math.min(1, dt * 1.6);
      if (!drag) angle += vel * dt;
      spin.style.transform = `rotateY(${angle}deg)`;
      let best = -1, bestCos = -2;
      slots.forEach((s) => {
        const cos = Math.cos(((s.base + angle) * Math.PI) / 180);
        s.c.style.filter = `brightness(${(0.42 + 0.58 * Math.max(0, cos)).toFixed(2)})`;
        if (!s.tier && cos > bestCos) { bestCos = cos; best = s.k; }
      });
      if (best !== front) { front = best; title(best); }
    });
    let drag = null;
    ring.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, a: angle, moved: 0, lastX: e.clientX, t: performance.now(), v: 0 }; ring.classList.add("grab"); });
    addEventListener("pointermove", (e) => {
      if (!drag) return;
      const now = performance.now();
      drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.x));
      drag.v = ((e.clientX - drag.lastX) / Math.max(1, now - drag.t)) * 1000 * 0.32; drag.lastX = e.clientX; drag.t = now;
      angle = drag.a + (e.clientX - drag.x) * 0.32;
    }, { passive: true });
    const up = (e) => {
      if (!drag) return;
      const d = drag; drag = null; ring.classList.remove("grab");
      if (d.moved < 7) {
        const c = e.target.closest?.(".rc");
        if (c) { tap(440); openPlayer(RING.map((x) => ({ ...x, who: "", points: [], tags: [] })), Number(c.dataset.k)); }
        return;
      }
      vel = clamp(d.v, -260, 260);
    };
    addEventListener("pointerup", up); addEventListener("pointercancel", up);
    ring.addEventListener("wheel", (e) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY) || Math.abs(dx) < 1) return;
      e.preventDefault(); e.stopPropagation();
      angle -= dx * 0.22; vel = clamp(-dx * 3, -200, 200);
    }, { passive: false });
    ScrollTrigger.create({ trigger: ring, start: "top bottom", end: "bottom top", onToggle: (st) => { visible = st.isActive; } });
    addEventListener("resize", layout);
    layout();
    if (!reduce) gsap.from(".ring-tilt", { scale: 0.6, opacity: 0, rotationX: -40, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ring, start: "top 80%" } });
  }

  /* ---------- hero: phone rotates into a cinema ---------- */
  const phone = $("#phone"), tilt = $(".tilt"), stage = $(".stage");
  const reelV = $(".layA video"), loops = $$(".layB video");
  let heroP = 0;
  function heroVideos() {
    if (!player.hidden) return;
    const inHero = scrollY < $("#hero").offsetHeight;
    if (inHero && heroP < 0.5) reelV.play().catch(() => {}); else reelV.pause();
    loops.forEach((v) => { if (inHero && heroP > 0.28) v.play().catch(() => {}); else v.pause(); });
  }
  if (!reduce) {
    const S = () => Math.min((innerWidth * (small() ? 0.92 : 0.8)) / phone.offsetHeight, (innerHeight * 0.56) / phone.offsetWidth);
    const DY = () => stage.offsetHeight / 2 - (tilt.offsetTop + tilt.offsetHeight / 2) - (small() ? 30 : 24);
    gsap.set(tilt, { transformPerspective: 1300 });
    gsap.timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true, onUpdate: (st) => { heroP = st.progress; heroVideos(); } } })
      .to(".hero-copy", { opacity: 0, y: -24, duration: 0.12 }, 0.04)
      .to(".w-l", { xPercent: -70, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.08)
      .to(".w-r", { xPercent: 70, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.08)
      .to(phone, { rotation: -90, scale: S, y: DY, duration: 0.42, ease: "power2.inOut" }, 0.14)
      .to(".lock", { opacity: 0, duration: 0.1 }, 0.14)
      .to(".layA", { opacity: 0, duration: 0.16 }, 0.26)
      .to(".layB", { opacity: 1, duration: 0.18 }, 0.3)
      .to(".cine-cap", { autoAlpha: 1, duration: 0.1 }, 0.58)
      .to({}, { duration: 0.24 });
    if (fine) {
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3" }), ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3" });
      stage.addEventListener("pointermove", (e) => {
        const k = 1 - clamp(heroP * 6, 0, 1);
        ry(((e.clientX / innerWidth) - 0.5) * 22 * k); rx(-((e.clientY / innerHeight) - 0.5) * 14 * k);
      }, { passive: true });
    }
  }

  /* ---------- about: five roles merge into one ---------- */
  if (!reduce) {
    const merge = $("#merge"), roles = $$(".role", merge), one = $(".one", merge);
    const dx = (r) => -r.offsetLeft, dy = (r) => merge.offsetHeight / 2 - (r.offsetTop + r.offsetHeight / 2);
    gsap.timeline({ scrollTrigger: { trigger: merge, start: "top 78%", end: "top 38%", scrub: 0.6, invalidateOnRefresh: true } })
      .to(roles, { x: (i, r) => dx(r), y: (i, r) => dy(r), rotation: 0, scale: 0.7, opacity: 0, ease: "power2.in", stagger: 0.06, duration: 0.6 })
      .fromTo(one, { scale: 0, opacity: 0, yPercent: -50 }, { scale: 1, opacity: 1, yPercent: -50, ease: "back.out(1.6)", duration: 0.4 }, 0.55);
    const pin = $(".portrait-in");
    gsap.fromTo(pin, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".sil:not(.back)", { yPercent: 14, xPercent: -3 }, { yPercent: 0, xPercent: 0, ease: "power2.out", scrollTrigger: { trigger: "#portrait", start: "top 90%", end: "top 35%", scrub: 0.6 } });
    gsap.fromTo(".sil.back", { xPercent: 10, opacity: 0 }, { xPercent: 0, opacity: 0.28, ease: "none", scrollTrigger: { trigger: "#portrait", start: "top 90%", end: "top 35%", scrub: 0.6 } });
    if (fine) $("#portrait").addEventListener("pointermove", (e) => { const r = pin.getBoundingClientRect(); gsap.to(pin, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 16, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 12, transformPerspective: 900, duration: 0.5 }); });
    if (fine) $("#portrait").addEventListener("pointerleave", () => gsap.to(pin, { rotationY: 0, rotationX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" }));
  } else { gsap.set(".one", { scale: 1, opacity: 1, position: "static", yPercent: 0, y: 0 }); }

  /* ---------- reviews ---------- */
  $("#quotes").replaceChildren(...QUOTES.map((q) => {
    const f = el("figure", "quote");
    const p = el("blockquote"); p.style.margin = "0"; p.append(el("p", "", `“${q.q}”`));
    const foot = el("footer"), who = el("div");
    who.append(el("b", "", q.n), el("span", "", q.c));
    foot.append(el("span", "av", q.n.trim()[0]), who);
    f.append(p, foot);
    return f;
  }));
  if (!reduce) {
    gsap.from(".quote", { y: 70, opacity: 0, rotation: (i) => (i % 2 ? 3 : -3), duration: 1, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: "#quotes", start: "top 84%" } });
    if (fine) $$(".quote").forEach((q) => {
      q.addEventListener("pointermove", (e) => { const r = q.getBoundingClientRect(); gsap.to(q, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8, transformPerspective: 1000, duration: 0.5, ease: "power3.out" }); });
      q.addEventListener("pointerleave", () => gsap.to(q, { rotationY: 0, rotationX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" }));
    });
  }

  /* ---------- reveals ---------- */
  function splitWords(node) {
    const words = node.textContent.trim().split(/\s+/);
    node.setAttribute("aria-label", node.textContent.trim());
    node.replaceChildren(...words.flatMap((w, i) => { const o = el("span", "sw"); o.setAttribute("aria-hidden", "true"); o.append(el("span", "", w)); return i < words.length - 1 ? [o, document.createTextNode(" ")] : [o]; }));
    return $$(".sw > span", node);
  }
  if (!reduce) {
    $$("[data-split]").forEach((h) => gsap.from(splitWords(h), { yPercent: 115, rotation: 4, duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: h, start: "top 90%" } }));
    $$("[data-rise]").forEach((n) => gsap.from(n, { y: 44, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: n, start: "top 92%" } }));
    gsap.to(".mesh", { yPercent: -8, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: true } });
  }

  ScrollTrigger.create({ trigger: "#hero", start: "bottom 80px", end: "max", onToggle: (st) => $(".top").classList.toggle("solid", st.isActive) });
  /* nav state */
  $$(".nav a").forEach((a) => {
    const sec = $(a.getAttribute("href"));
    if (sec) ScrollTrigger.create({ trigger: sec, start: "top 45%", end: "bottom 45%", onToggle: (st) => a.classList.toggle("on", st.isActive) });
  });

  /* ---------- look panel + mobile menu ---------- */
  const look = $("#look"), lookBtn = $("#look-btn"), menu = $("#menu"), menuBtn = $("#menu-btn");
  lookBtn.addEventListener("click", () => { tap(); look.hidden = !look.hidden; lookBtn.setAttribute("aria-expanded", String(!look.hidden)); if (!look.hidden) gsap.fromTo(look, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }); });
  document.addEventListener("click", (e) => { if (!look.hidden && !e.target.closest("#look, #look-btn")) { look.hidden = true; lookBtn.setAttribute("aria-expanded", "false"); } });
  function closeMenu() { if (menu.hidden) return; menu.hidden = true; menuBtn.textContent = "Menu"; menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => {
    tap();
    if (!menu.hidden) return closeMenu();
    menu.hidden = false; menuBtn.textContent = "Close"; menuBtn.setAttribute("aria-expanded", "true");
    gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo($$("a", menu), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05 });
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape") { closePlayer(); closeMenu(); look.hidden = true; } });

  /* ---------- cursor + magnetic buttons ---------- */
  if (fine && !reduce) {
    const cur = $("#cur"), label = $("span", cur);
    const cx = gsap.quickTo(cur, "x", { duration: 0.25, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.25, ease: "power3" });
    addEventListener("pointermove", (e) => {
      cur.classList.toggle("on", !e.target.closest?.(".gsc-chart")); cx(e.clientX); cy(e.clientY);
      const t = e.target, card = t.closest?.(".rail .card"), piece = t.closest?.(".rc");
      const front = card && cards.indexOf(card) === railActive;
      cur.classList.toggle("play", Boolean(card || piece));
      label.textContent = piece ? "OPEN" : front ? "PLAY" : "DRAG";
      cur.classList.toggle("link", !card && !piece && Boolean(t.closest?.("a,button")));
    }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("on"));
    $$(".mag").forEach((b) => {
      b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3.out" }); });
      b.addEventListener("pointerleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" }));
    });
  }

  /* ---------- shards background: facets of the mark that drift and dodge the cursor ---------- */
  {
    const c = $("#dust"), g = c.getContext("2d");
    let W = 0, H = 0, sh = [], mx = -999, my = -999, dpr = 1;
    const size = () => {
      dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr;
      sh = Array.from({ length: Math.round(clamp(W / 46, 10, 30)) }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, s: 26 + Math.random() * 74, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.25, vy: 6 + Math.random() * 16, z: 0.3 + Math.random() * 0.9, skew: 0.35 + Math.random() * 0.5, ox: 0, oy: 0, fill: i % 3 !== 0 }));
    };
    addEventListener("resize", size); size();
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    let last = performance.now();
    (function draw(now) {
      requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (root.dataset.bg !== "shards" || reduce) return;
      const cs = getComputedStyle(root), col = cs.getPropertyValue("--acc").trim(), ink = cs.getPropertyValue("--ink").trim();
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      for (const p of sh) {
        p.y -= p.vy * p.z * dt; p.r += p.vr * dt;
        if (p.y < -120) { p.y = H + 120; p.x = Math.random() * W; }
        const yy = ((p.y - scrollY * 0.12 * p.z) % (H + 240) + H + 240) % (H + 240) - 120;
        const dx = p.x - mx, dy = yy - my, dist = Math.hypot(dx, dy), push = dist < 190 ? (1 - dist / 190) * 70 : 0;
        p.ox += ((dist ? (dx / dist) * push : 0) - p.ox) * Math.min(1, dt * 5); p.oy += ((dist ? (dy / dist) * push : 0) - p.oy) * Math.min(1, dt * 5);
        g.save(); g.translate(p.x + p.ox, yy + p.oy); g.rotate(p.r + p.ox * 0.01); g.transform(1, 0, -p.skew, 1, 0, 0);
        g.globalAlpha = 0.07 + p.z * 0.13;
        g.beginPath(); g.rect(-p.s * 0.35, -p.s * 0.5, p.s * 0.7, p.s);
        if (p.fill) { g.fillStyle = col; g.fill(); } else { g.strokeStyle = ink; g.lineWidth = 1.2; g.stroke(); }
        g.restore();
      }
    })(last);
  }

  /* ---------- start ---------- */
  setFilter("sel");
  const pre = $("#pre");
  const intro = () => {
    if (reduce) { pre.remove(); return; }
    gsap.timeline()
      .to(pre, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: () => pre.remove() })
      .from(".words", { opacity: 0, scale: 1.12, duration: 1.2, ease: "expo.out" }, 0.45)
      .from(tilt, { y: 120, opacity: 0, rotationX: 22, duration: 1.3, ease: "expo.out" }, 0.5)
      .from(".hero-copy > *", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.9)
      .from(".top > *", { y: -30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.7);
  };
  if (reduce) intro();
  else {
    const n = { v: 0 };
    gsap.to(".pre-bar i", { scaleX: 1, duration: 1.1, ease: "power2.inOut" });
    gsap.to(n, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => ($("#pre-n").textContent = String(Math.round(n.v)).padStart(3, "0")), onComplete: intro });
  }
  heroVideos();
  addEventListener("load", () => ScrollTrigger.refresh());
  window.__site = { setFilter, openPlayer, closePlayer, railTo, go, seg, tap, reduce };
})();
