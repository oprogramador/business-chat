import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import dirtyChai from 'dirty-chai';

chai.use(chaiSubset);
chai.use(chaiAsPromised);
chai.use(dirtyChai);

const expect = chai.expect;

export default expect;
