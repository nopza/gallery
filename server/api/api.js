const express = require("express");
const router = express.Router();

require("../db"); //add
router.use(require('../api/api_login'))
router.use(require('../api/api_register'))
router.use(require('../api/api_gallery'))



module.exports = router;
