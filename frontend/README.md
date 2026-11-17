# MOTOCARE Frontend

React/Vite-Prototyp mit responsivem Shop-Design, vier Produktboxen, Motorrad-Auswahl, Filterung, Abo-Drawer und Dashboard.

## Gemeinsamer Start ohne Docker

Im Projekt-Hauptverzeichnis `.\start.ps1` ausführen. Die gebaute Webseite und API laufen gemeinsam auf http://localhost:8088. Daten bleiben in `backend/data/` gespeichert.

## Entwicklung

```bash
npm install
npm run dev
npm test
npm run build
```

Dev-Server: http://localhost:5173 (Proxy auf Spring Boot unter localhost:8080).

## Wichtige Entscheidungen

- Das Frontend enthält reine Beispieldaten für eine verständliche Demo, wenn die API noch nicht läuft. **Abo-Daten werden ausschliesslich über die API gespeichert**; ohne Backend wird keine erfolgreiche Speicherung vorgetäuscht.
- Die Service-Box mit Motoröl/Filter kann nicht gebucht werden, solange die Zuordnung nicht anhand von Original-Herstellerinformationen verifiziert wurde.
- Alle Preise sind illustrative CHF-Beispielpreise, keine echten Angebote. Kein Checkout, keine Zahlungsabwicklung, kein Versand.
- Der React-Zustand hält die Auswahl lokal; das Backend validiert jede schreibende Operation erneut.

## Tests und CI

`npm test` prüft Angebotskatalog, Preisformat, Demo-Motorräder und Blockade der ungeprüften Servicebox. `npm run build` erstellt die auslieferbare App. Die GitHub-Actions-Workflowdatei liegt unter `../.github/workflows/ci.yml`.

## Verbleibende Risiken

Echte Zahlungsanbieter, Authentifizierung, exakte Kompatibilitätsdaten, Preis-/Margenkalkulation, rechtskonforme Abo-Bedingungen, E-Mail-Bestätigungen, Produktbestand und reale Nutzerinterviews sind **nicht Bestandteil dieses PoC**. Vor echtem Verkauf müssen diese Themen gelöst werden. Siehe `../docs/RISIKEN.md` und `../docs/TESTPLAN.md`.

## Screenshots

Vier echte Screenshots (Startseite, Boxen, Fahrzeugauswahl, Dashboard) sind nach browsergestützter Prüfung zu ergänzen. Nicht als durchgeführt markieren, bevor der Test stattgefunden hat.

