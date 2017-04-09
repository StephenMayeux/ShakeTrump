const Click = require('./models/Click');

module.exports = (socket) => {

  Click.count({}, (err, counter) => {
    if (err) return console.log('Error reading database:', err);
    socket.emit('init', {
      counter
    });
  });

  socket.on('incrementCounter', ({ counter, user }) => {

    socket.broadcast.emit('incrementCounter', {
      counter
    });

    const click = new Click({
      continent: user.continent.name,
      country: user.country.name,
      ip_address: user.ip_address,
      latitude: user.position.latitude,
      longitude: user.position.longitude,
      currentCounter: counter
    });

    click.save(err => {
      if (err) return console.log('Error saving to database:', err);
    });
  });

}
