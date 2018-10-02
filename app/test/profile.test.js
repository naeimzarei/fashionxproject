const app = require('../app');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

describe('POST /influencers/signup', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should return an error for incomplete data', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
    })

    const data = {
        first_name: 'Incomplete profile'
    };

    const result = await request(app).post('/influencers/signup', data);
    expect(request).toThrowError('unknown');
  });
});