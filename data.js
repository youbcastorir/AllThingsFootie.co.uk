// ============================================================
// data.js – AllThingsFootie.co.uk  |  Static Data & Constants
// ============================================================

const ATF_DATA = {

  // ── CLUBS ──────────────────────────────────────────────────
  clubs: [
    { id: "arsenal",   name: "Arsenal",          short: "ARS", color: "#EF0107", badge: "🔴", city: "London",      members: 12450 },
    { id: "chelsea",   name: "Chelsea",          short: "CHE", color: "#034694", badge: "🔵", city: "London",      members: 10230 },
    { id: "liverpool", name: "Liverpool",        short: "LIV", color: "#C8102E", badge: "🔴", city: "Liverpool",   members: 14780 },
    { id: "mancity",   name: "Manchester City",  short: "MCI", color: "#6CABDD", badge: "🔵", city: "Manchester",  members: 11900 },
    { id: "manutd",    name: "Manchester United",short: "MUN", color: "#DA291C", badge: "🔴", city: "Manchester",  members: 16200 },
    { id: "newcastle", name: "Newcastle United", short: "NEW", color: "#241F20", badge: "⚫", city: "Newcastle",   members: 8340 },
    { id: "tottenham", name: "Tottenham",        short: "TOT", color: "#132257", badge: "🔵", city: "London",      members: 9870 },
    { id: "astonvilla",name: "Aston Villa",      short: "AVL", color: "#95BFE5", badge: "🟣", city: "Birmingham",  members: 7560 },
    { id: "everton",   name: "Everton",          short: "EVE", color: "#003399", badge: "🔵", city: "Liverpool",   members: 6890 },
    { id: "westham",   name: "West Ham United",  short: "WHU", color: "#7A263A", badge: "🔴", city: "London",      members: 7120 }
  ],

  // ── LEAGUE TABLE ───────────────────────────────────────────
  leagueTable: [
    { pos:1,  team:"Manchester City",  p:38, w:28, d:5,  l:5,  gd:62, pts:89 },
    { pos:2,  team:"Arsenal",          p:38, w:26, d:6,  l:6,  gd:55, pts:84 },
    { pos:3,  team:"Liverpool",        p:38, w:24, d:7,  l:7,  gd:48, pts:79 },
    { pos:4,  team:"Chelsea",          p:38, w:20, d:9,  l:9,  gd:28, pts:69 },
    { pos:5,  team:"Tottenham",        p:38, w:19, d:8,  l:11, gd:24, pts:65 },
    { pos:6,  team:"Aston Villa",      p:38, w:18, d:8,  l:12, gd:18, pts:62 },
    { pos:7,  team:"Newcastle United", p:38, w:17, d:7,  l:14, gd:14, pts:58 },
    { pos:8,  team:"Manchester United",p:38, w:15, d:6,  l:17, gd:-4, pts:51 },
    { pos:9,  team:"West Ham United",  p:38, w:14, d:7,  l:17, gd:-8, pts:49 },
    { pos:10, team:"Everton",          p:38, w:13, d:8,  l:17, gd:-12,pts:47 }
  ],

  // ── NEWS ARTICLES ──────────────────────────────────────────
  news: [
    {
      id: "n001",
      title: "Arsenal's Summer Blueprint: Five Targets as Arteta Eyes Title Push",
      excerpt: "The Gunners are set for a major summer overhaul with Edu looking at midfield reinforcements and a new striker to dethrone City.",
      category: "transfers",
      club: "arsenal",
      author: "James Whitfield",
      date: "2024-06-15",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
      featured: true,
      readTime: 5,
      votes: 234
    },
    {
      id: "n002",
      title: "Liverpool's New Era: Slot's First Signings Could Signal Intent",
      excerpt: "Arne Slot has been busy since taking the helm at Anfield, with three new faces set to arrive before the season opener.",
      category: "transfers",
      club: "liverpool",
      author: "Sarah Chen",
      date: "2024-06-14",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      featured: true,
      readTime: 4,
      votes: 189
    },
    {
      id: "n003",
      title: "Premier League Fixtures 2024/25 Released – The Key Dates",
      excerpt: "The full Premier League schedule is out. We break down the biggest clashes, early six-pointers and the Christmas period.",
      category: "match",
      club: null,
      author: "Tom Bradley",
      date: "2024-06-13",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      featured: true,
      readTime: 6,
      votes: 312
    },
    {
      id: "n004",
      title: "Tactical Analysis: How Pep's Inverted Winger System Dominated 23/24",
      excerpt: "A deep dive into the tactical evolution that made City so difficult to beat for large stretches of last season.",
      category: "analysis",
      club: "mancity",
      author: "Dr. Paul Morrison",
      date: "2024-06-12",
      image: "https://images.unsplash.com/photo-1551958219-acbc595d5b22?w=800&q=80",
      featured: false,
      readTime: 9,
      votes: 156
    },
    {
      id: "n005",
      title: "Newcastle's Saudi Revolution: Three Years On, Where Are They Now?",
      excerpt: "An in-depth look at what the Saudi-led takeover has actually delivered for the Toon Army.",
      category: "opinion",
      club: "newcastle",
      author: "Gareth Jones",
      date: "2024-06-11",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
      featured: false,
      readTime: 7,
      votes: 98
    },
    {
      id: "n006",
      title: "Chelsea's Ownership Circus: The Stats Behind Three Years of Turmoil",
      excerpt: "Numbers don't lie – we chart the spending, sackings and broken records since Todd Boehly arrived.",
      category: "analysis",
      club: "chelsea",
      author: "Rebecca Hall",
      date: "2024-06-10",
      image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&q=80",
      featured: false,
      readTime: 8,
      votes: 143
    },
    {
      id: "n007",
      title: "Tottenham's New Signings: Will They Finally Break Their Trophy Drought?",
      excerpt: "Spurs have brought in three new faces but the pressure on Postecoglou is immense heading into the new season.",
      category: "transfers",
      club: "tottenham",
      author: "Mike Evans",
      date: "2024-06-09",
      image: "https://images.unsplash.com/photo-1516566890682-2f84834b32a8?w=800&q=80",
      featured: false,
      readTime: 5,
      votes: 167
    },
    {
      id: "n008",
      title: "The Curious Case of Manchester United's Rebuilding Project",
      excerpt: "INEOS have promised a culture overhaul but the results on the pitch remain far from convincing.",
      category: "opinion",
      club: "manutd",
      author: "James Whitfield",
      date: "2024-06-08",
      image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=800&q=80",
      featured: false,
      readTime: 6,
      votes: 201
    }
  ],

  // ── TRANSFER RUMOURS ───────────────────────────────────────
  transfers: [
    { player: "Victor Osimhen",    from: "Napoli",         to: "Arsenal",    fee: "£85m",  confidence: 85, date: "2024-06-15" },
    { player: "Rodri",             from: "Man City",       to: "Man City",   fee: "New Deal", confidence: 92, date: "2024-06-14" },
    { player: "Kylian Mbappé",     from: "PSG",            to: "Real Madrid",fee: "Free",  confidence: 99, date: "2024-06-13" },
    { player: "Benjamin Šeško",    from: "RB Leipzig",     to: "Arsenal",    fee: "£55m",  confidence: 70, date: "2024-06-12" },
    { player: "Jarrod Bowen",      from: "West Ham",       to: "Liverpool",  fee: "£60m",  confidence: 60, date: "2024-06-11" },
    { player: "Sandro Tonali",     from: "Newcastle",      to: "Newcastle",  fee: "Return", confidence: 78, date: "2024-06-10" },
    { player: "Marcus Rashford",   from: "Man United",     to: "PSG",        fee: "£60m",  confidence: 55, date: "2024-06-09" },
    { player: "Conor Gallagher",   from: "Chelsea",        to: "Atletico",   fee: "£35m",  confidence: 80, date: "2024-06-08" }
  ],

  // ── FIXTURES ───────────────────────────────────────────────
  fixtures: [
    { id:"m001", home:"Arsenal",         away:"Chelsea",          kickoff:"15:00", competition:"Premier League", status:"upcoming" },
    { id:"m002", home:"Liverpool",       away:"Man City",         kickoff:"17:30", competition:"Premier League", status:"upcoming" },
    { id:"m003", home:"Tottenham",       away:"Newcastle",        kickoff:"12:30", competition:"Premier League", status:"upcoming" },
    { id:"m004", home:"Aston Villa",     away:"West Ham",         kickoff:"15:00", competition:"Premier League", status:"upcoming" },
    { id:"m005", home:"Everton",         away:"Man United",       kickoff:"20:00", competition:"Premier League", status:"upcoming" },
    { id:"m006", home:"Man City",        away:"Arsenal",          kickoff:"16:30", competition:"FA Cup Final",   status:"result", homeScore:2, awayScore:0 },
    { id:"m007", home:"Liverpool",       away:"Chelsea",          kickoff:"14:00", competition:"Premier League", status:"result", homeScore:3, awayScore:1 }
  ],

  // ── TOP SCORERS ────────────────────────────────────────────
  topScorers: [
    { name:"Erling Haaland",    team:"Man City",  goals:27, assists:7 },
    { name:"Mohamed Salah",     team:"Liverpool", goals:22, assists:11 },
    { name:"Ollie Watkins",     team:"Aston Villa",goals:19,assists:8 },
    { name:"Cole Palmer",       team:"Chelsea",   goals:18, assists:13 },
    { name:"Son Heung-min",     team:"Tottenham", goals:17, assists:9 }
  ],

  // ── FORUM BOARDS ───────────────────────────────────────────
  forumBoards: [
    { id:"general",   name:"General Football", icon:"⚽", description:"All things football – open to everyone", threads:1240 },
    { id:"transfers", name:"Transfer Rumours",  icon:"🔄", description:"Latest transfer gossip and confirmed deals", threads:876 },
    { id:"match",     name:"Match Threads",     icon:"🟢", description:"Live match discussion and post-match reactions", threads:543 },
    { id:"predictions",name:"Predictions",     icon:"🎯", description:"Score predictions, POTM, title race forecasts", threads:321 },
    { id:"analysis",  name:"Tactical Analysis", icon:"📊", description:"Deep dives into tactics, formations, stats", threads:198 },
    { id:"banter",    name:"Banter Zone",       icon:"😂", description:"Light-hearted football banter – all clubs welcome", threads:934 }
  ],

  // ── FORUM THREADS ──────────────────────────────────────────
  forumThreads: [
    {
      id:"t001", board:"general",
      title:"Who has the best squad depth in the Premier League heading into 24/25?",
      author:"GoalMachineGaz", authorBadge:"🔴",
      body:"Been thinking about this a lot. Arsenal look incredible but City's depth is insane. Liverpool brought in some quality too. Thoughts?",
      replies:87, votes:234, views:4200, hot:true, date:"2024-06-15"
    },
    {
      id:"t002", board:"transfers",
      title:"OFFICIAL: [Club] have agreed a deal for [Player] – Source: Romano",
      author:"TransferTalkTom", authorBadge:"🔵",
      body:"Fabrizio Romano just tweeted Here We Go on this one. Shocked, not shocked? What do people think about the fee?",
      replies:142, votes:567, views:9800, hot:true, date:"2024-06-15"
    },
    {
      id:"t003", board:"match",
      title:"MATCH THREAD: Arsenal vs Chelsea – Premier League GW1",
      author:"ATF_Mod", authorBadge:"⭐",
      body:"The big London derby to kick off the new season! Post your pre-match thoughts, line-up predictions, and live reactions here. COYG / CFC!",
      replies:326, votes:891, views:18500, hot:true, date:"2024-06-14"
    },
    {
      id:"t004", board:"predictions",
      title:"Your Premier League winner predictions for 2024/25 – lock them in now!",
      author:"FootieProphet99", authorBadge:"🟣",
      body:"Drop your predictions below! Who wins the title, who gets relegated, top scorer, surprise package of the season.",
      replies:203, votes:445, views:8700, hot:true, date:"2024-06-13"
    },
    {
      id:"t005", board:"analysis",
      title:"Tactical Thread: How would you set up against Pep's Man City?",
      author:"xGWizard", authorBadge:"📊",
      body:"Looking at press triggers, defensive shape, and transition moments. What's the best tactical approach against City's inverted winger system?",
      replies:64, votes:178, views:3100, hot:false, date:"2024-06-12"
    },
    {
      id:"t006", board:"banter",
      title:"Your club's most embarrassing result in recent memory. Go.",
      author:"BanterBus_FC", authorBadge:"😂",
      body:"We all have them. That one result you wish you could forget. I'll start: 8-2 vs Man City. Over to you lot.",
      replies:412, votes:1203, views:24000, hot:true, date:"2024-06-11"
    },
    {
      id:"t007", board:"general",
      title:"Is Erling Haaland already a Premier League legend?",
      author:"NordicFootieFan", authorBadge:"🔵",
      body:"The stats are simply ridiculous. At what point do we stop comparing and just accept we're watching something special?",
      replies:98, votes:312, views:6500, hot:false, date:"2024-06-10"
    },
    {
      id:"t008", board:"general",
      title:"The state of VAR – is it finally getting better or still a shambles?",
      author:"RefWatch_UK", authorBadge:"🟡",
      body:"After another controversial season, the PGMOL have announced new protocols. Will it actually make a difference?",
      replies:234, votes:678, views:15200, hot:true, date:"2024-06-09"
    }
  ],

  // ── FAN BLOGS ──────────────────────────────────────────────
  fanBlogs: [
    {
      id:"b001", title:"10 Years Supporting Everton: A Love Letter to the Blues",
      author:"ToffeeKing1878", club:"everton",
      excerpt:"Growing up in Liverpool as a Blue is no easy life, but these are the moments that make every heartbreak worth it.",
      readTime:6, votes:89, date:"2024-06-14"
    },
    {
      id:"b002", title:"Why Sunday League Football Is the Real Heart of English Football",
      author:"SundayLeagueStan", club:null,
      excerpt:"The Premier League gets all the headlines but at 9am on a Sunday, something magical happens in parks across the country.",
      readTime:5, votes:145, date:"2024-06-13"
    },
    {
      id:"b003", title:"The Day I Watched United Win the Treble: A Fan's Memory",
      author:"RedDevilRetro99", club:"manutd",
      excerpt:"I was nine years old in Barcelona in 1999. Here's what I remember from the most incredible night in football.",
      readTime:8, votes:213, date:"2024-06-12"
    },
    {
      id:"b004", title:"Newcastle Away: Why St James' Park is the Best Ground in England",
      author:"ToonPatrol", club:"newcastle",
      excerpt:"I've been to 23 Premier League grounds. None of them come close to the atmosphere at St James' on a big European night.",
      readTime:5, votes:167, date:"2024-06-11"
    }
  ],

  // ── STUDENT WRITERS ────────────────────────────────────────
  studentWriters: [
    { name:"Emma Richardson", uni:"Leeds Beckett", speciality:"Tactics & Analysis",   articles:12, avatar:"ER" },
    { name:"Kai Thompson",    uni:"Liverpool Hope", speciality:"Transfer Markets",     articles:8,  avatar:"KT" },
    { name:"Priya Nair",      uni:"Loughborough",   speciality:"Women's Football",     articles:15, avatar:"PN" },
    { name:"Liam O'Connor",   uni:"Manchester Met", speciality:"Fan Culture & History",articles:9,  avatar:"LO" }
  ],

  // ── TICKER HEADLINES ───────────────────────────────────────
  tickerItems: [
    "🔴 Romano: Arsenal submit bid for striker | 🔵 Chelsea confirm Maresca squad numbers | 🟢 OFFICIAL: Liverpool sign midfielder | ⚽ Premier League fixtures announced | 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England prep for autumn internationals | 🔴 United in talks with Atletico | 🟡 VAR new protocols confirmed for 24/25 | 🔵 Man City star signs new deal"
  ],

  // ── WEEKLY POLL ────────────────────────────────────────────
  poll: {
    question: "Who will win the Premier League in 2024/25?",
    options: [
      { label: "Manchester City", votes: 1240 },
      { label: "Arsenal",         votes: 1089 },
      { label: "Liverpool",       votes: 876 },
      { label: "Chelsea",         votes: 234 },
      { label: "Other",           votes: 189 }
    ]
  },

  // ── LEADERBOARD ────────────────────────────────────────────
  leaderboard: [
    { rank:1,  name:"GoalMachineGaz",   xp:15420, badge:"🏆", club:"arsenal",   posts:892 },
    { rank:2,  name:"TransferTalkTom",  xp:13870, badge:"🥈", club:"liverpool", posts:743 },
    { rank:3,  name:"TacticsTimTerry",  xp:12100, badge:"🥉", club:"mancity",   posts:601 },
    { rank:4,  name:"FootieProphet99",  xp:9840,  badge:"⭐", club:"chelsea",   posts:512 },
    { rank:5,  name:"NordicFootieFan",  xp:8760,  badge:"⭐", club:"mancity",   posts:445 },
    { rank:6,  name:"BanterBus_FC",     xp:7320,  badge:"🎖️", club:"manutd",   posts:398 },
    { rank:7,  name:"xGWizard",         xp:6890,  badge:"🎖️", club:"liverpool", posts:356 },
    { rank:8,  name:"ToonPatrol",       xp:5640,  badge:"🎖️", club:"newcastle", posts:289 },
    { rank:9,  name:"ToffeeKing1878",   xp:4210,  badge:"🎖️", club:"everton",  posts:234 },
    { rank:10, name:"RefWatch_UK",      xp:3980,  badge:"🎖️", club:"westham",  posts:201 }
  ],

  // ── BADGES ────────────────────────────────────────────────
  badges: [
    { id:"early_adopter", name:"Early Adopter", icon:"🌱", desc:"Joined in the first month" },
    { id:"prolific",      name:"Prolific",       icon:"✍️", desc:"Posted 100+ times" },
    { id:"predictor",     name:"Predictor",      icon:"🎯", desc:"10 correct score predictions" },
    { id:"analyst",       name:"Analyst",        icon:"📊", desc:"Wrote a featured analysis" },
    { id:"loyal",         name:"Loyal Fan",      icon:"❤️", desc:"Been a member for 1 year" },
    { id:"contributor",   name:"Top Contributor",icon:"⭐", desc:"Reached top 10 leaderboard" }
  ],

  // ── MATCH PREDICTIONS ─────────────────────────────────────
  predictions: [
    { home:"Arsenal", away:"Chelsea",   hGoals:2, aGoals:1 },
    { home:"Liverpool", away:"Man City", hGoals:1, aGoals:1 }
  ],

  // ── ONLINE USERS ──────────────────────────────────────────
  onlineUsers: [
    "GoalMachineGaz", "ToonPatrol", "xGWizard", "FootieProphet99",
    "NordicFootieFan", "BanterBus_FC", "ToffeeKing1878", "RefWatch_UK",
    "ATF_Guest_4521", "ATF_Guest_8734", "ATF_Guest_2210"
  ],

  // ── SPONSORED PLACEHOLDER ─────────────────────────────────
  sponsors: [
    { name:"BetXpert",  type:"betting",   label:"Responsible Gambling" },
    { name:"FutStar",   type:"gaming",    label:"Football Manager" },
    { name:"TopKits",   type:"merch",     label:"Official Kit Store" }
  ]
};

// Expose globally
window.ATF_DATA = ATF_DATA;
