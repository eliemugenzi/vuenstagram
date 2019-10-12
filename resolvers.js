module.exports = {
  Mutation: {
    signupUser: async (_,{username,email,password},{User}) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists!');
      }

      const newUser = await User({
        username,
        email,
        password
      }).save();
      return newUser;
    },
    addPost: async (_,{title,imageUrl,categories,description,creatorId},{Post}) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();

      return newPost;
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
    }
  }
}