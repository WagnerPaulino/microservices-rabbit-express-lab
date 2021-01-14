import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

describe('Post Test', () => {
    it('should return a Post with id', async () => {
        const appData = await app;
        const res = await chai.request(appData.server).get('/api/posts');
        chai.expect(res.status).to.eql(200);
        chai.expect(!!res.body.id).eq(true);
    })
})
