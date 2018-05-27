build: init
	bundle exec jekyll build

init:
	bundle install

serve:
	bundle exec jekyll serve --watch