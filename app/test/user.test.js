const app = require('../app');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

describe('GET /users', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('GET /users should return an array of users', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      // console.log(request);
      request.respondWith({ status: 200, response: 'respond with a resource' }) //mocked response
    })
    const result = await request(app).get('/users');
    // console.log(result)
    expect(Array.isArray(result.body)).toBe(true);
  });
});