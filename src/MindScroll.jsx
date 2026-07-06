import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

/* ================================================================== */
/* DATA — 20 APPS                                                      */
/* ================================================================== */

const APPS = [
  {
    id: "instagram", name: "Instagram", tagline: "The comparison engine",
    category: "Social & Visual", chemicals: ["Dopamine", "Cortisol", "FOMO"],
    dop: 9, anx: 7, hook: 5, avgMinutes: 55,
    wave: "M0,70 L20,65 L40,20 L60,75 L80,30 L100,68 L120,15 L140,72 L160,25 L180,60 L200,10 L220,65 L240,35 L260,70 L280,20 L300,55 L320,18 L340,68 L360,40 L380,60 L400,50",
    icon: <><rect x="4" y="4" width="24" height="24" rx="7" /><circle cx="16" cy="16" r="6" /><circle cx="23" cy="9" r="1.4" fill="currentColor" stroke="none" /></>,
    brain: "Every like and comment lands on a variable schedule — you never know if the next scroll brings a reward, so your brain treats the feed like a slot machine. Scrolling past curated, filtered lives repeatedly cues status anxiety with a smile on it.",
    overuse: ["Self-esteem and body image erode from chronic comparison to highlight reels", "A low-grade FOMO sets in — the sense something is happening without you", "A measurable mood dip often follows extended sessions", "Sleep gets pushed later as one more scroll turns into forty minutes"],
    hooks: ["Infinite scroll — no natural end point, no stopping cue", "Variable-ratio rewards on likes and comments, exactly like a slot machine", "Feed ranking tuned to maximize time-on-app, not your stated interests", "Disappearing Stories manufacture urgency permanent posts don't have"],
    tips: ["Turn off like/comment notifications — check on your schedule, not theirs", "Unfollow accounts that leave you feeling worse after viewing", "Set a fixed check-in window instead of leaving the app open all day", "Ask before opening: am I bored, or actually looking for something?"],
  },
  {
    id: "whatsapp", name: "WhatsApp", tagline: "The always-on thread",
    category: "Messaging", chemicals: ["Oxytocin", "Cortisol"],
    dop: 5, anx: 6, hook: 3, avgMinutes: 40,
    wave: "M0,60 L20,60 L30,25 L40,60 L60,60 L90,60 L100,30 L110,60 L130,60 L160,60 L170,20 L180,60 L200,60 L230,60 L240,35 L250,60 L280,60 L310,60 L320,22 L330,60 L360,60 L400,60",
    icon: <><path d="M6 26 L9 19 A11 11 0 1 1 16 27 Z" /><circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none" /><circle cx="20" cy="16" r="1.3" fill="currentColor" stroke="none" /></>,
    brain: "Messages from people you care about trigger real oxytocin — genuine bonding, not a trick. The cost is the interface: the double blue tick turns a private thought into a visible obligation, and \"typing…\" holds you in a small anticipatory loop.",
    overuse: ["Phantom vibrations — reaching for a phone that never buzzed", "Compulsive checking driven by fear of leaving someone \"on read\"", "Message fatigue in groups, plus guilt over unanswered threads", "Work and rest blur when replies are expected at all hours"],
    hooks: ["Read receipts create reciprocity pressure — seen means you owe a reply", "\"Last seen\"/online status invites quiet surveillance of others", "Typing indicators hold your attention while you wait", "Group notifications arrive in bursts, hard to triage at a glance"],
    tips: ["Turn off read receipts — removes reply-on-demand pressure both ways", "Mute groups that don't need real-time attention; check in batches", "Set quiet hours so messages wait until you're actually free", "Reply in windows rather than the instant a message lands"],
  },
  {
    id: "youtube", name: "YouTube", tagline: "The bottomless queue",
    category: "Video & Audio", chemicals: ["Dopamine"],
    dop: 8, anx: 4, hook: 5, avgMinutes: 45,
    wave: "M0,70 L30,68 L40,10 L120,15 L130,60 L160,65 L170,8 L280,12 L290,62 L300,66 L310,5 L400,20",
    icon: <><rect x="4" y="8" width="24" height="16" rx="5" /><path d="M13 12 L21 16 L13 20 Z" fill="currentColor" stroke="none" /></>,
    brain: "Autoplay removes the one moment you'd naturally ask \"should I keep watching?\" Thumbnails are engineered around a curiosity gap, and long sessions build a flow state that overrides ordinary fatigue signals.",
    overuse: ["Time-blindness — sessions run far longer than intended, unnoticed", "Delayed sleep from \"one more video\" turning into an hour", "Rabbit-holing away from the thing you opened the app to find", "Passive watching crowds out time spent actively learning or making"],
    hooks: ["Autoplay countdown removes the choice to stop between videos", "Thumbnails/titles optimized for curiosity gap, not accuracy", "Recommendations tuned to maximize watch time, not your goals", "Shorts' vertical feed compresses the slot-machine loop into seconds"],
    tips: ["Turn off autoplay so every video is a decision you actually make", "Use Watch Later instead of clicking whatever autoplays next", "Set a session timer before you start, not after you notice the time", "Subscribe selectively; check channels directly instead of the feed"],
  },
  {
    id: "spotify", name: "Spotify", tagline: "The mood dial",
    category: "Video & Audio", chemicals: ["Dopamine"],
    dop: 6, anx: 2, hook: 2, avgMinutes: 50,
    wave: "M0,50 C50,10 100,10 150,50 C200,90 250,90 300,50 C350,10 400,10 400,50",
    icon: <><circle cx="16" cy="16" r="12" /><path d="M10 13 C14 11 19 11 22 14" strokeLinecap="round" /><path d="M11 17 C14 15 18 15 21 18" strokeLinecap="round" /><path d="M12 21 C14 20 17 20 19 22" strokeLinecap="round" /></>,
    brain: "Music releases dopamine in anticipation of a song's peak, not just during it. Personalized playlists add a second layer of pleasure — the small thrill of an algorithm \"getting you.\"",
    overuse: ["Passive, autopilot listening replaces active attention to the moment", "Music becomes a way to numb a feeling rather than sit with it", "Algorithmic playlists can narrow taste instead of expanding it", "Constant audio leaves little room for unstructured, quiet thought"],
    hooks: ["Autoplay and endless queues remove every natural decision point", "Discover Weekly exploits curiosity with a fresh reward each week", "Algorithmic playlists sustain listening with zero ongoing effort", "\"Wrapped\" gamifies yearly stats into something built to be shared"],
    tips: ["Turn off autoplay so each next track is a choice, not a default", "Build listening sessions with intention instead of leaving it always on", "Take music-free stretches — silence resets how much a song can move you", "Occasionally search outside your algorithm instead of the feed"],
  },
  {
    id: "linkedin", name: "LinkedIn", tagline: "The status ladder",
    category: "Info & Community", chemicals: ["Cortisol", "Dopamine", "FOMO"],
    dop: 5, anx: 7, hook: 4, avgMinutes: 15,
    wave: "M0,80 L60,75 L120,65 L160,66 L200,50 L240,48 L280,30 L320,28 L360,15 L400,12",
    icon: <><rect x="4" y="4" width="24" height="24" rx="5" /><circle cx="11" cy="11" r="1.6" fill="currentColor" stroke="none" /><line x1="11" y1="15" x2="11" y2="24" strokeLinecap="round" /><path d="M16 24 L16 18 A4 4 0 0 1 24 18 L24 24" strokeLinecap="round" /></>,
    brain: "Professional wins made public tie self-worth directly to a metric. Scrolling other people's milestones activates status-comparison circuitry, producing a distinct career-flavored cortisol response.",
    overuse: ["Career-comparison anxiety — measuring your timeline against everyone else's", "Imposter syndrome amplified by a feed of curated achievements", "Fatigue from performative positivity and humble-brag posts", "Doomscrolling disguised as \"just checking on opportunities\""],
    hooks: ["Notifications for profile views and endorsements pull you back in", "Feed ranking favors emotionally charged posts, not useful ones", "\"Who viewed your profile\" creates an open curiosity loop", "Creator-mode metrics and streaks gamify how often you post"],
    tips: ["Set specific windows for networking or job searching, then close it", "Unfollow accounts built around humble-brags — the most corrosive kind", "Remember it's a highlight reel of one slice of everyone's week", "Turn off non-essential notifications; nothing there is truly urgent"],
  },
  {
    id: "calls", name: "Phone Calls", tagline: "The interruption, not the hook",
    category: "Messaging", chemicals: ["Cortisol"],
    dop: 2, anx: 5, hook: 1, avgMinutes: 12,
    wave: "M0,65 L150,65 L160,5 L175,65 L400,65",
    icon: <><path d="M8 6 L13 6 L15 12 L11 15 A17 17 0 0 0 17 21 L20 17 L26 19 L26 24 A2 2 0 0 1 24 26 C14 26 6 18 6 8 A2 2 0 0 1 8 6 Z" /></>,
    brain: "Calls are the outlier here — not built to be addictive, built to interrupt. An incoming call is unpredictable, so it triggers a genuine fight-or-flight cortisol spike, especially from unknown numbers.",
    overuse: ["Not a volume problem the way apps are — most people now under-use calls", "For the anxious, avoidance brings relief but reinforces the anxiety loop", "Frequent unscheduled calls fragment focus sharply", "Anticipatory dread before a call can outweigh the actual conversation"],
    hooks: ["None engineered for retention — the ringtone is built to interrupt, not entice", "The one mechanism at play is urgency: a ring demands an answer right now", "That immediacy is why calls now feel more intrusive than a text"],
    tips: ["Schedule calls when possible instead of defaulting to spontaneous ones", "Use Do Not Disturb with a favorites exception for real emergencies", "If avoidance is the pattern, small low-stakes calls rebuild tolerance", "Let voicemail exist as a buffer — a callback window you control"],
  },
  {
    id: "facebook", name: "Facebook", tagline: "The nostalgia loop",
    category: "Social & Visual", chemicals: ["Dopamine", "Cortisol", "FOMO"],
    dop: 7, anx: 6, hook: 4, avgMinutes: 30,
    wave: "M0,65 L30,60 L60,25 L90,68 L120,40 L150,65 L180,20 L210,62 L240,45 L270,66 L300,28 L330,60 L360,42 L400,55",
    icon: <><circle cx="12" cy="16" r="7" /><circle cx="20" cy="16" r="7" /></>,
    brain: "Facebook blends variable-ratio social rewards with a feed algorithm that resurfaces emotionally charged content, since outrage and nostalgia both hold attention longer than neutral posts.",
    overuse: ["Endless scrolling with little memory of what was actually seen", "More outrage-bait and divisive content than you'd choose deliberately", "Nostalgia features can pull attention into the past over the present"],
    hooks: ["Infinite feed ranked for engagement, not accuracy", "\"On this day\" memories exploit nostalgia to pull you back daily", "Notification batching for likes, tags and groups keeps a reason to open it"],
    tips: ["Switch to chronological view where possible", "Leave large, low-value groups generating notification noise", "Set a specific reason before opening it, then close when done"],
  },
  {
    id: "twitter", name: "Twitter / X", tagline: "The outrage feed",
    category: "Info & Community", chemicals: ["Cortisol", "Dopamine", "FOMO"],
    dop: 7, anx: 8, hook: 4, avgMinutes: 25,
    wave: "M0,60 L15,58 L25,15 L35,58 L50,60 L65,20 L75,60 L90,58 L100,18 L110,60 L130,60 L145,22 L155,60 L175,58 L185,16 L195,60 L220,60 L235,20 L245,60 L270,58 L285,18 L295,60 L320,60 L335,22 L345,60 L400,55",
    icon: <><circle cx="16" cy="16" r="8" /><line x1="16" y1="4" x2="16" y2="8" strokeLinecap="round" /><line x1="27" y1="9" x2="24" y2="12" strokeLinecap="round" /><line x1="5" y1="9" x2="8" y2="12" strokeLinecap="round" /></>,
    brain: "Short posts reward rapid dopamine hits from likes and reposts, while a constant stream of breaking news keeps cortisol-linked vigilance switched on. Conflict spreads faster than calm, so the feed quietly selects for what keeps you activated.",
    overuse: ["Doomscrolling past the point of being informed", "Elevated background anxiety from constant conflict/crisis exposure", "Difficulty disengaging from an ongoing argument or thread"],
    hooks: ["Algorithmic feed prioritizes emotionally activating posts", "Real-time counters turn every post into a scoreboard", "Trending topics manufacture urgency to check what's happening now"],
    tips: ["Switch to a chronological, followed-only feed", "Mute keywords and accounts that reliably spike your stress", "Set a hard time limit for news-checking sessions"],
  },
  {
    id: "snapchat", name: "Snapchat", tagline: "The streak trap",
    category: "Social & Visual", chemicals: ["Dopamine", "FOMO", "Cortisol"],
    dop: 8, anx: 7, hook: 5, avgMinutes: 35,
    wave: "M0,70 L40,68 L50,10 L60,68 L120,66 L130,8 L140,66 L220,64 L230,6 L240,64 L320,62 L330,10 L340,62 L400,60",
    icon: <><rect x="6" y="6" width="20" height="20" rx="8" /><path d="M17 10 L12 18 L16 18 L15 22 L21 14 L17 14 Z" fill="currentColor" stroke="none" /></>,
    brain: "Streaks create a loss-aversion loop stronger than most reward systems — fear of breaking one often outweighs any enjoyment of the actual conversation. Disappearing content adds urgency, and Snap Map layers on social surveillance.",
    overuse: ["Streak maintenance becomes obligation, not genuine connection", "Anxiety around missing a friend's story or map update", "Sleep disruption from last-minute streak-saving before midnight"],
    hooks: ["Streaks exploit loss aversion — losing progress feels worse than gaining feels good", "Disappearing snaps create urgency and fear of missing content", "Snap Map turns friends' locations into a constantly-checkable feed"],
    tips: ["Let unimportant streaks lapse on purpose — the discomfort fades fast", "Turn off Snap Map location sharing when not needed", "Treat stories as optional viewing, not a mandatory daily list"],
  },
  {
    id: "tiktok", name: "TikTok", tagline: "The fastest loop of all",
    category: "Social & Visual", chemicals: ["Dopamine", "FOMO"],
    dop: 10, anx: 5, hook: 5, avgMinutes: 50,
    wave: "M0,55 L10,50 L20,15 L30,50 L40,55 L50,18 L60,52 L70,55 L80,14 L90,50 L100,55 L110,16 L120,52 L130,55 L140,15 L150,50 L160,55 L170,17 L180,52 L190,55 L200,14 L210,50 L220,55 L230,16 L240,52 L250,55 L260,15 L270,50 L280,55 L290,17 L300,52 L310,55 L320,14 L330,50 L340,55 L350,16 L360,52 L370,55 L380,15 L390,50 L400,55",
    icon: <><rect x="9" y="4" width="14" height="24" rx="4" /><path d="M14 12 L20 16 L14 20 Z" fill="currentColor" stroke="none" /></>,
    brain: "A vertical, single-video feed removes every decision except swipe-or-don't, and the algorithm learns your reward pattern within minutes — one of the fastest dopamine-prediction loops in daily use.",
    overuse: ["Severely shortened attention span for longer-form content afterward", "Time-blindness — a 10-minute intention regularly becomes an hour", "Passive consumption crowding out active hobbies or rest"],
    hooks: ["Algorithm tunes to your reactions in near real-time", "Seamless vertical swipe removes all friction between videos", "Sound-on, high-stimulation format maximizes attention per second"],
    tips: ["Use the app's built-in screen time reminders and actually respect them", "Curate your feed early by skipping content you don't want more of", "Keep it to a specific, timed session rather than an anytime default"],
  },
  {
    id: "netflix", name: "Netflix", tagline: "The cliffhanger machine",
    category: "Video & Audio", chemicals: ["Dopamine"],
    dop: 7, anx: 2, hook: 4, avgMinutes: 60,
    wave: "M0,80 C60,75 100,50 150,35 C220,20 280,18 330,18 L360,18 C380,50 390,70 400,75",
    icon: <><rect x="7" y="8" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="24" rx="1" /><rect x="21" y="11" width="4" height="13" rx="1" /></>,
    brain: "Autoplay-next-episode removes the natural stopping point a season finale used to provide, while cliffhanger pacing is timed to trigger anticipatory dopamine right where you'd otherwise stop.",
    overuse: ["Binge sessions extending well past a planned single episode", "Late-night viewing pushing back sleep onset", "Passive evenings replacing more restorative or social downtime"],
    hooks: ["Autoplay with a short countdown removes the decision to stop", "Recommendations and thumbnails are tested for maximum clicks", "Cliffhanger pacing is structurally built to punish stopping"],
    tips: ["Turn off autoplay in account settings", "Decide the number of episodes before pressing play, not after", "Use a \"one season, one week\" rule to keep some friction"],
  },
  {
    id: "amazon", name: "Amazon", tagline: "The one-click impulse",
    category: "Utility & Shopping", chemicals: ["Dopamine", "Cortisol"],
    dop: 6, anx: 4, hook: 3, avgMinutes: 15,
    wave: "M0,75 L60,73 L75,25 L90,72 L180,70 L195,20 L210,70 L300,68 L315,15 L330,68 L400,66",
    icon: <><path d="M9 11 L23 11 L22 26 A2 2 0 0 1 20 28 L12 28 A2 2 0 0 1 10 26 Z" /><path d="M12 11 A4 5 0 0 1 20 11" /></>,
    brain: "Personalized deals combine scarcity cues with the anticipation of a good find, like a treasure hunt. One-click purchasing removes the natural pause between wanting something and buying it.",
    overuse: ["Impulse purchases followed by buyer's remorse or unused items", "A single-need browse spiraling into general shopping", "A recurring low-grade urge to check for deals without a need"],
    hooks: ["One-click checkout removes the natural pause before buying", "Scarcity messaging (\"only 2 left\") manufactures urgency", "Recommendations keep surfacing items outside active shopping intent"],
    tips: ["Add to cart and wait 24 hours before non-essential purchases", "Delete the app from your home screen so shopping needs intent", "Turn off deal and price-drop notifications"],
  },
  {
    id: "zomato", name: "Zomato", tagline: "Discovery to delivery, one tap",
    category: "Utility & Shopping", chemicals: ["Dopamine"],
    dop: 6, anx: 3, hook: 3, avgMinutes: 12,
    wave: "M0,72 L100,72 L110,15 L120,72 L260,72 L270,12 L280,72 L400,72",
    icon: <><circle cx="16" cy="18" r="10" /><path d="M8 18 A8 8 0 0 1 24 18" /><line x1="16" y1="6" x2="16" y2="10" strokeLinecap="round" /></>,
    brain: "Endless restaurant browsing with photos and ratings works like a visual feed — appealing food photography triggers small dopamine hits before any order is placed. Dining-discovery features add a comparison layer similar to other visual apps.",
    overuse: ["Browsing restaurants for the scrolling experience rather than actual hunger", "Comparing your usual meals to reviewers' curated food photography", "Repeated opens \"just to look\" without ordering anything"],
    hooks: ["High-quality food photography triggers appetite and dopamine before ordering", "Personalized restaurant recommendations refresh the feed on every open", "Limited-time offers on the home screen create urgency to order now"],
    tips: ["Decide what you're craving before opening the app, not while browsing", "Turn off promotional push notifications", "Set a fixed number of order days per week"],
  },
  {
    id: "swiggy", name: "Swiggy", tagline: "Craving to doorstep, minutes apart",
    category: "Utility & Shopping", chemicals: ["Dopamine"],
    dop: 6, anx: 3, hook: 3, avgMinutes: 10,
    wave: "M0,74 L90,74 L100,18 L110,74 L240,74 L250,14 L260,74 L400,74",
    icon: <><rect x="7" y="14" width="14" height="10" rx="2" /><circle cx="10" cy="26" r="2" /><circle cx="20" cy="26" r="2" /><line x1="21" y1="17" x2="26" y2="17" strokeLinecap="round" /></>,
    brain: "Real-time order tracking creates a live anticipation loop — watching a delivery partner's dot move on the map holds attention the way a phone call never could. The gap between craving and delivery is short enough that ordering, not cooking, becomes the default response to hunger.",
    overuse: ["Reduced tolerance for even mild hunger before ordering", "Spending drift as small, frequent orders add up unnoticed", "Skipping home cooking or planning in favor of instant ordering"],
    hooks: ["One-tap reordering removes almost all friction", "Live order-tracking map keeps attention locked during the delivery wait", "Time-limited discount banners create artificial urgency"],
    tips: ["Set a fixed number of order days per week", "Turn off meal-time push notifications", "Keep easy home-cooking options ready to lower the convenience gap"],
  },
  {
    id: "maps", name: "Google Maps", tagline: "Low load, quiet dependence",
    category: "Utility & Shopping", chemicals: ["Cortisol"],
    dop: 2, anx: 3, hook: 1, avgMinutes: 10,
    wave: "M0,80 L100,78 L120,70 L140,78 L260,78 L280,70 L300,78 L400,80",
    icon: <><path d="M16 4 C10 4 6 8.5 6 14 C6 21 16 29 16 29 C16 29 26 21 26 14 C26 8.5 22 4 16 4 Z" /><circle cx="16" cy="14" r="3.4" /></>,
    brain: "Navigation apps carry a low addictive load, but turn-by-turn dependence quietly offloads spatial memory the brain would otherwise build. Constant ETA updates can add mild background stress on time-sensitive trips.",
    overuse: ["Reduced ability to navigate familiar routes without the app", "Mild anxiety from repeatedly re-checking ETA", "Over-reliance replacing normal spatial awareness"],
    hooks: ["Real-time traffic/faster-route alerts keep the app open", "Constant rerouting prompts repeated checking over one glance", "Location history nudges habitual dependence"],
    tips: ["Glance at the route once before driving instead of watching continuously", "Try navigating a known route without the app occasionally", "Turn off non-essential rerouting alerts for routine trips"],
  },
  {
    id: "email", name: "Gmail", tagline: "The open loop that never closes",
    category: "Info & Community", chemicals: ["Cortisol"],
    dop: 3, anx: 6, hook: 2, avgMinutes: 20,
    wave: "M0,65 L30,63 L40,45 L50,63 L100,62 L110,42 L120,62 L180,60 L190,40 L200,60 L260,58 L270,38 L280,58 L340,56 L350,36 L360,56 L400,55",
    icon: <><rect x="5" y="8" width="22" height="16" rx="2.5" /><path d="M6 9 L16 18 L26 9" /></>,
    brain: "An unread badge is a small, constant open loop the brain wants to resolve — every unread message is an unfinished task sitting in working memory. Unpredictable arrival timing makes checking behave like a variable-reward habit.",
    overuse: ["Constant background monitoring for new messages, even off-hours", "Difficulty fully disconnecting during rest, weekends or vacations", "Inbox anxiety from a growing unread count"],
    hooks: ["The unread badge count is a visible, naggable open loop", "Unpredictable arrival timing makes checking a reward habit", "Push notifications for every message interrupt regardless of urgency"],
    tips: ["Turn off push notifications and check email in scheduled batches", "Use folders/filters so only important senders can interrupt you", "Set an explicit email-free window each evening"],
  },
  {
    id: "reddit", name: "Reddit", tagline: "The rabbit hole with karma",
    category: "Info & Community", chemicals: ["Dopamine", "FOMO"],
    dop: 8, anx: 5, hook: 4, avgMinutes: 30,
    wave: "M0,70 L40,60 L70,30 L100,55 L130,20 L160,58 L190,35 L220,62 L250,15 L280,55 L310,40 L340,60 L370,25 L400,50",
    icon: <><path d="M16 6 L21 13 L11 13 Z" fill="currentColor" stroke="none" /><path d="M16 26 L21 19 L11 19 Z" fill="currentColor" stroke="none" /></>,
    brain: "Voting systems create a public, numeric measure of approval on every post, activating the same reward circuitry as likes elsewhere with the added pull of anonymous community belonging. Endless topic communities mean a fresh rabbit hole is always available.",
    overuse: ["Falling down topic rabbit holes far from why you opened the app", "Time loss from an infinite, algorithmically-fed feed", "Mood shifts from emotionally charged threads or arguments"],
    hooks: ["Upvote/downvote counts turn every post into a popularity contest", "Endless subreddit structure means there's always a new angle to explore", "Front-page algorithm surfaces the most emotionally engaging content first"],
    tips: ["Unsubscribe from subreddits that eat time without adding value", "Use it with a specific topic in mind rather than the general feed", "Set a session timer, since the structure has no natural end"],
  },
  {
    id: "discord", name: "Discord", tagline: "Always-on community",
    category: "Messaging", chemicals: ["Oxytocin", "Dopamine"],
    dop: 6, anx: 4, hook: 3, avgMinutes: 35,
    wave: "M0,65 L40,65 L50,30 L120,30 L130,65 L180,65 L190,25 L260,25 L270,65 L320,65 L330,35 L390,35 L400,60",
    icon: <><rect x="5" y="7" width="17" height="13" rx="6" /><path d="M10 20 L10 25 L15 20 Z" fill="currentColor" stroke="none" /></>,
    brain: "Persistent voice/text communities create genuine social bonding, similar to WhatsApp, but the always-on server structure and unread-channel badges add constant low-level social-obligation pressure across many parallel conversations at once.",
    overuse: ["Fragmented attention from monitoring multiple servers at once", "Late-night sessions in active voice channels disrupting sleep", "Guilt or FOMO around missed conversations in fast-moving servers"],
    hooks: ["Unread badges stack across every server and channel simultaneously", "Active voice channels create real-time presence pressure to join", "Default notification settings alert for far more than necessary"],
    tips: ["Mute non-essential servers and channels individually", "Set specific check-in times instead of leaving it always open", "Leave large servers that generate more noise than value"],
  },
  {
    id: "telegram", name: "Telegram", tagline: "WhatsApp, at greater scale",
    category: "Messaging", chemicals: ["Oxytocin", "Cortisol"],
    dop: 4, anx: 4, hook: 2, avgMinutes: 20,
    wave: "M0,60 L15,58 L25,25 L35,58 L55,58 L70,60 L80,20 L90,60 L110,60 L130,58 L140,22 L150,58 L170,60 L190,58 L200,18 L210,58 L230,60 L250,58 L260,24 L270,58 L290,60 L310,58 L320,20 L330,58 L360,60 L400,58",
    icon: <><path d="M4 16 L27 6 L20 27 L15 18 L8 20 Z" /><line x1="15" y1="18" x2="27" y2="6" /></>,
    brain: "Similar bonding mechanisms to WhatsApp, with the added pull of large public channels and unlimited group sizes — creating a much higher volume of unread badges and a stronger sense of missing fast-moving discussions.",
    overuse: ["Notification overload from large public channels and groups", "Compulsive checking of high-frequency channels", "Message backlog anxiety when returning after time away"],
    hooks: ["Unlimited group/channel sizes generate a high volume of unread badges", "Public channels use urgency-framed headlines to drive opens", "Read receipts and online status mirror WhatsApp's reciprocity pressure"],
    tips: ["Mute high-volume channels and check them on your own schedule", "Leave channels that consistently add noise over value", "Turn off read receipts if reply-pressure feels constant"],
  },
  {
    id: "pinterest", name: "Pinterest", tagline: "Aspiration, endlessly scrollable",
    category: "Social & Visual", chemicals: ["Dopamine"],
    dop: 6, anx: 2, hook: 3, avgMinutes: 20,
    wave: "M0,60 C50,45 100,45 150,55 C200,65 250,40 300,45 C350,50 380,55 400,52",
    icon: <><circle cx="16" cy="12" r="7" /><line x1="16" y1="19" x2="16" y2="28" strokeLinecap="round" /></>,
    brain: "A visually-driven, algorithmically infinite board taps the same novelty-seeking dopamine pathway as other feeds, but centers on aspiration and self-improvement — which can quietly shift from inspiration into steady comparison against an idealized life.",
    overuse: ["Aspirational browsing that rarely converts into finished projects", "A subtle sense of falling short against curated \"ideal life\" boards", "Time loss in a feed with no clear stopping point"],
    hooks: ["Infinite, algorithmically-curated visual feed with no natural end", "Related-pins suggestions keep pulling attention sideways", "Save/board features gamify collecting over actually using content"],
    tips: ["Search for a specific idea, save it, and close the app", "Periodically act on saved pins instead of only collecting more", "Set a session timer, since visual feeds have no stopping cue"],
  },
  {
    id: "games", name: "Mobile Games", tagline: "Tuned near-misses",
    category: "Gaming", chemicals: ["Dopamine", "Cortisol"],
    dop: 9, anx: 5, hook: 5, avgMinutes: 30,
    wave: "M0,75 L30,20 L45,75 L75,20 L90,75 L120,15 L135,75 L165,20 L180,75 L210,18 L225,75 L255,22 L270,75 L300,16 L315,75 L345,20 L360,75 L390,18 L400,60",
    icon: <><rect x="4" y="12" width="24" height="12" rx="6" /><line x1="10" y1="15" x2="10" y2="21" strokeLinecap="round" /><line x1="7" y1="18" x2="13" y2="18" strokeLinecap="round" /><circle cx="22" cy="16" r="1.5" fill="currentColor" stroke="none" /><circle cx="24" cy="20" r="1.5" fill="currentColor" stroke="none" /></>,
    brain: "Level-based games use tightly tuned difficulty curves and near-miss losses to trigger dopamine even when you fail — part of why losing can feel almost as compelling as winning. Timed lives and daily rewards add scarcity and loss-aversion on top.",
    overuse: ["Compulsive returning to claim daily rewards or refill energy", "In-app purchases driven by frustration at a tuned difficulty spike", "Long sessions justified by \"just one more level\", repeatedly"],
    hooks: ["Energy/lives systems create a scarcity loop pulling you back at intervals", "Near-miss losses are tuned to feel achievable, encouraging retries", "Daily login streaks exploit loss aversion to guarantee return visits"],
    tips: ["Turn off daily reward and energy-refill notifications", "Set a fixed number of levels or minutes before starting", "Notice frustration-driven urges to pay for a shortcut, and wait it out"],
  },
  {
    id: "chatgpt", name: "ChatGPT", tagline: "Instant answers, open loop",
    category: "AI & Tools", chemicals: ["Dopamine"],
    dop: 7, anx: 3, hook: 3, avgMinutes: 25,
    wave: "M0,65 L60,63 L75,20 L90,63 L160,62 L175,18 L190,62 L260,60 L275,15 L290,60 L360,58 L375,20 L390,58 L400,58",
    icon: <><circle cx="16" cy="16" r="10" /><line x1="16" y1="9" x2="16" y2="13" strokeLinecap="round" /><line x1="16" y1="19" x2="16" y2="23" strokeLinecap="round" /><line x1="9" y1="16" x2="13" y2="16" strokeLinecap="round" /><line x1="19" y1="16" x2="23" y2="16" strokeLinecap="round" /></>,
    brain: "Getting an instant, fluent-sounding answer to almost anything triggers a small dopamine hit of resolved uncertainty, regardless of whether the answer was urgent. The conversational format invites continued back-and-forth the way texting does — every reply opens the door to one more follow-up.",
    overuse: ["Reaching for it before trying to recall or reason something out yourself", "Outsourcing thinking that would build understanding if done manually", "Open-ended chat threads with no natural stopping point"],
    hooks: ["Conversational format invites continuing exchanges rather than a single answer", "Instant, fluent responses reduce the discomfort of not knowing", "No built-in cue for when a conversation is \"done\""],
    tips: ["Attempt a problem yourself first, then use it to check or extend your thinking", "Open it with a specific question rather than open-ended browsing", "Periodically do a familiar task without it to keep the underlying skill active"],
  },
  {
    id: "google", name: "Google", tagline: "The curiosity-resolution loop",
    category: "AI & Tools", chemicals: ["Dopamine"],
    dop: 5, anx: 3, hook: 2, avgMinutes: 20,
    wave: "M0,70 L70,68 L85,25 L100,68 L200,66 L215,22 L230,66 L330,64 L345,20 L360,64 L400,64",
    icon: <><circle cx="14" cy="14" r="8" /><line x1="20" y1="20" x2="26" y2="26" strokeLinecap="round" /></>,
    brain: "Search taps a simple curiosity-resolution loop — ask, get an answer, feel a small hit of closure. Because there's almost no friction, one search often leads to another, especially when results branch into unrelated but interesting tangents.",
    overuse: ["Tangential searching that drifts far from the original question", "Reflexively searching instead of sitting with not-knowing for a moment", "Time loss following link after link with no clear endpoint"],
    hooks: ["Autocomplete suggestions nudge toward searches you weren't planning", "\"People also ask\" and related searches invite one more click", "Almost zero friction between a passing thought and acting on it"],
    tips: ["Give yourself a few seconds to try recalling before searching", "Search with a specific question in mind rather than open browsing", "Close the tab once the original question is actually answered"],
  },
  {
    id: "chrome", name: "Chrome", tagline: "The gateway, not the hook",
    category: "AI & Tools", chemicals: ["Dopamine"],
    dop: 4, anx: 3, hook: 2, avgMinutes: 45,
    wave: "M0,75 L120,73 L135,55 L150,73 L280,73 L295,50 L310,73 L400,72",
    icon: <><rect x="4" y="6" width="24" height="20" rx="4" /><line x1="4" y1="12" x2="28" y2="12" /><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" /></>,
    brain: "A browser isn't designed to hook you on its own — it's the gateway to everything that is. But a pile of open tabs creates a low-grade cognitive load the brain treats as unfinished business, and the ease of opening \"just one more tab\" means intention drifts quickly from the original task.",
    overuse: ["Tab hoarding — dozens of open tabs representing undone tasks", "Starting one task and drifting into unrelated browsing within minutes", "General screen fatigue from being the entry point to every other app"],
    hooks: ["The New Tab page surfaces suggested or trending content on every open", "No built-in friction between opening the browser and opening a distraction", "Multiple open tabs make it easy to half-attend to several things at once"],
    tips: ["Close tabs once their task is done instead of leaving them open", "Use a separate, distraction-free profile for focused work", "Bookmark a page to revisit later instead of leaving it open as a reminder"],
  },
  {
    id: "nykaa", name: "Nykaa", tagline: "Aspiration meets checkout",
    category: "Utility & Shopping", chemicals: ["Dopamine", "Cortisol"],
    dop: 7, anx: 4, hook: 3, avgMinutes: 15,
    wave: "M0,72 L80,70 L95,25 L110,70 L220,68 L235,20 L250,68 L360,66 L375,18 L390,66 L400,65",
    icon: <><rect x="11" y="12" width="10" height="16" rx="3" /><rect x="13" y="6" width="6" height="6" rx="1.5" /></>,
    brain: "Beauty and lifestyle shopping apps combine the same scarcity and deal mechanics as general e-commerce with an added layer of aspirational imagery — browsing product visuals and reviews taps novelty-seeking dopamine, while influencer-style content adds a comparison layer closer to social media than shopping.",
    overuse: ["Impulse beauty purchases driven by influencer content rather than actual need", "Comparing your own routine or appearance to curated brand imagery", "Browsing sessions that start with one product and end in unrelated categories"],
    hooks: ["Limited-time sales and flash-deal banners manufacture urgency", "Influencer and review content blurs the line between inspiration and advertising", "Personalized recommendations keep surfacing products outside active need"],
    tips: ["Add to wishlist and revisit after 48 hours instead of buying immediately", "Unfollow accounts if browsing regularly triggers comparison", "Shop with a specific product in mind rather than general browsing"],
  },
  {
    id: "zoom", name: "Zoom", tagline: "The self-monitoring strain",
    category: "Messaging", chemicals: ["Cortisol"],
    dop: 2, anx: 5, hook: 1, avgMinutes: 50,
    wave: "M0,60 L20,55 L40,58 L60,52 L300,50 L320,55 L340,50 L360,54 L400,52",
    icon: <><rect x="4" y="10" width="16" height="12" rx="3" /><path d="M20 14 L27 10 L27 22 L20 18 Z" /></>,
    brain: "Video calls demand a specific kind of sustained self-monitoring — seeing your own face on screen while talking activates self-evaluation circuitry that a phone call never triggers, part of what's now commonly called \"Zoom fatigue.\" Back-to-back meetings remove the natural micro-breaks that in-person transitions used to provide.",
    overuse: ["A distinct tiredness from sustained video self-monitoring, separate from ordinary fatigue", "Back-to-back calls with no transition time between them", "Reduced attention during calls from managing your own on-screen appearance"],
    hooks: ["Not engineered for retention like social apps — the strain comes from the format itself, not manipulation", "Self-view is on by default, keeping you watching yourself instead of the conversation", "Calendar-driven scheduling makes back-to-back calls the easy default"],
    tips: ["Turn off self-view once a call starts", "Build 5-10 minute buffers between meetings where you can", "Default to audio-only when video isn't actually necessary"],
  },
  {
    id: "uber", name: "Uber", tagline: "The live countdown",
    category: "Utility & Shopping", chemicals: ["Cortisol"],
    dop: 4, anx: 4, hook: 2, avgMinutes: 8,
    wave: "M0,70 L60,68 L70,15 L85,68 L200,66 L400,64",
    icon: <><path d="M6 20 L8 13 A3 3 0 0 1 11 11 L21 11 A3 3 0 0 1 24 13 L26 20" /><rect x="4" y="20" width="24" height="6" rx="2" /><circle cx="10" cy="26" r="1.6" fill="currentColor" stroke="none" /><circle cx="22" cy="26" r="1.6" fill="currentColor" stroke="none" /></>,
    brain: "Real-time driver tracking creates a live countdown that keeps attention locked on the app until pickup, a similar anticipation loop to food-delivery tracking. Surge pricing adds scarcity-driven urgency to book now rather than wait it out.",
    overuse: ["Checking the tracking map repeatedly instead of doing something else while waiting", "Booking rides reflexively for short distances that could be walked", "Mild stress from watching ETA countdowns on time-sensitive trips"],
    hooks: ["Live driver-tracking map keeps attention locked during the wait", "Surge pricing creates urgency to book immediately rather than wait it out", "One-tap rebooking of recent trips removes planning friction"],
    tips: ["Book, then put the phone away until the driver is close", "Compare a quick walk or transit option before defaulting to a ride", "Check price trends if a trip isn't urgent — surge pricing often settles"],
  },
  {
    id: "phonepe", name: "PhonePe", tagline: "Small stakes, frequent checks",
    category: "Utility & Shopping", chemicals: ["Cortisol"],
    dop: 3, anx: 5, hook: 2, avgMinutes: 10,
    wave: "M0,65 L30,63 L38,40 L46,63 L90,62 L98,38 L106,62 L160,60 L168,36 L176,60 L230,58 L238,34 L246,58 L300,56 L308,32 L316,56 L370,54 L378,30 L386,54 L400,54",
    icon: <><rect x="4" y="9" width="24" height="17" rx="3" /><line x1="4" y1="14" x2="28" y2="14" /><circle cx="22" cy="19" r="1.8" fill="currentColor" stroke="none" /></>,
    brain: "Payment apps carry real financial stakes, so every transaction triggers a small vigilance response distinct from entertainment apps — checking whether a payment went through, whether a balance is correct. Frequent small transactions mean the app gets opened many times a day for brief, stress-tinged checks rather than leisure scrolling.",
    overuse: ["Repeatedly checking transaction history or balance out of financial anxiety", "Notification overload from every incoming and outgoing payment", "Mild stress spikes around each payment confirmation"],
    hooks: ["Cashback and reward offers encourage opening the app even without a payment to make", "Transaction notifications interrupt regardless of urgency", "Scratch-card-style reward animations gamify routine payments"],
    tips: ["Turn off promotional cashback notifications, keep only payment confirmations", "Check balance and history at set times rather than after every transaction", "Use a monthly summary view instead of per-transaction checking"],
  },
  {
    id: "threads", name: "Threads", tagline: "X's feed, a newer coat of paint",
    category: "Social & Visual", chemicals: ["Dopamine", "FOMO"],
    dop: 6, anx: 5, hook: 3, avgMinutes: 15,
    wave: "M0,68 L30,64 L55,30 L80,66 L110,45 L140,64 L170,25 L200,60 L230,42 L260,64 L290,32 L320,58 L350,44 L400,54",
    icon: <><circle cx="16" cy="15" r="10" /><circle cx="16" cy="15" r="2" fill="currentColor" stroke="none" /></>,
    brain: "Runs on the same short-form, algorithmically-ranked feed logic as X, layered onto an existing follower graph — novelty and social proof combine to pull attention quickly, even in a feed still finding its personality.",
    overuse: ["Checking two similar feeds instead of one, doubling scroll time", "Following the same conversations across both apps", "Comparison and outrage patterns similar to X, just newer"],
    hooks: ["Algorithmic ranking surfaces engagement-bait over chronological posts", "Cross-posting from Instagram keeps the graph active from day one", "Trending topics create the same urgency loop as X"],
    tips: ["Pick one text-based feed to actually check, not both", "Use a following-only feed instead of the algorithmic one", "Mute topics that reliably spike reactive posting"],
  },
  {
    id: "messenger", name: "Messenger", tagline: "WhatsApp's pressure, more public",
    category: "Messaging", chemicals: ["Oxytocin", "Cortisol"],
    dop: 5, anx: 5, hook: 3, avgMinutes: 20,
    wave: "M0,60 L20,58 L30,28 L40,58 L70,58 L90,60 L100,24 L110,60 L140,60 L160,58 L170,26 L180,58 L210,60 L240,58 L250,22 L260,58 L290,60 L320,58 L400,58",
    icon: <><path d="M6 14 A10 9 0 1 1 12 24 L7 27 L8 21 A9 9 0 0 1 6 14 Z" /></>,
    brain: "Same read-receipt and active-status pressure as WhatsApp, layered onto a more public social graph — replies can feel doubly obligatory, once for the message and once for the relationship it represents.",
    overuse: ["Duplicate checking habits — WhatsApp and Messenger both opened out of reflex", "Guilt over slow replies on a more visible platform", "Group chat notification overload similar to other messengers"],
    hooks: ["Read receipts and active status mirror WhatsApp's reciprocity pressure", "Reactions and stickers gamify quick, low-effort responses", "Birthday and memory prompts pull you back for reasons unrelated to messages"],
    tips: ["Consolidate to one primary messaging app where possible", "Turn off active status if reply-pressure feels constant", "Mute low-priority group threads"],
  },
  {
    id: "truecaller", name: "Truecaller", tagline: "A rare low-hook utility",
    category: "Messaging", chemicals: ["Cortisol"],
    dop: 2, anx: 4, hook: 1, avgMinutes: 5,
    wave: "M0,82 L120,80 L135,72 L150,80 L260,80 L275,74 L290,80 L400,82",
    icon: <><path d="M16 5 L26 9 L26 16 C26 22 21 26 16 28 C11 26 6 22 6 16 L6 9 Z" /><path d="M11 16 L15 20 L22 12" /></>,
    brain: "A genuinely low-hook utility — its core function, identifying unknown numbers, reduces anticipatory call anxiety rather than creating it. The main psychological cost here is the personal data it collects to work, not attention capture.",
    overuse: ["Rarely a time-sink itself — the real concern is data-sharing, not compulsive use", "Some curiosity-checking of spam-call logs beyond what's needed"],
    hooks: ["Minimal engagement hooks — built for quick lookups, not sessions", "Ad-supported free tier nudges toward premium upsells"],
    tips: ["Review what contact data the app can access periodically", "Use it for caller ID, not as a browsing app"],
  },
  {
    id: "gpay-paytm", name: "Google Pay & Paytm", tagline: "UPI's other scratch cards",
    category: "Utility & Shopping", chemicals: ["Dopamine"],
    dop: 5, anx: 3, hook: 3, avgMinutes: 8,
    wave: "M0,72 L60,70 L75,20 L90,70 L200,68 L215,15 L230,68 L320,66 L335,18 L350,66 L400,64",
    icon: <><circle cx="16" cy="16" r="11" /><line x1="11" y1="12" x2="19" y2="12" strokeLinecap="round" /><line x1="11" y1="16" x2="17" y2="16" strokeLinecap="round" /><path d="M11 16 L18 22" strokeLinecap="round" /></>,
    brain: "Runs on the same UPI mechanics as PhonePe — transaction confirmations and scratch-card cashback trigger quick dopamine hits, and gamified reward wheels turn routine bill payments into a small slot-machine moment.",
    overuse: ["Opening the app just to check for cashback eligibility", "Chasing scratch-card rewards past any real payment need", "Spending more at partner merchants purely to unlock offers"],
    hooks: ["Scratch cards and spin-the-wheel rewards gamify plain transactions", "Streak-based cashback (\"pay 5 days running\") encourages daily opens", "Push notifications for expiring offers create urgency"],
    tips: ["Turn off promotional notifications, keep only transaction alerts", "Treat cashback as a bonus, not a reason to spend", "Pick one default payment app instead of checking three for the best offer"],
  },
  {
    id: "flipkart-myntra", name: "Flipkart & Myntra", tagline: "Amazon's mechanics, fashion's urgency",
    category: "Utility & Shopping", chemicals: ["Dopamine", "Cortisol"],
    dop: 6, anx: 4, hook: 3, avgMinutes: 15,
    wave: "M0,72 L50,68 L65,25 L80,68 L160,66 L175,18 L190,66 L280,64 L295,20 L310,64 L400,60",
    icon: <><path d="M18 5 L27 14 L14 27 L5 18 Z" /><circle cx="20" cy="12" r="1.6" fill="currentColor" stroke="none" /></>,
    brain: "Amazon's one-click, scarcity-driven mechanics, tuned further for fashion — wishlist and \"selling fast\" badges add social-proof urgency, and flash-sale events compress buying decisions into countdown windows.",
    overuse: ["Wishlist browsing that substitutes for actual purchase decisions", "Flash-sale FOMO leading to purchases outside normal budget", "Frequent app opens just to check price drops on saved items"],
    hooks: ["Countdown timers on flash sales manufacture urgency", "\"Only a few left\" and \"trending\" badges add social-proof pressure", "Price-drop notifications on wishlist items pull you back repeatedly"],
    tips: ["Turn off price-drop and sale notifications", "Let wishlist items sit a week before buying", "Shop with a list, not by browsing the sale page"],
  },
  {
    id: "meesho", name: "Meesho", tagline: "Discounts with a friend's face on them",
    category: "Utility & Shopping", chemicals: ["Dopamine", "FOMO"],
    dop: 5, anx: 3, hook: 3, avgMinutes: 12,
    wave: "M0,68 L40,62 L55,30 L70,62 L140,60 L155,25 L170,60 L250,58 L265,22 L280,58 L360,56 L400,54",
    icon: <><rect x="9" y="14" width="14" height="12" rx="2" /><path d="M16 14 L16 8 M12 11 L16 8 L20 11" strokeLinecap="round" strokeLinejoin="round" /></>,
    brain: "The resale-and-share model adds a social layer Amazon and Flipkart don't have — deep discounts are often shared directly in WhatsApp groups, so the purchase impulse arrives pre-loaded with social proof from someone you know, not an algorithm.",
    overuse: ["Buying because a trusted contact shared it, not from real need", "Browsing very low-priced items past the point of any plan", "Resellers checking order and rating updates more than needed"],
    hooks: ["Deep, frequently-changing discounts create constant novelty", "WhatsApp-shareable links import social proof from real contacts", "Very low price points lower the mental bar for impulse buying"],
    tips: ["Pause before buying something shared by a friend — check if you need it", "Set a monthly cap for impulse-priced items", "Mute resale/shopping WhatsApp groups that trigger browsing"],
  },
  {
    id: "quickcommerce", name: "Quick Commerce", tagline: "Craving to doorstep in 10 minutes",
    category: "Utility & Shopping", chemicals: ["Dopamine"],
    dop: 7, anx: 3, hook: 4, avgMinutes: 8,
    wave: "M0,65 L20,60 L30,15 L40,60 L60,65 L80,60 L90,15 L100,60 L120,65 L140,60 L150,15 L160,60 L180,65 L200,60 L210,15 L220,60 L240,65 L260,60 L270,15 L280,60 L300,65 L320,60 L330,15 L340,60 L360,65 L380,60 L390,15 L400,55",
    icon: <><path d="M18 4 L9 18 L15 18 L13 28 L24 13 L18 13 Z" /></>,
    brain: "Blinkit, Zepto and Instamart compress the gap between wanting something and getting it to almost nothing — exactly the low-friction condition that trains impulsive buying. The delivery countdown timer becomes its own small dopamine event.",
    overuse: ["Ordering single small items that used to wait for a proper shopping trip", "Checking the delivery countdown repeatedly out of habit", "Grocery planning replaced by reactive, in-the-moment ordering"],
    hooks: ["The delivery countdown timer is a mini reward-anticipation loop", "Extremely low friction between craving and purchase", "Frequent small discounts encourage frequent small orders instead of one planned one"],
    tips: ["Batch small needs into a weekly list instead of ordering per craving", "Notice when you're ordering from impulse versus real need", "Turn off order-time push notifications between deliveries"],
  },
  {
    id: "dating", name: "Dating Apps", tagline: "Swiping as its own reward",
    category: "Dating & Connection", chemicals: ["Dopamine", "Cortisol", "FOMO"],
    dop: 8, anx: 7, hook: 4, avgMinutes: 35,
    wave: "M0,60 L30,55 L45,15 L60,55 L90,60 L120,55 L135,12 L150,55 L180,60 L210,55 L225,10 L240,55 L270,60 L300,55 L315,14 L330,55 L360,60 L400,55",
    icon: <><path d="M16 26 C6 19 6 11 12 9 C14.5 8 16 10 16 12 C16 10 17.5 8 20 9 C26 11 26 19 16 26 Z" /></>,
    brain: "Tinder, Bumble and Hinge run on the same variable-ratio reward system as social feeds — you don't know which swipe brings a match, so the brain treats each one like a small bet. A match delivers its own dopamine hit, often bigger than the conversation that follows.",
    overuse: ["Swiping as a standalone activity, disconnected from any intent to actually meet someone", "Match-collecting without following through on conversations", "Self-worth tracking through match count or response rate, fueling rejection sensitivity"],
    hooks: ["Variable-ratio matching makes each swipe a small gamble", "The match notification is engineered as its own reward, separate from conversation", "Limited daily likes on free tiers create scarcity that pushes paid upgrades"],
    tips: ["Set a specific window for swiping rather than checking throughout the day", "Message matches promptly instead of collecting them", "Notice if match count is standing in for self-worth, and take breaks when it does"],
  },
  {
    id: "fitness", name: "Fitness & Health Trackers", tagline: "The body, turned into a feed",
    category: "Health & Fitness", chemicals: ["Dopamine", "Cortisol"],
    dop: 5, anx: 5, hook: 3, avgMinutes: 15,
    wave: "M0,70 C60,55 100,55 140,45 C190,35 230,25 270,20 C310,16 350,14 400,12",
    icon: <><path d="M4 17 L10 17 L13 9 L18 25 L21 17 L28 17" strokeLinecap="round" strokeLinejoin="round" /></>,
    brain: "Strava, MyFitnessPal, Mi Fitness and Flo turn ordinary activity into a stream of numbers with built-in comparison — Strava's \"kudos\" function like likes on a feed, while calorie and cycle trackers turn a private bodily process into a number checked compulsively. Streaks add loss aversion on top.",
    overuse: ["Checking stats obsessively instead of just doing the activity", "Comparing your numbers to friends' or strangers' feeds", "Anxiety when a streak is at risk, or a logged number looks \"wrong\""],
    hooks: ["Kudos and likes turn workouts into a social broadcast", "Streaks exploit loss aversion the same way Snapchat's do", "Detailed daily numbers create a checking habit independent of the activity itself"],
    tips: ["Use these apps to inform decisions, not to score yourself daily", "Turn off social feed features if comparison creeps in", "Let a streak break occasionally on purpose to loosen its grip"],
  },
  {
    id: "ridehailing", name: "Ola & Rapido", tagline: "Uber's countdown, two more ways",
    category: "Travel & Transit", chemicals: ["Cortisol"],
    dop: 3, anx: 4, hook: 2, avgMinutes: 8,
    wave: "M0,68 L60,64 L75,30 L90,64 L180,62 L195,28 L210,62 L300,60 L315,26 L330,60 L400,58",
    icon: <><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="3" /><line x1="16" y1="5" x2="16" y2="9" /><line x1="16" y1="23" x2="16" y2="27" /><line x1="5" y1="16" x2="9" y2="16" /><line x1="23" y1="16" x2="27" y2="16" /></>,
    brain: "Same live-countdown mechanic as Uber — watching a driver icon approach creates real-time anticipation, and surge pricing adds urgency to book now before the price rises further. Ratings on both sides add a layer of social-performance pressure.",
    overuse: ["Repeatedly refreshing the map while waiting instead of doing something else", "Price-anxiety from checking a fare multiple times before booking", "Rating pressure influencing behavior beyond the ride itself"],
    hooks: ["Live driver-tracking creates continuous anticipation", "Surge pricing manufactures urgency to book immediately", "Ratings on both sides add social-performance pressure to every ride"],
    tips: ["Book and put the phone away instead of watching the map continuously", "Compare fares once, then commit, rather than re-checking", "Remember ratings are a rough signal, not a verdict on you"],
  },
  {
    id: "ott", name: "Other OTT Platforms", tagline: "Netflix's playbook, live sports added",
    category: "Video & Audio", chemicals: ["Dopamine", "FOMO"],
    dop: 6, anx: 3, hook: 3, avgMinutes: 40,
    wave: "M0,82 C60,78 100,55 150,38 C220,22 280,20 330,20 L360,20 C380,52 390,72 400,78",
    icon: <><rect x="5" y="8" width="22" height="15" rx="3" /><path d="M13 12 L20 15.5 L13 19 Z" fill="currentColor" stroke="none" /><line x1="12" y1="27" x2="20" y2="27" strokeLinecap="round" /></>,
    brain: "JioCinema, Hotstar, Prime Video and Kuku TV share Netflix's autoplay-and-cliffhanger mechanics, with live sports and weekly appointment drops adding a second pull — the fear of missing a live moment everyone else is watching in real time.",
    overuse: ["Binge sessions extending past a planned episode or match", "Staying up for live sports well past a planned bedtime", "Subscribing to multiple services at once to avoid missing anything"],
    hooks: ["Autoplay-next-episode removes the natural stopping point", "Live sports and appointment drops add real-time FOMO on top of binge mechanics", "Overlapping subscriptions are normalized to avoid missing content"],
    tips: ["Turn off autoplay where the platform allows it", "Decide episode or match count before starting, not after", "Rotate subscriptions monthly instead of holding all at once"],
  },
  {
    id: "battleroyale", name: "Battle Royale Games", tagline: "One more match, every time",
    category: "Gaming", chemicals: ["Dopamine", "Cortisol"],
    dop: 9, anx: 6, hook: 5, avgMinutes: 40,
    wave: "M0,58 L15,20 L30,58 L50,55 L65,10 L80,55 L100,58 L115,15 L130,58 L150,55 L165,8 L180,55 L200,58 L215,18 L230,58 L250,55 L265,12 L280,55 L300,58 L315,20 L330,58 L350,55 L365,10 L380,55 L400,58",
    icon: <><circle cx="16" cy="16" r="9" /><line x1="16" y1="3" x2="16" y2="9" /><line x1="16" y1="23" x2="16" y2="29" /><line x1="3" y1="16" x2="9" y2="16" /><line x1="23" y1="16" x2="29" y2="16" /></>,
    brain: "PUBG and Free Fire combine the near-miss dopamine loop of casual games with real social stakes — squad play adds accountability pressure, and each match's random loot and placement outcome keeps the variable-reward loop running match after match.",
    overuse: ["\"One more match\" repeating for hours since each round is short but the loop never ends", "Squad obligation pressure to keep playing past your own intent", "Frustration-driven purchases for cosmetics or battle passes"],
    hooks: ["Short match length makes \"just one more\" easy to justify repeatedly", "Squad-based play adds social accountability that keeps you logged in", "Battle passes and season resets create recurring reasons to return"],
    tips: ["Set a fixed number of matches before starting a session", "Tell your squad your actual availability upfront", "Let battle passes lapse occasionally — the content resets regardless"],
  },
  {
    id: "casualgames", name: "Ludo, Runner & Sandbox Games", tagline: "Three hooks in one category",
    category: "Gaming", chemicals: ["Dopamine", "FOMO"],
    dop: 7, anx: 3, hook: 4, avgMinutes: 25,
    wave: "M0,75 L25,20 L45,75 L70,20 L90,75 L115,20 L135,75 L160,20 L180,75 L205,20 L225,75 L250,20 L270,75 L295,20 L315,75 L340,20 L360,75 L385,20 L400,50",
    icon: <><rect x="6" y="6" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" /><circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" /></>,
    brain: "Ludo King adds real-money-adjacent stakes and social pressure from friends waiting in a lobby. Subway Surfers uses a simple, endless, low-effort loop with no real stopping point. Roblox adds identity investment through avatars and its own currency, which makes spending feel like customizing yourself rather than buying an item.",
    overuse: ["Lobby-waiting pressure in multiplayer rounds keeping sessions going past intent", "Endless-runner games filling every small gap in the day", "In-game currency purchases that don't feel like real spending until the bill arrives"],
    hooks: ["Multiplayer lobbies create social pressure to stay and finish a round", "Endless-runner formats have no natural stopping point by design", "Virtual currency abstracts real money, lowering spending friction"],
    tips: ["Set a timer before starting an endless-runner session", "Agree on a stopping point with friends before a round starts", "Check the real-money value of in-game currency before purchasing"],
  },
  {
    id: "productivity", name: "Docs, Sheets & Office Suites", tagline: "This list's control group",
    category: "AI & Tools", chemicals: ["Cortisol"],
    dop: 2, anx: 3, hook: 1, avgMinutes: 60,
    wave: "M0,78 L100,76 L115,68 L130,76 L260,76 L275,66 L290,76 L400,78",
    icon: <><path d="M10 4 L20 4 L24 8 L24 28 L10 28 Z" /><path d="M20 4 L20 8 L24 8" /><line x1="13" y1="14" x2="21" y2="14" /><line x1="13" y1="19" x2="21" y2="19" /><line x1="13" y1="24" x2="18" y2="24" /></>,
    brain: "Google Docs, Sheets, Drive, Classroom, Microsoft 365, WPS Office and Notion are useful as a contrast case — built for output, not retention, so most have very little engineered hook. The real cost isn't addiction, it's low-grade background stress from comment pings and a tab that never quite lets work end.",
    overuse: ["Leaving tabs open all day, blurring when work actually stops", "Comment and mention notifications interrupting focus repeatedly", "Notion-style organizing becoming a hobby that replaces the actual work"],
    hooks: ["Minimal manipulative design — largely a control group in this list", "Comment/mention notifications create a mild open-loop similar to email", "Template galleries can turn setup into its own time sink"],
    tips: ["Close documents when a task is done rather than leaving them open indefinitely", "Batch-check comments rather than reacting to each one", "Notice if organizing your system has quietly replaced doing the work"],
  },
  {
    id: "github", name: "GitHub", tagline: "Streak psychology, productively aimed",
    category: "AI & Tools", chemicals: ["Dopamine"],
    dop: 3, anx: 2, hook: 1, avgMinutes: 30,
    wave: "M0,76 L80,74 L95,64 L110,74 L200,74 L215,60 L230,74 L320,72 L335,58 L350,72 L400,70",
    icon: <><path d="M11 10 L5 16 L11 22" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 10 L27 16 L21 22" strokeLinecap="round" strokeLinejoin="round" /></>,
    brain: "Another low-hook control case — the main engagement mechanic is the contribution graph, which uses the same streak-based loss aversion as Snapchat or Duolingo, just aimed at a productive habit instead of a passive one.",
    overuse: ["Chasing an unbroken streak with trivial commits just to keep the graph green", "Checking stars/followers on personal repos more than the code needs"],
    hooks: ["The contribution graph applies streak psychology to productive behavior", "Stars and followers add a small social-validation layer to a work tool"],
    tips: ["Let the streak break when a real day off is needed — the graph isn't the goal", "Keep the focus on what you're building, not the activity visualization"],
  },
  {
    id: "otherai", name: "Gemini, Grok, DeepSeek & Perplexity", tagline: "ChatGPT's mechanics, a few flavors",
    category: "AI & Tools", chemicals: ["Dopamine"],
    dop: 5, anx: 2, hook: 2, avgMinutes: 15,
    wave: "M0,70 L60,66 L80,25 L100,66 L200,64 L220,20 L240,64 L320,62 L340,22 L360,62 L400,58",
    icon: <><path d="M16 4 L18.5 13.5 L28 16 L18.5 18.5 L16 28 L13.5 18.5 L4 16 L13.5 13.5 Z" /></>,
    brain: "These largely share ChatGPT's core mechanic — instant, fluent answers that shortcut the effortful part of thinking, satisfying but quietly reducing tolerance for not knowing something immediately. Perplexity leans further into replacing search itself, compressing the browsing-and-evaluating process people used to do manually.",
    overuse: ["Asking before attempting your own first-draft thinking, even for simple tasks", "Treating a fluent, confident answer as automatically correct without checking it", "Perplexity replacing the habit of comparing multiple sources yourself"],
    hooks: ["Instant, confident-sounding answers remove the discomfort of not knowing", "Conversational format encourages open-ended, extended sessions", "Cited-answer formats can feel authoritative even when a claim is thin"],
    tips: ["Try your own first pass before asking, even a rough one", "Spot-check confident answers against a real source occasionally", "Use these tools to speed up thinking, not to skip it"],
  },
  {
    id: "traveltransit", name: "Airbnb, Trip.com & Where is my Train", tagline: "Window-shopping, mostly harmless",
    category: "Travel & Transit", chemicals: ["Dopamine", "Cortisol"],
    dop: 4, anx: 3, hook: 2, avgMinutes: 10,
    wave: "M0,78 L90,76 L105,55 L120,76 L230,76 L245,50 L260,76 L370,76 L385,52 L400,76",
    icon: <><rect x="6" y="12" width="20" height="14" rx="2" /><path d="M12 12 L12 8 A2 2 0 0 1 14 6 L18 6 A2 2 0 0 1 20 8 L20 12" /></>,
    brain: "Mostly low-hook utility apps — the pull is largely aspirational browsing (scrolling stays you can't currently afford, similar to Pinterest) rather than engineered retention, plus mild anxiety-checking around live train or booking status.",
    overuse: ["Aspirational browsing of destinations with no actual trip planned", "Repeatedly refreshing live status screens out of anxiety, not need"],
    hooks: ["Scarcity messaging (\"only 2 rooms left\") mirrors e-commerce urgency tactics", "Aspirational photography encourages window-shopping sessions"],
    tips: ["Set a specific trip-planning session rather than open-ended browsing", "Check live status once, then trust it, rather than refreshing repeatedly"],
  },
];

const CATEGORY_ORDER = ["Social & Visual", "Messaging", "Video & Audio", "Info & Community", "AI & Tools", "Dating & Connection", "Health & Fitness", "Travel & Transit", "Utility & Shopping", "Gaming"];

const DETOX_TEMPLATES = [
  {
    id: "notif-batch", title: "3x-a-Day Notification Batching", days: 14, tag: "Notifications",
    desc: "Check notifications only at three set times a day instead of the moment they arrive. A controlled trial found batching reduced stress and improved mood versus constant alerts — while switching notifications off completely backfired into more anxiety and FOMO.",
    source: "Fitz, Kushlev, Jagannathan, Lewis, Paliwal & Ariely (2019), Computers in Human Behavior — RCT, n=237",
  },
  {
    id: "email-cap", title: "3x-a-Day Email Check Cap", days: 7, tag: "Email",
    desc: "Limit yourself to checking email three times a day instead of continuously. A two-week field experiment found this cap significantly lowered daily stress compared to unlimited checking.",
    source: "Kushlev & Dunn (2015), Computers in Human Behavior — field experiment, n=124",
  },
  {
    id: "grayscale", title: "7-Day Grayscale Challenge", days: 7, tag: "Visual Cues",
    desc: "Switch your screen to grayscale for a week (Settings → Accessibility → Color Filters). Removing color makes feeds and icons less visually rewarding — studies comparing greyscale mode to other interventions found it measurably reduced pickups and built more self-awareness of automatic checking.",
    source: "Reviewed in InnerDrive (2024); consistent with B.J. Fogg's cue-based behavior model, Stanford Behavior Design Lab",
  },
  {
    id: "homescreen-reset", title: "Home Screen Reset", days: 5, tag: "Environment Design",
    desc: "Move your highest-pull apps off the home screen into a folder, so opening them takes a deliberate search instead of one tap. Removing the visible cue reduces automatic, unplanned checking — HCI researchers found that even removing a feed on desktop increased people's felt sense of control over their use.",
    source: "Lyngs et al., digital self-control research, Oxford Internet Institute",
  },
  {
    id: "gradual-reduction", title: "7-Day Gradual Reduction", days: 7, tag: "Sustainable Change",
    desc: "Instead of quitting an app cold turkey, cut your single highest-usage app by about an hour a day for a week. A randomized trial found gradual reduction produced well-being gains on par with full abstinence — and was easier to sustain.",
    source: "Brailovskaia et al. (2023), Journal of Experimental Psychology: Applied — RCT, n=619",
  },
];

/* ================================================================== */
/* STORAGE — plain localStorage wrapper (works in any deployed build)  */
/* ================================================================== */

const storage = {
  async get(key) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? { key, value: v } : null;
    } catch (e) { return null; }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (e) { return null; }
  },
  async delete(key) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch (e) { return null; }
  },
};

const REFERENCES = [
  { title: "Batching smartphone notifications can improve well-being", authors: "Fitz, Kushlev, Jagannathan, Lewis, Paliwal & Ariely", year: 2019, venue: "Computers in Human Behavior, 101, 84–94", note: "RCT, n=237 — batching notifications 3x/day cut stress and improved mood; switching notifications off entirely increased anxiety and FOMO.", url: "https://doi.org/10.1016/j.chb.2019.07.016" },
  { title: "Checking email less frequently reduces stress", authors: "Kushlev & Dunn", year: 2015, venue: "Computers in Human Behavior, 43, 220–228", note: "Field experiment, n=124 — capping email checks to three times a day significantly lowered daily stress versus unlimited checking.", url: "https://doi.org/10.1016/j.chb.2014.11.005" },
  { title: "Digital detox: An effective solution in the smartphone era? A systematic literature review", authors: "Radtke, Apel, Schenkel, Keller & von Lindern", year: 2022, venue: "Mobile Media & Communication", note: "Review of 21 studies (12 RCTs) — found effects of full smartphone/app abstinence are inconsistent across outcomes, which is why this app favors structural changes over cold-turkey challenges.", url: "https://journals.sagepub.com/doi/10.1177/20501579211028647" },
  { title: "Finding the \"sweet spot\" of smartphone use: Reduction or abstinence to increase well-being and healthy lifestyle?!", authors: "Brailovskaia et al.", year: 2023, venue: "Journal of Experimental Psychology: Applied, 29(1), 149–161", note: "RCT, n=619 — a modest daily reduction produced well-being gains on par with full 7-day abstinence, and was easier to sustain.", url: "" },
  { title: "Greyscale mode and screen time in students", authors: "Reviewed by InnerDrive", year: 2024, venue: "InnerDrive research summary", note: "Comparison of greyscale mode against relocating apps on the home screen as screen-time interventions.", url: "https://www.innerdrive.co.uk/blog/help-students-use-phones-less/" },
  { title: "Imagining, Studying and Realising a Less Harmful App Ecosystem", authors: "Lyngs et al. (cited within)", year: 2022, venue: "arXiv:2205.00774", note: "HCI research — removing a feed from view increased users' felt sense of control over their own use.", url: "https://arxiv.org/pdf/2205.00774" },
];

/* ================================================================== */
/* HELPERS                                                             */
/* ================================================================== */

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function computeReport(selections) {
  const chosen = APPS.filter((a) => selections[a.id] != null);
  if (chosen.length === 0) return null;
  let totalHours = 0, wDop = 0, wAnx = 0;
  const contributions = chosen.map((a) => {
    const h = selections[a.id];
    totalHours += h;
    wDop += h * a.dop;
    wAnx += h * a.anx;
    return { app: a, hours: h, load: h * (a.dop + a.anx) };
  });
  const avgDop = wDop / totalHours;
  const avgAnx = wAnx / totalHours;
  const dopScore = Math.round(avgDop * 10);
  const anxScore = Math.round(avgAnx * 10);
  const overall = Math.round(((avgDop + avgAnx) / 2) * 10);
  const top3 = [...contributions].sort((a, b) => b.load - a.load).slice(0, 3);

  let band;
  if (overall <= 35) band = { label: "Balanced", color: "teal", desc: "Your current mix looks manageable — reward-seeking and stress signals from these apps are roughly in line with light, intentional use." };
  else if (overall <= 60) band = { label: "Moderate Load", color: "amber", desc: "A few apps are pulling more than their share of attention. Small boundaries around your top contributors below would go a long way." };
  else if (overall <= 80) band = { label: "High Load", color: "amber", desc: "Your daily mix leans heavily on high-dopamine, high-anxiety apps. Structural changes — notifications off, session timers — will help more than willpower alone." };
  else band = { label: "Overloaded", color: "rose", desc: "This combination is a lot for one nervous system to carry daily. Start with just your single biggest contributor below before touching anything else." };

  return { totalHours, dopScore, anxScore, overall, band, top3 };
}

/* ---------------- Digital Behavior Coach ---------------- */

const REASONS = [
  { key: "bored", label: "I felt bored" },
  { key: "lonely", label: "I felt lonely" },
  { key: "learn", label: "I wanted to learn" },
  { key: "friend", label: "Friends sent me something" },
  { key: "business", label: "Business" },
  { key: "entertainment", label: "Entertainment" },
  { key: "relax", label: "Relax" },
  { key: "habit", label: "Habit" },
];
const DURATIONS = [
  { key: "15", label: "15 min", minutes: 15 },
  { key: "30", label: "30 min", minutes: 30 },
  { key: "60", label: "1 hour", minutes: 60 },
  { key: "120", label: "2 hours", minutes: 120 },
  { key: "240", label: "4+ hours", minutes: 240 },
];
const NOTIF_OPTS = [
  { key: "always", label: "Always ON" },
  { key: "sometimes", label: "Sometimes" },
  { key: "off", label: "OFF" },
];
const FEELINGS = [
  { key: "better", label: "Better", emoji: "😊" },
  { key: "same", label: "Same", emoji: "😐" },
  { key: "worse", label: "Worse", emoji: "🙁" },
];
const PURPOSE_MAP = { bored: "Entertainment", lonely: "Connection", learn: "Learning", friend: "Connection", business: "Productivity", entertainment: "Entertainment", relax: "Relaxation", habit: "Habit" };
const TRIGGER_LABEL = { bored: "Boredom", lonely: "Loneliness", learn: "Curiosity", friend: "Social Prompt", business: "Work Need", entertainment: "Entertainment Seeking", relax: "Stress Relief", habit: "Automatic Habit" };

function computeCoachReport(data) {
  const app = APPS.find((a) => a.id === data.appId);
  if (!app) return null;
  const duration = DURATIONS.find((d) => d.key === data.duration);
  const purpose = PURPOSE_MAP[data.reason];
  const trigger = TRIGGER_LABEL[data.reason];

  let secondary = "No strong secondary pattern showed up here";
  if (duration.minutes >= 120 && ["bored", "habit", "entertainment"].includes(data.reason)) {
    secondary = "Entertainment Drift — sessions like this tend to run longer than planned";
  } else if (data.notif === "always" && app.hook >= 4) {
    secondary = "Notification Pull — frequent alerts are likely bringing you back in";
  } else if (app.hook >= 4) {
    secondary = "Algorithmic Pull — this app's variable rewards keep sessions going";
  }

  const riskScore = app.hook + duration.minutes / 60 + (data.notif === "always" ? 1 : data.notif === "sometimes" ? 0.5 : 0) + (data.feeling === "worse" ? 2 : data.feeling === "better" ? -1 : 0);
  let risk;
  if (riskScore <= 3) risk = { label: "Low", color: "teal" };
  else if (riskScore <= 6) risk = { label: "Moderate", color: "amber" };
  else risk = { label: "Elevated", color: "rose" };

  return { app, purpose, trigger, secondary, risk, suggestion: app.tips[0], duration, feeling: data.feeling };
}

/* ================================================================== */
/* COMPONENT                                                           */
/* ================================================================== */

export default function MindScroll() {
  const logout = async () => {
  try {
    localStorage.removeItem("mindscroll_seen_welcome");
    await signOut(auth);
  } catch (error) {
    alert(error.message);
  }
};

 const [userEmail, setUserEmail] = useState("");
const [tab, setTab] = useState("home");
const [profileName, setProfileName] = useState("");
const [profileEmail, setProfileEmail] = useState("");

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
      setProfileEmail(user.email);
    }
  });

  return () => unsubscribe();
}, []);

const saveProfile = () => {
  alert("Profile saved!");
};

// behavior coach
const [coachStep, setCoachStep] = useState(0);
  const [coachData, setCoachData] = useState({ appId: null, reason: null, duration: null, notif: null, feeling: null });
  const [coachReport, setCoachReport] = useState(null);

  // explore
  const [selected, setSelected] = useState(APPS[0].id);
  const [search, setSearch] = useState("");
  const app = APPS.find((a) => a.id === selected);

  // compare
  const [metric, setMetric] = useState("dop");

  // quiz
  const [selections, setSelections] = useState({});
  const [report, setReport] = useState(null);

  // detox
  const [detoxRecords, setDetoxRecords] = useState({});
  const [detoxLoading, setDetoxLoading] = useState(true);
  const [detoxError, setDetoxError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const recs = {};
      for (const t of DETOX_TEMPLATES) {
        try {
          const r = await storage.get("detox:" + t.id);
          if (r && r.value) recs[t.id] = JSON.parse(r.value);
        } catch (e) { /* no record yet — treat as not started */ }
      }
      if (!cancelled) {
        setDetoxRecords(recs);
        setDetoxLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function startChallenge(id) {
    const rec = { startedAt: todayStr(), lastCheckIn: null, streak: 0 };
    try {
      await storage.set("detox:" + id, JSON.stringify(rec));
    } catch (e) { /* still update UI optimistically */ }
    setDetoxRecords((prev) => ({ ...prev, [id]: rec }));
  }

  async function checkIn(id) {
    const rec = detoxRecords[id];
    if (!rec) return;
    const today = todayStr();
    if (rec.lastCheckIn === today) return;
    const streak = rec.lastCheckIn === yesterdayStr() ? rec.streak + 1 : 1;
    const updated = { ...rec, lastCheckIn: today, streak };
    try {
      await storage.set("detox:" + id, JSON.stringify(updated));
    } catch (e) { /* still update UI optimistically */ }
    setDetoxRecords((prev) => ({ ...prev, [id]: updated }));
  }

  async function giveUp(id) {
    try {
      await storage.delete("detox:" + id);
    } catch (e) { /* ignore */ }
    setDetoxRecords((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function toggleQuizApp(id) {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id] != null) delete next[id];
      else next[id] = 1;
      return next;
    });
    setReport(null);
  }
  function setHours(id, hours) {
    setSelections((prev) => ({ ...prev, [id]: hours }));
    setReport(null);
  }

  const filteredCategories = CATEGORY_ORDER.map((cat) => ({
    cat,
    apps: APPS.filter((a) => a.category === cat && a.name.toLowerCase().includes(search.toLowerCase())),
  })).filter((g) => g.apps.length > 0);

  const leaderboard = [...APPS].sort((a, b) => b[metric] - a[metric]);
  const metricMax = { dop: 10, anx: 10, hook: 5 };
  const metricColor = { dop: "teal", anx: "rose", hook: "amber" };
  const metricName = { dop: "Dopamine Pull", anx: "Anxiety Load", hook: "Hook Intensity" };

  return (
    <div className="ms-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .ms-root {
          --bg: #1a1712;
          --bg-panel: #1f1b16;
          --bg-raised: #292420;
          --ink: #e9e1d3;
          --ink-dim: #a89e8f;
          --ink-faint: #6f6558;
          --line: #332e27;
          --teal: #93b39a;
          --amber: #cf9a6e;
          --rose: #c48a92;
          --teal-dim: rgba(147, 179, 154, 0.12);
          --amber-dim: rgba(207, 154, 110, 0.12);
          --rose-dim: rgba(196,138,146, 0.12);
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
          padding: 48px 32px 24px;
          background-image:
            radial-gradient(circle at 15% 0%, rgba(147,179,154,0.03), transparent 45%),
            radial-gradient(circle at 90% 20%, rgba(196,138,146,0.025), transparent 40%);
        }
        .ms-root *, .ms-root *::before, .ms-root *::after { box-sizing: border-box; }
        .ms-shell { max-width: 1180px; margin: 0 auto; }

        .ms-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--ink-faint);
          display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
        }
        .ms-eyebrow::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal); box-shadow: 0 0 4px rgba(147,179,154,0.5);
          animation: ms-blink 3.6s ease-in-out infinite;
        }
        @keyframes ms-blink { 0%,100% { opacity: 0.85; } 50% { opacity: 0.5; } }

        .ms-title {
          font-family: 'Fraunces', serif; font-optical-sizing: auto; font-weight: 600;
          font-size: clamp(36px, 5.5vw, 58px); line-height: 1; letter-spacing: -0.01em;
          margin: 0 0 14px;
        }
        .ms-title em { font-style: italic; font-weight: 400; color: var(--teal); }
        .ms-sub { font-size: 15px; color: var(--ink-dim); max-width: 560px; line-height: 1.6; margin: 0 0 8px; }
        .ms-stats { display: flex; gap: 18px; margin: 18px 0 30px; flex-wrap: wrap; }
        .ms-stat { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-faint); }
        .ms-stat b { color: var(--teal); font-size: 15px; display: block; font-family: 'Fraunces', serif; font-weight: 600; }

        /* ---------- Tabs ---------- */
        .ms-tabs { display: flex; gap: 6px; margin-bottom: 28px; flex-wrap: wrap; border-bottom: 1px solid var(--line); }
        .ms-tab {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.05em;
          padding: 10px 6px; margin-right: 20px; background: none; border: none; cursor: pointer;
          color: var(--ink-faint); position: relative; top: 1px;
          border-bottom: 2px solid transparent; transition: color 0.2s ease, border-color 0.2s ease;
        }
        .ms-tab:hover { color: var(--ink); }
        .ms-tab.active { color: var(--teal); border-bottom-color: var(--teal); }

        /* ---------- Layout: Explore ---------- */
        .ms-grid { display: grid; grid-template-columns: 250px 1fr; gap: 28px; align-items: start; }
        .ms-search {
          width: 100%; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 8px;
          color: var(--ink); font-family: 'Inter', sans-serif; font-size: 13px; padding: 9px 12px;
          margin-bottom: 14px; outline: none;
        }
        .ms-search:focus { border-color: var(--teal); }
        .ms-search::placeholder { color: var(--ink-faint); }
        .ms-dock { display: flex; flex-direction: column; gap: 2px; position: sticky; top: 24px; max-height: 78vh; overflow-y: auto; padding-right: 4px; }
        .ms-cat-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink-faint); margin: 16px 0 6px 14px;
        }
        .ms-cat-label:first-child { margin-top: 0; }
        .ms-dock-item {
          display: flex; align-items: center; gap: 12px; padding: 9px 14px; border-radius: 10px;
          border: 1px solid transparent; background: transparent; cursor: pointer; text-align: left;
          color: var(--ink-dim); transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
          font-family: 'Inter', sans-serif; width: 100%;
        }
        .ms-dock-item:hover { background: var(--bg-raised); color: var(--ink); }
        .ms-dock-item.active { background: var(--bg-raised); border-color: var(--line); color: var(--ink); }
        .ms-dock-icon {
          flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
          border-radius: 8px; background: var(--bg-panel); color: var(--ink-faint);
        }
        .ms-dock-item.active .ms-dock-icon { color: var(--teal); background: var(--teal-dim); }
        .ms-dock-icon svg { width: 16px; height: 16px; }
        .ms-dock-name { font-size: 13px; font-weight: 500; }

        .ms-file { background: var(--bg-panel); border: 1px solid var(--line); border-radius: 16px; padding: 34px 38px 28px; animation: ms-fade 0.5s ease both; }
        @keyframes ms-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ms-file-head { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; padding-bottom: 22px; border-bottom: 1px solid var(--line); margin-bottom: 26px; }
        .ms-file-name { font-family: 'Fraunces', serif; font-weight: 600; font-size: 28px; margin: 0 0 6px; }
        .ms-file-category { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); }
        .ms-chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .ms-chip { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; padding: 5px 10px; border-radius: 20px; border: 1px solid var(--line); color: var(--ink-dim); white-space: nowrap; }
        .ms-chip.Dopamine { color: var(--teal); border-color: rgba(147,179,154,0.3); background: var(--teal-dim); }
        .ms-chip.Cortisol { color: var(--rose); border-color: rgba(196,138,146,0.3); background: var(--rose-dim); }
        .ms-chip.Oxytocin { color: var(--teal); border-color: rgba(147,179,154,0.3); background: var(--teal-dim); }
        .ms-chip.FOMO { color: var(--amber); border-color: rgba(207,154,110,0.3); background: var(--amber-dim); }

        .ms-wave-block { margin-bottom: 30px; }
        .ms-wave-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px; }
        .ms-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-faint); }
        .ms-intensity { display: flex; gap: 4px; align-items: center; }
        .ms-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--line); }
        .ms-dot.on { background: var(--amber); box-shadow: 0 0 3px rgba(207,154,110,0.4); }
        .ms-wave-svg { width: 100%; height: 85px; display: block; }
        .ms-wave-path { fill: none; stroke: var(--teal); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 2px rgba(147,179,154,0.2)); stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: ms-draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes ms-draw { to { stroke-dashoffset: 0; } }

        .ms-section { padding: 18px 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: 180px 1fr; gap: 24px; }
        .ms-section-label { display: flex; align-items: center; gap: 8px; }
        .ms-swatch { width: 8px; height: 8px; border-radius: 2px; flex: none; }
        .ms-swatch.brain { background: var(--teal); }
        .ms-swatch.overuse { background: var(--rose); }
        .ms-swatch.hooks { background: var(--amber); }
        .ms-swatch.tips { background: var(--teal); }
        .ms-para { font-size: 14px; line-height: 1.7; color: var(--ink); margin: 0; max-width: 620px; }
        .ms-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; max-width: 620px; }
        .ms-list li { font-size: 13.5px; line-height: 1.6; color: var(--ink); padding-left: 18px; position: relative; }
        .ms-list.hooks li::before { content: '—'; position: absolute; left: 0; top: 0; color: var(--amber); }
        .ms-list.tips li::before { content: '✓'; position: absolute; left: 0; top: 0; color: var(--teal); font-size: 12px; }
        .ms-list.overuse li::before { content: '·'; position: absolute; left: 2px; top: -3px; color: var(--rose); font-size: 22px; }

        /* ---------- Compare ---------- */
        .ms-metric-toggle { display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap; }
        .ms-metric-btn {
          font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; padding: 8px 14px; border-radius: 20px;
          border: 1px solid var(--line); background: var(--bg-panel); color: var(--ink-dim); cursor: pointer;
          transition: all 0.2s ease;
        }
        .ms-metric-btn.active.dop { color: var(--teal); border-color: rgba(147,179,154,0.4); background: var(--teal-dim); }
        .ms-metric-btn.active.anx { color: var(--rose); border-color: rgba(196,138,146,0.4); background: var(--rose-dim); }
        .ms-metric-btn.active.hook { color: var(--amber); border-color: rgba(207,154,110,0.4); background: var(--amber-dim); }
        .ms-board { display: flex; flex-direction: column; gap: 3px; }
        .ms-row { display: grid; grid-template-columns: 28px 26px 140px 1fr 40px; align-items: center; gap: 12px; padding: 9px 4px; border-radius: 8px; transition: background 0.2s ease; }
        .ms-row:hover { background: var(--bg-panel); }
        .ms-rank { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-faint); }
        .ms-row-icon { width: 26px; height: 26px; border-radius: 6px; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; color: var(--ink-dim); }
        .ms-row-icon svg { width: 14px; height: 14px; }
        .ms-row-name { font-size: 13.5px; }
        .ms-bar-track { height: 8px; background: var(--bg-panel); border-radius: 4px; overflow: hidden; }
        .ms-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s cubic-bezier(0.22,1,0.36,1); }
        .ms-bar-fill.teal { background: linear-gradient(90deg, var(--teal), #7fa389); }
        .ms-bar-fill.rose { background: linear-gradient(90deg, var(--rose), #a9707a); }
        .ms-bar-fill.amber { background: linear-gradient(90deg, var(--amber), #b3835a); }
        .ms-row-score { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--ink-dim); text-align: right; }

        /* ---------- Quiz ---------- */
        .ms-quiz-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 26px; }
        .ms-quiz-chip {
          font-size: 12.5px; padding: 8px 12px; border-radius: 20px; border: 1px solid var(--line);
          background: var(--bg-panel); color: var(--ink-dim); cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
        }
        .ms-quiz-chip.on { color: var(--teal); border-color: rgba(147,179,154,0.4); background: var(--teal-dim); }
        .ms-quiz-chip .ms-mini-icon { width: 15px; height: 15px; }
        .ms-bracket-row { display: flex; flex-wrap: wrap; gap: 14px 22px; margin-bottom: 26px; padding: 16px 18px; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 12px; }
        .ms-slider-item { display: flex; flex-direction: column; gap: 8px; min-width: 180px; }
        .ms-bracket-app { font-size: 12.5px; color: var(--ink-dim); }
        .ms-slider-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        .ms-slider-val { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--teal); }
        .ms-slider {
          -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px;
          background: var(--line); outline: none; cursor: pointer;
        }
        .ms-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 15px; height: 15px; border-radius: 50%;
          background: var(--teal); box-shadow: 0 0 3px rgba(147,179,154,0.35); cursor: pointer;
          border: 2px solid #1a1712;
        }
        .ms-slider::-moz-range-thumb {
          width: 15px; height: 15px; border-radius: 50%; background: var(--teal);
          box-shadow: 0 0 3px rgba(147,179,154,0.35); cursor: pointer; border: 2px solid #1a1712;
        }
        .ms-generate-btn {
          font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; letter-spacing: 0.04em; padding: 12px 24px;
          border-radius: 10px; border: 1px solid var(--teal); background: var(--teal-dim); color: var(--teal); cursor: pointer;
          transition: all 0.2s ease;
        }
        .ms-generate-btn:hover { background: var(--teal); color: #1a1712; }
        .ms-report { margin-top: 30px; padding: 28px; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 16px; animation: ms-fade 0.5s ease both; }
        .ms-band { display: inline-block; font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 5px 12px; border-radius: 20px; margin-bottom: 14px; }
        .ms-band.teal { color: var(--teal); background: var(--teal-dim); border: 1px solid rgba(147,179,154,0.3); }
        .ms-band.amber { color: var(--amber); background: var(--amber-dim); border: 1px solid rgba(207,154,110,0.3); }
        .ms-band.rose { color: var(--rose); background: var(--rose-dim); border: 1px solid rgba(196,138,146,0.3); }
        .ms-report-title { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; margin: 0 0 10px; }
        .ms-report-desc { font-size: 14px; color: var(--ink-dim); line-height: 1.6; max-width: 560px; margin: 0 0 24px; }
        .ms-meters { display: flex; gap: 30px; flex-wrap: wrap; margin-bottom: 26px; }
        .ms-meter { flex: 1; min-width: 160px; }
        .ms-meter-top { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .ms-meter-val { font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
        .ms-top-contrib { display: flex; flex-direction: column; gap: 10px; }
        .ms-contrib-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink-dim); }
        .ms-contrib-row b { color: var(--ink); font-weight: 500; }

        /* ---------- Detox ---------- */
        .ms-detox-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
        .ms-detox-card { background: var(--bg-panel); border: 1px solid var(--line); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; gap: 12px; }
        .ms-detox-tag { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber); }
        .ms-detox-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; margin: 0; }
        .ms-detox-desc { font-size: 13px; color: var(--ink-dim); line-height: 1.55; margin: 0; }
        .ms-detox-source { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--ink-faint); line-height: 1.5; margin: -4px 0 4px; }

        .ms-refs-list { display: flex; flex-direction: column; gap: 14px; max-width: 720px; }
        .ms-ref-card { background: var(--bg-panel); border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; }
        .ms-ref-top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .ms-ref-title { font-family: 'Fraunces', serif; font-size: 15.5px; font-weight: 600; margin: 0; line-height: 1.4; }
        .ms-ref-year { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-faint); flex: none; }
        .ms-ref-authors { font-size: 12.5px; color: var(--ink-dim); margin: 6px 0 8px; }
        .ms-ref-authors em { font-style: italic; }
        .ms-ref-note { font-size: 13px; color: var(--ink); line-height: 1.6; margin: 0 0 8px; }
        .ms-ref-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--teal); text-decoration: none; }
        .ms-ref-link:hover { text-decoration: underline; }
        .ms-start-btn, .ms-checkin-btn { font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 10px 16px; border-radius: 8px; border: 1px solid var(--teal); background: transparent; color: var(--teal); cursor: pointer; transition: all 0.2s ease; }
        .ms-start-btn:hover, .ms-checkin-btn:hover:not(:disabled) { background: var(--teal); color: #1a1712; }
        .ms-checkin-btn:disabled { opacity: 0.4; cursor: default; border-color: var(--line); color: var(--ink-faint); }
        .ms-progress-track { height: 6px; background: var(--bg-raised); border-radius: 3px; overflow: hidden; margin: 4px 0; }
        .ms-progress-fill { height: 100%; background: linear-gradient(90deg, var(--teal), #7fa389); border-radius: 3px; transition: width 0.5s ease; }
        .ms-progress-fill.done { background: linear-gradient(90deg, var(--amber), #b3835a); }
        .ms-detox-meta { display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-faint); }
        .ms-giveup { font-size: 11.5px; color: var(--ink-faint); background: none; border: none; cursor: pointer; text-decoration: underline; text-align: left; padding: 0; }
        .ms-giveup:hover { color: var(--rose); }
        .ms-completed { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--amber); }

        /* ---------------- Home ---------------- */
        .ms-hero { max-width: 680px; padding: 12px 0 20px; }
        .ms-hero-line { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(28px, 4vw, 40px); line-height: 1.25; margin: 0 0 18px; }
        .ms-hero-copy { font-size: 15px; color: var(--ink-dim); line-height: 1.7; margin: 0 0 28px; max-width: 560px; }
        .ms-hero-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 34px; }
        .ms-cta {
          font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; padding: 12px 20px; border-radius: 10px;
          border: 1px solid var(--line); background: var(--bg-panel); color: var(--ink-dim); cursor: pointer;
          transition: all 0.2s ease;
        }
        .ms-cta:hover { color: var(--ink); border-color: var(--ink-faint); }
        .ms-cta.primary { border-color: var(--teal); background: var(--teal-dim); color: var(--teal); }
        .ms-cta.primary:hover { background: var(--teal); color: var(--bg); }

        /* ---------------- Behavior Coach ---------------- */
        .ms-coach { max-width: 640px; }
        .ms-coach-progress { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
        .ms-coach-dots { display: flex; gap: 5px; }
        .ms-coach-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--line); }
        .ms-coach-dot.on { background: var(--teal); }
        .ms-coach-q { font-family: 'Fraunces', serif; font-weight: 600; font-size: 22px; margin: 0 0 20px; }
        .ms-coach-options { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .ms-coach-opt {
          font-family: 'Inter', sans-serif; font-size: 13.5px; padding: 12px 18px; border-radius: 12px;
          border: 1px solid var(--line); background: var(--bg-panel); color: var(--ink); cursor: pointer;
          transition: all 0.2s ease; text-align: left;
        }
        .ms-coach-opt:hover { border-color: var(--teal); background: var(--teal-dim); }
        .ms-coach-opt.emoji { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 24px; }
        .ms-coach-emoji { font-size: 24px; }
        .ms-coach-back { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--ink-faint); background: none; border: none; cursor: pointer; padding: 0; }
        .ms-coach-back:hover { color: var(--ink-dim); }
        .ms-coach-report-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 18px; margin-bottom: 22px; }
        .ms-coach-field p { font-size: 15px; color: var(--ink); margin: 4px 0 0; font-weight: 500; }
        .ms-coach-notice { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--ink-faint); margin: 4px 0 22px; }

        /* ---------- Footer ---------- */
        .ms-footer { max-width: 1180px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid var(--line); text-align: center; }
        .ms-disclaimer { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--ink-faint); letter-spacing: 0.02em; }

        @media (max-width: 860px) {
          .ms-grid { grid-template-columns: 1fr; }
          .ms-dock { position: static; flex-direction: row; overflow-x: auto; overflow-y: visible; max-height: none; gap: 8px; padding-bottom: 6px; }
          .ms-cat-label { display: none; }
          .ms-dock-item { flex: none; }
          .ms-file { padding: 26px 18px; }
          .ms-section { grid-template-columns: 1fr; gap: 10px; }
          .ms-row { grid-template-columns: 22px 22px 90px 1fr 34px; gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-wave-path { animation: none; stroke-dashoffset: 0; }
          .ms-file, .ms-report { animation: none; }
          .ms-eyebrow::before { animation: none; }
        }
      `}</style>

      <div className="ms-shell">
  <div className="ms-eyebrow">Awareness, not judgment</div>
  <h1 className="ms-title">Mind<em>Scroll</em></h1>
 <p className="ms-sub">
  Build healthier digital habits one mindful check-in at a time.
</p>
  <div style={{ textAlign: "right", marginBottom: "15px" }}>
    <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
      Welcome, {userEmail}
    </p>

    <button
      onClick={logout}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#ef4444",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Logout
    </button>
  </div>

       <div className="ms-tabs">
  <button className={"ms-tab" + (tab === "home" ? " active" : "")} onClick={() => setTab("home")}>Home</button>

  <button className={"ms-tab" + (tab === "coach" ? " active" : "")} onClick={() => setTab("coach")}>My Check</button>

  <button className={"ms-tab" + (tab === "explore" ? " active" : "")} onClick={() => setTab("explore")}>Explore</button>

  <button className={"ms-tab" + (tab === "compare" ? " active" : "")} onClick={() => setTab("compare")}>Compare</button>

  <button className={"ms-tab" + (tab === "quiz" ? " active" : "")} onClick={() => setTab("quiz")}>Habit Score</button>

  <button className={"ms-tab" + (tab === "detox" ? " active" : "")} onClick={() => setTab("detox")}>Small Habits</button>

  <button className={"ms-tab" + (tab === "refs" ? " active" : "")} onClick={() => setTab("refs")}>References</button>

  <button
    className={"ms-tab" + (tab === "profile" ? " active" : "")}
    onClick={() => setTab("profile")}
  >
    Profile
  </button>
</div>

        {/* ---------------- HOME ---------------- */}
        {tab === "home" && (
          <div className="ms-hero">
            <h2 className="ms-hero-line">Technology isn't the enemy.<br />Unconscious habits are.</h2>
            <p className="ms-hero-copy">
              MindScroll helps you understand why you open apps, how they affect your
              emotions and attention, and how to build healthier digital habits —
              one honest check-in at a time. No shame, no scare tactics.
            </p>
            <div className="ms-hero-actions">
              <button className="ms-cta primary" onClick={() => setTab("coach")}>Start My Check</button>
              <button className="ms-cta" onClick={() => setTab("explore")}>Explore Apps</button>
              <button className="ms-cta" onClick={() => setTab("explore")}>Learn Psychology</button>
            </div>
            <div className="ms-stats">
              <div className="ms-stat"><b>45</b>apps profiled</div>
              <div className="ms-stat"><b>4</b>chemical signals tracked</div>
              <div className="ms-stat"><b>5</b>interactive tools</div>
            </div>
          </div>
        )}
       

{/* ---------------- PROFILE ---------------- */}
{tab === "profile" && (
  <div className="ms-profile">
    <h2 className="ms-hero-line">👤 My Profile</h2>

    <div className="ms-profile-card">
      <label className="ms-label">Full Name</label>
      <input
        className="ms-search"
        value={profileName}
        onChange={(e) => setProfileName(e.target.value)}
        placeholder="Enter your name"
      />

      <label className="ms-label" style={{ marginTop: 14 }}>
        Email
      </label>

      <input
        className="ms-search"
        value={profileEmail}
        disabled
      />

      <button
        className="ms-generate-btn"
        style={{ marginTop: 18 }}
        onClick={saveProfile}
      >
        Save Changes
      </button>

      <button
        className="ms-cta"
        style={{ marginTop: 12 }}
        onClick={() => setTab("home")}
      >
        ← Back to Home
      </button>
    </div>
  </div>
)}

        {/* ---------------- BEHAVIOR COACH ---------------- */}
        {tab === "coach" && (
          <div className="ms-coach">
            {!coachReport ? (
              <>
                <div className="ms-coach-progress">
                  <span className="ms-label">Step {coachStep + 1} of 5</span>
                  <div className="ms-coach-dots">{[0, 1, 2, 3, 4].map((i) => <span key={i} className={"ms-coach-dot" + (i <= coachStep ? " on" : "")} />)}</div>
                </div>

                {coachStep === 0 && (
                  <>
                    <h3 className="ms-coach-q">Which app did you just open?</h3>
                    <div className="ms-quiz-grid">
                      {APPS.map((a) => (
                        <button key={a.id} className="ms-quiz-chip" onClick={() => { setCoachData((d) => ({ ...d, appId: a.id })); setCoachStep(1); }}>
                          <svg className="ms-mini-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9">{a.icon}</svg>
                          {a.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {coachStep === 1 && (
                  <>
                    <h3 className="ms-coach-q">Why did you open it?</h3>
                    <div className="ms-coach-options">
                      {REASONS.map((r) => (
                        <button key={r.key} className="ms-coach-opt" onClick={() => { setCoachData((d) => ({ ...d, reason: r.key })); setCoachStep(2); }}>{r.label}</button>
                      ))}
                    </div>
                  </>
                )}
                {coachStep === 2 && (
                  <>
                    <h3 className="ms-coach-q">About how long?</h3>
                    <div className="ms-coach-options">
                      {DURATIONS.map((d) => (
                        <button key={d.key} className="ms-coach-opt" onClick={() => { setCoachData((cd) => ({ ...cd, duration: d.key })); setCoachStep(3); }}>{d.label}</button>
                      ))}
                    </div>
                  </>
                )}
                {coachStep === 3 && (
                  <>
                    <h3 className="ms-coach-q">Are notifications on for this app?</h3>
                    <div className="ms-coach-options">
                      {NOTIF_OPTS.map((n) => (
                        <button key={n.key} className="ms-coach-opt" onClick={() => { setCoachData((cd) => ({ ...cd, notif: n.key })); setCoachStep(4); }}>{n.label}</button>
                      ))}
                    </div>
                  </>
                )}
                {coachStep === 4 && (
                  <>
                    <h3 className="ms-coach-q">How do you feel after using it?</h3>
                    <div className="ms-coach-options emoji">
                      {FEELINGS.map((f) => (
                        <button key={f.key} className="ms-coach-opt emoji" onClick={() => {
                          const finalData = { ...coachData, feeling: f.key };
                          setCoachData(finalData);
                          setCoachReport(computeCoachReport(finalData));
                        }}><span className="ms-coach-emoji">{f.emoji}</span>{f.label}</button>
                      ))}
                    </div>
                  </>
                )}
                {coachStep > 0 && <button className="ms-coach-back" onClick={() => setCoachStep((s) => Math.max(0, s - 1))}>← Back</button>}
              </>
            ) : (
              <div className="ms-report">
                <span className={"ms-band " + coachReport.risk.color}>{coachReport.risk.label} risk</span>
                <h3 className="ms-report-title">Your Digital Habit Report</h3>
                <div className="ms-coach-report-grid">
                  <div className="ms-coach-field"><span className="ms-label">App</span><p>{coachReport.app.name}</p></div>
                  <div className="ms-coach-field"><span className="ms-label">Purpose</span><p>{coachReport.purpose}</p></div>
                  <div className="ms-coach-field"><span className="ms-label">Main trigger</span><p>{coachReport.trigger}</p></div>
                  <div className="ms-coach-field"><span className="ms-label">Secondary pattern</span><p>{coachReport.secondary}</p></div>
                </div>
                <p className="ms-report-desc"><b>Suggestion:</b> {coachReport.suggestion}</p>
                <p className="ms-coach-notice">No judgment — the goal is noticing, not scoring yourself.</p>
                <button className="ms-generate-btn" onClick={() => { setCoachReport(null); setCoachStep(0); setCoachData({ appId: null, reason: null, duration: null, notif: null, feeling: null }); }}>Do another check</button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- EXPLORE ---------------- */}
        {tab === "explore" && (
          <div className="ms-grid">
            <nav className="ms-dock">
  <input
    className="ms-search"
    placeholder="Search apps…"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {filteredCategories.map((group) => (
    <React.Fragment key={group.cat}>
      <div className="ms-cat-label">{group.cat}</div>

      {group.apps.map((a) => (
        <button
          key={a.id}
          className={
            "ms-dock-item" + (a.id === selected ? " active" : "")
          }
          onClick={() => setSelected(a.id)}
        >
          <span className="ms-dock-icon">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              {a.icon}
            </svg>
          </span>

          <span className="ms-dock-name">{a.name}</span>
        </button>
      ))}
    </React.Fragment>
  ))}

  {/* ⭐ PROFILE TAB (GLOBAL - ALWAYS VISIBLE) */}
  <button
    className={"ms-dock-item" + (tab === "profile" ? " active" : "")}
    onClick={() => setTab("profile")}
  >
    <span className="ms-dock-icon">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M16 16c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z" />
        <path d="M4 30c0-6 5.4-10 12-10s12 4 12 10" />
      </svg>
    </span>
    <span className="ms-dock-name">Profile</span>
  </button>
</nav>

            <main className="ms-file" key={app.id}>
              <div className="ms-file-head">
                <div>
                  <div className="ms-file-category">{app.category}</div>
                  <h2 className="ms-file-name">{app.name}</h2>
                </div>
                <div className="ms-chips">{app.chemicals.map((c) => <span key={c} className={"ms-chip " + c}>{c}</span>)}</div>
              </div>

              <div className="ms-wave-block">
                <div className="ms-wave-top">
                  <span className="ms-label">Dopamine response pattern</span>
                  <span className="ms-intensity">
                    <span className="ms-label" style={{ marginRight: 2 }}>Hook intensity</span>
                    {[1, 2, 3, 4, 5].map((n) => <span key={n} className={"ms-dot" + (n <= app.hook ? " on" : "")} />)}
                  </span>
                </div>
                <svg className="ms-wave-svg" viewBox="0 0 400 100" preserveAspectRatio="none"><path className="ms-wave-path" d={app.wave} /></svg>
              </div>

              <section className="ms-section">
                <div className="ms-section-label"><span className="ms-swatch brain" /><span className="ms-label">Brain response</span></div>
                <p className="ms-para">{app.brain}</p>
              </section>
              <section className="ms-section">
                <div className="ms-section-label"><span className="ms-swatch overuse" /><span className="ms-label">Overuse pattern</span></div>
                <ul className="ms-list overuse">{app.overuse.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </section>
              <section className="ms-section">
                <div className="ms-section-label"><span className="ms-swatch hooks" /><span className="ms-label">The hook</span></div>
                <ul className="ms-list hooks">{app.hooks.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </section>
              <section className="ms-section">
                <div className="ms-section-label"><span className="ms-swatch tips" /><span className="ms-label">Healthier use</span></div>
                <ul className="ms-list tips">{app.tips.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </section>
            </main>
          </div>
        )}

        {/* ---------------- COMPARE ---------------- */}
        {tab === "compare" && (
          <div>
            <div className="ms-metric-toggle">
              {["dop", "anx", "hook"].map((m) => (
                <button key={m} className={"ms-metric-btn" + (metric === m ? " active " + m : "")} onClick={() => setMetric(m)}>{metricName[m]}</button>
              ))}
            </div>
            <div className="ms-board">
              {leaderboard.map((a, i) => (
                <div className="ms-row" key={a.id}>
                  <span className="ms-rank">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ms-row-icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">{a.icon}</svg></span>
                  <span className="ms-row-name">{a.name}</span>
                  <span className="ms-bar-track"><span className={"ms-bar-fill " + metricColor[metric]} style={{ width: (a[metric] / metricMax[metric] * 100) + "%" }} /></span>
                  <span className="ms-row-score">{a[metric]}/{metricMax[metric]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- QUIZ ---------------- */}
        {tab === "quiz" && (
          <div>
            <p className="ms-para" style={{ marginBottom: 18 }}>Tap the apps you use regularly, drag each slider to roughly how many hours a day you're on it, then generate your report.</p>
            <div className="ms-quiz-grid">
              {APPS.map((a) => (
                <button key={a.id} className={"ms-quiz-chip" + (selections[a.id] != null ? " on" : "")} onClick={() => toggleQuizApp(a.id)}>
                  <svg className="ms-mini-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9">{a.icon}</svg>
                  {a.name}
                </button>
              ))}
            </div>

            {Object.keys(selections).length > 0 && (
              <div className="ms-bracket-row">
                {APPS.filter((a) => selections[a.id] != null).map((a) => (
                  <div className="ms-slider-item" key={a.id}>
                    <div className="ms-slider-top">
                      <span className="ms-bracket-app">{a.name}</span>
                      <span className="ms-slider-val">{selections[a.id].toFixed(2)}h/day</span>
                    </div>
                    <input
                      type="range" min="0" max="5" step="0.25"
                      value={selections[a.id]}
                      onChange={(e) => setHours(a.id, parseFloat(e.target.value))}
                      className="ms-slider"
                    />
                  </div>
                ))}
              </div>
            )}

            <button className="ms-generate-btn" onClick={() => setReport(computeReport(selections))} disabled={Object.keys(selections).length === 0}>
              Generate my digital mind report
            </button>

            {report && (
              <div className="ms-report">
                <span className={"ms-band " + report.band.color}>{report.band.label}</span>
                <h3 className="ms-report-title">Digital Mind Score: {report.overall}/100</h3>
                <p className="ms-report-desc">{report.band.desc}</p>

                <div className="ms-meters">
                  <div className="ms-meter">
                    <div className="ms-meter-top"><span className="ms-label">Dopamine load</span><span className="ms-meter-val" style={{ color: "var(--teal)" }}>{report.dopScore}</span></div>
                    <div className="ms-bar-track"><span className="ms-bar-fill teal" style={{ width: report.dopScore + "%" }} /></div>
                  </div>
                  <div className="ms-meter">
                    <div className="ms-meter-top"><span className="ms-label">Anxiety load</span><span className="ms-meter-val" style={{ color: "var(--rose)" }}>{report.anxScore}</span></div>
                    <div className="ms-bar-track"><span className="ms-bar-fill rose" style={{ width: report.anxScore + "%" }} /></div>
                  </div>
                  <div className="ms-meter">
                    <div className="ms-meter-top"><span className="ms-label">Est. daily time</span><span className="ms-meter-val">{report.totalHours.toFixed(1)}h</span></div>
                    <div className="ms-bar-track"><span className="ms-bar-fill amber" style={{ width: Math.min(report.totalHours / 6 * 100, 100) + "%" }} /></div>
                  </div>
                </div>

                <div className="ms-section-label" style={{ marginBottom: 12 }}><span className="ms-swatch overuse" /><span className="ms-label">Your biggest contributors</span></div>
                <div className="ms-top-contrib">
                  {report.top3.map((c) => (
                    <div className="ms-contrib-row" key={c.app.id}><b>{c.app.name}</b> — {c.app.tagline.toLowerCase()}, roughly {Math.round(c.hours * 60)} min/day</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- DETOX ---------------- */}
        {tab === "detox" && (
          <div>
            {detoxLoading ? (
              <p className="ms-para">Loading your challenges…</p>
            ) : (
              <div className="ms-detox-grid">
                {DETOX_TEMPLATES.map((t) => {
                  const rec = detoxRecords[t.id];
                  const doneToday = rec && rec.lastCheckIn === todayStr();
                  const completed = rec && rec.streak >= t.days;
                  return (
                    <div className="ms-detox-card" key={t.id}>
                      <span className="ms-detox-tag">{t.tag}</span>
                      <h3 className="ms-detox-title">{t.title}</h3>
                      <p className="ms-detox-desc">{t.desc}</p>
                      <p className="ms-detox-source">Source: {t.source}</p>
                      {!rec ? (
                        <button className="ms-start-btn" onClick={() => startChallenge(t.id)}>Start challenge</button>
                      ) : (
                        <>
                          <div className="ms-detox-meta"><span>Day {Math.min(rec.streak, t.days)} of {t.days}</span>{completed && <span className="ms-completed">Completed ✓</span>}</div>
                          <div className="ms-progress-track"><span className={"ms-progress-fill" + (completed ? " done" : "")} style={{ width: Math.min(rec.streak / t.days * 100, 100) + "%" }} /></div>
                          <button className="ms-checkin-btn" onClick={() => checkIn(t.id)} disabled={doneToday}>{doneToday ? "Checked in today ✓" : "Check in today"}</button>
                          <button className="ms-giveup" onClick={() => giveUp(t.id)}>Give up on this challenge</button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {detoxError && <p className="ms-para" style={{ marginTop: 16, color: "var(--ink-faint)" }}>Progress couldn't be saved this session — it'll still work, just won't persist after reload.</p>}
          </div>
        )}

        {/* ---------------- REFERENCES ---------------- */}
        {tab === "refs" && (
          <div>
            <p className="ms-para" style={{ marginBottom: 22 }}>The detox techniques above are drawn from published behavioral research rather than invented rules. Full sources below.</p>
            <div className="ms-refs-list">
              {REFERENCES.map((r, i) => (
                <div className="ms-ref-card" key={i}>
                  <div className="ms-ref-top">
                    <h4 className="ms-ref-title">{r.title}</h4>
                    <span className="ms-ref-year">{r.year}</span>
                  </div>
                  <p className="ms-ref-authors">{r.authors} — <em>{r.venue}</em></p>
                  <p className="ms-ref-note">{r.note}</p>
                  {r.url && <a className="ms-ref-link" href={r.url} target="_blank" rel="noopener noreferrer">View source →</a>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ms-footer">
        <p className="ms-disclaimer">MindScroll is for educational purposes only — a simplified overview of attention psychology, not medical or clinical advice.</p>
        <p className="ms-disclaimer" style={{ marginTop: 6 }}>Detox techniques are grounded in the published studies listed under References — see that tab for full citations.</p>
      </div>
    </div>
  );
}
