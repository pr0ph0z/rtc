/* eslint-env mocha */
const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongo = require('../services/mongo')
const services = require('../services/index')
describe('Auth API', () => {
  before(() => {
    mongo.createConnection()
  })
  describe('#POST /auth/register', () => {
    it('test the complete body', (done) => {
      mongo.createConnection()
      request(app)
        .post('/auth/register')
        .send('username=test&password=test&email=te@s.t&full_name=lolos')
        .end((err, res) => {
          if (err) throw new Error(err)
          expect(res.body.status).to.equal('success')
          expect(res.statusCode).to.equal(200)
          done()
        })
    })
    it('test the incomplete body', (done) => {
      request(app)
        .post('/auth/register')
        .send('username=test&password=test&email=te@s.t')
        .end((err, res) => {
          if (err) throw new Error(err)
          expect(res.body.status).to.equal('failed')
          expect(res.statusCode).to.equal(400)
          done()
        })
    })
  })
})
