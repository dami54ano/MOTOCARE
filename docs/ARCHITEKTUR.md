# Architektur und Datenmodell

## Systemübersicht

```mermaid
flowchart LR
 U[Nutzer im Browser] --> F[React / Vite]
 F -->|REST /api JSON| B[Spring Boot Controller]
 B --> V[Validation und Statusregeln]
 V --> J[Spring Data JPA]
 J --> DB[(H2 lokal)]
```

## ER-Diagramm (PoC)

```mermaid
erDiagram
 MOTORCYCLE ||--o{ SUBSCRIPTION : selected_for
 BOX ||--o{ SUBSCRIPTION : selected_as
 MOTORCYCLE {
  bigint id PK
  string brand
  string model
  int year
 }
 BOX {
  bigint id PK
  string code UK
  string name
  string type
  decimal price
 }
 SUBSCRIPTION {
  bigint id PK
  string email
  bigint motorcycle_id FK
  bigint box_id FK
  string interval
  string status
  timestamp created_at
 }
```

### Einschränkung

`Compatibility` wurde **absichtlich noch nicht** als echte Teilefreigabe implementiert. Die spätere produktive Ausbaustufe benötigt eine OEM-basierte Tabelle mit Motorradvariante, Material/Teilenummer, Gültigkeit, Quellenbeleg und Freigabestatus. Solange diese Daten fehlen, sperrt das Backend Servicebox-Buchungen grundsätzlich.

## Nicht-funktionale Anforderungen

- Verständliche responsive Darstellung.
- Persistente Speicherung der Demo-Abos.
- Serverseitige Eingabevalidierung.
- Keine ungeprüfte Servicebox-Buchung.
- Vor echtem Betrieb: Authentifizierung, Autorisierung, sichere Secrets, Produkt-/Zahlungsdatensicherheit.

