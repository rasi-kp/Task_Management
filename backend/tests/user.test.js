const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/postgreesql');
const Task = require('../model/taskSchema');

// Setup before and after test runs
beforeAll(async () => {
  // Sync the database before tests run
  await sequelize.sync({ force: true });  // This drops tables and recreates them
});

afterAll(async () => {
  // Close the database connection
  await sequelize.close();
});

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'Test@12345'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with a duplicate username', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'Test@12345'
      });
  
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username already taken'); // Update the expected value
  });
  

  it('should login the registered user and return a JWT token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Test@12345'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });
  
    expect(res.statusCode).toEqual(400); // Update the expected status code
    expect(res.body).toHaveProperty('error', 'Invalid Password');
  });  
});

describe('Task Management', () => {
  let token;
  
  beforeAll(async () => {
    // Login user to get the JWT token
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Test@12345'
      });
    
    token = res.body.token;
  });

  it('should create a new task for the logged-in user', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task 1'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("sucess", "successfully created");
  });

  it('should retrieve tasks for the logged-in user', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toEqual(200);
    expect(res.body.tasks).toHaveLength(1); 
    expect(res.body.tasks[0]).toHaveProperty('title', 'Test Task 1');
  });
  
  it('should update a task status to completed', async () => {
    const task = await Task.findOne({ where: { title: 'Test Task 1' } });
    
    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        completed: true
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task updated successfully');
  });

  it('should delete a task', async () => {
    const task = await Task.findOne({ where: { title: 'Test Task 1' } });

    const res = await request(app)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
