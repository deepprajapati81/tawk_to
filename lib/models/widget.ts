import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  color: {
    type: String,
    default: "#000000",
  
  },
  
  title:{
    type:String,
    default:'chatbot'
  },
  fontFamily:{
    type:String,
   
  }
});

export default mongoose.models.Widget ||
  mongoose.model("Widget", widgetSchema);
