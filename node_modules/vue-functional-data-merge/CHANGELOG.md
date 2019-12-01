# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v3.0.1...v3.1.0) (2019-06-01)


### Features

* vue compliant style string parsing ([#9](https://github.com/alexsasharegan/vue-functional-data-merge/issues/9)) ([e7d640b](https://github.com/alexsasharegan/vue-functional-data-merge/commit/e7d640b)), closes [/github.com/vuejs/vue/blob/dev/src/platforms/web/util/style.js#L5-L16](https://github.com/alexsasharegan/vue-functional-data-merge/issues/L5-L16)



### [3.0.1](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v3.0.0...v3.0.1) (2019-06-01)


### Bug Fixes

* split on first ':' char ([40e06c5](https://github.com/alexsasharegan/vue-functional-data-merge/commit/40e06c5))



## [3.0.0](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.7...v3.0.0) (2019-06-01)


### Bug Fixes

* remove unnecessary code ([9c9f3ce](https://github.com/alexsasharegan/vue-functional-data-merge/commit/9c9f3ce))
* update tests for latest jest version ([1e4f2f0](https://github.com/alexsasharegan/vue-functional-data-merge/commit/1e4f2f0))


### Features

* parse & merge style strings ([6894fa7](https://github.com/alexsasharegan/vue-functional-data-merge/commit/6894fa7))


### BREAKING CHANGES

* parsing strings into style objects changes the output and rendered style behavior in components



<a name="2.0.7"></a>
## [2.0.7](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.6...v2.0.7) (2018-09-07)



<a name="2.0.6"></a>
## [2.0.6](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.5...v2.0.6) (2018-03-17)



<a name="2.0.5"></a>
## [2.0.5](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.4...v2.0.5) (2018-03-01)



<a name="2.0.4"></a>
## [2.0.4](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.3...v2.0.4) (2018-01-16)


### Bug Fixes

* **#5:** handle initial state nullables on nested props ([#6](https://github.com/alexsasharegan/vue-functional-data-merge/issues/6)) ([2b78c54](https://github.com/alexsasharegan/vue-functional-data-merge/commit/2b78c54)), closes [#5](https://github.com/alexsasharegan/vue-functional-data-merge/issues/5) [#5](https://github.com/alexsasharegan/vue-functional-data-merge/issues/5)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.2...v2.0.3) (2017-12-09)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.1...v2.0.2) (2017-11-26)


### Bug Fixes

* transpile for of stmts ([5048b40](https://github.com/alexsasharegan/vue-functional-data-merge/commit/5048b40))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v2.0.0...v2.0.1) (2017-11-26)


### Bug Fixes

* mv obj spread to index signature typing & use arguments only ([c087a4f](https://github.com/alexsasharegan/vue-functional-data-merge/commit/c087a4f))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/alexsasharegan/vue-functional-data-merge/compare/v1.0.7...v2.0.0) (2017-11-26)


### Bug Fixes

* **#2:** don't copy level 1 obj refs ([28bb545](https://github.com/alexsasharegan/vue-functional-data-merge/commit/28bb545))


### Features

* add testing & bench, fix issue [#2](https://github.com/alexsasharegan/vue-functional-data-merge/issues/2), refactor ([e978c7f](https://github.com/alexsasharegan/vue-functional-data-merge/commit/e978c7f))


### BREAKING CHANGES

* default export has been removed in favor of named export
* right-most arguments were not originally given precedence in all cases. This has been fixed.
