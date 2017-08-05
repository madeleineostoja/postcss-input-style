const postcss = require('postcss');

const SELECTORS = {
      rangeTrack: '::track',
      rangeThumb: '::thumb'
    },
    PSEUDOS = {
      rangeTrack: [
        '::-webkit-slider-runnable-track',
        '::-moz-range-track',
        '::-ms-track'
      ],

      rangeThumb: [
        '::-webkit-slider-thumb',
        '::-moz-range-thumb',
        '::-ms-thumb'
      ]
    };

/**
 * Check if selector in array contains any of our psuedo elements
 * @param  {String} selector string to check for elements
 * @return {Boolean}         whether it contains pseudo

 */
function containsPseudo(selector) {
  return selector.match(/::track|::thumb/);
}

/**
 * Check if selector in array is free from our psuedo elements
 * @param  {String} selector string to check for elements
 * @return {Boolean}         whether it is free from pseudo
 */
function doesntContainPseudo(selector) {
  return selector.match(/^((?!(::thumb|::track)).)*$/);
}

/**
 * Extra processing for new range track rules
 * @param  {Object} rule CSS rule to process
 * @return undefined
 */
function processTracks(rule) {

  if (rule.selector.indexOf('::-webkit-slider-runnable-track') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-track') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }
}

/**
 * Extra processing for new range thumb rules
 * @param  {Object} rule CSS rule to process
 * @return undefined
 */
function processThumbs(rule) {

  if (rule.selector.indexOf('::-webkit-slider-thumb') > -1) {
    rule.prepend({ prop: '-webkit-appearance', value: 'none' });
  }

  if (rule.selector.indexOf('::-moz-range-thumb') > -1) {
    rule.prepend({ prop: '-moz-appearance', value: 'none' });
  }
}

/**
 * Expand and process CSS rules
 * @param  {Object} rule CSS rule to transform
 * @return undefined
 */
function ruleHandler(rule) {

  // Loop over our selectors
  Object.keys(SELECTORS).forEach(select => {

    let webkitRule,
        mozRule;

    if (rule.selector.indexOf(SELECTORS[select]) === -1){
      return;
    }

    // Expand the pseudo selector
    PSEUDOS[select].forEach(pseudo => {
      let newRule,
          newSelector;

      newRule = rule.cloneBefore();
      newSelector = newRule.selectors
        .filter(containsPseudo)
        .map(selector => selector.replace(SELECTORS[select], pseudo))
        .join(',\n');

      newRule.selector = newSelector;

      // Do extra processing on the new rules
      processTracks(newRule);
      processThumbs(newRule);
    });

    webkitRule = rule.cloneBefore();
    webkitRule.selector = 'input[type="range"]';
    webkitRule.removeAll().append({ prop: '-webkit-appearance', value: 'none' });

    mozRule = rule.cloneBefore();
    mozRule.selector = 'input[type="range"]::-moz-focus-outer';
    mozRule.removeAll().append({ prop: 'border', value: '0' });

    // If the rule only contained our elements remove it, else clean it
    if (rule.selectors.every(containsPseudo)) {
      rule.remove();
    } else {
      rule.selector = rule.selectors.filter(doesntContainPseudo).join(',\n');
    }
  });
}

module.exports = postcss.plugin('postcss-input-style', () => {
  return function (css) {

    css.walkRules(rule => {

      if (!containsPseudo(rule.selector)) {
        return;
      }

      ruleHandler(rule);
    });
  };
});
