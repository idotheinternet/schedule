const express = require('express'),
server = express();
server.use(express.static('./dist/scheduler'));
server.listen(process.env.PORT || 8080);