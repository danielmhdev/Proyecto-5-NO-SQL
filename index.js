const express = require('express');
const {connect} = require('./utils/db')

connect();

const PORT = 3000;

server.use('/', router);


server.listen(PORT, () => {
  console.log(`Server running in <http://localhost>:${PORT}`);
});