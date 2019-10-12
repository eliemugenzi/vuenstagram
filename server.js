const { ApolloServer } = require('apollo-server');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const User = require('./models/User');
const Post = require('./models/Post');

config();

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');



const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  },
  resolvers
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`Server is running on ${url}`);
    });
  });


