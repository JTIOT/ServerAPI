import chai from 'chai';
import { ResponseHandler } from '../src';

const { expect } = chai;

describe('ResponseHandler', () => {
  describe('#success', () => {
    it('should return data in appropriate format', () => {
      const response = ResponseHandler.successOrFail({
        message: 'Successful',
        name: 'success',
      }, 'success');
      expect(response.status).to.equal('success');
      expect(response.message).to.equal('Successful');
      expect(response.data.name).to.equal('success');
    });
    it('should return object when string is passed', () => {
      const response = ResponseHandler.successOrFail('Your request was successful', 'success');
      expect(response).to.be.an('object');
      expect(response.message).to.equal('Your request was successful');
    });
  });

  describe('#fail', () => {
    it('should return data in appropriate format', () => {
      const response = ResponseHandler.successOrFail({
        message: 'Failed to accomplish task',
        name: 'failure',
      }, 'fail');
      expect(response.status).to.equal('fail');
      expect(response.message).to.equal('Failed to accomplish task');
      expect(response.data.name).to.equal('failure');
    });
    it('should return object when string is passed', () => {
      const response = ResponseHandler.successOrFail('Your request failed', 'fail');
      expect(response).to.be.an('object');
      expect(response.message).to.equal('Your request failed');
    });
  });

  describe('#error', () => {
    it('should return data in appropriate format when string is passed', () => {
      const response = ResponseHandler.error('Unsuccessful fetch');
      expect(response.status).to.equal('error');
      expect(response.message).to.equal('Unsuccessful fetch');
    });
    it('should return data in appropriate format when object is passed', () => {
      const response = ResponseHandler.error({
        message: 'Unsuccessful fetch',
        code: 123,
      });
      expect(response.status).to.equal('error');
      expect(response.message).to.equal('Unsuccessful fetch');
      expect(response.code).to.equal(123);
    });
    it('should return default data when nothing is passed', () => {
      const response = ResponseHandler.error();
      expect(response.status).to.equal('error');
      expect(response.message).to.equal('An error occurred');
    });
    it('should return default data when null is passed', () => {
      const response = ResponseHandler.error(null);
      expect(response.status).to.equal('error');
      expect(response.message).to.equal('An error occurred');
    });
  });
});
