# Sprint 2 – technische und geschäftliche Risiken

**Status:** Konzept-/Experteneinschätzungen, keine gemessenen Häufigkeiten. Wkt. = angenommene Eintrittswahrscheinlichkeit; Schwere = Ausmass des Schadens. Zuständige Rollen und Fälligkeiten sind Vorschläge und müssen vom Team bestätigt werden.

| ID | Risiko | Wkt. | Schwere | Folgen | Konkrete Massnahme | Zuständigkeit (vorgeschlagen) | Gate / Termin |
|---|---|---|---|---|---|---|---|
| R1 | Falsche Ölviskosität/-Freigabe | Mittel | Sehr hoch | Motorschaden / Haftung | Kein Servicebox-Abo bis OEM-Daten zu Motoröl bestätigt und automatisiert getestet sind | Technik | Vor Servicebox-Pilot |
| R2 | Falscher Ölfilter | Mittel | Hoch | Undichtheit / Motorschaden | Teilenummern und Modelljahr über verifizierte Datenquelle abgleichen; fehlerhafte Zuordnung sperren | Produkt | Vor Servicebox-Pilot |
| R3 | Hohe Versandkosten | Hoch | Hoch | Negative Marge | Einkauf, Versand, Verpackung und Retourenkosten pro Box kalkulieren; Break-even prüfen | Finanzen | Vor Preisentscheidung |
| R4 | Geringe Zahlungsbereitschaft | Mittel | Hoch | Zu wenige Kundinnen/Kunden | 5 qualitative Interviews und Preistest ohne echte Zahlungen durchführen | Research | Sprint-Testtag |
| R5 | Flüssigkeitsversand / Leckage | Mittel | Hoch | Schaden, Ersatzlieferung | Vorgaben des Versanddiensts prüfen, geeignete Verpackung und Falltest | Logistik | Vor physischem Pilot |
| R6 | Zu häufige Pakete | Hoch | Mittel | Überversorgung / Kündigung | Pause, Intervallwahl, Skip-Funktion; Nutzerpräferenz testen | UX | Vor Pilot |
| R7 | Falsche Abo-Buchung | Mittel | Hoch | Unberechtigte Rechnung | Zahlungsadapter erst nach Webhook-, Idempotenz- und Refund-Tests anbinden | Backend | Vor Checkout |
| R8 | Unberechtigter Datenzugriff | Mittel | Hoch | Datenschutzverletzung | Sicherer Login, API-Authorisierung, Datenminimierung, Logging und Pen-Test | Backend | Vor öffentlichem Betrieb |

## Priorisierung

R1/R2 blockieren echte Service-Kits; R8 blockiert produktive Kundenaccounts und R7 einen echten Checkout. R3/R4 klären, ob das Geschäftsmodell wirtschaftlich tragfähig ist. R5 blockiert den physischen Versand. R6 muss in der UX validiert werden. Der MVP demonstriert deshalb **nur** Demo-Abos ohne Zahlung oder Versand. Bei einer öffentlichen Demo sind ausschliesslich fiktive Daten zulässig.

## Miro-Risikoevaluation

Das Miro-Board enthält diese acht Risiken mit Auswirkungen und Massnahmen. Nach Durchführung der Tests sind Risiko-Einstufungen und Entscheidungen anhand tatsächlicher Befunde zu aktualisieren.
