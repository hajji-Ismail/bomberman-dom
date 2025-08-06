.PHONY: run-backend run-frontend run-all

run-backend:
	cd server && node index.js

run-frontend:
	cd client && node server.js

run-all:
	(cd server && node index.js) & \
	(cd client && node server.js)