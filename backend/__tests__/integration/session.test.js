const request = require('supertest');
const app = require('../../src/server');

const param = '60fcfeaf3cce09b1745bd4be';

describe('Customers', () => {

    it('should get customers with code 200', async () => {
        const res = await request(app).get('/customers/');
        expect(res.statusCode).toBe(200);
    })

    it('should get customers by param', async () => {
        
        const res = await request(app).get('/customers/' + param);

        expect(res.statusCode).toBe(200);
    })
    
    
    it('should not create customer', async () => {
        
        const bodyTestsErrors = [
            {
                name: 'Cliente Teste',
                value: 1200,
            },
            {
                name: 'Cliente Teste',
                since: '2020-05-02T16:00:00.000+00:00',
            },
            {
                value: 1200,
                since: '2020-05-02T16:00:00.000+00:00',
            }
        ]

        let countErrors = 0;
        for (let i = 0; i < bodyTestsErrors.length; i++) {
            
            let body = bodyTestsErrors[i];

            const res = await request(app)
            .post('/customers/')
            .send( body )

            if (res.statusCode === 400)
            countErrors++
            
        }

        expect(countErrors).toBe(bodyTestsErrors.length);

    })

   it('should update customer', async () => {
        
        const res = await request(app)
        .put('/customers/' + param)
        .send(
            {
                value: 1200,
            }
        )

        expect(res.statusCode).toBe(200);
    })
    
   
   it('should filter customer by name', async () => {
        
        const res = await request(app)
        .get('/customers/filter/Cliente')
        
        expect(res.statusCode).toBe(200);
    })

    it('should delete customer', async () => {
        
        const res = await request(app)
        .delete('/customers/' + param)

        expect(res.statusCode).toBe(200);
    })



})
