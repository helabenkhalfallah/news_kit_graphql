/* eslint-disable */
import chai from 'chai';
import {
  _,
} from 'lodash';

// chai tools
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

// server config
const url = `http://localhost:4000`;
const request = require('supertest')(url);

// authentication parameters
let token;
const email = 'helabenkhalfallah3@hotmail.fr';
const password = 'azerty123456789';

// graphql queries & mutations (client side)
// authentication mutation
const authMutation = `mutation { 
  AuthLogin(email : "${email}", password : "${password}"){
    token
  }
}`;

// get all users query
const userListQuery = `query{
  UsersList{
    id
    firstName
    lastName 
    username
    email
    birthday
    job
  }
}`;

// user test suite
describe('News Kit GraphQL Test Suite', () => {
  beforeEach(function (done) {
    setTimeout(function () {
      // login user 
      request
        .post('/graphql')
        .send({
          query: authMutation,
        })
        .expect(200)
        .end((error, response) => {
          // skip if error
          console.log('* beforeEach authMutation : ', authMutation);
          console.log('* beforeEach error : ', error);
          if (error) return done(error);

          // we should have not null
          // & a defined response at begin
          assert.isDefined(response);
          assert.isNotNull(response);

          // we should have not null
          // & a defined body next
          assert.isDefined(response.body);
          assert.isNotNull(response.body);

          // check if we have data property
          // after to avoid null pointers
          response.body.should.have.property('data');

          // get data
          const {
            data,
          } = response.body;
          assert.isDefined(data);
          assert.isNotNull(data);
          data.should.have.property('AuthLogin');

          // we should have authentication object
          const {
            AuthLogin,
          } = data;
          assert.isDefined(AuthLogin);
          assert.isNotNull(AuthLogin);
          AuthLogin.should.have.property('token');

          // retreive token
          token = AuthLogin.token;
          assert.isDefined(token); // check if generated token is defined
          assert.isNotNull(token); // check if generated token is not null
          assert.isString(token); // check if generated token is string
          expect(token).to.have.length.above(0); // check if the generated token is not empty
          expect(token).to.have.string('JWT'); // check if generated token contains JWT auth strategy
          console.log('* beforeEach token : ', token);
          done();
        });
    }, 4000);
  });

  // user list get
  // Tests
  it('Returns all users', (done) => {
    request
      .post('/graphql')
      .send({
        query: userListQuery,
      })
      .set('Authorization', `${token}`)
      .expect(200)
      .end((error, response) => {
        // skip if error
        if (error) return done(error);

        // we should have not null
        // & a defined response at begin
        assert.isDefined(response);
        assert.isNotNull(response);

        // we should have not null
        // & a defined body next
        assert.isDefined(response.body);
        assert.isNotNull(response.body);

        // check if we have data property
        // after to avoid null pointers
        response.body.should.have.property('data');

        // get data
        const {
          data,
        } = response.body;
        data.should.have.property('UsersList');

        // verify users list
        const {
          UsersList,
        } = data;
        assert.isDefined(UsersList);
        assert.isNotNull(UsersList);
        assert.isArray(UsersList); // check if the result is an array

        // check if we have data
        expect(UsersList).to.have.length.above(0); // check if we have at least a user
        console.log('* users : ', UsersList);

        // if yes check user schema
        const user = _.head(UsersList);
        assert.isDefined(user);
        assert.isNotNull(user);
        assert.isObject(user);

        // check for all properties
        // asked on request
        user.should.have.property('id');
        user.should.have.property('firstName');
        user.should.have.property('lastName');
        user.should.have.property('username');
        user.should.have.property('email');
        user.should.have.property('birthday');
        user.should.have.property('job');
        console.log('* user : ', user);

        // end with success
        done();
      });
  });
});
