const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const app = require('../../../server/serverForTest.js');  

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres.dxnepolfyojkljqhwdwy:SiBrk82yClT09hb6@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
});

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
}, 10000); 

afterAll(async () => {
  await pool.end();
  server.close();
  console.log('Database connection and server closed');
}, 10000); 

describe('POST /applications/submitForm', () => {
    it('should handle the submission and return the correct response', async () => {
        const mockSubmission = {
            "company": "Apple",
            "position": "SDE2",
            "url": "http://apple.com",
            "date_applied": "2024-06-11",
            "status_id": "1",
            "contact": "Mr.Apple",
            "email": "apple@gmail.com",
            "notes": "apple is an apple",
            "Status_id": "3"
        };

        const response = await request(app)
            .post('/applications/submitForm')  
            .send(mockSubmission);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });

    it('should return an error when required fields are missing', async () => {
        const response = await request(app)
            .post('/applications/submitForm')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Company and position should not be empty');
    });
});
