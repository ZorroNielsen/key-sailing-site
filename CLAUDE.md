# key-sailing-site

Nový web pro **Key Sailing Sarasota** (siestakeysailing.com) — soukromé
plavby na plachetnici Key Breeze s kapitánem Timem a Jan Solomonovými,
Marina Jack, Sarasota FL. Skutečný klient (Jan), ne ukázkový web.

## Status

**První verze (náhled pro Jan)** — hotová, 2. 10. 2026. Od 4. 10. 2026 se
pracuje **jen v tomhle repu**: [ZorroNielsen/key-sailing-site](https://github.com/ZorroNielsen/key-sailing-site)
(vzniklo kopií `adam-kriz/1-key-sailing-sarasota`, to staré už neupravovat).
Hosting: **Cloudflare Pages** (účet „Websitesbychris.co@gmail.com's Account"),
projekt `key-sailing-site` → `key-sailing-site.pages.dev`.

Web č. 1 ze dvou. Web č. 2: `../sailing-home-sarasota-site/` (Janina kniha).

## Hlavní pravidlo

**Text je Janin, slovo od slova.** Nic nepřidáváme, nic neubíráme.
Text se bral přímo ze starého webu (Adobe Muse, staženo 2. 10. 2026).
Jediné nové texty jsou ty, které dodala Jan přes brief (hero, „trust line",
cenový blok) + popisky tlačítek („Call Jan", „Get directions"…).

Vědomé odchylky od starého webu:
- Nadpisy z VERZÁLEK převedeny na normální velikost písmen (např.
  „AWARD WINNING" → „Award Winning") — brief zakazuje all-caps nadpisy.
- © 2022 → © 2026 (podle briefu).
- Directions: věta „Click map to view Google Maps in a separate window"
  nahrazena vloženou mapou Google + tlačítkem „Get directions" (podle briefu).
- About Us: u fotek v časové ose vypuštěno „(JPG - 421KB)" apod.
  U PDF ponecháno, protože velikost varuje před velkým stažením.
- Úpravy od Jan (4. 10. 2026): nový text dárkových poukazů na Home a Reserve
  („Purchase a gift certificate now: …", nahradil „What a perfect present…"),
  věta o španělštině / 50 státech / 7 kontinentech na About Us, nové znění
  trust line na Home. Španělský koncept Home přeložen podle toho.
- Překlepy z originálu jsou **ponechány** (Buiness, gratituity, occassion,
  suprises, „it's first 25,000 miles") — opravit jen se souhlasem Jan.

## Struktura

Statický web, bez build stepu. Názvy stránek jsou **stejné jako na starém
webu** (aby fungovaly staré odkazy a výsledky Googlu):

| Soubor | Stránka |
|---|---|
| `index.html` | Home |
| `charter-pricing.html` | Reserve |
| `the-vessel.html` | The Vessel |
| `faqs.html` | FAQs (rozbalovací, `#payment` apod. otevře danou otázku) |
| `reviews.html` | Reviews |
| `about-us.html` | About Us |
| `directions.html` | Directions |
| `email-us.html` | Email Us (formulář) |
| `es/index.html` | Španělský **koncept** jen Home (čeká na kontrolu od Tima) |

- `style.css` — celý vzhled; barvy jako CSS proměnné v `:root`
- `js/main.js` — mobilní menu, západ slunce, dárkové poukazy, formulář,
  počítání kliknutí
- `functions/api/contact.js` — formulář Email Us → e-mail přes Resend
- `functions/api/tap.js` — počítadlo kliknutí → D1
- `wrangler.toml` — nastavení Cloudflare Pages (proměnné, D1); tajné klíče tu **nejsou**
- `_redirects` — staré adresy Muse `/phone/*` → nové stránky; `/review` (čeká na odkaz)
- `404.html` — stránka „Page not found" (absolutní cesty `/…`, zobrazí se na jakékoli adrese)
- `sitemap.xml` — adresy s ostrou doménou siestakeysailing.com
- `images/` — fotky a loga ze starého webu (malé rozlišení!)
- `assets/` — PDF a fotky ke stažení (stejné cesty jako na starém webu)
- `robots.txt` + `<meta name="robots" content="noindex">` — náhled se
  nemá objevit ve vyhledávačích

Hlavička, patička a spodní lišta Call/Text/WhatsApp jsou **v každém HTML
souboru zvlášť** — změna v nich = změnit ve všech 10 souborech (včetně
`404.html`). CSS/JS odkazy mají `?v=10`; po změně stylu číslo zvýšit.

## Design

- Barvy z loga: modrá `#2855A6`, žlutá `#FFF200` (jen tlačítka na modrém
  pozadí), bílá + světle modrý odstín `#F1F5FB` pro střídání sekcí.
- Fonty: Source Serif 4 (nadpisy) + Source Sans 3 (text), Google Fonts.
- Velké písmo (20 px text), velká tlačítka — publikum jsou hlavně starší páry.
- Zakázaný „AI vzhled" z briefu: žádné pill badge, žádné jedno slovo
  kurzívou jinou barvou, žádné staty s emoji, žádný gradient přes hero
  fotku, žádné malé verzálkové štítky nad nadpisy, žádné emoji ikony.

## Funkce

- **Call / Text / WhatsApp** — `tel:+19413467245`, `sms:` s předvyplněnou
  zprávou („Hi Jan, I'd like to book a sail on ___ for ___ people."),
  `wa.me` se stejnou zprávou. Na Androidu JS přepíše `&body=` na `?body=`.
- **Západ slunce** — počítá se živě v prohlížeči pro Sarasotu (časové
  pásmo America/New_York), přesnost ±1–2 min.
- **Dárkové poukazy $400/$500/$600** — zatím jen okno „Checkout comes here"
  (až bude mít Jan Stripe: 3 payment linky).
- **Formulář Email Us** → `POST /api/contact` (Pages Function) → Resend.
  Ochrana: skryté pole `website` (honeypot — vyplní ho jen bot, pak se nic
  nepošle) + Cloudflare Turnstile. **Bezpečnost:** dokud je ve `wrangler.toml`
  `FORMS_LIVE = "false"`, jde každá zpráva na `TEST_TO`, nikdy na Jan.
  Lokálně (python http.server) funkce neběží → formulář ukáže chybovou hlášku.
- **Turnstile** — v `email-us.html` je zatím **testovací** site key
  `1x00000000000000000000AA` (vždy projde, ukazuje „For testing only").
  Po vytvoření widgetu v Cloudflare vyměnit za skutečný site key.
- **Počítání kliknutí** — Call / Text / WhatsApp / gift tlačítka pošlou
  `navigator.sendBeacon` na `/api/tap` → D1 databáze `sarasota-sites`,
  tabulka `taps` (site, day, type, count; den v čase Sarasoty). Žádná osobní
  data. Čísla: Cloudflare → D1 → sarasota-sites → Console:
  `SELECT day, type, count FROM taps WHERE site='key-sailing' ORDER BY day DESC;`
- **JSON-LD LocalBusiness** v `<head>` na Home (adresa, telefon, $200 per hour).
- **Titulky stránek** ve tvaru „… | Key Sailing Sarasota".

## Cloudflare — tajné klíče (dashboard → projekt → Settings → Variables and Secrets)

| Název | Co to je |
|---|---|
| `RESEND_API_KEY` | API klíč z Resend (sending access) |
| `TURNSTILE_SECRET_KEY` | Secret key Turnstile widgetu |
| `TEST_TO` | Testovací adresa, kam chodí formuláře, dokud `FORMS_LIVE` není `"true"`. Dokud se posílá z `onboarding@resend.dev`, musí to být e-mail účtu v Resend. |

Web Analytics: zapíná se v dashboardu (projekt → Metrics → Web Analytics), bez kódu.

## Čeká se na Jan

- Nové fotky lodi (hero `keybreeze-banner.jpg` je malá, 665 px)
- Větší verze loga (`keysailing_logo72dpi.gif` má 389 px)
- Články ze **Southern Living** — do té doby je „As seen twice in Southern Living Magazine" jen prostý text bez odkazu
- Kontrola španělštiny (Tim), pak překlad zbytku stránek

## Při spuštění (až weby nahradí ty staré)

- Domény siestakeysailing.com (+ www) na Cloudflare, napojit na Pages projekt
- Smazat `Disallow: /` z `robots.txt` a `<meta name="robots" content="noindex…">` ze všech stránek
- Formuláře: v Resend ověřit doménu, `MAIL_FROM` přepnout na adresu z ní,
  pak `FORMS_LIVE = "true"` (teprve tehdy chodí zprávy Jan)
- Turnstile: přidat ostré domény do hostnames widgetu
- Odkazy „Jan's book" (patička + About Us) teď vedou na náhled `zorronielsen.github.io/sailing-home-sarasota-site/` → při spuštění vrátit na `https://sailinghomesarasota.com/`

## Lokální náhled

`.claude/launch.json` v kořeni workspace: konfigurace `key-sailing-site`
(Python `http.server` na portu 8127) → http://localhost:8127
