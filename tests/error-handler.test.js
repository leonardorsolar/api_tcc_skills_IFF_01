const request = require('supertest');
const app = require('../src/app');

describe('Error Handler Middleware', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  test('should return 500 on unhandled error', async () => {
    const response = await request(app).get('/test-error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });

  test('should not expose stack trace in response', async () => {
    const response = await request(app).get('/test-error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
    expect(response.body.stack).toBeUndefined();
    expect(response.body.message).toBeUndefined();
  });

  test('should log error in non-production', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await request(app).get('/test-error');

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
