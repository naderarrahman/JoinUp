import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(`mongodb://${process.env.MONGODB_UN}:${process.env.MONGODB_PASS}@ac-9bgt4br-shard-00-00.tz6lpzg.mongodb.net:27017,ac-9bgt4br-shard-00-01.tz6lpzg.mongodb.net:27017,ac-9bgt4br-shard-00-02.tz6lpzg.mongodb.net:27017/?ssl=true&replicaSet=atlas-njb57t-shard-0&authSource=admin`);
const db = client.db("JoinUp");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
    client,
  }),
  
  emailAndPassword: { 
  enabled: true, 
  }, 
  
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },},

  plugins: [jwt()],
  session: {
    cookieCache:{
      enabled: true,
      strategy: "jwt",
      maxAge: 600,
    }
  }
});