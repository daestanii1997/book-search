const { Book, User } = require('../models');

const resolvers = {
    Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // TODO: populate correct column information
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
    },

    Mutation: {
      // TODO:
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      // TODO:
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      // TODO:
      saveBook: async (parent, {}) => {

      },
      // TODO:
      removeBook: async (parent, {}) => {

      },
    }
  };

module.exports = resolvers;