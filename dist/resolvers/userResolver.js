"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const graphql_1 = require("graphql");
const userSchema_1 = require("../schemas/userSchema");
const bcrypt = __importStar(require("bcrypt"));
const auth_1 = require("../auth"); // Import the token generation function
const userResolver = {
    getUser: {
        type: userSchema_1.UserType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            console.log("Fetching user with ID:", args.id); // Log the user ID being fetched
            return User_1.default.findByPk(args.id); // Fetch user by ID
        },
    },
    createUser: {
        type: userSchema_1.UserType,
        args: {
            username: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Creating user with data:", args); // Log the user data being created
                const hashedPassword = yield bcrypt.hash(args.password, 10); // Hash the password
                const user = yield User_1.default.create({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword,
                });
                return user; // Return the created user
            });
        },
    },
    login: {
        type: graphql_1.GraphQLString,
        args: {
            username: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User_1.default.findOne({ where: { username: args.username } });
                if (!user)
                    throw new Error('User not found');
                const isMatch = yield bcrypt.compare(args.password, user.password);
                if (!isMatch)
                    throw new Error('Invalid credentials');
                return (0, auth_1.generateToken)(user.id.toString()); // Convert user ID to string
            });
        },
    },
    getAllUsers: {
        type: new graphql_1.GraphQLList(userSchema_1.UserType),
        resolve() {
            console.log("Fetching all users"); // Log when fetching all users
            return User_1.default.findAll(); // Fetch all users
        },
    },
};
exports.default = userResolver;
