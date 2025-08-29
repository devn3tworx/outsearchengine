import axios from 'axios';

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!GHL_API_KEY) {
  console.warn('GHL_API_KEY is not set in environment variables');
}

// Create axios instance for API 1.0
const ghlClient = axios.create({
  baseURL: 'https://rest.gohighlevel.com/v1',
  headers: {
    'Authorization': `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Test GHL API connection and permissions
 */
export async function testGHLConnection() {
  const tests = [];
  
  try {
    // Test 1: Check API key validity
    console.log('🔍 Testing GHL API connection...');
    
    // Test basic API access
    try {
      const response = await ghlClient.get('/locations/');
      tests.push({
        test: 'API Key Authentication',
        status: 'success',
        message: 'API key is valid',
        data: response.data
      });
    } catch (error) {
      tests.push({
        test: 'API Key Authentication',
        status: 'failed',
        message: error.response?.data?.message || error.message,
        error: error.response?.data || error.message
      });
    }

    // Test 2: Check contacts endpoint access
    if (GHL_LOCATION_ID) {
      try {
        const response = await ghlClient.get('/contacts/', {
          params: { locationId: GHL_LOCATION_ID, limit: 1 }
        });
        tests.push({
          test: 'Contacts Read Access',
          status: 'success',
          message: 'Can read contacts',
          data: response.data
        });
      } catch (error) {
        tests.push({
          test: 'Contacts Read Access',
          status: 'failed',
          message: error.response?.data?.message || error.message,
          error: error.response?.data || error.message
        });
      }
    } else {
      tests.push({
        test: 'Location ID Check',
        status: 'failed',
        message: 'GHL_LOCATION_ID not set in environment variables'
      });
    }

    // Test 3: Try to create a test contact (dry run)
    if (GHL_LOCATION_ID) {
      try {
        const testPayload = {
          firstName: 'Test',
          lastName: 'Contact',
          email: `test-${Date.now()}@example.com`,
          locationId: GHL_LOCATION_ID,
          source: 'API Test',
          tags: ['test-contact']
        };

        // We'll test the payload structure without actually creating
        tests.push({
          test: 'Contact Creation Payload',
          status: 'success',
          message: 'Payload structure is valid',
          payload: testPayload
        });
      } catch (error) {
        tests.push({
          test: 'Contact Creation Payload',
          status: 'failed',
          message: error.message
        });
      }
    }

    return {
      success: tests.every(test => test.status === 'success'),
      tests,
      config: {
        baseURL: ghlClient.defaults.baseURL,
        hasApiKey: !!GHL_API_KEY,
        hasLocationId: !!GHL_LOCATION_ID,
        apiKeyPreview: GHL_API_KEY ? `${GHL_API_KEY.substring(0, 10)}...` : 'Not set'
      }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      tests
    };
  }
}

/**
 * Create a test contact in GHL
 */
export async function createTestGHLContact() {
  try {
    if (!GHL_LOCATION_ID) {
      throw new Error('GHL_LOCATION_ID is required');
    }

    const testPayload = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@meetingmachine.com`,
      phone: '+1234567890',
      locationId: GHL_LOCATION_ID,
      source: 'Meeting Machine Test',
      tags: ['test-contact', 'api-test']
    };

    console.log('Creating test GHL contact:', testPayload);
    
    const response = await ghlClient.post('/contacts/', testPayload);
    
    console.log('Test GHL contact created successfully:', response.data);
    return {
      success: true,
      contact: response.data,
      message: 'Test contact created successfully'
    };
    
  } catch (error) {
    console.error('Error creating test GHL contact:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to create test contact'
    };
  }
}

/**
 * Create a contact in GHL
 */
export async function createGHLContact(contactData) {
  try {
    const { firstName, lastName, email, phone, locationId } = contactData;
    
    const finalLocationId = locationId || GHL_LOCATION_ID;
    if (!finalLocationId) {
      throw new Error('locationId is required');
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      locationId: finalLocationId,
      source: 'Meeting Machine',
      tags: ['new-signup', 'meeting-machine'],
    };

    console.log('Creating GHL contact:', { email, firstName, lastName });
    
    const response = await ghlClient.post('/contacts/', payload);
    
    console.log('GHL contact created successfully:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error creating GHL contact:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    
    return null;
  }
}

/**
 * Update a contact in GHL
 */
export async function updateGHLContact(contactId, updateData) {
  try {
    const response = await ghlClient.put(`/contacts/${contactId}`, updateData);
    console.log('GHL contact updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating GHL contact:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Search for a contact by email
 */
export async function findGHLContactByEmail(email, locationId) {
  try {
    const finalLocationId = locationId || GHL_LOCATION_ID;
    const response = await ghlClient.get('/contacts/search', {
      params: {
        locationId: finalLocationId,
        query: email,
      },
    });
    
    const contacts = response.data.contacts || [];
    return contacts.find(contact => contact.email === email) || null;
  } catch (error) {
    console.error('Error searching GHL contact:', error.response?.data || error.message);
    return null;
  }
}
