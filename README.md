# If 1800 Had X

An interactive playthrough of the Adams–Jefferson presidential campaign of 1800, presented as if it had unfolded on a modern social network. Every direct quotation in the feed is drawn from primary sources of 1798–1802 — newspapers, pamphlets, sermons, and personal correspondence — and is reproduced verbatim. Where the framing of a post reconstructs the rhetoric of contemporary papers without a single canonical source, that is flagged in the post's Community Note.

A [Free Systems](https://freesystems.substack.com) project.

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. You can preview the production build with `npm run preview`.

## Deploy

### Vercel (recommended, easiest)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite. No config needed. Click deploy.
4. Add a custom domain in the Vercel dashboard if you want it on `1800.freesystems.org` or similar.

### Netlify

1. Push to GitHub.
2. New site from Git on Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

### Cloudflare Pages

1. Push to GitHub.
2. Pages → Connect to Git → select repo.
3. Framework preset: Vite. Build output: `dist`.

### GitHub Pages

GitHub Pages serves from a subpath like `username.github.io/if-1800-had-x/`. Edit `vite.config.js` and change `base: '/'` to `base: '/if-1800-had-x/'` before building.

```bash
npm run build
# then push dist/ to a gh-pages branch, or use a github action
```

## Project structure

```
.
├── index.html              # Entry HTML with OG meta tags for share previews
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg         # Placeholder; replace with your own
└── src/
    ├── main.jsx            # React mount point
    ├── App.jsx             # The whole app (single file by design)
    └── index.css           # Tailwind directives
```

## Customizing

### Change the share image

Add an image at `public/og-image.png` (1200×630 is the X/OG standard) and the `index.html` meta tags will pick it up.

### Adjust pacing

In `src/App.jsx`, search for `let delay = 4200`. The `FeedExperience` component sets per-post timing there.

### Add or change posts

The `FEED` array at the top of `App.jsx` defines the post sequence. Each post has the structure:

```js
{
  id: 'unique-id',
  handle: '@HandleName',
  name: 'Display Name',
  avatarBg: 'linear-gradient(135deg,#color1,#color2)',
  avatarLetters: 'XX',
  verified: 'blue', // or 'gold'
  timestamp: '3h',
  text: 'Body text...',
  counts: { replies, reposts, likes, views },
  note: { title, body },     // optional Community Note
  pamphlet: true,             // optional pamphlet card (Hamilton)
  quoteTweet: { ... },        // optional embedded quote tweet
}
```

## Sources

All quoted material is drawn from primary sources of the period:

- **James Callender**, *The Prospect Before Us* (Richmond, 1800), written while Callender was imprisoned under the Sedition Act. Source for the "ignorance and ferocity / hermaphroditical character" attack and the "Adams, war, and beggary; Jefferson, peace, and competency" closing slogan. The hermaphroditical line is frequently misattributed to Jefferson; the words are Callender's, though Jefferson secretly subsidized the pamphlet.
- **Connecticut Courant**, "Burleigh" pseudonymous editorial, September 15, 1800, attributed to Federalist editor Theodore Dwight. The Hartford Courant formally apologized for its 1800 election coverage in 1993.
- **Rev. Timothy Dwight IV**, *The Duty of Americans, at the Present Crisis*, sermon delivered July 4, 1798. The "legal prostitution" line predates the 1800 campaign and was originally aimed at the French Revolution; Federalists redeployed it in 1800 against Jefferson.
- **Alexander Hamilton**, *Letter from Alexander Hamilton, Concerning the Public Conduct and Character of John Adams, Esq., President of the United States* (October 24, 1800), via [Founders Online](https://founders.archives.gov/documents/Hamilton/01-25-02-0110-0002).
- **John Adams** to William Tudor Sr., December 13, 1800, via [Founders Online](https://founders.archives.gov/documents/Adams/99-02-02-4711). Source for Adams's verbatim retort about the "four pretty girls" rumor.
- **Rev. Manasseh Cutler**, journal entry of January 2, 1802, recording Martha Washington's remarks on Jefferson at Mount Vernon (in *Life, Journals and Correspondence of Rev. Manasseh Cutler*, vol. II).
- **Philadelphia Aurora General Advertiser**, where the "pretty girls" and "British marriage alliance" rumors circulated. The exact wording of those Aurora articles has not been verified against the original printings; the corresponding posts are flagged in their Community Notes as reconstructions of the rumor as it spread in the Republican press.

## License

The code is released under the MIT License (see LICENSE). The historical quotations are in the public domain. The framing, design, and editorial choices are © Andrew B. Hall, [Free Systems](https://freesystems.substack.com).
