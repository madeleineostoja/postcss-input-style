# postcss-input-style
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[PostCSS] plugin that adds new pseudo-elements to inputs for easy cross-browser styling of their Shadow-DOM elements.

Note that the output selectors generated (below) are not grouped because if a browser finds a single selector it doesn't understand in a group, the whole group is ignored (see [Selectors Level 3][selectors])

#### Placeholders
Input
```css
input::placeholder {
  color: black;
  opacity: 0.8;
}
```
Output
```css
input::-webkit-input-placeholder {
  color: black;
  opacity: 0.8;
}

input:-moz-placeholder {
  color: black !important;
  opacity: 0.8;
}

input::-moz-placeholder {
  color: black !important;
  opacity: 0.8;
}

input:-ms-input-placeholder {
  color: black !important;
  opacity: 0.8;
}
```

#### Range elements
Input
```css
input[type="range"]::track {
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::thumb {
  background: #4286be;
  width: 16px;
  height: 8px;
}
```
Output
```css
input[type="range"]::-webkit-runnable-track {
  -webkit-appearance: none !important;
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-moz-range-track  {
  -moz-appearance: none !important;
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-ms-track  {
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background: #4286be;
  width: 16px;
  height: 8px;
}

input[type="range"]::-moz-range-thumb {
  -moz-appearance: none !important;
  background: #4286be;
  width: 16px;
  height: 8px;
}

input[type="range"]::-ms-thumb {
  background: #4286be;
  width: 16px;
  height: 8px;
}
```

---

### Usage

```js
postcss([ require('postcss-input-style') ])
```

See [PostCSS] docs for examples for your environment.

--

### License

MIT © [Sean King](https://twitter.com/seaneking)

[npm-image]: https://badge.fury.io/js/postcss-input-style.svg
[npm-url]: https://npmjs.org/package/postcss-input-style
[travis-image]: https://travis-ci.org/seaneking/postcss-input-style.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/postcss-input-style
[daviddm-image]: https://david-dm.org/seaneking/postcss-input-style.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/seaneking/postcss-input-style
[PostCSS]: https://github.com/postcss/postcss
[selectors]: http://www.w3.org/TR/selectors/#Conformance
