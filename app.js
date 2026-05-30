// ============================================================
// app.js – AllThingsFootie.co.uk  |  Core Application Logic
// ============================================================
// Architecture: vanilla JS, localStorage, no external deps
// ============================================================

(function () {
  "use strict";

  // ── STATE ─────────────────────────────────────────────────
  const state = {
    user: null,
    theme: "dark",
    newsPage: 1,
    newsPerPage: 5,
    activeNewsTab: "all",
    savedPosts: [],
    notifications: []
  };

  // ── UTILS ─────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function timeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  function toast(msg, type = "success") {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.className = `toast toast-${type} show`;
    setTimeout(() => t.classList.remove("show"), 3000);
  }

  function openModal(id) {
    const m = $(`#${id}`);
    if (m) { m.classList.add("open"); document.body.classList.add("modal-open"); }
  }

  function closeModal(id) {
    const m = $(`#${id}`);
    if (m) { m.classList.remove("open"); document.body.classList.remove("modal-open"); }
  }

  function saveToStorage(key, val) {
    try { localStorage.setItem(`atf_${key}`, JSON.stringify(val)); } catch (e) {}
  }

  function loadFromStorage(key, fallback = null) {
    try {
      const v = localStorage.getItem(`atf_${key}`);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }

  function confidenceColor(pct) {
    if (pct >= 85) return "#00e676";
    if (pct >= 65) return "#ffd600";
    return "#ff5252";
  }

  function clubColor(clubId) {
    const club = ATF_DATA.clubs.find(c => c.id === clubId);
    return club ? club.color : "#888";
  }

  // ── INIT ──────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    loadUserFromStorage();
    loadTheme();
    setHeaderDate();
    buildClubsDropdown();
    buildTicker();
    buildStatsBar();
    buildHero();
    buildNewsFeed();
    buildLeagueTable();
    buildTransferWidget();
    buildSidebarForumList();
    buildPoll();
    buildMatchCentre();
    buildClubsGrid();
    buildForumPreview();
    buildFanContent();
    buildWriters();
    buildLeaderboard();
    bindGlobalEvents();
    populateClubSelects();
    updateUserUI();
    animateEntrance();
  }

  // ── DATE ──────────────────────────────────────────────────
  function setHeaderDate() {
    const el = $("#headerDate");
    if (!el) return;
    el.textContent = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  // ── THEME ─────────────────────────────────────────────────
  function loadTheme() {
    const saved = loadFromStorage("theme", "dark");
    state.theme = saved;
    document.body.className = document.body.className.replace(/theme-\w+/, `theme-${saved}`);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = saved === "dark" ? "☀️" : "🌙";
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.body.className = document.body.className.replace(/theme-\w+/, `theme-${state.theme}`);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = state.theme === "dark" ? "☀️" : "🌙";
    saveToStorage("theme", state.theme);
  }

  // ── CLUBS DROPDOWN ────────────────────────────────────────
  function buildClubsDropdown() {
    const dd = $("#clubsDropdown");
    if (!dd) return;
    ATF_DATA.clubs.forEach(club => {
      const a = document.createElement("a");
      a.href = `#club-${club.id}`;
      a.innerHTML = `${club.badge} ${club.name}`;
      dd.appendChild(a);
    });
  }

  function populateClubSelects() {
    $$("select#regFavClub, select#blogClub").forEach(sel => {
      ATF_DATA.clubs.forEach(club => {
        const opt = document.createElement("option");
        opt.value = club.id;
        opt.textContent = club.name;
        sel.appendChild(opt);
      });
    });
  }

  // ── TICKER ────────────────────────────────────────────────
  function buildTicker() {
    const track = $("#tickerTrack");
    if (!track) return;
    const txt = ATF_DATA.tickerItems[0];
    track.innerHTML = `<span>${txt} &nbsp;&nbsp;&nbsp; ${txt}</span>`;
  }

  // ── STATS BAR ─────────────────────────────────────────────
  function buildStatsBar() {
    const bar = $("#statsBar");
    if (!bar) return;
    const top = ATF_DATA.topScorers[0];
    const table = ATF_DATA.leagueTable;
    const items = [
      { label: "League Leaders", value: table[0].team, sub: `${table[0].pts} pts` },
      { label: "Top Scorer", value: top.name, sub: `${top.goals} goals` },
      { label: "Transfers Completed", value: "47", sub: "this window" },
      { label: "Community Members", value: "68,420", sub: "and growing" },
      { label: "Forum Posts Today", value: "1,284", sub: "active threads" }
    ];
    items.forEach(item => {
      const div = el("div", "stats-bar-item", `<span class="stats-label">${item.label}</span><span class="stats-value">${item.value}</span><span class="stats-sub">${item.sub}</span>`);
      bar.appendChild(div);
    });
  }

  // ── HERO ──────────────────────────────────────────────────
  function buildHero() {
    const main = $("#heroMain");
    const side = $("#heroSidebar");
    if (!main || !side) return;
    const featured = ATF_DATA.news.filter(n => n.featured);
    const [hero, ...rest] = featured;
    if (!hero) return;

    main.innerHTML = `
      <div class="hero-img-wrap">
        <img src="${hero.image}" alt="${hero.title}" loading="lazy" />
        <div class="hero-overlay"></div>
        <span class="hero-cat cat-${hero.category}">${hero.category}</span>
      </div>
      <div class="hero-body">
        <h1>${hero.title}</h1>
        <p>${hero.excerpt}</p>
        <div class="hero-meta">
          <span class="author">✍️ ${hero.author}</span>
          <span class="date">📅 ${formatDate(hero.date)}</span>
          <span class="read-time">⏱ ${hero.readTime} min read</span>
        </div>
        <div class="hero-actions">
          <button class="btn-read">Read Story →</button>
          <button class="btn-vote" data-id="${hero.id}">👍 ${hero.votes}</button>
          <button class="btn-save" data-id="${hero.id}">🔖 Save</button>
        </div>
      </div>`;

    rest.slice(0, 3).forEach(story => {
      const card = el("article", "hero-side-card");
      card.innerHTML = `
        <img src="${story.image}" alt="${story.title}" loading="lazy" />
        <div class="side-card-body">
          <span class="cat cat-${story.category}">${story.category}</span>
          <h3>${story.title}</h3>
          <div class="side-meta">
            <span>${story.author}</span>
            <span>${timeAgo(story.date)}</span>
          </div>
        </div>`;
      side.appendChild(card);
    });
  }

  // ── NEWS FEED ─────────────────────────────────────────────
  function buildNewsFeed(tab = "all", reset = false) {
    const feed = $("#newsFeed");
    if (!feed) return;
    if (reset) { feed.innerHTML = ""; state.newsPage = 1; }

    let articles = ATF_DATA.news;
    if (tab !== "all") articles = articles.filter(a => a.category === tab);

    const start = (state.newsPage - 1) * state.newsPerPage;
    const page = articles.slice(start, start + state.newsPerPage);

    page.forEach((article, i) => {
      const card = el("article", `news-card news-card-${i % 3 === 0 ? "large" : "normal"} fade-in`);
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <div class="news-card-img">
          <img src="${article.image}" alt="${article.title}" loading="lazy" />
          <span class="news-cat cat-${article.category}">${article.category}</span>
        </div>
        <div class="news-card-body">
          ${article.club ? `<span class="news-club-tag" style="color:${clubColor(article.club)}">${article.club.toUpperCase()}</span>` : ""}
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <div class="news-meta">
            <span>✍️ ${article.author}</span>
            <span>📅 ${timeAgo(article.date)}</span>
            <span>⏱ ${article.readTime}m</span>
          </div>
          <div class="news-actions">
            <button class="btn-vote-sm" data-id="${article.id}">👍 ${article.votes}</button>
            <button class="btn-save-sm" data-id="${article.id}">🔖</button>
            <button class="btn-share-sm">🔗</button>
          </div>
        </div>`;
      feed.appendChild(card);
    });

    const loadBtn = $("#loadMoreNews");
    if (loadBtn) {
      loadBtn.style.display = (start + state.newsPerPage >= articles.length) ? "none" : "block";
    }
  }

  // ── LEAGUE TABLE ──────────────────────────────────────────
  function buildLeagueTable() {
    const body = $("#leagueTableBody");
    if (!body) return;
    const table = el("table", "league-table-mini");
    table.innerHTML = `<thead><tr><th>#</th><th>Club</th><th>P</th><th>GD</th><th>Pts</th></tr></thead>`;
    const tbody = document.createElement("tbody");
    ATF_DATA.leagueTable.slice(0, 6).forEach(row => {
      const tr = document.createElement("tr");
      const champBorder = row.pos <= 4 ? "ucl" : row.pos === 5 ? "uel" : "";
      tr.className = champBorder;
      tr.innerHTML = `<td class="pos">${row.pos}</td><td class="team-name">${row.team}</td><td>${row.p}</td><td>${row.gd > 0 ? "+" + row.gd : row.gd}</td><td class="pts"><strong>${row.pts}</strong></td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    body.appendChild(table);
    const legend = el("div", "table-legend", `<span class="ucl-dot"></span> UCL &nbsp; <span class="uel-dot"></span> UEL`);
    body.appendChild(legend);
  }

  // ── TRANSFER WIDGET ───────────────────────────────────────
  function buildTransferWidget() {
    const list = $("#transferList");
    if (!list) return;
    ATF_DATA.transfers.slice(0, 5).forEach(t => {
      const item = el("div", "transfer-item");
      item.innerHTML = `
        <div class="transfer-main">
          <span class="transfer-player">${t.player}</span>
          <span class="transfer-clubs">${t.from} → ${t.to}</span>
        </div>
        <div class="transfer-right">
          <span class="transfer-fee">${t.fee}</span>
          <div class="transfer-confidence" title="${t.confidence}% confidence">
            <div class="conf-bar"><div class="conf-fill" style="width:${t.confidence}%;background:${confidenceColor(t.confidence)}"></div></div>
            <span class="conf-label">${t.confidence}%</span>
          </div>
        </div>`;
      list.appendChild(item);
    });
  }

  // ── SIDEBAR FORUM LIST ────────────────────────────────────
  function buildSidebarForumList() {
    const list = $("#sidebarForumList");
    if (!list) return;
    ATF_DATA.forumThreads.filter(t => t.hot).slice(0, 4).forEach(thread => {
      const item = el("div", "sidebar-thread-item");
      item.innerHTML = `
        <div class="thread-meta-mini">💬 ${thread.replies} replies · 👍 ${thread.votes}</div>
        <div class="thread-title-mini">${thread.title}</div>`;
      item.addEventListener("click", () => { window.location.href = "forum.html"; });
      list.appendChild(item);
    });
  }

  // ── POLL ──────────────────────────────────────────────────
  function buildPoll() {
    const wrap = $("#pollWrap");
    if (!wrap) return;
    const poll = ATF_DATA.poll;
    const total = poll.options.reduce((s, o) => s + o.votes, 0);
    const voted = loadFromStorage("poll_voted", false);

    wrap.innerHTML = `<p class="poll-question">${poll.question}</p>`;
    poll.options.forEach((opt, i) => {
      const pct = Math.round((opt.votes / total) * 100);
      const btn = el("div", `poll-option ${voted ? "voted" : ""}`);
      btn.innerHTML = `
        <div class="poll-option-label">
          <span>${opt.label}</span>
          ${voted ? `<span class="poll-pct">${pct}%</span>` : ""}
        </div>
        ${voted ? `<div class="poll-bar"><div class="poll-fill" style="width:${pct}%"></div></div>` : ""}`;
      if (!voted) {
        btn.addEventListener("click", () => {
          ATF_DATA.poll.options[i].votes++;
          saveToStorage("poll_voted", true);
          buildPoll();
          toast("Vote recorded! 🗳️");
        });
      }
      wrap.appendChild(btn);
    });
    wrap.innerHTML += `<p class="poll-total">${total.toLocaleString()} votes</p>`;
  }

  // ── MATCH CENTRE ──────────────────────────────────────────
  function buildMatchCentre(filter = "upcoming") {
    const grid = $("#matchesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const matches = ATF_DATA.fixtures.filter(m =>
      filter === "results" ? m.status === "result" : m.status === "upcoming"
    );
    matches.forEach(match => {
      const card = el("div", `match-card ${match.status}`);
      card.innerHTML = `
        <div class="match-competition">${match.competition}</div>
        <div class="match-teams">
          <span class="match-team home">${match.home}</span>
          <div class="match-score">
            ${match.status === "result"
              ? `<span class="score">${match.homeScore} – ${match.awayScore}</span>`
              : `<span class="kickoff">${match.kickoff}</span>`
            }
          </div>
          <span class="match-team away">${match.away}</span>
        </div>
        <div class="match-actions">
          <button class="btn-predict">🎯 Predict</button>
          <button class="btn-match-thread">💬 Forum</button>
        </div>`;
      grid.appendChild(card);
    });

    const statsRow = $("#matchStatsRow");
    if (statsRow) {
      statsRow.innerHTML = `
        <div class="match-stats-widget">
          <h3>⚡ Top Scorers</h3>
          <div class="scorers-list">
            ${ATF_DATA.topScorers.map((s, i) => `
              <div class="scorer-row">
                <span class="scorer-rank">${i + 1}</span>
                <span class="scorer-name">${s.name}</span>
                <span class="scorer-team">${s.team}</span>
                <span class="scorer-goals">${s.goals} ⚽</span>
              </div>`).join("")}
          </div>
        </div>`;
    }
  }

  // ── CLUBS GRID ────────────────────────────────────────────
  function buildClubsGrid() {
    const grid = $("#clubsGrid");
    if (!grid) return;
    ATF_DATA.clubs.forEach(club => {
      const card = el("div", "club-card");
      card.innerHTML = `
        <div class="club-badge-large" style="background:${club.color}20;border-color:${club.color}40">${club.badge}</div>
        <h3 style="color:${club.color}">${club.name}</h3>
        <p class="club-city">📍 ${club.city}</p>
        <p class="club-members">👥 ${club.members.toLocaleString()} fans</p>
        <button class="btn-join-club" style="border-color:${club.color};color:${club.color}">Join Community →</button>`;
      card.style.setProperty("--club-color", club.color);
      card.addEventListener("click", () => toast(`Welcome to the ${club.name} community! ⚽`));
      grid.appendChild(card);
    });
  }

  // ── FORUM PREVIEW ─────────────────────────────────────────
  function buildForumPreview() {
    const grid = $("#forumPreviewGrid");
    if (!grid) return;
    const hotThreads = ATF_DATA.forumThreads.filter(t => t.hot).slice(0, 6);
    hotThreads.forEach(thread => {
      const card = el("div", "forum-preview-card");
      card.innerHTML = `
        <div class="fp-board">${ATF_DATA.forumBoards.find(b => b.id === thread.board)?.icon || "💬"} ${thread.board}</div>
        <h3>${thread.title}</h3>
        <p>${thread.body.substring(0, 100)}…</p>
        <div class="fp-meta">
          <span>✍️ ${thread.author}</span>
          <span>💬 ${thread.replies}</span>
          <span>👍 ${thread.votes}</span>
          <span>👁️ ${thread.views.toLocaleString()}</span>
        </div>`;
      card.addEventListener("click", () => window.location.href = "forum.html");
      grid.appendChild(card);
    });
  }

  // ── FAN CONTENT ───────────────────────────────────────────
  function buildFanContent() {
    const grid = $("#fanContentGrid");
    if (!grid) return;
    const userBlogs = loadFromStorage("user_blogs", []);
    const allBlogs = [...ATF_DATA.fanBlogs, ...userBlogs];
    allBlogs.slice(0, 6).forEach(blog => {
      const club = blog.club ? ATF_DATA.clubs.find(c => c.id === blog.club) : null;
      const card = el("div", "fan-blog-card");
      card.innerHTML = `
        <div class="blog-card-header" style="${club ? `border-left: 4px solid ${club.color}` : ""}">
          ${club ? `<span class="blog-club-tag" style="color:${club.color}">${club.badge} ${club.name}</span>` : `<span class="blog-club-tag">⚽ General</span>`}
          <span class="blog-date">${timeAgo(blog.date)}</span>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <div class="blog-footer">
          <span>✍️ ${blog.author}</span>
          <span>⏱ ${blog.readTime}m read</span>
          <button class="btn-vote-sm" data-id="${blog.id}">👍 ${blog.votes}</button>
        </div>`;
      grid.appendChild(card);
    });
  }

  // ── WRITERS ───────────────────────────────────────────────
  function buildWriters() {
    const wrap = $("#writersProfiles");
    if (!wrap) return;
    ATF_DATA.studentWriters.forEach(w => {
      const card = el("div", "writer-card");
      card.innerHTML = `
        <div class="writer-avatar">${w.avatar}</div>
        <div class="writer-info">
          <h4>${w.name}</h4>
          <p class="writer-uni">📚 ${w.uni}</p>
          <p class="writer-spec">🎯 ${w.speciality}</p>
          <p class="writer-count">${w.articles} articles</p>
        </div>`;
      wrap.appendChild(card);
    });
  }

  // ── LEADERBOARD ───────────────────────────────────────────
  function buildLeaderboard() {
    const grid = $("#leaderboardGrid");
    if (!grid) return;
    const week = $("#weekLabel");
    if (week) week.textContent = `Week of ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`;

    ATF_DATA.leaderboard.forEach(entry => {
      const club = ATF_DATA.clubs.find(c => c.id === entry.club);
      const card = el("div", `leaderboard-card rank-${entry.rank <= 3 ? entry.rank : "other"}`);
      card.innerHTML = `
        <div class="lb-rank">${entry.badge || entry.rank}</div>
        <div class="lb-info">
          <div class="lb-name">${entry.name}</div>
          <div class="lb-club" style="color:${club ? club.color : "#888"}">${club ? club.badge + " " + club.name : ""}</div>
        </div>
        <div class="lb-stats">
          <div class="lb-xp">${entry.xp.toLocaleString()} XP</div>
          <div class="lb-posts">${entry.posts} posts</div>
        </div>`;
      grid.appendChild(card);
    });
  }

  // ── ANIMATIONS ────────────────────────────────────────────
  function animateEntrance() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    $$(".club-card, .forum-preview-card, .fan-blog-card, .match-card, .leaderboard-card, .writer-card").forEach(el => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  // ── USER AUTH ─────────────────────────────────────────────
  function loadUserFromStorage() {
    state.user = loadFromStorage("user", null);
    state.savedPosts = loadFromStorage("saved_posts", []);
  }

  function updateUserUI() {
    const loginBtn = $("#loginBtn");
    const regBtn = $("#registerBtn");
    const profileEl = $(".header-actions");
    if (!profileEl) return;

    if (state.user) {
      if (loginBtn) { loginBtn.textContent = `👤 ${state.user.username}`; loginBtn.id = "profileBtn"; }
      if (regBtn) regBtn.style.display = "none";
    }
  }

  function registerUser(username, email, password, favClub) {
    if (!username || !email || !password) { toast("Please fill all fields", "error"); return; }
    if (username.length < 3) { toast("Username must be at least 3 characters", "error"); return; }

    const user = {
      username, email, favClub,
      joinDate: new Date().toISOString(),
      xp: 0, posts: 0,
      badges: ["early_adopter"],
      rank: "Newcomer"
    };
    state.user = user;
    saveToStorage("user", user);
    closeModal("registerModal");
    toast(`Welcome to AllThingsFootie, ${username}! ⚽`);
    updateUserUI();
    updateProfilePanel();
  }

  function loginUser(identifier, password) {
    if (!identifier || !password) { toast("Please fill all fields", "error"); return; }
    const savedUser = loadFromStorage("user", null);
    if (savedUser && (savedUser.username === identifier || savedUser.email === identifier)) {
      state.user = savedUser;
      closeModal("loginModal");
      toast(`Welcome back, ${state.user.username}! ⚽`);
      updateUserUI();
    } else {
      toast("User not found. Please register first.", "error");
    }
  }

  function logoutUser() {
    state.user = null;
    closeModal("profilePanel");
    const profilePanel = $("#profilePanel");
    if (profilePanel) profilePanel.classList.remove("open");
    const loginBtn = $("#loginBtn") || $("#profileBtn");
    if (loginBtn) { loginBtn.textContent = "Sign In"; loginBtn.id = "loginBtn"; }
    const regBtn = $("#registerBtn");
    if (regBtn) regBtn.style.display = "block";
    toast("Signed out successfully");
  }

  function updateProfilePanel() {
    if (!state.user) return;
    const header = $("#profileHeader");
    const stats = $("#profileStats");
    const badges = $("#profileBadges");
    const club = ATF_DATA.clubs.find(c => c.id === state.user.favClub);

    if (header) header.innerHTML = `
      <div class="profile-avatar">${state.user.username.slice(0, 2).toUpperCase()}</div>
      <div class="profile-name">${state.user.username}</div>
      <div class="profile-club" style="color:${club ? club.color : "#888"}">${club ? club.badge + " " + club.name : "Football Fan"}</div>
      <div class="profile-join">Member since ${new Date(state.user.joinDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</div>`;

    if (stats) stats.innerHTML = `
      <div class="profile-stat"><span>${state.user.xp}</span><label>XP</label></div>
      <div class="profile-stat"><span>${state.user.posts}</span><label>Posts</label></div>
      <div class="profile-stat"><span>${state.savedPosts.length}</span><label>Saved</label></div>`;

    if (badges) badges.innerHTML = state.user.badges.map(badgeId => {
      const b = ATF_DATA.badges.find(x => x.id === badgeId);
      return b ? `<span class="profile-badge" title="${b.desc}">${b.icon} ${b.name}</span>` : "";
    }).join("");
  }

  // ── EVENTS ────────────────────────────────────────────────
  function bindGlobalEvents() {

    // Theme toggle
    const themeBtn = $("#themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    // Search
    const searchBtn = $("#searchBtn");
    const searchBar = $("#searchBar");
    const searchClose = $("#searchClose");
    if (searchBtn && searchBar) searchBtn.addEventListener("click", () => searchBar.classList.toggle("open"));
    if (searchClose && searchBar) searchClose.addEventListener("click", () => searchBar.classList.remove("open"));

    // Mobile menu
    const menuBtn = $("#mobileMenuBtn");
    const nav = $("#mainNav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        nav.classList.toggle("mobile-open");
        menuBtn.textContent = nav.classList.contains("mobile-open") ? "✕" : "☰";
      });
    }

    // Login/Register modals
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) loginBtn.addEventListener("click", () => {
      if (state.user) {
        updateProfilePanel();
        $("#profilePanel")?.classList.add("open");
      } else {
        openModal("loginModal");
      }
    });

    const regBtn = document.getElementById("registerBtn");
    if (regBtn) regBtn.addEventListener("click", () => openModal("registerModal"));

    const loginSubmit = document.getElementById("loginSubmit");
    if (loginSubmit) loginSubmit.addEventListener("click", () => {
      loginUser($("#loginUser")?.value, $("#loginPass")?.value);
    });

    const regSubmit = document.getElementById("registerSubmit");
    if (regSubmit) regSubmit.addEventListener("click", () => {
      registerUser(
        $("#regUsername")?.value,
        $("#regEmail")?.value,
        $("#regPass")?.value,
        $("#regFavClub")?.value
      );
    });

    const switchReg = document.getElementById("switchToRegister");
    if (switchReg) switchReg.addEventListener("click", () => { closeModal("loginModal"); openModal("registerModal"); });
    const switchLog = document.getElementById("switchToLogin");
    if (switchLog) switchLog.addEventListener("click", () => { closeModal("registerModal"); openModal("loginModal"); });

    // Close modals
    $$(".modal-close").forEach(btn => {
      btn.addEventListener("click", () => closeModal(btn.dataset.modal));
    });
    $$(".modal").forEach(modal => {
      modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });
    });

    // Profile panel close
    const profileClose = document.getElementById("profileClose");
    if (profileClose) profileClose.addEventListener("click", () => $("#profilePanel")?.classList.remove("open"));

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);

    // News tabs
    $$("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        $$("[data-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeNewsTab = btn.dataset.tab;
        buildNewsFeed(state.activeNewsTab, true);
      });
    });

    // Load more news
    const loadMore = document.getElementById("loadMoreNews");
    if (loadMore) loadMore.addEventListener("click", () => {
      state.newsPage++;
      buildNewsFeed(state.activeNewsTab);
    });

    // Match tabs
    $$("[data-match-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        $$("[data-match-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        buildMatchCentre(btn.dataset.matchTab);
      });
    });

    // Vote buttons
    document.addEventListener("click", e => {
      if (e.target.classList.contains("btn-vote") || e.target.classList.contains("btn-vote-sm")) {
        const id = e.target.dataset.id;
        if (!state.user) { toast("Sign in to vote! 🔒", "info"); return; }
        const article = ATF_DATA.news.find(n => n.id === id);
        if (article) { article.votes++; e.target.textContent = `👍 ${article.votes}`; toast("Vote added! 👍"); }
      }

      if (e.target.classList.contains("btn-save") || e.target.classList.contains("btn-save-sm")) {
        if (!state.user) { toast("Sign in to save posts! 🔒", "info"); return; }
        const id = e.target.dataset.id;
        if (!state.savedPosts.includes(id)) {
          state.savedPosts.push(id);
          saveToStorage("saved_posts", state.savedPosts);
          toast("Post saved! 🔖");
        } else {
          toast("Already saved!", "info");
        }
      }
    });

    // Newsletter
    const newsletterSubmit = document.getElementById("newsletterSubmit");
    if (newsletterSubmit) {
      newsletterSubmit.addEventListener("click", () => {
        const email = document.getElementById("newsletterEmail")?.value;
        if (!email || !email.includes("@")) { toast("Please enter a valid email", "error"); return; }
        toast("Subscribed! Check your inbox 📬");
        if (document.getElementById("newsletterEmail")) document.getElementById("newsletterEmail").value = "";
      });
    }

    // Blog submit
    const submitBlogBtn = document.getElementById("submitBlogBtn");
    if (submitBlogBtn) {
      submitBlogBtn.addEventListener("click", () => {
        if (!state.user) { toast("Sign in to submit a blog! 🔒", "info"); return; }
        openModal("blogModal");
      });
    }

    const blogSubmit = document.getElementById("blogSubmit");
    if (blogSubmit) {
      blogSubmit.addEventListener("click", () => {
        const title = document.getElementById("blogTitle")?.value;
        const body = document.getElementById("blogBody")?.value;
        if (!title || !body) { toast("Please fill in the title and body", "error"); return; }
        const newBlog = {
          id: `b${Date.now()}`,
          title,
          author: state.user.username,
          club: document.getElementById("blogClub")?.value || null,
          excerpt: body.substring(0, 100) + "…",
          readTime: Math.max(1, Math.floor(body.split(" ").length / 200)),
          votes: 0,
          date: new Date().toISOString()
        };
        const userBlogs = loadFromStorage("user_blogs", []);
        userBlogs.unshift(newBlog);
        saveToStorage("user_blogs", userBlogs);
        closeModal("blogModal");
        toast("Blog post submitted! 🎉");
        buildFanContent();

        // Award XP
        if (state.user) {
          state.user.xp += 50;
          state.user.posts++;
          saveToStorage("user", state.user);
        }
      });
    }

    // Article submission
    const submitArticleBtn = document.getElementById("submitArticleBtn");
    if (submitArticleBtn) {
      submitArticleBtn.addEventListener("click", () => {
        const title = document.getElementById("articleTitle")?.value;
        const author = document.getElementById("articleAuthor")?.value;
        const body = document.getElementById("articleBody")?.value;
        if (!title || !author || !body) { toast("Please fill in all fields", "error"); return; }
        if (body.split(" ").length < 50) { toast("Article must be at least 50 words", "error"); return; }
        toast("Article submitted for review! We'll be in touch. ✅");
        ["articleTitle", "articleAuthor", "articleBody"].forEach(id => {
          const input = document.getElementById(id);
          if (input) input.value = "";
        });
      });
    }

    // Header scroll behavior
    window.addEventListener("scroll", () => {
      const header = document.getElementById("siteHeader");
      if (header) header.classList.toggle("scrolled", window.scrollY > 80);
    });
  }

})();
