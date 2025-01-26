import axios from 'axios';
import { generateToken } from './auth'; // Ensure this path is correct

const testGraphQLAPI = async () => {
    const token = generateToken("someUserId"); // Generate a token for testing

    try {
        const response = await axios.post('http://localhost:4000/graphql', {
            query: '{ hello }',
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });
        console.log('GraphQL Response:', response.data);
    } catch (error) {
        console.error('Error testing GraphQL API:', error);
    }
};

testGraphQLAPI();
