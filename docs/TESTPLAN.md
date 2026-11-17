# Sprint 2 – Testplan und evidenzbasierte Auswertung

## Funktionale Testfälle

| ID | Prüfschritt | Erwartetes Ergebnis | Nachweisstatus |
|---|---|---|---|
| T01 | GET `/api/boxes` | Vier Boxen kommen aus der API | Integrationstest im Code; Lauf offen |
| T02 | Gültiges Wash-Abo POST | HTTP 201, Status ACTIVE | Integrationstest im Code; Lauf offen |
| T03 | Abo PUT PAUSED | Status PAUSED bleibt in DB | Integrationstest im Code; Lauf offen |
| T04 | Abo PUT ACTIVE | Status ACTIVE bleibt in DB | Integrationstest im Code; Lauf offen |
| T05 | Abo DELETE | HTTP 204; danach GET 404 | Integrationstest im Code; Lauf offen |
| T06 | Service-Box POST | HTTP 409 wegen fehlender Freigabe | Integrationstest im Code; Lauf offen |
| T07 | Ungültige E-Mail POST | HTTP 400 | Integrationstest im Code; Lauf offen |
| T08 | Responsive Mobilansicht | Keine überlaufenden Texte, Menünavigation | Manuell ausstehend |
| T09 | API ausgeschaltet | Keine vorgetäuschte Abo-Speicherung | Manuell ausstehend |
| T10 | Lokaler Start | start.ps1 startet Webseite und API; H2 speichert unter backend/data | Start und HTTP geprüft; Persistenz über Neustart noch ausstehend |

Die fünf reinen JavaScript-Katalogtests wurden in der Erstellungsumgebung erfolgreich mit `node --test tests/*.test.mjs` ausgeführt. **Backend-Integrationstest und Frontend-Build konnten dort nicht vollständig ausgeführt werden**, weil Maven nicht installiert ist und die Installation externer Node-Abhängigkeiten zeitlich abbrach. Nicht als erfolgreich markieren, bevor CI den Lauf bestätigt.

## Nutzerinterviews (ausstehend)

Geplant: fünf Personen aus unterschiedlichen Motorradgruppen. Aufgaben: Motorrad auswählen, passende Box finden, Inhalt verstehen, Rhythmus auswählen, Abo pausieren. Vorab definierte Kriterien: mindestens 4 von 5 lösen die Auswahl ohne Hilfe, mindestens 4 verstehen Rhythmus und Boxinhalt, null ungeprüfte technische Kompatibilität. Fragen: Was ist unklar? Welche Produkte brauchst du tatsächlich? Welche Zahlungsbereitschaft hast du? Welche Informationen schafften Vertrauen?

## Vier geforderte echte Screenshots (noch zu erstellen)

1. `docs/screenshots/01-home.png` – Landingpage im Browser.
2. `docs/screenshots/02-boxes.png` – alle Boxen, Filter und Preise.
3. `docs/screenshots/03-bike-select.png` – Motorradauswahl und Servicebox-Warnung.
4. `docs/screenshots/04-dashboard.png` – aktiviertes und pausiertes Demo-Abo.

Keine simulierten oder frei erfundenen Testprotokolle als Prüfergebnisse einreichen.

