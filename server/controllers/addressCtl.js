// const sql = require("mssql");
// const { dbConfig } = require('../config/db');
const { getConnection, sql } = require('../config/db');



const getAddresses = async (req, res) => {
    // console.log('getAddresses called', req.params);
    try {
        const { idCustomer } = req.params;
        // console.log(idCustomer);
        // console.log(req.cookies.access_token);
        // const authenticatedId = req.authenticatedCustomerId;
        const authenticatedId = req.user.idCustomer;


        if (!authenticatedId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const customerId = parseInt(idCustomer);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        if (customerId !== authenticatedId) {
            return res.status(403).json({ error: 'Unauthorized: You can only view your own addresses' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('idCustomer', sql.Int, customerId)
            .query('SELECT * FROM CustomerAddresses WHERE idCustomer = @idCustomer');
        
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch addresses: ' + error.message });
    }
};

const createAddress = async (req, res) => {
    try {
        const {
            idCustomer, addressType, fullName, phone,
            streetAddress, city, stateProvince, country, isDefault
        } = req.body;
        const authenticatedId =  req.user.idCustomer;

        if (!authenticatedId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const customerId = parseInt(idCustomer);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        if (customerId !== authenticatedId) {
            return res.status(403).json({ error: 'Unauthorized: You can only add your own addresses' });
        }

        if (!addressType || !fullName || !streetAddress || !city || !stateProvince || !country) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('idCustomer', sql.Int, customerId)
            .input('addressType', sql.NVarChar, addressType)
            .input('fullName', sql.NVarChar, fullName)
            .input('phone', sql.NVarChar, phone)
            .input('streetAddress', sql.NVarChar, streetAddress)
            .input('city', sql.NVarChar, city)
            .input('stateProvince', sql.NVarChar, stateProvince)
            .input('country', sql.NVarChar, country)
            .input('isDefault', sql.Bit, isDefault || false)
            .query(`
                INSERT INTO CustomerAddresses (
                    idCustomer, addressType, fullName, phone,
                    streetAddress, city, stateProvince, country,
                    isDefault, createdAt, updatedAt
                )
                VALUES (
                    @idCustomer, @addressType, @fullName, @phone,
                    @streetAddress, @city, @stateProvince, @country,
                    @isDefault, GETDATE(), GETDATE()
                );
                SELECT SCOPE_IDENTITY() as idAddress;
            `);

        res.status(201).json({
            idAddress: result.recordset[0].idAddress,
            message: 'Address created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create address: ' + error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { idAddress } = req.params;
        const {
            addressType, fullName, phone,
            streetAddress, city, stateProvince, country, isDefault
        } = req.body;
        const authenticatedId =  req.user.idCustomer;

        if (!authenticatedId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const addressId = parseInt(idAddress);
        if (isNaN(addressId)) {
            return res.status(400).json({ error: 'Invalid address ID' });
        }

        const pool = await getConnection();
        const checkResult = await pool.request()
            .input('idAddress', sql.Int, addressId)
            .query('SELECT idCustomer FROM CustomerAddresses WHERE idAddress = @idAddress');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        if (checkResult.recordset[0].idCustomer !== authenticatedId) {
            return res.status(403).json({ error: 'Unauthorized: You can only update your own addresses' });
        }

        await pool.request()
            .input('idAddress', sql.Int, addressId)
            .input('addressType', sql.NVarChar, addressType)
            .input('fullName', sql.NVarChar, fullName)
            .input('phone', sql.NVarChar, phone)
            .input('streetAddress', sql.NVarChar, streetAddress)
            .input('city', sql.NVarChar, city)
            .input('stateProvince', sql.NVarChar, stateProvince)
            .input('country', sql.NVarChar, country)
            .input('isDefault', sql.Bit, isDefault)
            .query(`
                UPDATE CustomerAddresses 
                SET 
                    addressType = @addressType,
                    fullName = @fullName,
                    phone = @phone,
                    streetAddress = @streetAddress,
                    city = @city,
                    stateProvince = @stateProvince,
                    country = @country,
                    isDefault = @isDefault,
                    updatedAt = GETDATE()
                WHERE idAddress = @idAddress
            `);

        res.json({ message: 'Address updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update address: ' + error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { idAddress } = req.params;
        const authenticatedId =  req.user.idCustomer;

        if (!authenticatedId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const addressId = parseInt(idAddress);
        if (isNaN(addressId)) {
            return res.status(400).json({ error: 'Invalid address ID' });
        }

        const pool = await getConnection();
        const checkResult = await pool.request()
            .input('idAddress', sql.Int, addressId)
            .query('SELECT idCustomer FROM CustomerAddresses WHERE idAddress = @idAddress');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        if (checkResult.recordset[0].idCustomer !== authenticatedId) {
            return res.status(403).json({ error: 'Unauthorized: You can only delete your own addresses' });
        }

        await pool.request()
            .input('idAddress', sql.Int, addressId)
            .query('DELETE FROM CustomerAddresses WHERE idAddress = @idAddress');

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete address: ' + error.message });
    }
};

module.exports = {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
};