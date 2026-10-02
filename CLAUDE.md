# key-sailing-sarasota

Nový web pro **Key Sailing Sarasota** (siestakeysailing.com) — soukromé
plavby na plachetnici Key Breeze s kapitánem Timem a Jan Solomonovými,
Marina Jack, Sarasota FL. Skutečný klient (Jan), ne ukázkový web.

## Status

**První verze (náhled pro Jan)** — hotová lokálně, 2. 10. 2026.
Druhý web ze stejného zadání: `../sailing-home-sarasota/` (Janina kniha).

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
- Odkaz na články v **Southern Living** (teď `href="#"`) a případně jejich logo
- Přesné znění nových faktů na About Us (mluví španělsky, všech 50 států,
  k 1. 1. 2027 všech 7 kontinentů) — v `about-us.html` je TODO komentář
- Kontrola španělštiny (Tim), pak překlad zbytku stránek

## Lokální náhled

`.claude/launch.json` v kořeni workspace: konfigurace `key-sailing-sarasota`
(Python `http.server` na portu 8127) → http://localhost:8127
