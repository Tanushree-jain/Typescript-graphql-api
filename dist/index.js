"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const userSchema_1 = __importDefault(require("./schemas/userSchema")); // Import the user schema
// import { authenticateToken } from './auth'; // Ensure this path is correct
const node_cache_1 = __importDefault(require("node-cache"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const cache = new node_cache_1.default(); // Initialize cache
app.use(express_1.default.json()); // Middleware to parse JSON bodies
// GraphQL endpoint with error handling and caching
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    const cacheKey = 'graphqlResponse'; // Define a cache key
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
        return cachedResponse; // Return cached response if available
    }
    return {
        schema: userSchema_1.default,
        graphiql: true,
        customFormatErrorFn: (err) => {
            return {
                message: err.message,
                locations: err.locations,
                path: err.path,
            };
        },
    }; // Cast to any to bypass TypeScript error
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
