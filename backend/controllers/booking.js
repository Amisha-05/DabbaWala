import Booking from "../models/Booking.js";
import User from "../models/User.js"
import Dabbawala from "../models/Dabbawala.js";
import axios from "axios";

export const createBooking = async (req, res, next) => {
  try {
    const book = req.body;
    const user = await User.findById(book.user);
    const dabbawala = await Dabbawala.findById(book.dabbawala);

    const bookData = { user: user._id, dabbawala: dabbawala._id, userName: user.name, userPhone: user.phone, dabbawalaName: dabbawala.name, dabbawalaPhone: dabbawala.phone, ...book};
    const booking = new Booking(bookData);
    
    await booking.save();
    // console.log(booking);
    console.log("1")

    // whatsapp notification alert

    const bookingData = {
        phoneNumber: dabbawala.phone,
        orderDetails: booking.mealType,
        orderDate : booking.subscriptionStartDate,
        userPhone: user.phone,
        userName: user.name
    };
    console.log(bookingData)

    const resul = await axios.post('http://localhost:8801/api/booking-notification', bookingData);
    console.log(resul);

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}


export const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const bookings = await Booking.find({ user: userId });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getDabbawalaBookings = async (req, res, next) => {
  try {
    const { dabbawalaId } = req.params;
    // console.log(dabbawalaId);

    const bookings = await Booking.find({ dabbawala: dabbawalaId }); // Use 'user' as the path to populate
    console.log(bookings);

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getDabbawalaBookingsWp = async (req, res, next) => {
  try {
    const { phone } = req.params;

    const dabbawala = await Dabbawala.findOne({ phone });

    if (!dabbawala) {
      return res.status(404).json({ message: 'Dabbawala not found' });
    }
    const dabbawalaId = dabbawala._id;

    const bookings = await Booking.find({ dabbawala: dabbawalaId });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};