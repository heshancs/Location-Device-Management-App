const request = require('supertest');
const app = require('../../app'); // Assuming your app setup is in this file
const Location = require('../../models/Location');
const Device = require('../../models/Device');

describe('Location Controller', () => {
  let testLocationId;

  beforeAll(async () => {
    // Perform any setup tasks like creating test data before running the tests
    const testLocation = new Location({
      title: 'Test Location',
      address: 'Test Address',
      devices: [],
      user: '664ab83404aaef254e1fbd4f' // Assuming a test user ID
    });
    const savedLocation = await testLocation.save();
    testLocationId = savedLocation._id;
  });

  afterAll(async () => {
    // Perform any cleanup tasks after running all tests
    await Location.deleteMany({});
    await Device.deleteMany({});
  });

  describe('POST /api/locations', () => {
 

    it('should return 401 if devices length is greater than 10', async () => {
      const res = await request(app)
        .post('/api/locations')
        .send({
          title: 'Location with Many Devices',
          address: 'Address',
          devices: new Array(11).fill('deviceID'), // Assuming device IDs
          user: '664ab83404aaef254e1fbd4f'
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

});
