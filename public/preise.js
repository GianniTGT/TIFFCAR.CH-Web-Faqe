// Preise aus der App (eine Quelle für App und Webseite, Gianni 25.10.2026): https://app.tiffcar.ch/api/public/prices
// Die Zahlen im HTML sind nur der Rückfall, falls die App einmal nicht antwortet. Preise ändern: in der App (plans.js), nicht hier.
//   data-preis="starter|business|pro|werkstatt|einrichtung|schulung"  → aktueller Preis
//   data-preis-normal="starter|business|pro"                             → Normalpreis (durchgestrichen, nur während der Aktion)
//   data-aktion / data-ohne-aktion                                       → nur während bzw. nach der Einführungsaktion sichtbar
(() => {
  "use strict";
  if (!document.querySelector("[data-preis], [data-preis-normal], [data-aktion], [data-ohne-aktion]")) return;
  const api = location.hostname === "localhost" ? "http://localhost:3010" : "https://app.tiffcar.ch";
  const chf = (n) => (Number.isInteger(n) ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'") : n.toFixed(2));
  fetch(`${api}/api/public/prices`)
    .then((r) => (r.ok ? r.json() : null))
    .then((antwort) => {
      const p = antwort && antwort.data;
      if (!p) return;
      const preis = { werkstatt: p.service, einrichtung: p.setup, schulung: p.training };
      const normal = {};
      for (const paket of p.plans) {
        preis[paket.key] = paket.price;
        normal[paket.key] = paket.normalPrice;
      }
      document.querySelectorAll("[data-preis]").forEach((el) => {
        const n = preis[el.dataset.preis];
        if (typeof n === "number" && n >= 0) el.textContent = chf(n);
      });
      document.querySelectorAll("[data-preis-normal]").forEach((el) => {
        const n = normal[el.dataset.preisNormal];
        if (typeof n === "number") el.textContent = chf(n);
      });
      document.querySelectorAll("[data-aktion]").forEach((el) => { el.hidden = !p.introActive; });
      document.querySelectorAll("[data-ohne-aktion]").forEach((el) => { el.hidden = p.introActive; });
    })
    .catch(() => {});
})();
