const Booking = require('../models/Booking');
const Ground = require('../models/Ground');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const { groundId, date, time } = req.body;
    const userId = req.user.userId;

    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: 'Ground not found' });
    }

    const booking = await Booking.create({
      user: userId,
      ground: groundId,
      date: new Date(date),
      time,
      totalAmount: ground.pricePerHour,
      status: 'confirmed'
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('ground', 'name location');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};