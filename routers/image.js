const express = require('express');
var path = require('path');
var router = express.Router();

router.get('/:imageUrl',function(req,res) {
  console.log('image fetching');
  res.sendFile(`clockimages/${req.params.imageUrl}`,{root:path.resolve()});
});

module.exports = router;
