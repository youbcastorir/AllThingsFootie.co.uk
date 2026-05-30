// ============================================================
// forum.js – AllThingsFootie.co.uk  |  Forum Logic
// ============================================================

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const forumState = {
    activeBoard: "general",
    activeThread: null,
    sortBy: "hot",
    page: 1,
    threadsPerPage: 8
  };

  // Only run on forum page
  if (!document.querySelector("[data-page='forum']")) {
    initSidebarForumOnly();
    return;
  }

  document.addEventListener("DOMContentLoaded", initForum);

  function initForum() {
    buildForumHeroStats();
    buildForumBoards();
    buildThreadList();
    buildOnlineList();
    buildContributors();
    buildClubTopics();
    buildPredictionWidget();
    bindForumEvents();
  }

  function initSidebarForumOnly() {
    // Nothing extra needed on non-forum pages
  }

  // ── UTILS ─────────────────────────────────────────────────
  function timeAgo(dateStr) {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function toast(msg, type = "success") {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.className = `toast toast-${type} show`;
    setTimeout(() => t.classList.remove("show"), 3000);
  }

  function loadFromStorage(key, fallback = null) {
    try { const v = localStorage.getItem(`atf_${key}`); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  }

  function saveToStorage(key, val) {
    try { localStorage.setItem(`atf_${key}`, JSON.stringify(val)); } catch {}
  }

  function getCurrentUser() {
    return loadFromStorage("user", null);
  }

  // ── FORUM HERO STATS ──────────────────────────────────────
  function buildForumHeroStats() {
    const wrap = document.getElementById("forumHeroStats");
    if (!wrap) return;
    const totalThreads = ATF_DATA.forumThreads.length + loadFromStorage("user_threads", []).length;
    const totalReplies = ATF_DATA.forumThreads.reduce((s, t) => s + t.replies, 0);
    const stats = [
      { label: "Total Threads", value: totalThreads.toLocaleString() },
      { label: "Replies Today", value: totalReplies.toLocaleString() },
      { label: "Members Online", value: ATF_DATA.onlineUsers.length.toString() },
      { label: "Forum Members", value: "68,420" }
    ];
    stats.forEach(s => {
      const div = el("div", "forum-hero-stat", `<span class="fhs-value">${s.value}</span><span class="fhs-label">${s.label}</span>`);
      wrap.appendChild(div);
    });
  }

  // ── BOARDS ────────────────────────────────────────────────
  function buildForumBoards() {
    const boards = document.getElementById("forumBoards");
    if (!boards) return;
    ATF_DATA.forumBoards.forEach(board => {
      const btn = el("button", `board-btn ${board.id === forumState.activeBoard ? "active" : ""}`);
      btn.dataset.board = board.id;
      btn.innerHTML = `
        <span class="board-icon">${board.icon}</span>
        <span class="board-name">${board.name}</span>
        <span class="board-threads">${board.threads}</span>`;
      btn.addEventListener("click", () => {
        $$(".board-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        forumState.activeBoard = board.id;
        forumState.page = 1;
        const title = document.getElementById("activeBoardTitle");
        if (title) title.textContent = board.name;
        buildThreadList();
      });
      boards.appendChild(btn);
    });
  }

  // ── THREAD LIST ───────────────────────────────────────────
  function buildThreadList(append = false) {
    const list = document.getElementById("threadList");
    if (!list) return;
    if (!append) list.innerHTML = "";

    const userThreads = loadFromStorage("user_threads", []);
    const allThreads = [...ATF_DATA.forumThreads, ...userThreads];

    let filtered = allThreads.filter(t => t.board === forumState.activeBoard);

    // Sort
    if (forumState.sortBy === "hot") filtered.sort((a, b) => b.votes - a.votes);
    else if (forumState.sortBy === "new") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (forumState.sortBy === "top") filtered.sort((a, b) => b.views - a.views);

    const start = (forumState.page - 1) * forumState.threadsPerPage;
    const page = filtered.slice(start, start + forumState.threadsPerPage);

    if (page.length === 0) {
      list.innerHTML = '<div class="empty-threads">No threads yet. Be the first to post! 🚀</div>';
    }

    page.forEach((thread, i) => {
      const item = el("div", `thread-item ${thread.hot ? "hot-thread" : ""} fade-in`);
      item.style.animationDelay = `${i * 0.04}s`;
      item.innerHTML = `
        <div class="thread-votes">
          <button class="vote-up-btn" data-id="${thread.id}">▲</button>
          <span class="vote-count">${thread.votes}</span>
        </div>
        <div class="thread-body">
          <div class="thread-labels">
            ${thread.hot ? '<span class="hot-badge">🔥 Hot</span>' : ""}
            <span class="thread-board-tag">${ATF_DATA.forumBoards.find(b => b.id === thread.board)?.icon || ""} ${thread.board}</span>
          </div>
          <h3 class="thread-title">${thread.title}</h3>
          <p class="thread-preview">${thread.body.substring(0, 120)}${thread.body.length > 120 ? "…" : ""}</p>
          <div class="thread-meta">
            <span class="thread-author">✍️ ${thread.author} ${thread.authorBadge || ""}</span>
            <span>💬 ${thread.replies} replies</span>
            <span>👁️ ${thread.views?.toLocaleString() || 0}</span>
            <span>🕐 ${timeAgo(thread.date)}</span>
          </div>
        </div>
        <div class="thread-quick-actions">
          <button class="btn-reply-thread" data-id="${thread.id}">Reply</button>
          <button class="btn-share-thread">Share</button>
        </div>`;

      item.querySelector(".thread-title").addEventListener("click", () => openThread(thread));
      list.appendChild(item);
    });

    // Load more
    const loadBtn = document.getElementById("loadMoreThreads");
    if (loadBtn) loadBtn.style.display = start + forumState.threadsPerPage >= filtered.length ? "none" : "block";
  }

  // ── OPEN THREAD ───────────────────────────────────────────
  function openThread(thread) {
    forumState.activeThread = thread;
    const boardWrap = document.getElementById("forumThreadsWrap");
    const threadView = document.getElementById("threadView");
    const threadFull = document.getElementById("threadFull");
    const repliesList = document.getElementById("repliesList");

    if (!boardWrap || !threadView || !threadFull) return;

    boardWrap.classList.add("hidden");
    threadView.classList.remove("hidden");

    threadFull.innerHTML = `
      <div class="thread-full-header">
        <span class="thread-full-board">${ATF_DATA.forumBoards.find(b => b.id === thread.board)?.icon || "💬"} ${thread.board}</span>
        <h1>${thread.title}</h1>
        <div class="thread-full-meta">
          <span>✍️ <strong>${thread.author}</strong> ${thread.authorBadge || ""}</span>
          <span>🕐 ${timeAgo(thread.date)}</span>
          <span>👁️ ${(thread.views || 0).toLocaleString()} views</span>
        </div>
      </div>
      <div class="thread-full-body">${thread.body}</div>
      <div class="thread-full-actions">
        <button class="btn-vote-thread" data-id="${thread.id}">👍 ${thread.votes} Upvotes</button>
        <button class="btn-share-thread">🔗 Share</button>
        <button class="btn-report-thread">🚩 Report</button>
      </div>`;

    // Build replies
    if (repliesList) {
      repliesList.innerHTML = "";
      const savedReplies = loadFromStorage(`replies_${thread.id}`, []);
      const demoReplies = generateDemoReplies(thread);
      const allReplies = [...demoReplies, ...savedReplies];

      if (allReplies.length === 0) {
        repliesList.innerHTML = '<div class="no-replies">No replies yet – start the conversation! 💬</div>';
      }
      allReplies.forEach(reply => renderReply(reply, repliesList));
    }

    threadView.scrollIntoView({ behavior: "smooth" });
  }

  function generateDemoReplies(thread) {
    const users = ["GoalMachineGaz 🔴", "TransferTalkTom 🔵", "xGWizard 📊", "BanterBus_FC 😂", "ToonPatrol ⚫"];
    const replies = [
      "Totally agree with this. The stats back it up completely.",
      "Interesting take, but I think you're underestimating the defensive side of things.",
      "Been saying this for years. Finally someone put it into words properly.",
      "The tactical analysis here is spot on. Well done for writing this up.",
      "Not sure I buy this. What about the away form though?",
      "Brilliant thread. This is why I love this forum.",
    ];
    const count = Math.min(3, Math.floor(thread.replies / 30) + 1);
    return Array.from({ length: count }, (_, i) => ({
      id: `dr-${thread.id}-${i}`,
      author: users[i % users.length],
      body: replies[i % replies.length],
      votes: Math.floor(Math.random() * 80) + 5,
      date: new Date(Date.now() - i * 3600000 * (i + 1)).toISOString()
    }));
  }

  function renderReply(reply, container) {
    const div = el("div", "reply-item");
    div.innerHTML = `
      <div class="reply-header">
        <span class="reply-author">${reply.author}</span>
        <span class="reply-time">${timeAgo(reply.date)}</span>
      </div>
      <div class="reply-body">${reply.body}</div>
      <div class="reply-actions">
        <button class="reply-vote-btn" data-id="${reply.id}">👍 ${reply.votes}</button>
        <button class="reply-quote-btn">💬 Quote</button>
      </div>`;
    container.appendChild(div);
  }

  // ── ONLINE LIST ───────────────────────────────────────────
  function buildOnlineList() {
    const list = document.getElementById("onlineList");
    if (!list) return;
    ATF_DATA.onlineUsers.forEach(user => {
      const div = el("div", "online-user");
      div.innerHTML = `<span class="online-dot"></span>${user}`;
      list.appendChild(div);
    });
  }

  // ── TOP CONTRIBUTORS ──────────────────────────────────────
  function buildContributors() {
    const list = document.getElementById("contributorList");
    if (!list) return;
    ATF_DATA.leaderboard.slice(0, 5).forEach(entry => {
      const club = ATF_DATA.clubs.find(c => c.id === entry.club);
      const div = el("div", "contributor-item");
      div.innerHTML = `
        <span class="contributor-rank">${entry.rank}</span>
        <div class="contributor-info">
          <span class="contributor-name">${entry.name}</span>
          <span class="contributor-club" style="color:${club ? club.color : "#888"}">${club ? club.badge : ""}</span>
        </div>
        <span class="contributor-xp">${entry.xp.toLocaleString()} XP</span>`;
      list.appendChild(div);
    });
  }

  // ── CLUB TOPICS ───────────────────────────────────────────
  function buildClubTopics() {
    const wrap = document.getElementById("clubTopics");
    if (!wrap) return;
    ATF_DATA.clubs.slice(0, 6).forEach(club => {
      const div = el("div", "club-topic-item");
      div.style.borderLeftColor = club.color;
      div.innerHTML = `
        <span class="club-topic-badge">${club.badge}</span>
        <div class="club-topic-info">
          <span style="color:${club.color}">${club.name}</span>
          <span class="club-topic-count">${Math.floor(Math.random() * 50) + 10} active threads</span>
        </div>`;
      div.addEventListener("click", () => toast(`Opening ${club.name} community… ⚽`));
      wrap.appendChild(div);
    });
  }

  // ── PREDICTION WIDGET ─────────────────────────────────────
  function buildPredictionWidget() {
    const wrap = document.getElementById("predictionWidget");
    if (!wrap) return;
    const match = ATF_DATA.fixtures[0];
    if (!match) return;

    wrap.innerHTML = `
      <div class="pred-match">
        <span class="pred-team">${match.home}</span>
        <span class="pred-vs">vs</span>
        <span class="pred-team">${match.away}</span>
      </div>
      <div class="pred-inputs">
        <input type="number" class="pred-score" id="predHome" min="0" max="20" value="1" />
        <span>–</span>
        <input type="number" class="pred-score" id="predAway" min="0" max="20" value="1" />
      </div>
      <button class="btn-primary btn-full" id="submitPredBtn">Submit Prediction 🎯</button>
      <div class="pred-result" id="predResult"></div>`;

    document.getElementById("submitPredBtn")?.addEventListener("click", () => {
      const user = getCurrentUser();
      if (!user) { toast("Sign in to predict! 🔒", "info"); return; }
      const h = document.getElementById("predHome")?.value;
      const a = document.getElementById("predAway")?.value;
      const result = document.getElementById("predResult");
      if (result) result.innerHTML = `<p>Prediction saved: ${match.home} ${h} – ${a} ${match.away} 🎯</p>`;
      toast("Prediction saved! Good luck! 🎯");
    });
  }

  // ── BIND EVENTS ───────────────────────────────────────────
  function bindForumEvents() {

    // Sort buttons
    $$(".sort-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".sort-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        forumState.sortBy = btn.dataset.sort;
        forumState.page = 1;
        buildThreadList();
      });
    });

    // Load more threads
    const loadMoreBtn = document.getElementById("loadMoreThreads");
    if (loadMoreBtn) loadMoreBtn.addEventListener("click", () => {
      forumState.page++;
      buildThreadList(true);
    });

    // Back to forum
    const backBtn = document.getElementById("backToForum");
    if (backBtn) backBtn.addEventListener("click", () => {
      document.getElementById("threadView")?.classList.add("hidden");
      document.getElementById("forumThreadsWrap")?.classList.remove("hidden");
    });

    // New thread
    const newThreadBtn = document.getElementById("newThreadBtn");
    if (newThreadBtn) newThreadBtn.addEventListener("click", () => {
      const user = getCurrentUser();
      if (!user) { toast("Sign in to post a thread! 🔒", "info"); return; }
      const title = document.getElementById("newThreadInput")?.value?.trim();
      const category = document.getElementById("newThreadCategory")?.value;
      if (!title || title.length < 10) { toast("Thread title must be at least 10 characters", "error"); return; }

      const newThread = {
        id: `ut-${Date.now()}`,
        board: category,
        title,
        author: user.username,
        authorBadge: "🆕",
        body: title,
        replies: 0, votes: 1, views: 1, hot: false,
        date: new Date().toISOString()
      };

      const userThreads = loadFromStorage("user_threads", []);
      userThreads.unshift(newThread);
      saveToStorage("user_threads", userThreads);

      // Award XP
      user.xp = (user.xp || 0) + 25;
      user.posts = (user.posts || 0) + 1;
      saveToStorage("user", user);

      const input = document.getElementById("newThreadInput");
      if (input) input.value = "";

      // Switch to the relevant board
      forumState.activeBoard = category;
      $$(".board-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.board === category);
      });

      buildForumBoards();
      buildThreadList();
      toast("Thread posted! +25 XP 🎉");
    });

    // Reply submission
    const submitReplyBtn = document.getElementById("submitReplyBtn");
    if (submitReplyBtn) {
      submitReplyBtn.addEventListener("click", () => {
        const user = getCurrentUser();
        if (!user) { toast("Sign in to reply! 🔒", "info"); return; }
        const body = document.getElementById("replyInput")?.value?.trim();
        if (!body || body.length < 5) { toast("Reply too short!", "error"); return; }

        const reply = {
          id: `r-${Date.now()}`,
          author: user.username,
          body,
          votes: 0,
          date: new Date().toISOString()
        };

        const thread = forumState.activeThread;
        if (!thread) return;

        const saved = loadFromStorage(`replies_${thread.id}`, []);
        saved.push(reply);
        saveToStorage(`replies_${thread.id}`, saved);

        const repliesList = document.getElementById("repliesList");
        if (repliesList) {
          if (repliesList.querySelector(".no-replies")) repliesList.innerHTML = "";
          renderReply(reply, repliesList);
        }

        const input = document.getElementById("replyInput");
        if (input) input.value = "";

        user.xp = (user.xp || 0) + 10;
        user.posts = (user.posts || 0) + 1;
        saveToStorage("user", user);

        toast("Reply posted! +10 XP 💬");
      });
    }

    // Vote buttons (delegated)
    document.addEventListener("click", e => {
      if (e.target.classList.contains("vote-up-btn")) {
        const id = e.target.dataset.id;
        const thread = ATF_DATA.forumThreads.find(t => t.id === id);
        const userThreads = loadFromStorage("user_threads", []);
        const userThread = userThreads.find(t => t.id === id);
        const target = thread || userThread;
        if (target) {
          target.votes++;
          e.target.closest(".thread-item").querySelector(".vote-count").textContent = target.votes;
          if (userThread) saveToStorage("user_threads", userThreads);
          toast("+1 vote! 👍");
        }
      }

      if (e.target.classList.contains("btn-reply-thread")) {
        const id = e.target.dataset.id;
        const allThreads = [...ATF_DATA.forumThreads, ...loadFromStorage("user_threads", [])];
        const thread = allThreads.find(t => t.id === id);
        if (thread) openThread(thread);
      }
    });
  }

})();
