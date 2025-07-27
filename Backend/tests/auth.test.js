// Example test file structure
// You can use Jest, Mocha, or any other testing framework

describe('Authentication Tests', () => {
  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      // Test implementation
    });

    test('should return error for duplicate email', async () => {
      // Test implementation
    });

    test('should return error for invalid input', async () => {
      // Test implementation
    });
  });

  describe('POST /api/auth/login', () => {
    test('should login user successfully', async () => {
      // Test implementation
    });

    test('should return error for invalid credentials', async () => {
      // Test implementation
    });
  });

  describe('GET /api/auth/me', () => {
    test('should return user profile for authenticated user', async () => {
      // Test implementation
    });

    test('should return error for unauthenticated request', async () => {
      // Test implementation
    });
  });
});

// Example API test function
const testAPI = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);

    // Test registration
    const registerResponse = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    console.log('Registration:', registerData);

    // Test login
    const loginResponse = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('Login:', loginData);

  } catch (error) {
    console.error('API Test Error:', error);
  }
};

module.exports = { testAPI };