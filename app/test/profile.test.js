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
    })
    const result = await request(app).get('/users');
    expect(Array.isArray(result.body)).toBe(true);
  });
});