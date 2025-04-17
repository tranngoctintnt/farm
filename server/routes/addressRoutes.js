const express = require('express');
const router = express.Router();
const {authenticateTokenUser} = require('../middleware/user');
const {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/addressCtl');

router.use(authenticateTokenUser);

router.get('/:idCustomer', getAddresses);
router.post('/', createAddress);
router.put('/:idAddress', updateAddress);
router.delete('/:idAddress', deleteAddress);

module.exports = router;