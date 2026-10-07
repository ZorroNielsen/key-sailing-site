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

**Nový design (od 7. 10. 2026):** podle zadání po Janině kontrole náhledu — bílý
a moderní, postavený kolem velké fotky lodi při západu slunce, ve stylu
**lightshiprv.com** (vzor, který chce Adam). Nový vzhled mají **všechny stránky**
(Home, Reserve, The Vessel, FAQs, Reviews, About Us, Directions, Email Us, 404
i španělský koncept Home), jeden společný `site.css`. Starý `style.css` je smazaný.

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
  Mapa je vložená podle **souřadnic** Marina Jack (27.33297, −82.54609, z Google Maps
  7. 10. 2026): vložení podle adresy začalo ukazovat celý svět. Stejné souřadnice
  jsou v JSON-LD na Home.
- About Us: u fotek v časové ose vypuštěno „(JPG - 421KB)" apod.
  U PDF ponecháno, protože velikost varuje před velkým stažením. Dvě PDF jsou
  komprimovaná (On a Mission, 21 Things), proto u nich 1.5MB a 1.8MB místo 59MB a 28MB.
- Úpravy od Jan (4. 10. 2026): nový text dárkových poukazů na Home a Reserve
  („Purchase a gift certificate now: …", nahradil „What a perfect present…"),
  věta o španělštině / 50 státech / 7 kontinentech na About Us, nové znění
  trust line na Home. Španělský koncept Home přeložen podle toho.
- Úpravy od Jan (7. 10. 2026): „one of the oldest in Florida“ → „the second oldest
  in Florida“; Community Service bez „from every cruise“; „Missionary experience on
  five continents…“ → „Global relief experience in almost 40 countries…“; About Us
  „over 30 countries on 5 continents“ → „almost 40 countries“ a „a "Missionary Kid"
  (M.K.)“ → „an "MK"“; Reserve „over 45,000“ → „approximately 60,000“ a smazaná
  věta „These exclusive sails are offered as private charters only.“; About Us nové
  položky „Timothy and Janet Solomon Day – April 10, 2022, City of Sarasota“
  (Proclamations, odkaz na fotku proklamace `assets/proclamation-solomon-day.jpg`) a článek Observer 2023 (In the News). Španělský
  koncept upraven stejně (kontrola od Tima).
- Directions (7. 10. 2026): Janin text „Sailing Details for your Key Sailing Private
  Charter Experience“ (jak projít ke gate E-1 kvůli stavbě) v béžovém boxu vedle mapy,
  slovo od slova podle její zprávy hostům, jen **bez emoji** (🍫 🔑 ⛵) kvůli zákazu
  emoji v designu.
- Nové texty ze zadání 7. 10. 2026: „Morning, afternoon and sunset cruises“ +
  „Morning“ / „Afternoon“ vedle řádku se západem slunce. Na Home zmizela
  tlačítka Call/Text/WhatsApp z horní části (jsou níž u ceny a v liště na mobilu).
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

- `site.css` — vzhled všech stránek; barvy jako CSS proměnné v `:root`
- `images/home/` — fotky nové Home z Janiných originálů (WebP + JPG záloha,
  bez metadat/GPS): hero na počítač (`hero-sunset-1600/2400`, IMG_2886) a na mobil
  (`hero-sunset-phone`, IMG_1174), karty ráno/odpoledne/západ, Tim a Jan (IMG_0012),
  8 fotek hostů. Karta **Morning = video** `cruise-morning.mp4` (10 s z dronu,
  `joined_video…mov` od 14,5 s, 720×720, H.264 900 kb/s bez zvuku, 1,1 MB; dělané
  přes Swift/AVAssetWriter, protože `avconvert` dává 5 MB) + úvodní obrázek
  `cruise-morning-video.jpg`. Afternoon = IMG_0797 (14:31), Sunset = západ mezi plachtami
- `js/main.js` — mobilní menu, západ slunce, dárkové poukazy, formulář,
  počítání kliknutí
- `functions/api/contact.js` — formulář Email Us → e-mail přes Resend
- `functions/api/tap.js` — počítadlo kliknutí → D1
- `wrangler.toml` — nastavení Cloudflare Pages (proměnné, D1); tajné klíče tu **nejsou**
- `_redirects` — staré adresy Muse `/phone/*` → nové stránky; `/review` (čeká na odkaz)
- `404.html` — stránka „Page not found" (absolutní cesty `/…`, zobrazí se na jakékoli adrese)
- `sitemap.xml` — adresy s ostrou doménou siestakeysailing.com
- `images/` — fotky a loga ze starého webu (malé rozlišení!) + nové logo
  `key-sailing-logo.webp` / `.png` (360 px, z Janina originálu)
- `originals/` — Janiny originály z iCloud alb (stažené 7. 10. 2026, odkazy platí jen
  do 4. 11. 2026). **Je v `.gitignore`**: jen na Adamově Macu, není na GitHubu ani na webu.
  `1-zapad-slunce/` (9 fotek), `2-rodina-hoste-plachty/` (24), `3-tim-jan-video/`
  (IMG_7319.mov — 8 s plachty proti modré obloze, na výšku), `4-logo-clanek-grafiky/`
  (logo 1500 px, článek Herald-Tribune o Janině tátovi = totéž co
  `assets/bud-hamel-sarasota-town-chaplain.jpg` na About Us, grafiky „People who eat
  chocolate…“ a „Key Breeze“), `5-dalsi-fotky/` (od Adama 7. 10. 2026: západ slunce mezi
  plachtami → karta Sunset na Home, Tim a Jan s ohňostrojem → About Us, IMG_7111 =
  fotka proklamace Solomon Day → About Us, IMG_8660 → galerie The Vessel,
  joined_video….mov (55 s z dronu) → 10 s video v kartě Morning; nevyužité zatím
  IMG_8657 (západ, na výšku) a IMG_8634.mov (4 s západ)). Na web jdou jen zmenšené kopie.
- `assets/` — PDF a fotky ke stažení (stejné cesty jako na starém webu)
- `robots.txt` + `<meta name="robots" content="noindex">` — náhled se
  nemá objevit ve vyhledávačích

Hlavička, patička a spodní lišta Call/Text/WhatsApp jsou **v každém HTML
souboru zvlášť** — změna v nich = změnit ve všech 10 souborech (včetně
`404.html`). Odkazy mají `site.css?v=8`, `main.js?v=12`; po změně číslo zvýšit.

## Design

**Ve stylu lightshiprv.com (`site.css`):** bílý, hodně volného místa,
velké fotky se zaoblenými rohy, jedno bezpatkové písmo **Hanken Grotesk** (Google
Fonts), obří nadpisy, béžové panely, zaoblená tlačítka. Žádné animace ani efekty
při posouvání, text 20 px (starší hosté).
- Pořadí Home: velká fotka (nic přes ni; na mobilu jiná fotka na výšku) → nadpis +
  trust line → „Morning, afternoon and sunset cruises“ + 3 fotky-karty se štítky
  (Morning / Afternoon / Sunset tonight) → Tim a Jan → motto obřím písmem + 8 fotek
  hostů → béžový panel s cenou a rezervací (Call / Text / WhatsApp) → dárkové
  poukazy → ocenění → Community Service → Featured In → světlá patička.
- Barvy: skoro černý text `#121721`, navy `#173A72` (tlačítka), modrá z loga
  `#2855A6` (odkazy), zlatá z loga `#D99A1E` jen na ikony, béžová `#F3F0EA` (panely).
- Žádná žlutá tlačítka, žádný modrý rezervační box. Spodní lišta na mobilu je bílá.
- Vnitřní stránky: obří nadpis stránky, béžové zaoblené panely místo modrých pásů
  (`.section.tint`), rezervační box dole je béžový (`.book`), FAQ s kulatým +/−.
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
- **Titulky stránek** ve tvaru „… | Key Sailing Sarasota", s hledanými slovy
  (např. Home „Sarasota Sailing Charter & Sunset Cruises“). Nadpisy na stránkách
  jsou Janiny texty — měnit jen s jejím souhlasem.
- **Video v kartě Morning** (Home EN i ES): hraje samo, potichu, dokola a jen když je
  na obrazovce; kulaté tlačítko vpravo nahoře ho pozastaví (WCAG: pohyb delší než 5 s
  musí jít zastavit). Kdo má v telefonu omezené animace, vidí jen úvodní obrázek.
  Logika v `js/main.js` (`video[data-ambient]`).
- **Video z Facebooku** na About Us (a na webu knihy): embed `plugins/video.php`
  videa facebook.com/DiegoRosalesUHD/videos/1249196727281841 (Tim ve Washingtonu,
  španělsky, na výšku). Nestahuje se, jen vkládá.

## Cloudflare — tajné klíče (dashboard → projekt → Settings → Variables and Secrets)

| Název | Co to je |
|---|---|
| `RESEND_API_KEY` | API klíč z Resend (sending access) |
| `TURNSTILE_SECRET_KEY` | Secret key Turnstile widgetu |
| `TEST_TO` | Testovací adresa, kam chodí formuláře, dokud `FORMS_LIVE` není `"true"`. Dokud se posílá z `onboarding@resend.dev`, musí to být e-mail účtu v Resend. |

Web Analytics: zapíná se v dashboardu (projekt → Metrics → Web Analytics), bez kódu.

## Čeká se na Jan (aktuální k 7. 10. 2026)

Čísla odpovídají seznamu od collaboratora (7. 10. 2026).

- **8 · TripAdvisor 2026**: odznaky Travelers' Choice 2026 místo 2023 a 2020 (Home →
  Award Winning, Reviews). Na stránce Key Sailing na TripAdvisoru **žádný odznak 2026
  není** (jediný odznak 2026 tam patří jiné firmě) → Jan musí potvrdit, že ocenění má,
  a poslat obrázek z TripAdvisor Management Center
- **10 · Observer 2023**: fotka tištěného článku → About Us, In the News (online článek už
  je prolinkovaný; sken tisku online není)
- **12 · Southern Living**: fotka na About Us (online jsme ji nenašli); časem i dva články,
  do té doby je „As seen twice in Southern Living Magazine" jen text bez odkazu.
  (Fotka Herald 1962 je hotová: výřez z PDF „Missionary Speaks“ v časové ose „1962“.)
- **Fotky, které nedorazily**: IMG_2672.jpeg a „Click to Download“ (nedostupné → poslat
  znovu); IMG_0602, IMG_3046, IMG_2629 (Poznámky) → Adam je přetáhne do
  `originals/5-dalsi-fotky/`. macOS Claudovi nedovolí číst složku Zpráv.
- **Větší fotky na The Vessel**: paluba, stín, kajuta, dvě toalety, bean bags
- **Potvrdit**: facebookové video (Tim ve Washingtonu) je to správné; souhlas s doplněním
  „Sarasota“ do nadpisů (Google); odkazy facebook.com/keysailing a
  instagram.com/keybreezesailing; oprava překlepů ze starého webu (ano/ne)
- **14 · Úpravy sama**: rozhodnutí o návrhu (claude.ai/artifact/Guw2twgogDqpxsxupuVvvL —
  formulář na /admin, přihlášení kódem z e-mailu, ceny / oznámení s datem / fotky)
- **Google review odkaz** → doplnit do `_redirects` jako `/review` (302)
- **Stripe**: 3 payment linky ($400 / $500 / $600) místo okna „Checkout comes here"
- **Španělština**: kontrola Home od Tima, pak překlad zbytku stránek
- **Starý web — formulář nechodí** (Jan psala 7. 10. 2026): stránka i PHP skript na
  GoDaddy fungují, problém je v doručení e-mailu (staré Adobe Muse posílá „jako“ Janina
  adresa; Gmail to blokuje / dává do spamu, doména má DMARC p=reject). Jan má zkontrolovat
  spam a dát přístup do GoDaddy (Delegate Access). Trvalé řešení = spuštění nového webu.
- **Pozvánka jako manažer** do Google Business Profile (viz „Po spuštění — zápisy")
- **Ke spuštění**: kdo spravuje doménu siestakeysailing.com (přístup); jestli Jan používá
  e-mail na doméně (pak zachovat MX záznamy)

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
- **Google Search Console**: ověřit doménu, poslat `sitemap.xml`

## Po spuštění — zápisy na mapách a v katalozích

Všude **přesně stejné údaje** (Google pak firmě víc věří):
Key Sailing Sarasota · 2 Marina Plaza, Slip E-19, Sarasota FL 34236 ·
941-346-7245 · https://siestakeysailing.com/ (stejné jako JSON-LD na Home).

Cíl (Jan): být co nejvýš při hledání „sailing Sarasota“, „sailing charter Sarasota“,
„sunset cruise Sarasota“ apod.

- **Google Business Profile** — nejdřív potřeba **pozvánka od Jan jako
  manažer** (Business Profile settings → Managers → Add). Pak projít celý:
  hlavní + další kategorie, otevírací doba, popis, služby s cenami, odkaz na
  nový web a na rezervaci / volání, hodně Janiných fotek (originály v `originals/`),
  nahlásit/odstranit fotku **katamaránu** (Key Breeze je jednotrupá Morgan 41',
  ne katamarán), pravidelné příspěvky, review link pro hosty (`/review`).
- **Bing Places** — umí importovat údaje z Google profilu.
- **Apple Maps** — přes Apple Business Connect.
- **TripAdvisor** a **Yelp** — sjednotit jméno / adresu / telefon / web.
- **Siesta Key Chamber of Commerce** (siestakeychamber.com/listing/key-sailing-charters/,
  tel. (941) 349-3800) — v popisu mají „Sarasota's longest running sailing
  charter (24 years!)", ale firma běží od 1996 → poprosit o opravu
  (nejlíp „Established 1996", ať to znovu nezastará) a sjednotit adresu
  (mají „Marina Jack Slip E-19").

## Lokální náhled

`.claude/launch.json` v kořeni workspace: konfigurace `key-sailing-site`
(Python `http.server` na portu 8127) → http://localhost:8127
