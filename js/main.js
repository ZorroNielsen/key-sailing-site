// Key Sailing Sarasota — small helpers, no libraries.

document.documentElement.classList.remove("no-js");

// ---------- Phone menu ----------
(function () {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// ---------- Header: hide on scroll down, show again on scroll up ----------
(function () {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    const y = window.scrollY;
    const h = header.offsetHeight;
    const menuOpen = nav && nav.classList.contains("is-open");
    if (y <= h || menuOpen) {
      header.classList.remove("is-hidden");
    } else if (y > lastY + 4) {
      header.classList.add("is-hidden");      // scrolling down
    } else if (y < lastY - 4) {
      header.classList.remove("is-hidden");   // scrolling up
    }
    header.classList.toggle("is-raised", y > h);
    if (Math.abs(y - lastY) > 4) lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  // Keyboard users: always show the header when something inside it gets focus.
  header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });
})();

// ---------- Phone call bar: show it only when it isn't a duplicate ----------
// Hidden at the top of the page, slides up once you scroll down — but stays
// away while another Call/Text/WhatsApp button row is visible on screen.
(function () {
  const bar = document.querySelector(".callbar");
  if (!bar) return;
  const rows = Array.prototype.filter.call(
    document.querySelectorAll("main .btn-row"),
    function (row) { return row.querySelector('a[href^="tel:"]'); }
  );
  const onScreen = new Set();

  function update() {
    bar.classList.toggle("is-shown", window.scrollY > 120 && onScreen.size === 0);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) onScreen.add(e.target); else onScreen.delete(e.target);
      });
      update();
    });
    rows.forEach(function (row) { io.observe(row); });
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// ---------- Text-message links ----------
// iPhone wants "sms:+1...&body=", Android wants "sms:+1...?body=".
(function () {
  if (!/Android/i.test(navigator.userAgent)) return;
  document.querySelectorAll('a[href^="sms:"]').forEach(function (a) {
    a.setAttribute("href", a.getAttribute("href").replace("&body=", "?body="));
  });
})();

// ---------- Sunset tonight in Sarasota ----------
// Standard sunrise equation (accurate to a minute or two), for Marina Jack.
(function () {
  const spots = document.querySelectorAll("[data-sunset]");
  if (!spots.length) return;

  const LAT = 27.3354;
  const LNG = -82.5446;
  const TZ = "America/New_York";
  const rad = Math.PI / 180;

  // Today's date as it is in Sarasota, whatever the visitor's own time zone.
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(new Date())
    .reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
  const y = +parts.year, m = +parts.month, d = +parts.day;

  const jdMidnight = Date.UTC(y, m - 1, d) / 86400000 + 2440587.5;
  const n = Math.ceil(jdMidnight - 2451545.0 + 0.0008);
  const jStar = n - LNG / 360;
  const M = (357.5291 + 0.98560028 * jStar) % 360;
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const lambda = (M + C + 180 + 102.9372) % 360;
  const jTransit = 2451545.0 + jStar + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const sinDec = Math.sin(lambda * rad) * Math.sin(23.4397 * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.sin(-0.833 * rad) - Math.sin(LAT * rad) * sinDec) / (Math.cos(LAT * rad) * cosDec);
  const jSet = jTransit + Math.acos(cosH) / rad / 360;
  const sunset = new Date((jSet - 2440587.5) * 86400000);

  spots.forEach(function (el) {
    const locale = el.getAttribute("data-sunset") || "en-US";
    el.textContent = new Intl.DateTimeFormat(locale, { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(sunset);
    const line = el.closest("[data-sunset-line]");
    if (line) line.hidden = false;
  });
})();

// ---------- Gift certificate buttons (preview: no real checkout yet) ----------
(function () {
  const dialog = document.getElementById("checkout");
  if (!dialog) return;
  const amount = dialog.querySelector("[data-amount]");
  document.querySelectorAll("[data-gift]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (amount) amount.textContent = btn.getAttribute("data-gift");
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });
  dialog.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", function () { dialog.close ? dialog.close() : dialog.removeAttribute("open"); });
  });
})();

// ---------- Forms (preview: shown, but nothing is sent) ----------
(function () {
  document.querySelectorAll("form[data-preview]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const done = document.getElementById(form.getAttribute("data-done"));
      form.hidden = true;
      if (done) { done.hidden = false; done.focus(); }
    });
  });
})();

// ---------- FAQs: open the question named in the address (#payment etc.) ----------
(function () {
  function openFromHash() {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === "DETAILS") { el.open = true; el.scrollIntoView(); }
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
