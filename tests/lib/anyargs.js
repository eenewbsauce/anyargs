'use strict';

let expect  = require('chai').expect;
let assert  = require('chai').assert;
let sinon   = require('sinon');

let anyArgs = require('../../lib/anyargs');
let sb = sinon.sandbox.create();
let sbItems = {};

describe('anyargs ::', () => {
  beforeEach(() => {
    sbItems.anyArgs = sb.spy(anyArgs, 'parse');
  });

  afterEach(() => {
    sb.restore();
  });

  it('should throw if called parameterless', () => {
    try {
      let result = anyArgs.parse();
    } catch (err) {
      expect(sbItems.anyArgs.called).to.be.true;
    }
  });
});
