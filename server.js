
const express = require("express");

const app = express();

const PORT = 3000;


// Serve HTML, CSS and JavaScript files

app.use(express.static(__dirname));


// Start server

app.listen(PORT, function() {

    console.log("================================");

    console.log("FocusFlow Task Manager Started!");

    console.log("Open: http://localhost:3000");

    console.log("================================");

});
