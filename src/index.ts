import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/userSchema'; // Import the user schema
// import { authenticateToken } from './auth'; // Ensure this path is correct

import NodeCache from 'node-cache';

const app = express();
const PORT = process.env.PORT || 4000;
const cache = new NodeCache(); // Initialize cache

app.use(express.json()); // Middleware to parse JSON bodies

// GraphQL endpoint with error handling and caching
app.use('/graphql', graphqlHTTP((req) => {
    const cacheKey = 'graphqlResponse'; // Define a cache key
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
        return cachedResponse; // Return cached response if available
    }

    return {
        schema: schema,
        graphiql: true,
        customFormatErrorFn: (err: any) => { // Add type annotation for err
            return {
                message: err.message,
                locations: err.locations,
                path: err.path,
            };
        },
    } as any; // Cast to any to bypass TypeScript error
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
