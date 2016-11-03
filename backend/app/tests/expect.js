import chai from 'chai';
import chaiSubset from 'chai-subset';
import dirtyChai from 'dirty-chai';

chai.use(chaiSubset);
chai.use(dirtyChai);

const expect = chai.expect;

export default expect;
