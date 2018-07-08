const util = require('util')
const evconfig = require('./evconfig')

test('verify test strategy with arrays and hashes', () => {
  const result = []
  result.evconfig = ['foo']
  result.evconfig.foo = 'boo'
  expect(util.inspect(result)).toEqual(
    "[ evconfig: [ 'foo', foo: 'boo' ] ]")
})

test('verify test strategy with hashes', () => {
  const result = []
  result.evconfig = []
  result.evconfig.foo = 'boo'
  expect(util.inspect(result)).toEqual(
    //{ evconfig: { foo: 'boo' } })
    "[ evconfig: [ foo: 'boo' ] ]")
})

test('evconfig simple hash value', () => {
  const env = {'evconfig.foo': 'boo'}
  const result = []
  result.evconfig = []
  result.evconfig.foo = 'boo'
  expect(evconfig(env)).toEqual(result)
})

test('evconfig simple array values', () => {
  const env = {'evconfig.0': 'foo', 'evconfig.1': 'boo'}
  expect(util.inspect(evconfig(env))).toEqual(
    "[ evconfig: [ 'foo', 'boo' ] ]")
})

test('evconfig array values with hash value', () => {
  const env = {
    'evconfig.0': 'foo',
    'evconfig.1': 'boo',
    'evconfig.foo': 'boo'
  }
  expect(util.inspect(evconfig(env))).toEqual(
    "[ evconfig: [ 'foo', 'boo', foo: 'boo' ] ]")
})
