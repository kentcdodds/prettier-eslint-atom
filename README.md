# prettier-eslint (for Atom)

Atom package to format your JavaScript using Prettier and ESLint (with `eslint --fix`)

<!-- [![Code Coverage][coverage-badge]][coverage] TODO! Add coverage! -->

[![Build Status][build-badge]][build]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![downloads][downloads-badge]][package]
[![MIT License][license-badge]][LICENSE]

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]
[![Code of Conduct][coc-badge]][coc]
[![Roadmap][roadmap-badge]][roadmap]
[![Examples][examples-badge]][examples]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

![demo](https://raw.githubusercontent.com/kentcdodds/prettier-eslint-atom/master/other/plugin.gif)

## The problem

I want an easy way to automatically reformat/fix my code when I save the file.

## This solution

This uses [`prettier-eslint`][prettier-eslint] to automatically format and fix on save.

## Installation

```
apm install prettier-eslint
```

Or, Settings → Install → Search for `prettier-eslint`

## Usage

- You can configure this package in the settings to format on save.
- The menu: Package → `prettier-eslint` → Format
- Keyboard shortcut: <kbd>cmd</kbd> + <kbd>alt</kbd> + <kbd>f</kbd>

Configure `eslint` for your project and poof, everything should work.

Please open a pull request or file an issue if it doesn't!

## Inspiration

This repository is a copy + modification of [`prettier-atom`](https://github.com/jlongster/prettier-atom)

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub>Kent C. Dodds</sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/prettier-eslint-atom/commits?author=kentcdodds) [📖](https://github.com/kentcdodds/prettier-eslint-atom/commits?author=kentcdodds) 🚇 | [<img src="https://avatars.githubusercontent.com/u/1144075?v=3" width="100px;"/><br /><sub>Luca Barone</sub>](https://github.com/cloud-walker)<br /> | [<img src="https://avatars.githubusercontent.com/u/6173488?v=3" width="100px;"/><br /><sub>Rob Wise</sub>](https://robwise.github.io)<br />[💻](https://github.com/kentcdodds/prettier-eslint-atom/commits?author=robwise) |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/prettier-eslint-atom.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/prettier-eslint-atom
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/prettier-eslint-atom.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/prettier-eslint-atom
[dependencyci-badge]: https://dependencyci.com/github/kentcdodds/prettier-eslint-atom/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/kentcdodds/prettier-eslint-atom
[version-badge]: https://img.shields.io/apm/v/prettier-eslint.svg?style=flat-square
[package]: https://atom.io/packages/prettier-eslint
[downloads-badge]: https://img.shields.io/apm/dm/prettier-eslint.svg?style=flat-square
[license-badge]: https://img.shields.io/apm/l/prettier-eslint.svg?style=flat-square
[license]: https://github.com/kentcdodds/prettier-eslint-atom/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/prettier-eslint-atom/blob/master/other/CODE_OF_CONDUCT.md
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/kentcdodds/prettier-eslint-atom/blob/master/other/ROADMAP.md
[examples-badge]: https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square
[examples]: https://github.com/kentcdodds/prettier-eslint-atom/blob/master/other/EXAMPLES.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/prettier-eslint-atom.svg?style=social
[github-watch]: https://github.com/kentcdodds/prettier-eslint-atom/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/prettier-eslint-atom.svg?style=social
[github-star]: https://github.com/kentcdodds/prettier-eslint-atom/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20prettier-eslint-atom!%20https://github.com/kentcdodds/prettier-eslint-atom%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/prettier-eslint-atom.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[prettier-eslint]: https://github.com/kentcdodds/prettier-eslint
