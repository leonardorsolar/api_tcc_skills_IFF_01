const request = require('supertest');
const app = require('../src/app');

describe('GET /hello', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
  });

  test('should return JSON with message "Hello World"', async () => {
    const response = await request(app).get('/hello');
    expect(response.body).toEqual({ message: 'Hello World' });
  });

  test('should have content-type application/json', async () => {
    const response = await request(app).get('/hello');
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});
