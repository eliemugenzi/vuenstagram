const { ApolloServer } = require('apollo-server');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
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


// Verify JWT token
const getUser = async token => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET_KEY);
      return user;
    } catch (error) {
      throw new AuthenticationError('Your session has ended, please sign in again');
    }
  }
}

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers['authorization']
    return {
      User,
      Post,
      currentUser:await getUser(token)
    }
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


