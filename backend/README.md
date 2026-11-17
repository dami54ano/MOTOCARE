# MOTOCARE Backend

Spring Boot 3 / Java 21, REST-API, JPA und relationale H2-Datenbank (lokal persistent). PostgreSQL wird über Umgebungsvariablen unterstützt. Das Projekt stellt einen **Proof of Concept**, keinen produktionsreifen Shop, dar.

## Start

```bash
mvn test
mvn spring-boot:run
```

Für den gemeinsamen Start von Frontend und Backend ohne Docker im Projekt-Hauptverzeichnis ` .\start.ps1` ausführen. Das Skript setzt JAVA_HOME passend zum Java im PATH und baut mit dem Maven-Profil `local-app` das Frontend in die ausführbare JAR ein. Die App läuft auf http://localhost:8088, ihre Daten liegen unter `backend/data/`. Mit `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_DRIVER` kann PostgreSQL konfiguriert werden.

## REST-Endpunkte

| Methode | Route | Beschreibung |
|---|---|---|
| GET | `/api/motorcycles` | Demo-Motorräder lesen |
| GET | `/api/boxes` | Paketkatalog lesen |
| GET | `/api/subscriptions?email=…` | Demo-Abos abrufen |
| GET | `/api/subscriptions/{id}` | Einzelnes Demo-Abo |
| POST | `/api/subscriptions` | Abo anlegen |
| PUT | `/api/subscriptions/{id}` | Status ändern |
| DELETE | `/api/subscriptions/{id}` | Abo löschen |

POST-Beispiel: `{"email":"demo@motocare.ch","motorcycleId":1,"boxId":1,"interval":"MONTHLY"}`. PUT-Beispiel: `{"status":"PAUSED"}`. Zulässige Intervalle: `MONTHLY`, `QUARTERLY`, `ON_DEMAND`. Zustände: `ACTIVE`, `PAUSED`.

## Sicherheitsgrenzen

- Die Service-Box wird **serverseitig** mit HTTP 409 gesperrt, solange Öl-/Filterdaten nicht verifiziert sind.
- Die E-Mail ist im PoC nur ein Demo-Filter, **keine Authentifizierung**. Darum ausschliesslich Testdaten verwenden. Vor öffentlichem Deployment echte Authentifizierung, Autorisierung und Rate-Limiting ergänzen.
- Keine Zahlung, keine automatische Zustellung, keine Lagerbuchung.
- `ddl-auto=update` nur für die Entwicklung; bei Produktion Flyway/Liquibase verwenden.

## Tests

Spring-Boot-Integrationstests prüfen Katalog, POST/GET/PUT/DELETE, Blockade der Service-Box und Eingabevalidierung. GitHub Actions automatisiert Maven-Testlauf.

## Erkenntnis und offene Arbeit

Der technisch kritischste Punkt ist nicht der Bezahlvorgang, sondern die verlässliche Zuordnung von Verbrauchsmaterial zu Hersteller, Modell und Baujahr. Ein falsch ausgewähltes Motoröl kann Schäden verursachen. Deshalb behandelt der PoC diesen Bereich bewusst als **nicht validiert** und blockiert den Kauf. Weitere Risiken und reale Testnachweise siehe `../docs/`.

