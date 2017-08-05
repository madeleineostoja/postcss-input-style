const postcss = require('postcss');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const plugin = require('../');

function test(fixture, opts, done) {
  let input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8');
  expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8');

  postcss([ plugin(opts) ])
    .process(input)
    .then(result => {
      expect(result.css).to.eql(expected);
      expect(result.warnings()).to.be.empty;
      done();
    }).catch(error => done(error));
}

describe('postcss-input-style', () => {

  it('creates range track selectors', done => test('range-track', {}, done));

  it('creates range thumb selectors', done => test('range-thumb', {}, done));

  it('takes root-level pseudo selectors', done => test('root', {}, done));

  it('handles grouped mixed selectors', done => test('mixed', {}, done));

});
