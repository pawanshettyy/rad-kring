// Quick API test script
const API_BASE = 'http://localhost:5000/api';

const testEndpoints = async () => {
  console.log('🧪 Testing RAD KRING AVIATION API Endpoints\n');

  const tests = [
    {
      name: 'Health Check',
      url: `${API_BASE}/health`,
      method: 'GET'
    },
    {
      name: 'Get About Content',
      url: `${API_BASE}/about`,
      method: 'GET'
    },
    {
      name: 'Get News Articles',
      url: `${API_BASE}/news`,
      method: 'GET'
    },
    {
      name: 'Get Featured News',
      url: `${API_BASE}/news/featured`,
      method: 'GET'
    },
    {
      name: 'Get News Categories',
      url: `${API_BASE}/news/categories`,
      method: 'GET'
    },
    {
      name: 'Get Privacy Policy',
      url: `${API_BASE}/privacy-policy`,
      method: 'GET'
    },
    {
      name: 'Submit Newsletter Subscription',
      url: `${API_BASE}/newsletter/subscribe`,
      method: 'POST',
      body: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        source: 'api-test'
      }
    },
    {
      name: 'Submit Contact Form',
      url: `${API_BASE}/contact`,
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'contact-test@example.com',
        contactNo: '+1234567890',
        preferredTime: 'morning',
        message: 'This is a test contact form submission'
      }
    }
  ];

  for (const test of tests) {
    try {
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const response = await fetch(test.url, options);
      const data = await response.json();

      if (response.ok) {
        console.log(`✅ ${test.name}: SUCCESS`);
        if (test.name === 'Get About Content') {
          console.log(`   Found ${data.data?.length || 0} about sections`);
        } else if (test.name === 'Get News Articles') {
          console.log(`   Found ${data.data?.news?.length || 0} news articles`);
        } else if (test.name === 'Get Featured News') {
          console.log(`   Found ${data.data?.length || 0} featured articles`);
        }
      } else {
        console.log(`❌ ${test.name}: FAILED - ${data.message}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
  }

  console.log('\n🎉 API Testing Complete!');
  console.log('\n📚 Available Endpoints:');
  console.log('   GET  /api/health - Server health check');
  console.log('   GET  /api/about - About us content');
  console.log('   GET  /api/news - News articles');
  console.log('   GET  /api/news/featured - Featured news');
  console.log('   POST /api/newsletter/subscribe - Newsletter subscription');
  console.log('   POST /api/contact - Contact form submission');
  console.log('   GET  /api/privacy-policy - Privacy policy');
  console.log('\n🔒 Admin endpoints require authentication');
  console.log('📖 Full documentation: Backend/API_DOCUMENTATION.md');
};

// Run tests
testEndpoints().catch(console.error);
