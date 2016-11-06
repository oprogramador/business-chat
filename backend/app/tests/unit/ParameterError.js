import ParameterError from 'business-chat-backend/errors/ParameterError';
import expect from 'business-chat-backend/tests/expect';

describe('ParameterError', () => {
  it('provides parameter name', () => {
    const error = new ParameterError({ message: 'foo', parameterName: 'bar' });

    expect(error.getParameterName()).to.equal('bar');
  });

  it('provides message', () => {
    const error = new ParameterError({ message: 'foo', parameterName: 'bar' });

    expect(error.getMessage()).to.equal('foo');
  });
});
