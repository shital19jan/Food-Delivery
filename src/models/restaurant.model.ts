import mongoose from "mongoose";
import RestaurantInterface from "../Interfaces/Restaurant.interface"

const restaurantSchema = new mongoose.Schema<RestaurantInterface>({

  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name must be at exceed 40 characters"],
    required: [true, "Name is required"],
    trim: true
  },
  address:{
    city:{
      required:[true, 'City is required'],
      type: String,
      minLength: [3, "City must be at least 3 characters"],
      maxLength: [40, "City must be at exceed 40 characters"],
      trim: true
    },
    state:{
      type: String,
      minLength: [3, "State must be at least 3 characters"],
      maxLength: [40, "State must be at exceed 40 characters"],
      trim: true
    },
    pincode:{
      type: Number
    }
  },
  cuisine:{
    type: [ String ],
    required: true
  }

});

const Restaurant = mongoose.model<RestaurantInterface>("Restaurant",restaurantSchema);
export default Restaurant;