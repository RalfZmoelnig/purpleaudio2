#!/usr/bin/env bash

set -euo pipefail

# Wechsel in das Projektwurzelverzeichnis
cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "Fehler: .env nicht gefunden im Projektwurzelverzeichnis." >&2
  exit 1
fi

# .env laden (setzt alle Variablen als Export)
set -a
source .env
set +a

SOURCE_DB_URL="${POSTGRES_URL:-}"
TARGET_DB_URL="${1:-}"

if [[ -z "${SOURCE_DB_URL}" ]]; then
  echo "Fehler: POSTGRES_URL ist in .env nicht gesetzt." >&2
  exit 1
fi

if [[ -z "${TARGET_DB_URL}" ]]; then
  echo "Nutzung: scripts/clone-db.sh <TARGET_DB_URL>" >&2
  exit 1
fi

echo "Starte Kopie: Quelle=.env POSTGRES_URL  ->  Ziel=${TARGET_DB_URL%%\?*}"

# Dump inkl. DROP/CREATE Statements und direkt ins Ziel einspielen
# - --clean/--if-exists: entfernt bestehende Objekte vor Neu-Anlage
# - --no-owner/--no-privileges: keine Ownership/Privilegien aus Quelle übernehmen
# - psql mit ON_ERROR_STOP: bricht bei Fehlern ab

pg_dump \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  "${SOURCE_DB_URL}" \
| psql \
  --set ON_ERROR_STOP=on \
  "${TARGET_DB_URL}"

echo "Datenbank-Kopie erfolgreich abgeschlossen."



