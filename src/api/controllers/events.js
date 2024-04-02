const Event = require("../models/events");

const getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
      return res.status(200).json(events);
    } catch (error) {
      return res.status(400).json("error");
    }
  };

  const getEventById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      return res.status(200).json(event);
    } catch (error) {
      return res.status(400).json("error");
    }
  };

  const postEvento = async (req, res, next) => {
    try {

      if (!req.body.title || !req.body.date || !req.body.location || !req.body.description) {
        return res.status(400).json({ error: "Todos los campos son oblicatorios para crear el evento" });
      }


      const newEvent = new Event(req.body);

      
      if (req.file) {
        newEvent.img = req.file.path
       }

      const event = await newEvent.save();
      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json("error");
    }
  };

  const deleteEvent = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(id);
      return res.status(200).json(deletedEvent);
    } catch (error) {
      return res.status(400).json("error");
    }
  };
  

  module.exports = { getEvents, getEventById, postEvento, deleteEvent }