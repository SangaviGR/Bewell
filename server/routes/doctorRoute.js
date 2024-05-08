const express = require('express');
const Doctor = require('../models/doctorSchema');

   const router = express.Router();

   router.post('/', async (req, res) => {
     try {
       const { name, address, signature } = req.body;
       const doctor = new Doctor({ name, address, signature });
       await doctor.save();
       res.status(201).send(doctor);
     } catch (error) {
       console.error(error);
       res.status(500).send('Server error');
     }
   });

   router.get('/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

   module.exports = router;