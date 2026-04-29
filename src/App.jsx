import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Repeat2, Heart, BarChart3, Bookmark,
  Pin, ArrowRight, Info, ChevronDown, RotateCcw,
  Copy as CopyIcon, Share2, Check, Pause, Play, SkipForward
} from 'lucide-react';

// Respect the OS-level "reduce motion" preference. Returns true when the user
// has asked to minimize animation.
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

// =====================================================================
// IF 1800 HAD X — Interactive Playthrough
// A Free Systems project. Every quote verbatim.
// =====================================================================

// ----- Verified content. Every quote from a real 1800 source. ----------

const POSTS_FEDERALIST = [
  // The user is a Federalist (Adams supporter). Their feed shows defenders.
  {
    id: 'fed-pinned',
    type: 'pinned',
    side: 'federalist',
    handle: '@AdamsForUnion',
    name: 'Federalists for the Union',
    avatarBg: 'linear-gradient(135deg,#0a2540,#00356b)',
    avatarLetters: 'FU',
    verified: 'gold',
    timestamp: 'Oct 1800',
    text: `The Republic stands at a precipice.\n\nVote @JohnAdams. Vote against atheism, anarchy, and French radicalism. The choice is simple. The stakes are everything.`,
    counts: { replies: 4200, reposts: 18000, likes: 31000, views: 1100000 }
  },
  {
    id: 'fed-courant',
    side: 'federalist',
    handle: '@CTCourant',
    name: 'Connecticut Courant',
    avatarBg: 'linear-gradient(135deg,#2c1810,#3d2317)',
    avatarLetters: 'CC',
    verified: 'gold',
    timestamp: '5h',
    text: `⚠️ THE STAKES OF THIS ELECTION ⚠️\n\nIf @TJefferson is elected:\n\n"Murder, robbery, rape, adultery, and incest will all be openly taught and practiced; the air will be rent with the cries of the distressed; the soil will be soaked with blood, and the nation black with crimes."\n\nRepost to save the Republic. #NeverJefferson`,
    counts: { replies: 22000, reposts: 28000, likes: 67000, views: 4200000 },
    note: {
      title: 'Opinion presented as prediction.',
      body: `Published Sept. 15, 1800 under the pseudonym "Burleigh," generally attributed to Federalist editor Theodore Dwight. The publication, now the Hartford Courant, formally apologized for its coverage of the 1800 election in 1993.`
    }
  },
  {
    id: 'fed-dwight',
    side: 'federalist',
    handle: '@PresDwightYale',
    name: 'Rev. Timothy Dwight IV',
    avatarBg: 'linear-gradient(135deg,#0a2540,#00356b)',
    avatarLetters: 'TD',
    verified: 'blue',
    timestamp: '8h',
    text: `A reminder, on the eve of this election, of what I warned two summers past:\n\n"Shall we see our wives and daughters the victims of legal prostitution; soberly dishonoured…"\n\nThe Republic must not be handed to the infidel @TJefferson. #FaithfulVote`,
    counts: { replies: 4200, reposts: 6700, likes: 18000, views: 870000 },
    note: {
      title: 'Originally a sermon about France, redeployed against Jefferson.',
      body: `The verbatim line is from Rev. Dwight's July 4, 1798 sermon "The Duty of Americans, at the Present Crisis," delivered against the French Revolution and the Bavarian Illuminati. Federalists subsequently invoked it in 1800 to attack Jefferson's religious skepticism — a leap from rhetorical warning to predicted policy outcome unsupported by evidence.`
    }
  },
  {
    id: 'fed-cutler',
    side: 'federalist',
    handle: '@CutlerJournal',
    name: 'Rev. Manasseh Cutler',
    avatarBg: 'linear-gradient(135deg,#4a2e6e,#6b3f9c)',
    avatarLetters: 'MC',
    verified: 'blue',
    timestamp: 'Jan 1802',
    text: `Visited Mount Vernon today. Mrs Washington spoke of the election of Mr. @TJefferson — "one of the most detestable of mankind" — and called it "the greatest misfortune our country had ever experienced."\n\nShe will not soon forgive the abuse offered to the General.`,
    counts: { replies: 21000, reposts: 52000, likes: 134000, views: 5400000 },
    note: {
      title: 'Recorded by Cutler after Jefferson took office.',
      body: `Rev. Manasseh Cutler's journal, January 2, 1802 (in *Life, Journals and Correspondence of Rev. Manasseh Cutler*, vol. II, p. 54). Martha Washington's words come to us as Cutler's paraphrase, not direct speech. The visit took place after Jefferson's inauguration; Cutler attributes Mrs. Washington's hostility to Jefferson's earlier "abuse" of her late husband.`
    }
  },
];

const POSTS_REPUBLICAN = [
  {
    id: 'rep-pinned',
    type: 'pinned',
    side: 'republican',
    handle: '@JeffersonNow',
    name: 'Republicans for Jefferson',
    avatarBg: 'linear-gradient(135deg,#6b1b1b,#8b2a2a)',
    avatarLetters: 'JN',
    verified: 'gold',
    timestamp: 'Oct 1800',
    text: `Four years of taxes. Four years of war fever. Four years of one man inching us toward monarchy.\n\nIt ends in November.\n\nVote @TJefferson. #Election1800`,
    counts: { replies: 5100, reposts: 22000, likes: 41000, views: 1300000 }
  },
  {
    id: 'rep-callender-1',
    side: 'republican',
    handle: '@CallenderJT',
    name: 'James Callender',
    avatarBg: 'linear-gradient(135deg,#6b1b1b,#8b2a2a)',
    avatarLetters: 'JC',
    verified: 'blue',
    timestamp: '3h',
    text: `A reminder of who you are voting to re-elect:\n\nA strange compound of ignorance and ferocity, of deceit and weakness. @JohnAdams is a hideous hermaphroditical character, which has neither the force and firmness of a man, nor the gentleness and sensibility of a woman.\n\nTake your choice. #AdamsOut`,
    counts: { replies: 12000, reposts: 31000, likes: 89000, views: 2100000 },
    note: {
      title: 'Often misattributed to Jefferson — it is Callender\'s.',
      body: `From Callender's *The Prospect Before Us* (1800). The line frequently circulates as a Jefferson quotation; Jefferson did not write it but did secretly subsidize Callender's work. After Jefferson cut him off as president, Callender turned on him and broke the Sally Hemings story in 1802.`
    }
  },
  {
    id: 'rep-aurora-girls',
    side: 'republican',
    handle: '@AuroraGazette',
    name: 'Philadelphia Aurora',
    avatarBg: 'linear-gradient(135deg,#5a1e3a,#7a2a4a)',
    avatarLetters: 'AG',
    verified: 'gold',
    timestamp: '9h',
    text: `🚨 EXCLUSIVE 🚨\n\nWhile American sailors die in the Quasi-War, President @JohnAdams dispatched General Pinckney to England — to import four pretty girls.\n\nTwo for Pinckney.\n\nTwo for the President.\n\nThis is the man asking for your vote. #HisRotundity`,
    counts: { replies: 34000, reposts: 89000, likes: 241000, views: 6800000 },
    note: {
      title: 'A real Republican-press rumor; Adams answered it privately.',
      body: `John Adams to William Tudor Sr., Dec. 13, 1800 (Founders Online): "Among a million [of rumors] one was circulated far and wide and believed by thousands, that General Pinckney had imported from England four pretty Girls two of them for my Use and two for his own. Upon honor if this is true Gen. Pinckney has kept them all four to himself and cheated me of my two." No corroborating evidence for the alleged voyage exists. The exact wording of the original Aurora article has not been verified; the post above paraphrases the rumor as it circulated.`
    }
  },
  {
    id: 'rep-aurora-monarchy',
    side: 'republican',
    handle: '@AuroraGazette',
    name: 'Philadelphia Aurora',
    avatarBg: 'linear-gradient(135deg,#5a1e3a,#7a2a4a)',
    avatarLetters: 'AG',
    verified: 'gold',
    timestamp: '17h',
    text: `🚨 BREAKING 🚨\n\nPresident @JohnAdams attempted to marry off his son to a daughter of King George III to install an American monarchy.\n\nGeneral Washington personally intervened to stop it.\n\nAdams = monarchist. #NoKings`,
    counts: { replies: 14000, reposts: 33000, likes: 71000, views: 2700000 },
    note: {
      title: 'No documentary basis for the claim.',
      body: `No correspondence between the Adams family and the British royal household concerning a marital alliance has ever been found. The story circulated as a Republican attack but has no documentary basis. The exact wording of the original Aurora article has not been verified; the post above is a reconstruction of the rumor as it spread in the Republican press.`
    }
  },
];

// The bombshell — Hamilton attacks his own party's incumbent.
const BOMBSHELL_HAMILTON = {
  id: 'hamilton-bomb',
  side: 'federalist',
  handle: '@AHamilton',
  name: 'Alexander Hamilton',
  avatarBg: 'linear-gradient(135deg,#4a3621,#6b5036)',
  avatarLetters: 'AH',
  verified: 'blue',
  timestamp: '14h',
  text: `My fellow Federalists. Before you cast a vote for our President, you should know what I have set down at length:\n\n"the disgusting egotism, the distempered jealousy, and the ungovernable indiscretion of Mr. Adams's temper."\n\nThe party deserves the truth. ⬇️`,
  counts: { replies: 18000, reposts: 41000, likes: 102000, views: 3100000 },
  pamphlet: true,
  note: {
    title: 'A sitting Federalist attacking his own party\'s incumbent.',
    body: `Hamilton's pamphlet was meant for circulation only among Federalist electors. Aaron Burr obtained a copy and leaked it; Republican papers reprinted it gleefully. Historians count the leak among the proximate causes of Adams's loss and the splintering of the Federalist Party.`
  }
};

// The bombshell for Republicans — Callender's closing slogan, the apex of the campaign.
const BOMBSHELL_CALLENDER = {
  id: 'callender-bomb',
  side: 'republican',
  handle: '@CallenderJT',
  name: 'James Callender',
  avatarBg: 'linear-gradient(135deg,#6b1b1b,#8b2a2a)',
  avatarLetters: 'JC',
  verified: 'blue',
  timestamp: '1d',
  text: `Closing argument:\n\n"Take your choice, then, between Adams, war, and beggary, and Jefferson, peace, and competency."\n\nAdams. War. Beggary.\n\n@TJefferson. Peace. Competency.\n\nTake your choice. #Election1800`,
  counts: { replies: 9100, reposts: 24000, likes: 76000, views: 1800000 },
  note: {
    title: 'The slogan that defined the closing days of the campaign.',
    body: `From Callender's *The Prospect Before Us* (1800). The original is a single sentence; the broken-line typography above is a stylistic rendering. Callender served nine months in jail for seditious libel under the Adams administration's 1798 Sedition Act; his pamphlet was written from prison.`
  }
};

// =====================================================================
// Helper: format big numbers (12K, 1.4M)
// =====================================================================
function formatCount(n) {
  if (n >= 1000000) {
    const v = n / 1000000;
    return (v >= 10 ? v.toFixed(0) : v.toFixed(1)) + 'M';
  }
  if (n >= 1000) {
    const v = n / 1000;
    return (v >= 10 ? v.toFixed(0) : v.toFixed(1)) + 'K';
  }
  return n.toString();
}

// =====================================================================
// Verified checkmark SVGs (X-authentic)
// =====================================================================
const VerifiedBadge = ({ kind = 'blue' }) => (
  <svg
    viewBox="0 0 22 22"
    fill="currentColor"
    className={kind === 'gold' ? 'text-amber-500' : 'text-sky-500'}
    style={{ width: 18, height: 18, flexShrink: 0 }}
    role="img"
    aria-label={kind === 'gold' ? 'Verified organization' : 'Verified account'}
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

// =====================================================================
// Component: Post (X feed card)
// =====================================================================
function Post({
  post,
  noteRevealed,
  liked,
  reposted,
  onLike,
  onRepost,
  liveCounts,
  index,
}) {
  // Highlight @-mentions and hashtags
  const formatBody = (text) =>
    text.split('\n').map((line, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {line.split(/(@\w+|#\w+)/).map((tok, j) => {
          if (tok.startsWith('@') || tok.startsWith('#')) {
            return (
              <span key={j} className="text-sky-500">
                {tok}
              </span>
            );
          }
          return <span key={j}>{tok}</span>;
        })}
      </p>
    ));

  return (
    <article
      className="border-b px-4 pt-3 pb-2"
      style={{ borderColor: '#2f3336', animation: 'postFadeIn 0.6s ease both' }}
    >
      {post.type === 'pinned' && (
        <div
          className="flex items-center gap-2 ml-12 mb-1 text-xs font-bold"
          style={{ color: '#71767b' }}
        >
          <Pin size={14} aria-hidden="true" /> Pinned
        </div>
      )}
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ background: post.avatarBg }}
          aria-hidden="true"
        >
          {post.avatarLetters}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 flex-wrap text-[15px]">
            <span className="font-bold" style={{ color: '#e7e9ea' }}>
              {post.name}
            </span>
            <VerifiedBadge kind={post.verified} />
            <span style={{ color: '#71767b' }}>{post.handle}</span>
            <span style={{ color: '#71767b' }}>·</span>
            <span style={{ color: '#71767b' }}>{post.timestamp}</span>
          </div>

          {/* Body */}
          <div
            className="mt-1 whitespace-pre-line text-[15px] leading-snug"
            style={{ color: '#e7e9ea' }}
          >
            {formatBody(post.text)}
          </div>

          {/* Pamphlet card (Hamilton bombshell) */}
          {post.pamphlet && (
            <div
              className="mt-3 rounded-2xl overflow-hidden"
              style={{
                border: '1px solid #2f3336',
                background: 'linear-gradient(135deg,#1a1a1a,#0d0d0d)',
              }}
            >
              <div
                className="aspect-[1.4/1] flex items-center justify-center text-center p-8 relative"
                style={{
                  background:
                    'repeating-linear-gradient(0deg,rgba(220,200,160,0.04) 0,rgba(220,200,160,0.04) 1px,transparent 1px,transparent 14px),linear-gradient(135deg,#2a1f0f,#1c1408)',
                  fontFamily: '"EB Garamond", Georgia, serif',
                  color: 'rgba(220,200,160,0.9)',
                }}
              >
                <div
                  className="absolute inset-3"
                  style={{ border: '2px double rgba(220,200,160,0.3)' }}
                />
                <div className="relative text-[13px] leading-tight">
                  A LETTER<br />FROM
                  <div className="text-[17px] italic my-2">Alexander Hamilton</div>
                  CONCERNING THE<br />
                  <em>Public Conduct and Character</em>
                  <br />OF
                  <div className="text-[17px] italic my-2">John Adams, Esq.</div>
                  PRESIDENT OF THE UNITED STATES
                  <div className="text-[11px] mt-3 opacity-60">
                    Printed for John Lang · 1800
                  </div>
                </div>
              </div>
              <div
                className="px-4 py-2 text-[13px] flex items-center gap-2"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#71767b', borderTop: '1px solid #2f3336' }}
              >
                📜 hamilton-on-adams.pdf · 54 pages
              </div>
            </div>
          )}

          {/* Quote tweet card */}
          {post.quoteTweet && (
            <div
              className="mt-3 rounded-2xl p-3"
              style={{ border: '1px solid #2f3336' }}
            >
              <div className="flex items-center gap-1.5 text-[13px] flex-wrap">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: post.quoteTweet.avatarBg, fontSize: 9 }}
                >
                  {post.quoteTweet.avatarLetters}
                </div>
                <span className="font-bold" style={{ color: '#e7e9ea' }}>
                  {post.quoteTweet.name}
                </span>
                <VerifiedBadge kind={post.quoteTweet.verified} />
                <span style={{ color: '#71767b' }}>{post.quoteTweet.handle}</span>
                <span style={{ color: '#71767b' }}>·</span>
                <span style={{ color: '#71767b' }}>{post.quoteTweet.timestamp}</span>
              </div>
              <div className="mt-1 text-[14px]" style={{ color: '#e7e9ea' }}>
                {post.quoteTweet.text}
              </div>
            </div>
          )}

          {/* Community Note */}
          {post.note && (
            <div
              className="mt-3 rounded-2xl p-3"
              style={{
                border: '1px solid #38444d',
                background: 'rgba(255,215,0,0.02)',
                opacity: noteRevealed ? 1 : 0,
                transform: noteRevealed ? 'none' : 'translateY(10px) scale(0.98)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
              }}
            >
              <div
                className="flex items-center gap-2 text-[13px] font-semibold mb-2"
                style={{ color: '#71767b' }}
              >
                <Info size={16} className="text-amber-400" aria-hidden="true" />
                Readers added context they thought people might want to know
              </div>
              <div className="text-[14px] font-bold mb-1" style={{ color: '#e7e9ea' }}>
                {post.note.title}
              </div>
              <div className="text-[14px] leading-snug" style={{ color: '#e7e9ea' }}>
                {post.note.body}
              </div>
            </div>
          )}

          {/* Engagement */}
          <div className="flex justify-between mt-3 max-w-md text-[13px]" style={{ color: '#71767b' }}>
            <button
              type="button"
              aria-label={`${formatCount(liveCounts.replies)} replies`}
              className="flex items-center gap-1 hover:text-sky-500 transition-colors"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{formatCount(liveCounts.replies)}</span>
            </button>
            <button
              type="button"
              onClick={onRepost}
              aria-pressed={reposted}
              aria-label={`${formatCount(liveCounts.reposts)} reposts${reposted ? ', reposted' : ''}`}
              className={`flex items-center gap-1 transition-colors ${
                reposted ? 'text-emerald-500' : 'hover:text-emerald-500'
              }`}
            >
              <Repeat2 size={18} aria-hidden="true" />
              <span>{formatCount(liveCounts.reposts)}</span>
            </button>
            <button
              type="button"
              onClick={onLike}
              aria-pressed={liked}
              aria-label={`${formatCount(liveCounts.likes)} likes${liked ? ', liked' : ''}`}
              className={`flex items-center gap-1 transition-colors ${
                liked ? 'text-rose-500' : 'hover:text-rose-500'
              }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
              <span>{formatCount(liveCounts.likes)}</span>
            </button>
            <button
              type="button"
              aria-label={`${formatCount(liveCounts.views)} views`}
              className="flex items-center gap-1 hover:text-sky-500 transition-colors"
            >
              <BarChart3 size={18} aria-hidden="true" />
              <span>{formatCount(liveCounts.views)}</span>
            </button>
            <button
              type="button"
              aria-label="Bookmark"
              className="flex items-center gap-1 hover:text-sky-500 transition-colors"
            >
              <Bookmark size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// =====================================================================
// Animated counter hook
// =====================================================================
function useAnimatedCounts(target, active, duration = 1100) {
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState(() =>
    reducedMotion
      ? { replies: target.replies, reposts: target.reposts, likes: target.likes, views: target.views }
      : { replies: 0, reposts: 0, likes: 0, views: 0 }
  );
  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setCounts({
        replies: target.replies,
        reposts: target.reposts,
        likes: target.likes,
        views: target.views,
      });
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts({
        replies: target.replies * eased,
        reposts: target.reposts * eased,
        likes: target.likes * eased,
        views: target.views * eased,
      });
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reducedMotion, target.replies, target.reposts, target.likes, target.views]);
  return counts;
}

// =====================================================================
// Component: One revealed post in the feed (handles its own note delay + counter animation)
// =====================================================================
function FeedPost({ post, index, isFocused, userBoost = { likes: 0, reposts: 0 } }) {
  const reducedMotion = useReducedMotion();
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [noteRevealed, setNoteRevealed] = useState(reducedMotion);

  const targetCounts = {
    replies: post.counts.replies,
    reposts: post.counts.reposts + (reposted ? 1 : 0),
    likes: post.counts.likes + (liked ? 1 : 0),
    views: post.counts.views,
  };

  const counts = useAnimatedCounts(targetCounts, isFocused);

  // Reveal community note after a delay once focused (immediately under reduced motion)
  useEffect(() => {
    if (!isFocused || !post.note) return;
    if (reducedMotion) {
      setNoteRevealed(true);
      return;
    }
    const t = setTimeout(() => setNoteRevealed(true), 1700);
    return () => clearTimeout(t);
  }, [isFocused, post.note, reducedMotion]);

  return (
    <Post
      post={post}
      index={index}
      noteRevealed={noteRevealed}
      liked={liked}
      reposted={reposted}
      onLike={() => setLiked((v) => !v)}
      onRepost={() => setReposted((v) => !v)}
      liveCounts={counts}
    />
  );
}

// =====================================================================
// PHASE 1 — Intro
// =====================================================================
function Hero({ onBegin }) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(reducedMotion);
  const [cta, setCta] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      setCta(true);
      return;
    }
    const t1 = setTimeout(() => setShown(true), 300);
    const t2 = setTimeout(() => setCta(true), 1800);
    return () => [t1, t2].forEach(clearTimeout);
  }, [reducedMotion]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-black text-white">
      <div className="max-w-3xl w-full text-center">
        <div
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: 'clamp(34px, 6vw, 64px)',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#fff',
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateY(10px)',
            transition: 'opacity 1.4s ease, transform 1.6s ease',
          }}
        >
          What if X had existed
          <br />
          for the 1800 presidential election?
        </div>

        <button
          onClick={onBegin}
          className="mt-16 group inline-flex items-center gap-3 px-8 py-3 rounded-full text-[15px] font-medium"
          style={{
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            opacity: cta ? 1 : 0,
            transform: cta ? 'none' : 'translateY(8px)',
            transition: 'opacity 1.0s ease, transform 1.0s ease, background 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          Open the feed
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// PHASE 2 — The Feed (single unified stream)
// =====================================================================

// Master feed ordering — chronologically and rhythmically tuned.
// Opens with absurdity, builds, lands the Hamilton bombshell mid-feed,
// closes with Callender's slogan. Every quote is real.
const FEED = [
  // Opening: Callender swings first — sets the absurdity baseline
  POSTS_REPUBLICAN[1], // Callender hermaphroditical
  // Federalist counter via Porcupine quote-tweet (defined below)
  // Connecticut Courant doom — first community note
  POSTS_FEDERALIST[1],
  // Aurora "pretty girls" — the comedic centerpiece, with Adams's wry response in CN
  POSTS_REPUBLICAN[2],
  // Dwight prostitution warning
  POSTS_FEDERALIST[2],
  // Aurora monarchy hoax with note
  POSTS_REPUBLICAN[3],
  // Hamilton trashes his own party's nominee — the bombshell
  BOMBSHELL_HAMILTON,
  // Martha Washington
  POSTS_FEDERALIST[3],
  // Callender's closing — the slogan, the kicker
  BOMBSHELL_CALLENDER,
];

// One Federalist counter post — Porcupine quote-tweeting Callender.
// Inserted by index in renderFeed below.
const PORCUPINE_QT = {
  id: 'porcupine-qt',
  side: 'federalist',
  handle: '@PorcupinesGazette',
  name: "Porcupine's Gazette",
  avatarBg: 'linear-gradient(135deg,#1f3b5e,#2c5282)',
  avatarLetters: 'PG',
  verified: 'gold',
  timestamp: '2h',
  text: `Rich, coming from a man who would set fire to the Republic to be elected.\n\n@CallenderJT is a journalist of the worst stamp. #DefendThePresident`,
  counts: { replies: 9400, reposts: 18000, likes: 45000, views: 1400000 },
  quoteTweet: {
    name: 'James Callender',
    handle: '@CallenderJT',
    timestamp: '3h',
    avatarBg: 'linear-gradient(135deg,#6b1b1b,#8b2a2a)',
    avatarLetters: 'JC',
    verified: 'blue',
    text: 'A reminder of who you are voting to re-elect: a strange compound of ignorance and ferocity, of deceit and weakness…',
  },
};

function FeedExperience({ onComplete }) {
  // Build the post array with Porcupine inserted after Callender's opener
  const posts = [
    FEED[0],
    PORCUPINE_QT,
    ...FEED.slice(1),
  ];

  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(1);
  // Default to paused under reduced motion (tap-to-advance) so users aren't
  // chased down the page by an auto-scroller.
  const [paused, setPaused] = useState(reducedMotion);
  const containerRef = useRef(null);

  const advance = () => setRevealed((v) => Math.min(v + 1, posts.length));

  // Auto-advance through posts at a comfortable reading pace, unless paused.
  useEffect(() => {
    if (paused) return;
    if (revealed >= posts.length) return;
    const post = posts[revealed];
    let delay = 4200;
    if (post.note) delay = 5400; // hold longer when there's a note to reveal
    if (post.pamphlet) delay = 5500; // hold for the Hamilton pamphlet
    if (post.quoteTweet) delay = 4800;
    const t = setTimeout(() => setRevealed((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [revealed, posts.length, paused]);

  // Auto-scroll to the latest revealed post. Skip smooth scroll under reduced
  // motion; skip entirely when paused so the user controls their position.
  useEffect(() => {
    if (paused || !containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[data-feed-item]');
    const last = items[items.length - 1];
    if (last) {
      last.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }
  }, [revealed, paused, reducedMotion]);

  // Keyboard controls: space toggles pause, right arrow advances.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visiblePosts = posts.slice(0, revealed);
  const allDone = revealed >= posts.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky frame header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-md flex items-center justify-between gap-3 px-4 py-3 border-b mx-auto"
        style={{
          background: 'rgba(0,0,0,0.85)',
          borderColor: '#2f3336',
          maxWidth: 600,
        }}
      >
        <div className="min-w-0">
          <div
            className="text-[12px] italic"
            style={{ color: '#71767b', fontFamily: '"EB Garamond", Georgia, serif' }}
          >
            For You · 1800
          </div>
          <div
            className="text-[18px] font-bold"
            style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
          >
            If 1800 Had X
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProgressBar revealed={revealed} total={posts.length} />
          {!allDone && (
            <>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
                aria-pressed={paused}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid #2f3336', color: '#e7e9ea' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={advance}
                aria-label="Show next post"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid #2f3336', color: '#e7e9ea' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <SkipForward size={14} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Live region announces progress to screen readers without disturbing layout */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Post {Math.min(revealed, posts.length)} of {posts.length}
      </div>

      <div ref={containerRef} style={{ maxWidth: 600, margin: '0 auto' }}>
        {visiblePosts.map((post, i) => (
          <div key={post.id} data-feed-item>
            <FeedPost post={post} index={i} isFocused />
          </div>
        ))}

        {allDone && <FeedFooter onShare={onComplete} />}
      </div>
    </div>
  );
}

function ProgressBar({ revealed, total }) {
  const pct = Math.min(100, (revealed / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-20 h-1 rounded-full overflow-hidden"
        style={{ background: '#2f3336' }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={Math.min(revealed, total)}
        aria-label={`Feed progress: ${Math.min(revealed, total)} of ${total} posts`}
      >
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${pct}%`, background: '#1d9bf0' }}
        />
      </div>
    </div>
  );
}

function FeedFooter({ onShare }) {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) { setShown(true); return; }
    const t = setTimeout(() => setShown(true), 600);
    return () => clearTimeout(t);
  }, [reducedMotion]);
  return (
    <div
      data-feed-item
      className="px-6 py-16 text-center"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(10px)',
        transition: 'opacity 1.2s ease, transform 1.2s ease',
      }}
    >
      <div
        className="text-[11px] tracking-[0.2em] uppercase mb-4"
        style={{ color: '#71767b' }}
      >
        End of feed
      </div>
      <div
        style={{
          fontFamily: '"EB Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: 22,
          color: '#e7e9ea',
          lineHeight: 1.5,
        }}
      >
        Every quotation above is verbatim from
        <br />
        American newspapers, pamphlets, and letters of the period.
      </div>
      <div
        className="mt-3 text-[12px] max-w-md mx-auto"
        style={{ color: '#71767b', lineHeight: 1.5 }}
      >
        Text in "quotation marks" is taken from primary sources;
        post framing is a modern reconstruction.
      </div>
      <div
        className="mt-3 text-[14px]"
        style={{ color: '#71767b' }}
      >
        Adams and Jefferson reconciled in 1812 and died on the same day, July 4, 1826, within five hours of each other.
      </div>

      <button
        onClick={onShare}
        className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px]"
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        Share <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

// =====================================================================
// PHASE 3 — Share
// =====================================================================
function ShareScreen({ onRestart }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : 'https://1800.freesystems.org/';

  const tweet = `If 1800 had X. Every quotation verbatim. ${url}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleX = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    if (typeof window !== 'undefined') window.open(xUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <div
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: 'clamp(36px,5.5vw,52px)',
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          If 1800 had X.
        </div>
        <div
          className="mt-6 text-[16px] italic max-w-lg mx-auto"
          style={{ color: '#a8acaf', fontFamily: '"EB Garamond", Georgia, serif' }}
        >
          Send it to someone who thinks the discourse has never been worse.
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleX}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[15px] font-medium transition-all"
            style={{ background: '#fff', color: '#000' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e6e6e6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
          >
            <Share2 size={16} aria-hidden="true" />
            Post on X
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[15px] font-medium transition-all"
            style={{
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <CopyIcon size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>

        <div className="mt-16 pt-10 border-t" style={{ borderColor: '#2f3336' }}>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-[15px]"
            style={{ color: '#1d9bf0' }}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Watch again
          </button>
        </div>

        <div
          className="mt-20 text-[10px] tracking-[0.18em] uppercase"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          A Free Systems project · freesystems.substack.com
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// Root: phase router
// =====================================================================
export default function App() {
  const [phase, setPhase] = useState('hero');

  // Reset scroll on phase change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [phase]);

  // Inject required webfont once
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'eb-garamond-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,700;1,400;1,500&display=swap';
      document.head.appendChild(link);
    }
    // Inject keyframe for post fade-in
    if (!document.getElementById('post-keyframes')) {
      const s = document.createElement('style');
      s.id = 'post-keyframes';
      s.textContent = `
        @keyframes postFadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: none;} }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
      `;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {phase === 'hero' && <Hero onBegin={() => setPhase('feed')} />}
      {phase === 'feed' && (
        <FeedExperience onComplete={() => setPhase('share')} />
      )}
      {phase === 'share' && (
        <ShareScreen onRestart={() => setPhase('hero')} />
      )}
    </div>
  );
}
