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
  U PDF ponecháno, protože velikost varuje před velkým stažením. Dvě PDF jsou
  komprimovaná (On a Mission, 21 Things), proto u nich 1.5MB a 1.8MB místo 59MB a 28MB.
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
- **Turnstile** — widget „Sarasota sites" (společný pro oba weby), site key
  `0x4AAAAAAFNkFBzFm2CQXTsB` v `email-us.html`. Hostnames zatím jen `*.pages.dev`; při spuštění
  přidat ostré domény. Secret key je v Pages secrets (`TURNSTILE_SECRET_KEY`).
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

## Čeká se na Jan (seznam ve zprávě pro Jan, připravené 4. 10. 2026)

- **Google review odkaz** → doplnit do `_redirects` jako `/review` (302)
- **Fotky**: velká hero fotka Key Breeze pod plachtami (teď `keybreeze-banner.jpg`,
  jen 665 px), pás fotek hostů, větší fotky na The Vessel (paluba, stín,
  kajuta, dvě toalety, bean bags). Žádné nové texty.
- **Větší verze loga** (`keysailing_logo72dpi.gif` má 389 px)
- **Změny z pondělního hovoru** (pošle Adam)
- **Stripe**: 3 payment linky ($400 / $500 / $600) místo okna „Checkout comes here"
- **Southern Living**: dva články; do té doby je „As seen twice in Southern
  Living Magazine" jen prostý text bez odkazu
- **Překlepy** ze starého webu: souhlas s opravou (ano/ne)
- **Španělština**: kontrola Home od Tima, pak překlad zbytku stránek
- **Potvrdit odkazy** facebook.com/keysailing a instagram.com/keybreezesailing
- **Pozvánka jako manažer** do Google Business Profile (viz „Po spuštění — zápisy")
- **Ke spuštění**: schválení náhledu; kdo spravuje doménu siestakeysailing.com
  (přístup); jestli Jan používá e-mail na doméně (pak zachovat MX záznamy)

## Při spuštění (až weby nahradí ty staré)

- Domény siestakeysailing.com (+ www) na Cloudflare, napojit na Pages projekt
- Smazat `Disallow: /` z `robots.txt` a `<meta name="robots" content="noindex…">` ze všech stránek
- Formuláře: v Resend přidat a ověřit doménu siestakeysailing.com (DNS záznamy SPF/DKIM/DMARC
  přidat v Cloudflare DNS), `MAIL_FROM` přepnout na adresu z ní (např.
  `website@siestakeysailing.com`), pak `FORMS_LIVE = "true"` — teprve tehdy chodí zprávy Jan.
  Bez ověřené domény padají e-maily do spamu (test 4. 10. 2026: všechny 3
  formuláře doručeny přes `onboarding@resend.dev`, ale do spamu).
- Turnstile: přidat ostré domény do hostnames widgetu
- Odkazy „Jan's book" (patička + About Us) teď vedou na náhled `sailing-home-sarasota-site.pages.dev` → při spuštění vrátit na `https://sailinghomesarasota.com/`

## Po spuštění — zápisy na mapách a v katalozích

Všude **přesně stejné údaje** (Google pak firmě víc věří):
Key Sailing Sarasota · 2 Marina Plaza, Slip E-19, Sarasota FL 34236 ·
941-346-7245 · https://siestakeysailing.com/ (stejné jako JSON-LD na Home).

- **Google Business Profile** — nejdřív potřeba **pozvánka od Jan jako
  manažer** (Business Profile settings → Managers → Add). Pak: sjednotit
  údaje, odkaz na nový web, nahrát Janiny nové fotky, nahlásit/odstranit
  fotku **katamaránu** (Key Breeze je jednotrupá Morgan 41', ne katamarán).
- **Bing Places** — umí importovat údaje z Google profilu.
- **Apple Maps** — přes Apple Business Connect.
- **Siesta Key Chamber of Commerce** (siestakeychamber.com/listing/key-sailing-charters/,
  tel. (941) 349-3800) — v popisu mají „Sarasota's longest running sailing
  charter (24 years!)", ale firma běží od 1996 → poprosit o opravu
  (nejlíp „Established 1996", ať to znovu nezastará) a sjednotit adresu
  (mají „Marina Jack Slip E-19").

## Lokální náhled

`.claude/launch.json` v kořeni workspace: konfigurace `key-sailing-site`
(Python `http.server` na portu 8127) → http://localhost:8127
