const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {
    // API 1: Total electricity usages for each year
    it('valid: should return total electricity usage for each year', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    it('invalid: should return 404 for an invalid endpoint for total electricity usage', async () => {
        const res = await request(app).get('/api/usage/invalid-endpoint');
        expect(res.status).toBe(404);
    });

    // API 2: Total electricity users for each year
    it('valid: should return total electricity users for each year', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    it('invalid: should return 404 for an invalid endpoint for total electricity users', async () => {
        const res = await request(app).get('/api/users/invalid-endpoint');
        expect(res.status).toBe(404);
    });

    // API 3: Usage of specific province by specific year
    it('valid: should return electricity usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usage/Bangkok/2566');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    it('invalid: should return Data not found for a non-existent province or year', async () => {
        const res = await request(app).get('/api/usage/InvalidProvince/9999');
        expect(res.body.message).toBe('Data not found');
    });

    // API 4: Users of specific province by specific year
    it('valid: should return electricity users for a specific province and year', async () => {
        const res = await request(app).get('/api/users/Bangkok/2566');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    it('invalid: should return Data not found for a non-existent province or year for users', async () => {
        const res = await request(app).get('/api/users/InvalidProvince/9999');
        expect(res.body.message).toBe('Data not found');
    });

    // API 5: Usage history by specific province
    it('valid: should return electricity usage history for a specific province', async () => {
        const res = await request(app).get('/api/usage-history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('invalid: should return [] for a non-existent province for usage history', async () => {
        const res = await request(app).get('/api/usage-history/InvalidProvince');
        expect(res.body).toEqual([]);
    });

    // API 6: User history by specific province
    it('valid: should return electricity user history for a specific province', async () => {
        const res = await request(app).get('/api/users-history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('invalid: should return [] for a non-existent province for user history', async () => {
        const res = await request(app).get('/api/users-history/InvalidProvince');
        expect(res.body).toEqual([]);
    });

    // Error Handling Test
    it('should return 404 for an invalid endpoint', async () => {
        const res = await request(app).get('/api/invalid-endpoint');
        expect(res.status).toBe(404);
    });
    it('should return Data not found for an non-numerric year', async () => {
        const res = await request(app).get('/api/users/Bangkok/AAAA');
        expect(res.body.message).toBe('Data not found');
    });

    
});