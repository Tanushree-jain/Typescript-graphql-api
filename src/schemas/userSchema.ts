import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import User from '../models/User';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { generateToken } from '../auth'; // Import the token generation function

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent: any, args: any) {
                return User.findByPk(args.id); // Fetch user by ID
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent: any, args: any) {
                const hashedPassword = await bcrypt.hash(args.password, 10); // Hash the password
                const user = await User.create({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword,
                });
                return user; // Return the created user
            },
        },
        login: {
            type: GraphQLString, // Return a token
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent: any, args: any) {
                const user = await User.findOne({ where: { username: args.username } });
                if (!user) throw new Error('User not found');

                const isMatch = await bcrypt.compare(args.password, user.password);
                if (!isMatch) throw new Error('Invalid credentials');

                return generateToken(user.id.toString()); // Convert user ID to string
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

export default schema;
