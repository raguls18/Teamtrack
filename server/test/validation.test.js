import test from 'node:test'; import assert from 'node:assert/strict'; import {validEmail,cleanText} from '../src/utils/validation.js';
test('validEmail accepts a basic email and rejects malformed values',()=>{assert.equal(validEmail('person@example.com'),true);assert.equal(validEmail('not-an-email'),false);assert.equal(validEmail(''),false)});
test('cleanText trims and limits user input',()=>{assert.equal(cleanText('  hello  '),'hello');assert.equal(cleanText('abcdef',3),'abc');assert.equal(cleanText(null),'')});
