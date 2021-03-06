const Booking = require("../models/Booking");
const validateBookingInput = require("../validation/booking");
const { bookingConfirmationEmail } = require("../utils/notification");
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getClassBookings = async (req, res) => {
  try {
    const classId = req.params.id;
    const booking = await Booking.find({ classId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "No booking found",
      });
    }
    return res.status(200).json({
      success: true,
      count: booking.length,
      data: booking,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not get class bookings",
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const volunteerEmail = req.body.email.toLowerCase();
    const { errors, isValid } = validateBookingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Booking.findOne(
      { email: volunteerEmail, classId: req.body.classId },
      async (err, result) => {
        if (result) {
          return res.status(400).json({
            success: false,
            message:
              "Email already exists, You have already booked for this class, thanks!",
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            error: "Server Error",
          });
        } else {
          const newBooking = await Booking.create(req.body);
          await bookingConfirmationEmail(newBooking);
          return res.status(201).json({
            success: true,
            data: newBooking,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "No booking found",
      });
    }

    await booking.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error, could not delete booking",
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const { errors, isValid } = validateBookingInput(bookingData);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const bookingId = req.params.id;
    const query = { _id: bookingId };
    const booking = await Booking.findOneAndUpdate(query, bookingData);
    if (!booking) {
      return res.status(400).json({
        success: false,
        error: "booking not found!",
      });
    }
    return res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Could not update booking",
    });
  }
};
