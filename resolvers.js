const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();

const tokenIndustry = (user, secret, expiresIn) => {
  const {username,email}=user
  return jwt.sign({
    username,
    email,
  }, secret, {
    expiresIn
  })
}

module.exports = {
  Mutation: {
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists!');
      }

      const newUser = await User({
        username,
        email,
        password
      }).save();
      return {
        token: tokenIndustry(newUser, process.env.SECRET_KEY, '1hr')
      };
    },
    addPost: async (_, { title, imageUrl, categories, description, creatorId }, { Post }) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();

      return newPost;
    },
    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }

      return {
        token: tokenIndustry(user, process.env.SECRET_KEY, '1hr')
      };
    },
    deleteUser: async (_, { username }, { User }) => {
      const user = await User.findOneAndRemove({ username });
      return user;
    }
  },
  Query:{
    getUsers: async (_, { }, { User }) => {
      const users = await User.find({});
      return users;
    },
    getPosts: async (_, { }, { Post }) => {
      const posts = await Post.find({}).sort({
        createdDate: 'desc'
      }).populate({
        path: 'createdBy',
        model:'User'
      });
      return posts;
    },
    getCurrentUser: async (_,{},{User, currentUser}) => {
      if (!currentUser) {
        return null;
      }

      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Post'
        });
      
      return user;
    }
  }
}