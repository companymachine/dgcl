all:
	npm install
	find data -iname "*.json" | xargs -I FILE ./node_modules/.bin/json -I -f FILE
	find data -iname "*.json" | xargs -I FILE node ./build/tomarkdown.js FILE
