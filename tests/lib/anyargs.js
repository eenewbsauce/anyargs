'use strict';

let expect  = require('chai').expect;
let assert  = require('chai').assert;
let sinon   = require('sinon');

let anyArgs = require('../../lib/anyargs');
let sb = sinon.sandbox.create();
let sbItems = {};

function add(one, two, cb) {
  let metadata = {
    one: {
      type: 'number',
      required: true
    },
    two: {
      type: 'string',
      required: true
    },
    cb: {
      type: 'function',
      required: false,
      defaultValue: function() {}
    },
    params: {
      type: 'object',
      required: false
    }
  };

  return anyArgs.parse(arguments, metadata);
}

describe('anyargs ::', () => {
  beforeEach(() => {
    sbItems.anyArgs = sb.spy(anyArgs, 'parse');
  });

  afterEach(() => {
    sb.restore();
  });

  it('should return object with keys matching the metadata', () => {
    let args = add(1,'two',function(sum) {}, {});

    expect(args.one).to.equal(1)
    expect(args.two).to.equal('two')
    expect(args.cb).to.be.a('function')
    expect(args.params).to.be.an('object')
  });

  it('should return object with keys matching the metadata even when passed out of order', () => {
    let args = add('two', 1, function(sum) {});

    expect(args.one).to.equal(1)
    expect(args.two).to.equal('two')
    expect(args.cb).to.be.a('function')
  });

  it('should return object with keys matching the metadata even when all passed out of order', () => {
    let args = add('two', function(sum) {}, 1);

    expect(args.one).to.equal(1)
    expect(args.two).to.equal('two')
    expect(args.cb).to.be.a('function')
  });

  it('should throw if called parameterless', () => {
    try {
      let result = anyArgs.parse();
    } catch (err) {
      expect(sbItems.anyArgs.threw()).to.be.true;
      expect(err.message).to.equal('helper::arguments::decipherArguments:: missing args or metadata parameter. Possible duplicated type in arguments');
    }
  });

  it('should throw if called with arguments only', () => {
    try {
      let result = anyArgs.parse([]);
    } catch (err) {
      expect(sbItems.anyArgs.threw()).to.be.true;
      expect(err.message).to.equal('helper::arguments::decipherArguments:: missing args or metadata parameter. Possible duplicated type in arguments');
    }
  });

  it('should throw if called with required param not supplied', () => {
    try {
      let result = add(function(){});
    } catch (err) {
      expect(sbItems.anyArgs.threw()).to.be.true;
      expect(err.message).to.equal('helper::arguments::decipherArguments:: missing required parameter in args');
    }
  });

  it('should throw if called with a single required param not supplied', () => {
    try {
      let result = add(function(){}, 'two');
    } catch (err) {
      expect(sbItems.anyArgs.threw()).to.be.true;
      expect(err.message).to.equal('helper::arguments::decipherArguments:: missing required parameter in args');
    }
  });
});
