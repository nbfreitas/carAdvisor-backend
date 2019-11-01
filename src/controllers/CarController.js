const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Cars = require('../models/Cars');

module.exports = {
  async index(req, res) {
    const cars = await Cars.find().sort('-createdAt');

    return res.json(cars);
  },

  async store(req, res) {
    const {
      dealership,
      brand,
      model,
      version,
      year,
      fuel,
      km,
      value,
    } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path);

    const car = await Cars.create({
      dealership,
      brand,
      model,
      version,
      year,
      fuel,
      km,
      value,
      image: fileName,
    });

    req.io.emit('car', car);

    return res.json(car);
  },

  async delete(req, res) {
    const cars = await Cars.findByIdAndDelete(req.params.id);

    req.io.emit('delete', req.params.id);

    return res.json(cars);
  },
};
