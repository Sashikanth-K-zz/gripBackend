var express = require('express');
var router = express.Router();

let searchController = require("../app/search/search.controller");

/* GET users listing. */
router.get('/', searchController.getList);

router.post("/", searchController.updateList);

module.exports = router;
