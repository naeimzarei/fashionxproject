const app = require('../../app');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

xdescribe('POST /influencers/signup', () => {
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

    expect(await request(app).post('/influencers/signup', data)).toThrow();
  });
});