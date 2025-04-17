const {poolPromise} = require('../config/db');

const customerModel = {
  async getCustomerData(idCustomer) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idCustomer', idCustomer)
      .query('SELECT fullName, email, phone FROM Customers WHERE idCustomer = @idCustomer');
    return result.recordset[0];
  }
};

module.exports = customerModel;