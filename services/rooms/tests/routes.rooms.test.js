process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const knex = require('../src/db/connection');
const queries = require('../src/db/queries')

describe('Rooms API Routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/rooms/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/api/rooms/ping')
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });

  describe('GET /api/rooms/', () => {
    it('should return list of rooms', () => {
      chai.request(server)
      .get('/api/rooms')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.equal(2);
        res.body.data[0].should.have.property('rooms_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('required_points');
        res.body.data[0].should.have.property('available_amount');
        res.body.data[0].should.have.property('created_at');
      });
    });
  });

  describe('GET /api/rooms/id/:rooms_id', () => {
    it('should return rooms by their id', () => {
      chai.request(server)
      .get('/api/rooms/id/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        res.body.data[0].should.have.property('rooms_id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('required_points');
        res.body.data[0].should.have.property('available_amount');
        res.body.data[0].should.have.property('created_at');
      });
    });
  });
  
  let new_point, room_point, user_point
  describe('POST /api/rooms/book/:rooms_id', () => {
    it('should create a new booking data', () => {
      chai.request(server)
      .post('/api/rooms/book/1')
      .send({ users_id: 2 })
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.data.should.equal('Reservation completed');
        chai.request('http://bookings-service:3000')
        .get('/api/bookings/')
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(2);
          res.body.data[1].rooms_id.should.eql(1);
          res.body.data[1].users_id.should.eql(2);
          res.body.data[1].status.should.eql('RESERVED');
        });
      });
    });
    it('should get user bonus point', () => {
      chai.request('http://users-service:3000')
      .get('/api/users/bonus_point/2')
      .end((err,res) => {
        res.type.should.equal('application/json');
        res.should.have.status(200);
        res.body[0].bonus_points.should.eql(400)
        user_point = res.body[0].bonus_points
      })
    });
    it('should get room required point', () => {
      chai.request('http://rooms-service:3000')
      .get('/api/rooms/id/1')
      .end((err, res) => {
        res.type.should.equal('application/json');
        res.should.have.status(200);
        res.body.data[0].required_points.should.eql(260)
        room_point = res.body.data[0].required_points
        new_point = parseInt(user_point) - parseInt(room_point)
      })
    })
    it('should successfully deduct user bonus point', () => {
      chai.request('http://users-service:3000')
      .put('/api/users/deduct')
      .send({new_point: new_point})
      .end((err, res) => {
        res.type.should.equal('application/json');
        res.should.have.status(200);
        res.body.data.should.eql('Points deducted')
        chai.request('http://users-service:3000')
        .get('/api/users/id/2')
        .end((err, res) => {
          res.type.should.equal('application/json');
          res.should.have.status(200);
          res.body.data[0].bonus_points.should.eql(140)
        })
      })
    })
  });
  
  



});