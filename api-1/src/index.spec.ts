import app from './index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

describe('API Test', () => {
    it('should return response on call', async () => {
        const res = await chai.request(app).get('/api/posts');
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body.ok).to.eq(true);
    })
})
