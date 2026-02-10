install:
	npm ci

gendiff:
	node bin/gendif.js

publish:
	npm publish --dry-run

