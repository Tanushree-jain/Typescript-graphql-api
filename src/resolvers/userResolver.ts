import User from '../models/User';
import { GraphQLString, GraphQLList } from 'graphql';
import { UserType } from '../schemas/userSchema';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../auth'; // Import the token generation function

const userResolver = {
    getUser: {
        type: UserType,
        args: { id: { type: GraphQLString } },
        resolve(parent: any, args: any) {
            console.log("Fetching user with ID:", args.id); // Log the user ID being fetched
            return User.findByPk(args.id); // Fetch user by ID
        },
    },
    createUser: {
        type: UserType,
        args: {
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        async resolve(parent: any, args: any) {
            console.log("Creating user with data:", args); // Log the user data being created
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
    getAllUsers: {
        type: new GraphQLList(UserType),
        resolve() {
            console.log("Fetching all users"); // Log when fetching all users
            return User.findAll(); // Fetch all users
        },
    },
};

export default userResolver;
