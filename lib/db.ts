import mongoose from 'mongoose'



export async function connectDB() {
  try {
    let res =  await  mongoose.connection.readyState
 if(res===1) return;
 if(res===2) return;
 if(process.env.MONGODB_URI===undefined){
  throw new Error("MONGODB_URI is not defined in environment variables");
 } 

  await mongoose.connect(process.env.MONGODB_URI!,{dbName:"tawkto"});
  } catch (error) {
    
    console.log("Error connecting to database:", error);
        throw new Error("Could not connect to database");
  }
 
}
