import "reflect-metadata";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { __prod__ } from "./constants";
import { createConnection } from "typeorm";
import cors from "cors";
//Resolver Imports for Graphql
import { ItemResolver } from "./resolvers/item";
import { Item } from "./entities/Item";
import { User } from "./entities/User";
import { Chat } from "./entities/Chat";
import { Message } from "./entities/Message";
import { UserResolver } from './resolvers/User';
import { ChatResolver } from './resolvers/chat';
import { MessageResolver } from "./resolvers/message";


const connectRedis = require('connect-redis');
const redis = require('redis');
const session = require('express-session');

const app = express();
const PORT = 4000;

const redisClient = redis.createClient()
const RedisStore = connectRedis(session)


app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(
  session({
    name: 'qid',
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 10000000,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
    saveUninitialized: false,
    secret: 'qiwroasdjlasddde',
    resave: false
  })
);

(async function () {
  //typeORM connection to POSTGRES
  await createConnection({
    url: "postgres://tnsynagdhfeeoz:8f3fffa7c6b9427f6b1c7ccea5c00e92d246f7c57a8c6e4c898ff090f93c0975@ec2-54-220-166-184.eu-west-1.compute.amazonaws.com:5432/ddkbj1b88gtcq8",
    type: "postgres",
    logging: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },

    //TODO: Add entities to array
    entities: [Item, User, Chat, Message],
  });

  //ApolloServer Setup and Schema Build
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      // Add resolvers in array
      resolvers: [ItemResolver, UserResolver, ChatResolver, MessageResolver],
      validate: false
    }),
  });

  //Start server and apply middleware to ApolloServer
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      cors: false
    });
    app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
  })} catch (err) {
    console.error(err);
  }
})();

