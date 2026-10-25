# TiffCar Werbeseite

Die Webseite für **https://tiffcar.ch**: Werbeseite mit Login-Knopf, Impressum und Datenschutz.
Ein Produkt der Tiff Software Solutions, Bern. Die App selbst (TiffCar, `app.tiffcar.ch`) liegt im Repo `GianniTGT/Tiff-Autohaendler-DMS`.

Aufgebaut wie `GianniTGT/tiffcore-website`: feste Dateien, ohne Baukasten, ohne Cookies, ohne Dateien von fremden Anbietern.
Kein einziges Skript. Das Auto-Foto im Kopf ist das Hintergrundbild der TiffCar-Anmeldeseite (gespiegelt).

## Ansehen

```bash
node scripts/vorschau.mjs      # dann http://localhost:4010
```

## Regeln

- Nur Funktionen nennen, die in TiffCar wirklich vorhanden sind (Quelle: `BEDIENUNG.md` im App-Repo).
- Beispiele (Fahrzeug, Rechnung, Website) sind gezeichnet und tragen erfundene Namen und Adressen. Keine echten Kunden.
- Keine Skripte, Schriften oder Bilder von fremden Servern, keine `style="…"` im HTML (die Sicherheitsrichtlinie blockiert beides).
- Nach einer Änderung an `style.css` die Zahl in `style.css?v=…` in allen HTML-Dateien erhöhen, sonst zeigt der Browser die alte Gestaltung.

## Auf den Server bringen

Noch nicht eingerichtet. Geplant wie bei tiffcore.ch: Kopie unter `/opt/tiffcar-website` auf dem vServer,
der Caddy der Handwerk-App liefert `public/` für `tiffcar.ch` aus, das Auto-Update holt Änderungen alle 5 Minuten.
Vorher müssen im DNS von hosttech `tiffcar.ch` und `www.tiffcar.ch` per A-Eintrag auf `185.178.195.35` zeigen.

## Preise ändern

Die Preise kommen seit dem 25.10.2026 aus der App: `https://app.tiffcar.ch/api/public/prices`, im App-Repo
`apps/cardealer-ch/server/src/services/plans.js`. So zeigen App und Webseite nie verschiedene Preise. Preise ändern heisst also:
in der App ändern und dort ausliefern; die Webseite übernimmt sie von selbst. Die Zahlen im HTML sind nur der Rückfall, falls die
App nicht antwortet. Nur das «Eigene Design» (website.html, ab CHF 490) steht direkt im HTML.
