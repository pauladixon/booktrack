const express = require('express');
const router = express.Router();
const booksCtrl = require('../../controllers/books');

/*------------------------------ Public Routes ------------------------------*/

router.get('/', booksCtrl.index);


/*----------------------------- Protected Routes ----------------------------*/

// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', booksCtrl.createBook);
router.delete('/:id', booksCtrl.delete);
router.put('/:id', booksCtrl.update);
router.post('/', booksCtrl.create);

/*----------------------------- Helper Functions ----------------------------*/

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
