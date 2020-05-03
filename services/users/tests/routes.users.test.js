process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const knex = require('../src/db/connection');

describe('Users API Routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/users/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/api/users/ping')
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });

  describe('GET /api/users/', () => {
    it('should return list of users', () => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.equal(2);
        res.body.data[0].should.have.property('users_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('role');
        res.body.data[0].should.have.property('bonus_points');
        res.body.data[0].should.have.property('created_at');
      });
    });
  });

  describe('GET /api/users/id/:users_id', () => {
    it('should return user by their id', () => {
      chai.request(server)
      .get('/api/users/id/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].should.have.property('users_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('role');
        res.body.data[0].should.have.property('bonus_points');
        res.body.data[0].should.have.property('created_at');
      });
    });
  });

  describe('GET /api/users/decrement/:users_id', () => {
    it('should decrease user bonus point', () => {
      chai.request(server)
      .get('/api/users/decrement/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].should.have.property('users_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('role');
        res.body.data[0].should.have.property('bonus_points');
        res.body.data[0].should.have.property('created_at');
        res.body.data[0].bonus_points.should.eql(199);
      });
    });
  });

  describe('GET /api/users/increment/:users_id', () => {
    it('should increase user bonus point', () => {
      chai.request(server)
      .get('/api/users/increment/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].should.have.property('users_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('role');
        res.body.data[0].should.have.property('bonus_points');
        res.body.data[0].should.have.property('created_at');
        res.body.data[0].bonus_points.should.eql(401);
      });
    });
  });



});