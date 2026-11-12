/* Search report: an interactive demo of the monthly SEO, AEO and GEO report.
   The numbers are generated demo data. To show a real property, replace gen()
   with rows exported from Google Search Console (date, clicks, impressions, ctr, position). */
(() => {
  const box = document.querySelector("#gsc");
  if (!box || !window.__site) return;
  const { seg, tap, reduce } = window.__site;
  const $ = (s, r = box) => r.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const NS = "http://www.w3.org/2000/svg";
  const DAYS = 760, DAY = 864e5, today = new Date(); today.setHours(0, 0, 0, 0);

  /* ---- demo data ---- */
  function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function gen() {
    const r = rng(20261111), out = { seo: [], aeo: [], geo: [] };
    for (let i = 0; i < DAYS; i++) {
      const p = i / (DAYS - 1), date = new Date(today - (DAYS - 1 - i) * DAY), dow = date.getDay();
      const week = dow === 0 || dow === 6 ? 0.74 : 1, wob = 1 + Math.sin(i / 23) * 0.07, n = () => 0.86 + r() * 0.28;
      const grow = 0.18 + 0.82 * Math.pow(p, 1.7);
      const ctr = (0.021 + 0.014 * p) * (0.92 + r() * 0.16);
      const clicks = Math.round(236 * grow * week * wob * n());
      out.seo.push({ clicks, impressions: Math.round(clicks / ctr), ctr: ctr * 100, position: Math.max(4.2, 21.5 - 13.4 * Math.pow(p, 0.8) + (r() - 0.5) * 1.3) });
      const views = Math.round(1480 * Math.pow(p, 2) * week * n() + 40 * n());
      out.aeo.push({ boxes: Math.round(1 + 19 * Math.pow(p, 1.4) + (r() - 0.5) * 1.2), asked: Math.round(4 + 58 * Math.pow(p, 1.5) * n()), views, rate: (3.1 + 4.2 * p) * (0.9 + r() * 0.2) });
      const start = Math.max(0, (p - 0.22) / 0.78);
      out.geo.push({ mentions: Math.round(15 * Math.pow(start, 1.3) * wob * n() + (start > 0 ? r() * 1.4 : 0)), cited: Math.round(24 * Math.pow(start, 1.2)), share: Math.max(0, 22 * Math.pow(start, 1.25) + (r() - 0.5) * 1.1), prompts: Math.round(26 * Math.pow(start, 1.1) + (start > 0 ? r() : 0)) });
    }
    return out;
  }
  const DATA = gen();
  const int = (v) => Math.round(v).toLocaleString("en-US"), pct = (v) => v.toFixed(1) + "%", dec = (v) => v.toFixed(1);
  const CH = {
    seo: { name: "SEO", src: "Google Search Console", m: [
      { k: "clicks", l: "Clicks", a: "sum", f: int }, { k: "impressions", l: "Impressions", a: "sum", f: int },
      { k: "ctr", l: "CTR", a: "avg", f: pct }, { k: "position", l: "Average position", a: "avg", f: dec, down: true }] },
    aeo: { name: "AEO", src: "Answer boxes and People also ask", m: [
      { k: "boxes", l: "Answer boxes held", a: "last", f: int }, { k: "asked", l: "Also-asked spots", a: "avg", f: int },
      { k: "views", l: "Answer views", a: "sum", f: int }, { k: "rate", l: "Answer click rate", a: "avg", f: pct }] },
    geo: { name: "GEO", src: "ChatGPT, Gemini and Perplexity answers", m: [
      { k: "mentions", l: "AI mentions", a: "sum", f: int }, { k: "cited", l: "Pages cited", a: "last", f: int },
      { k: "share", l: "Share of answers", a: "avg", f: pct }, { k: "prompts", l: "Prompts won of 50", a: "last", f: int }] },
  };
  const agg = (rows, m) => { if (!rows.length) return 0; const v = rows.map((r) => r[m.k]); return m.a === "sum" ? v.reduce((a, b) => a + b, 0) : m.a === "last" ? v[v.length - 1] : v.reduce((a, b) => a + b, 0) / v.length; };
  const change = (cur, prev, m) => { if (!prev) return null; const c = ((cur - prev) / Math.abs(prev)) * 100; return { c, good: m.down ? c < 0 : c > 0 }; };
  const chg = (x) => (x == null ? "new" : (x.c >= 0 ? "+" : "−") + Math.abs(x.c).toFixed(1) + "%");
  const fmtDate = (d, long) => d.toLocaleDateString("en-US", long ? { month: "short", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" });

  /* ---- state ---- */
  const S = { ch: "seo", range: 30, mi: 0, pin: -1, hover: -1, shown: null };
  function buckets() {
    const size = S.range === 90 ? 7 : S.range === 365 ? 30 : 1, n = S.range === 90 ? 13 : S.range === 365 ? 12 : S.range;
    const rows = DATA[S.ch], span = size * n, end = DAYS, mk = (from) => Array.from({ length: n }, (_, i) => rows.slice(from + i * size, from + (i + 1) * size));
    const cur = mk(end - span), prev = mk(end - 2 * span);
    const dates = cur.map((_, i) => ({ a: new Date(today - (span - 1 - i * size) * DAY), b: new Date(today - (span - (i + 1) * size) * DAY) }));
    return { cur, prev, dates, size };
  }

  /* ---- cards ---- */
  const cardsBox = $("#gsc-cards");
  function cards() {
    const { cur, prev } = buckets(), ms = CH[S.ch].m;
    cardsBox.replaceChildren(...ms.map((m, i) => {
      const c = agg(cur.flat(), m), p = agg(prev.flat(), m), x = change(c, p, m);
      const b = el("button", "mcard" + (i === S.mi ? " on" : ""), `<span class="label">${m.l}</span><b>${m.f(c)}</b><span class="chg ${x && !x.good ? "down" : "up"}">${chg(x)}</span><span class="vs">vs previous ${S.range === 365 ? "12 months" : S.range === 90 ? "3 months" : S.range + " days"}</span>`);
      b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === S.mi);
      b.addEventListener("click", () => { tap(600); S.mi = i; S.pin = -1; cards(); chart(true); });
      if (!reduce) { const num = b.querySelector("b"), o = { v: p }; gsap.to(o, { v: c, duration: 0.8, ease: "power2.out", onUpdate: () => (num.textContent = m.f(o.v)) }); }
      return b;
    }));
  }

  /* ---- chart ---- */
  const wrap = $("#gsc-chart"), svg = $("svg", wrap), tip = $("#gsc-tip"), detail = $("#gsc-detail");
  let geo = null, tween = null;
  const mk = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
  function chart(morph) {
    const { cur, prev, dates } = buckets(), m = CH[S.ch].m[S.mi];
    const v = cur.map((r) => agg(r, m)), pv = prev.map((r) => agg(r, m)), n = v.length;
    const W = wrap.clientWidth, H = svg.clientHeight || 280, L = 46, R = 14, T = 14, B = 28;
    const max = Math.max(...v, ...pv) * 1.12 || 1, min = m.down ? Math.min(...v, ...pv) * 0.86 : 0;
    const x = (i) => L + (i * (W - L - R)) / Math.max(1, n - 1);
    const y = (val) => { const t = (val - min) / (max - min || 1); return m.down ? T + t * (H - T - B) : H - B - t * (H - T - B); };
    geo = { v, pv, n, x, y, W, H, L, R, T, B, m, dates, cur };
    if (S.pin < 0 || S.pin >= n) S.pin = n - 1;
    const from = morph && S.shown && S.shown.v.length === n ? S.shown : null;
    if (tween) tween.kill();
    const paint = (vv, pp) => {
      svg.replaceChildren();
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      for (let g = 0; g <= 4; g++) {
        const val = min + ((max - min) * g) / 4, yy = y(val);
        svg.append(mk("line", { class: "gl", x1: L, x2: W - R, y1: yy, y2: yy }));
        const t = mk("text", { class: "ax", x: L - 8, y: yy + 4, "text-anchor": "end" }); t.textContent = m.f(val).replace(/\.0%$/, "%"); svg.append(t);
      }
      [0, Math.floor((n - 1) / 2), n - 1].forEach((i, k) => { const t = mk("text", { class: "ax", x: x(i), y: H - 6, "text-anchor": k === 0 ? "start" : k === 2 ? "end" : "middle" }); t.textContent = fmtDate(dates[i].b); svg.append(t); });
      const pts = vv.map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`);
      const base = m.down ? T : H - B;
      svg.append(mk("polygon", { class: "fill", points: `${x(0)},${base} ${pts.join(" ")} ${x(n - 1)},${base}` }));
      svg.append(mk("polyline", { class: "prev", points: pp.map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`).join(" ") }));
      const mx = (n - 1) / 2, my = vv.reduce((a, b) => a + b, 0) / n; let num = 0, den = 0;
      vv.forEach((val, i) => { num += (i - mx) * (val - my); den += (i - mx) ** 2; });
      const slope = den ? num / den : 0, i0 = my - slope * mx;
      svg.append(mk("line", { class: "trend", x1: x(0), y1: y(i0), x2: x(n - 1), y2: y(i0 + slope * (n - 1)) }));
      svg.append(mk("polyline", { class: "now", points: pts.join(" "), pathLength: 1 }));
      const cross = mk("line", { class: "cross", x1: 0, x2: 0, y1: T, y2: H - B, visibility: "hidden" }); svg.append(cross);
      vv.forEach((val, i) => svg.append(mk("circle", { class: "dot" + (i === S.pin ? " pin" : ""), cx: x(i), cy: y(val), r: i === S.pin ? 6 : i === S.hover ? 6 : n > 31 ? 0 : n > 14 ? 2.6 : 4 })));
      geo.cross = cross;
    };
    if (from && !reduce) {
      const o = { t: 0 }, a = from.v, ap = from.pv;
      tween = gsap.to(o, { t: 1, duration: 0.7, ease: "power3.inOut", onUpdate: () => paint(v.map((val, i) => a[i] + (val - a[i]) * o.t), pv.map((val, i) => ap[i] + (val - ap[i]) * o.t)), onComplete: () => paint(v, pv) });
    } else {
      paint(v, pv);
      if (!reduce) {
        const line = $(".now", svg);
        gsap.fromTo(line, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", onComplete: () => line.removeAttribute("stroke-dasharray") });
        gsap.fromTo($(".fill", svg), { opacity: 0 }, { opacity: 0.1, duration: 0.8, delay: 0.4 });
        gsap.fromTo(svg.querySelectorAll(".dot"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.012, delay: 0.5 });
      }
    }
    S.shown = { v, pv };
    insight();
  }
  const label = (i) => { const d = geo.dates[i]; return geo.cur[i].length > 1 ? `${fmtDate(d.a)} to ${fmtDate(d.b, true)}` : fmtDate(d.b, true); };
  function insight() {
    const i = S.pin, g = geo, m = g.m, val = g.v[i];
    const step = i > 0 ? change(val, g.v[i - 1], m) : null, per = change(val, g.pv[i], m);
    const word = (x) => (x == null ? "" : x.c >= 0 ? "up" : "down");
    const line = [step ? `${m.l} ${word(step)} ${Math.abs(step.c).toFixed(1)}% on the point before` : `${m.l} at the start of the range`, per ? `${word(per)} ${Math.abs(per.c).toFixed(1)}% on the same point last period` : ""].filter(Boolean).join(", ") + ".";
    detail.replaceChildren(el("p", "", `<b>${label(i)}</b>${line}`), ...CH[S.ch].m.map((mm) => el("div", "", `<span>${mm.l}</span><b>${mm.f(agg(g.cur[i], mm))}</b>`)));
    if (!reduce) gsap.fromTo(detail.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power3.out" });
  }
  function nearest(e) {
    const r = wrap.getBoundingClientRect(), px = e.clientX - r.left, g = geo;
    return Math.max(0, Math.min(g.n - 1, Math.round(((px - g.L) / (g.W - g.L - g.R)) * (g.n - 1))));
  }
  function hover(i) {
    const g = geo; if (!g) return;
    S.hover = i;
    const dots = svg.querySelectorAll(".dot");
    dots.forEach((d, k) => d.setAttribute("r", k === S.pin || k === i ? 6 : g.n > 31 ? 0 : g.n > 14 ? 2.6 : 4));
    if (i < 0) { tip.hidden = true; g.cross.setAttribute("visibility", "hidden"); return; }
    const m = g.m, val = g.v[i], step = i > 0 ? change(val, g.v[i - 1], m) : null, per = change(val, g.pv[i], m);
    g.cross.setAttribute("x1", g.x(i)); g.cross.setAttribute("x2", g.x(i)); g.cross.setAttribute("visibility", "visible");
    tip.innerHTML = `<span>${label(i)}</span><b>${m.f(val)} ${m.l.toLowerCase()}</b><span>${step ? chg(step) + " vs point before" : "Start of range"}</span><span>${chg(per)} vs last period</span>`;
    tip.hidden = false;
    const tw = tip.offsetWidth, tx = Math.max(0, Math.min(g.W - tw, g.x(i) - tw / 2)), ty = Math.max(0, g.y(val) - tip.offsetHeight - 16);
    tip.style.transform = `translate(${tx}px,${ty}px)`;
  }
  wrap.addEventListener("pointermove", (e) => hover(nearest(e)));
  wrap.addEventListener("pointerleave", () => hover(-1));
  wrap.addEventListener("click", (e) => { S.pin = nearest(e); tap(700); hover(S.pin); insight(); });

  /* ---- controls ---- */
  let ready = false;
  seg("#gsc-chan", null, "seo", (v) => { S.ch = v; S.mi = 0; S.pin = -1; S.shown = null; if (ready) { cards(); chart(false); } });
  seg("#gsc-range", null, "30", (v) => { S.range = Number(v); S.pin = -1; if (ready) { cards(); chart(false); } });
  const start = () => { if (ready) return; ready = true; cards(); chart(false); };
  if (reduce || !("IntersectionObserver" in window)) start();
  else { const io = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { start(); io.disconnect(); } }, { threshold: 0.2 }); io.observe(wrap); }
  let rt = 0;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (ready) { S.shown = null; const keep = S.pin; chart(false); S.pin = keep; } }, 150); });
})();
