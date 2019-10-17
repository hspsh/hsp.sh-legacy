.DEFAULT_GOAL := help

# Porcelain
# ###############
.PHONY: ci build lint test serve container

serve: setup ## run development server
	bundle exec jekyll serve --watch --livereload

ci: setup lint test build container ## run all tests and build all artifacts
	@echo "Not implemented"; false

build: setup ## create artifact
	bundle exec jekyll build

lint: setup ## run static analysis
	@echo "Not implemented"; false

test: setup ## run all tests
	@echo "Not implemented"; false

container: build ## create container
	@echo "Not implemented"; false


# Plumbing
# ###############
.PHONY: setup

setup: vendor/bundle

vendor/bundle: Gemfile Gemfile.lock
	bundle install --path $@


# Utilities
# ###############
.PHONY: help
help: ## print this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
