const request = require('supertest');
const app = require('../../src/server');

describe('Customers pre-session', () => {

    it('should create customer', async () => {
            
        const res = await request(app)
        .post('/customers/')
        .send(
            {
                name: 'Cliente Teste',
                value: 1200,
                since: '2020-05-02T16:00:00.000+00:00',
            }
        )

        expect(res.statusCode).toBe(200);
    })
})