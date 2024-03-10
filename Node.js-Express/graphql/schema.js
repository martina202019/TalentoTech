const {
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema
} = require("graphql");

const resolvers = require('../graphql/resolvers');

const User = new GraphQLObjectType({
    name : 'User',
    fields : {
        _id : { type : GraphQLString },
        name : { type : GraphQLString },
        lastname : { type : GraphQLString },
        email : { type : GraphQLString },
        avatar : { type : GraphQLString }
    }
});

const Message = new GraphQLObjectType({
    name : "Message",
    fields : {
        _id : { type : GraphQLString },
        body : { type : GraphQLString },
        from : { type : User },
        to : { type : User },
        readed : { type : GraphQLBoolean }
    }
});

const House = new GraphQLObjectType({
    name : "House",
    fields : {
        _id : { type : GraphQLString },
        address : { type : GraphQLString },
        city : { type : GraphQLString },
        state : { type : GraphQLString },
        size : { type : GraphQLInt },
        type : { type : GraphQLString },
        zipCode : { type : GraphQLString },
        rooms : { type : GraphQLInt },
        bathrooms : { type : GraphQLInt },
        parking : { type : GraphQLBoolean },
        price : { type : GraphQLInt },
        code : { type : GraphQLString },
        image : { type : GraphQLString },
    }
});

const UserFilterInput = new GraphQLInputObjectType({
    name : "UserFilterInput",
    fields : {
        name : { type : GraphQLString },
        lastname :  { type : GraphQLString },
        email : { type : GraphQLString },
    }
});

const MessageFilterInput = new GraphQLInputObjectType({
  name: 'MessageFilterInput',
  fields: {
    _id : { type : GraphQLString },
    body: {type: GraphQLString},
    from: {type: GraphQLString},
    to: {type: GraphQLString}
  }
});

const HouseFilterInput =  new GraphQLInputObjectType({
  name : "HouseFilterInput",
  fields : {
    _id : { type : GraphQLString },
    address : { type: GraphQLString},
    city : { type : GraphQLString },
    size : { type : GraphQLInt},
    parking : { type : GraphQLBoolean } 
  }
});

const queries = {
    hello: {
      type: GraphQLString, // Tipo de respuesta
      resolve: resolvers.hello
    },
    User: {
      type: User,
      resolve: resolvers.User,
      args: {
        id: {type: GraphQLString}
      }
    },
    Users: {
      type: new GraphQLList(User),
      resolve: resolvers.Users
    },
    UsersByFilter: {
      type: new GraphQLList(User),
      resolve: resolvers.UsersByFilter,
      args: {
        filter: { type: UserFilterInput }
      }
    },
    Message : {
      type : Message,
      resolve : resolvers.Message,
      args : {
        id : {type : GraphQLString}
      }
    },
    Messages : {
      type : new GraphQLList(Message),
      resolve: resolvers.Messages,
     },
     MessagesByFilter : {
      type : new GraphQLList(Message),
      resolve: resolvers.MessagesByFilter,
      args : {
        filter : { type : MessageFilterInput }
      }
     },
     House : {
      type : House,
      resolve : resolvers.House,
      args : {
        id : {type : GraphQLString}
      }
     },
     Houses : {
      type : new GraphQLList(House),
      resolve : resolvers.Houses
     },
     HousesByFilter : {
      type : new GraphQLList(House),
      resolve : resolvers.HousesByFilter,
      args : {
        filter : { type : HouseFilterInput }
      }
     }
  };

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: queries
  });
  
  const schema = new GraphQLSchema({
    query: queryType
  });
  
  module.exports = schema;

