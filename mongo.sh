#!/bin/bash
set -e;

if [ -n "${DB_USER:-}" ] && [ -n "${DB_PASS:-}" ]; then
  echo "=============== MONGO INIT SCRIPT STARTED ==============="
	"${mongo[@]}" "$DB_NAME" <<-EOJS
		db.createUser({
			user: $(_js_escape "$DB_USER"),
			pwd: $(_js_escape "$DB_PASS"),
			roles: [ { role: "readWrite" , db: $(_js_escape "$DB_NAME") } ]
			})
	EOJS
  echo "=============== MONGO INIT SCRIPT ENDED ==============="
else
  echo "=============== MONGO INIT SCRIPT FAILED ==============="
  echo "${DB_NAME} ${DB_USER} ${DB_PASS}"
fi
