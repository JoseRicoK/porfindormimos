const axios = require('axios');

// Configuración del cliente Axios
const strapiApi = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Origin': 'http://localhost:3000',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Verificar el endpoint de blogs
async function testBlogEndpoint() {
  try {
    console.log('Testing /blogs endpoint...');
    const response = await strapiApi.get('/blogs', {
      params: {
        populate: '*'
      }
    });
    console.log('Blog response status:', response.status);
    console.log('Blog data count:', response.data.data?.length || 0);
    if (response.data.data && response.data.data.length > 0) {
      console.log('First blog title:', response.data.data[0].attributes?.title);
    }
  } catch (error) {
    console.error('Error testing blog endpoint:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Verificar el endpoint de servicios con diferentes nombres posibles
async function testServiciosEndpoint() {
  const possibleEndpoints = ['servicios', 'servicio', 'services', 'service'];
  
  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`\nTesting /${endpoint} endpoint...`);
      const response = await strapiApi.get(`/${endpoint}`, {
        params: {
          populate: '*'
        }
      });
    console.log('Servicios response status:', response.status);
    console.log('Servicios data count:', response.data.data?.length || 0);
    if (response.data.data && response.data.data.length > 0) {
      console.log('First servicio title:', response.data.data[0].attributes?.title);
      console.log('First servicio price:', response.data.data[0].attributes?.price);
    } else {
      console.log('No servicios data found');
    }
    } catch (error) {
      console.error(`Error testing ${endpoint} endpoint:`, error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }
  }
}

// Ejecutar las pruebas
async function runTests() {
  await testBlogEndpoint();
  await testServiciosEndpoint();
}

runTests();
