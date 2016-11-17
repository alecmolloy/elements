var express = require('express'),
    router = express.Router();

router.get(["/", "/index.html"], function(req, res) {
    res.render("editor");
});

module.exports = router;
