var request = require('request');

test('should load login page', () => {
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/influencers', (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(res.statusMessage).toBe('OK');
            expect(body).not.toBeNull();
            resolve();
        });
    });
});

test('should load login page with alternative route', () => {
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/influencers/login', (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(res.statusMessage).toBe('OK');
            expect(body).not.toBeNull();
            resolve();
        });
    });
});

test('should return error message when login credentials are incorrect', () => {
    return new Promise((resolve, reject) => {
        request.post({url: 'http://localhost:3000/influencers/login', form: {
            email: 'afakedummyemailnobodyusesanymore@gmail.com',
            password: 'Password1'
        }}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(res.statusMessage).toBe('OK');
            expect(body.includes('The email and or password combination is incorrect.')).toBeTruthy();
            resolve();
        });
    });
});
