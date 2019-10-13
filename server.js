const { ApolloServer } = require('apollo-server');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Importing mongoose models
const User = require('./models/User');
const Post = require('./models/Post');

config();

// Importing typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');


// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
  },
  resolvers
});

// Connect to the MongoDB database and run the Apollo Server
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`Server is running on ${url}`);
    });
  });


