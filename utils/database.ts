import mongoose, { ConnectionStates, ConnectOptions } from "mongoose";

let isConnected: boolean = false; // track the connection status

export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  if (isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    // Latest way of doing this is that.
    // in the env file mongoDB_URI is the connection string. It will not have the database name.
    // you have to add the database name here.
    // const db = await mongoose.connect(process.env.MONGODB_URI, {
    //  dbName: "next-auth",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    isConnected = db.connections[0].readyState === ConnectionStates.connected;
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
  }
};
