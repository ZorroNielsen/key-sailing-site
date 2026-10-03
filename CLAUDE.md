# 1-key-sailing-sarasota

Nový web pro **Key Sailing Sarasota** (siestakeysailing.com) — soukromé
plavby na plachetnici Key Breeze s kapitánem Timem a Jan Solomonovými,
Marina Jack, Sarasota FL. Skutečný klient (Jan), ne ukázkový web.

## Status

**První verze (náhled pro Jan)** — hotová, 2. 10. 2026.
Repo: [ZorroNielsen/key-sailing-site](https://github.com/ZorroNielsen/key-sailing-site) (copied from adam-kriz/1-key-sailing-sarasota).

Tohle je **web č. 1 ze dvou** ze stejného zadání (proto „1-" v názvu).
Web č. 2: `../2-sailing-home-sarasota/` (Janina kniha), repo `2-sailing-home-sarasota`.

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
- `js/main.js` — mobilní menu, západ slunce, dárkové poukazy, formulář
- `images/` — fotky a loga ze starého webu (malé rozlišení!)
- `assets/` — PDF a fotky ke stažení (stejné cesty jako na starém webu)
- `robots.txt` + `<meta name="robots" content="noindex">` — náhled se
  nemá objevit ve vyhledávačích

Hlavička, patička a spodní lišta Call/Text/WhatsApp jsou **v každém HTML
souboru zvlášť** — změna v nich = změnit ve všech 9 souborech.

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
  (Stripe Checkout se doplní později).
- **Formulář** — v náhledu nic neodesílá, jen ukáže „Thanks! Jan will call
  you." Ostrá verze má posílat na siestakeysailing@gmail.com.

## Čeká se na Jan

- Nové fotky lodi (hero `keybreeze-banner.jpg` je malá, 665 px)
- Větší verze loga (`keysailing_logo72dpi.gif` má 389 px)
- Články ze **Southern Living** — do té doby je „As seen twice in Southern Living Magazine" jen prostý text bez odkazu
- Kontrola španělštiny (Tim), pak překlad zbytku stránek

## Při spuštění (až weby nahradí ty staré)

- Smazat `robots.txt` a `<meta name="robots" content="noindex…">` ze všech stránek
- Zapnout skutečné odesílání formulářů
- Odkazy „Jan's book" (patička + About Us) teď vedou na náhled `zorronielsen.github.io/sailing-home-sarasota-site/` → při spuštění vrátit na `https://sailinghomesarasota.com/`

## Lokální náhled

`.claude/launch.json` v kořeni workspace: konfigurace `1-key-sailing-sarasota`
(Python `http.server` na portu 8127) → http://localhost:8127
