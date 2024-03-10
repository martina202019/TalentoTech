const userSchema = require("../models/User");
const messageSchema = require("../models/Message");
const houseSchema = require("../models/House");

const resolvers = {
  hello: () => {
    return "Hola Mundo!";
  },
  User: async (_, { id }) => {
    try {
      return (user = await userSchema.findById(id));
    } catch (e) {
      console.log();
    }
  },
  Users: async () => {
    try {
      return await userSchema.find();
    } catch (e) {
      console.log(e);
    }
  },
  UsersByFilter: async (_, { filter }) => {
    try {
      let query = {};

      if (filter) {
        if (filter.name) {
          // {name: "Mar"}
          query.name = { $regex: filter.name, $options: "i" }; // 'i' se utiliza para hacer una busqueda insesible de mayusculas y minusculas
        }
        if (filter.email) {
          // {email: "juan@"}
          query.email = { $regex: filter.email, $options: "i" };
        }
        if (filter.lastname) {
          // {lastname: "San"}
          query.lastname = { $regex: filter.lastname, $options: "i" };
        }

        const users = await userSchema.find(query);
        return users;
      }
    } catch (e) {
      console.log("Error obteniendo el usuario");
    }
  },
  Message: async (_, { id }) => {
    try {
      return (message = await messageSchema
        .findById(id)
        .populate({
          path: "from",
          select: "-password",
        })
        .populate({
          path: "to",
          select: "-password",
        }));
    } catch (e) {
      console.log();
    }
  },
  Messages: async () => {
    try {
      return await messageSchema
        .find()
        .populate({
          path: "from",
          select: "-password",
        })
        .populate({
          path: "to",
          select: "-password",
        });
    } catch (error) {
      console.log(error);
    }
  },
  MessagesByFilter: async (_, { filter }) => {
    try {
      let query = {};
      if (filter) {
        if (filter.from) {
          query = { from: filter.from };
        }
        if (filter.to) {
          query = { to: filter.to };
        }
        if (filter.body) {
          query.body = { $regex: filter.body, $options: "i" };
        }

        const message = await messageSchema
          .find(query)
          .populate("from")
          .populate("to");
        return message;
      }
    } catch (e) {
      console.log("Error obteniendo el mensaje");
    }
  },
  House: async (_, { id }) => {
    try {
      return (house = houseSchema.findById(id));
    } catch (error) {
      console.log(error);
    }
  },
  Houses: async () => {
    try {
      let houses = houseSchema.find();
      return houses;
    } catch (error) {
      console.log(error);
    }
  },
  HousesByFilter: async (_, { filter }) => {
    try {
      let query = {};
      if (filter) {
        if (filter.address) {
          query = { address: filter.address };
        }
        if (filter.city) {
          query = { city: filter.city };
        }
        if (filter.size) {
          query = { size : filter.size };
        }
        if(filter.parking){
            query = { parking : filter.parking};
        }

        const house = await houseSchema
          .find(query);
        return house;
      }
    } catch (e) {
      console.log("Error obteniendo la casa");
    }
  },
};
module.exports = resolvers;
