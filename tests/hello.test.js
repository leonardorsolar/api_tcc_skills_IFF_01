const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  test('should return JSON with status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.body).toEqual({ status: 'ok' });
  });
});

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

describe('GET /notfound', () => {
  test('should return status 404', async () => {
    const response = await request(app).get('/notfound');
    expect(response.status).toBe(404);
  });

  test('should return JSON with error message', async () => {
    const response = await request(app).get('/notfound');
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});
