import { expect } from 'chai';
import * as helpers from '../../services/helper.services';

describe('Service helper test', function () {
  let salt = 10;
  let password = 'hNnlpv9Z5te4z';
  let passwordHashed: string;
  describe('Test hash and compare password', function () {
    it('it must hash and return password hashed', async function () {
      passwordHashed = await helpers.hashPassword(password, salt);
      expect(passwordHashed).to.be.a('string')
    });
    it('it must be matched with the current password', async function () {
      const isMatch = await helpers.comparePasswordHashed(passwordHashed, password);
      expect(isMatch).equal(true)
    });
    it('and it didn\'t match with the random password', async function () {
      const isMatch = await helpers.comparePasswordHashed(passwordHashed, password + 'xyz');
      expect(isMatch).equal(false)
    });
  })
});