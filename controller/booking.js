const mysqlConnection = require('../config/db')
exports.booking = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM BOOKINGS', (err, rows, fields) => {
            res.send(rows);
        }
        );
    } catch (error) {
        return res.status(400).json({ 'success': false, 'error': error })
    }
}
exports.updateBooking = async (req, res) => {
    mysqlConnection.query("SELECT * FROM GARAGE where GARAGE_STATUS='ACTIVE' LIMIT 1;", (err, rows, fields) => {
        if (rows.length > 0) {
            let garageId = rows[0]['GARAGE_ID']
            let garageName = rows[0]['GARAGE_NAME']
            mysqlConnection.query(
                "INSERT INTO BOOKINGS(CUSTOMER_NAME,GARAGE_ID,PHONE_NUMBER) VALUES('" + req.body.name + "'," + garageId + "," + req.body.phoneNumber + ");", (err, rows, fields) => {
                    if (err) {
                        console.log(req.body);
                        res.status(200).json({ 'success': false, 'message': "Error while booking" + err.message })
                    } else {
                        mysqlConnection.query("UPDATE GARAGE SET GARAGE_STATUS='INACTIVE' WHERE GARAGE_ID=" + garageId)
                        res.status(200).json({ 'success': true, 'message': { 'garageName': garageName } })
                    }
                })
        } else {
            mysqlConnection.query("INSERT INTO BOOKINGS(CUSTOMER_NAME, GARAGE_ID) VALUES('" + req.body.name + "',null);", (err, rows, fields) => {
                if (err) {
                    res.status(400).json({ 'success': false, 'message': err })
                } else {
                    res.status(200).json({ 'success': true, 'message': { 'garage': 'Booking queued successfully' } })
                }
            })
        }
    })
}