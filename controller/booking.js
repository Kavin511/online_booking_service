const mysqlConnection = require('../config/db')
exports.booking = async (req, res) => {
    try {
        mysqlConnection.query('SELECT * FROM BOOKINGS', (err, rows, fields) => {
            if (rows[0]) {
                res.status(200).json({ "bookings": rows });
            } else {
                res.status(200).json({ "success": false, 'message': "No products found" });
            }
        }
        );
    } catch (error) {
        return res.status(400).json({ 'success': false, 'error': error })
    }
}
exports.updateBooking = async (req, res) => {
    if (req.body.name && req.body.phoneNumber) {
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
                            mysqlConnection.query("UPDATE GARAGE SET GARAGE_STATUS='INACTIVE' WHERE GARAGE_ID=" + garageId, (err, rows, fields) => {
                                console.log(err);
                            })
                            res.status(200).json({ 'success': true, 'message': { 'garage': "Your service request has been mapped to " + garageName, 'garageId': garageId } })
                        }
                    })
            } else {
                mysqlConnection.query("INSERT INTO BOOKINGS(CUSTOMER_NAME, GARAGE_ID) VALUES('" + req.body.name + "',null);", (err, rows, fields) => {
                    if (err) {
                        res.status(400).json({ 'success': false, 'message': err })
                    } else {
                        res.status(200).json({ 'success': true, 'message': { 'garage': 'Your service request has been queued successfully!' } })
                    }
                })
            }
        })
    } else if(req.body.name){
        res.status(400).json({"success":false,"message":"Phone number is required - Field key should be name"})
    } else if(req.body.phoneNumber){
        res.status(400).json({"success":false,"message":"Name is required - Field key should be phoneNumber"})
    } else {
        res.status(400).json({"success":false,"message":"Name and phone is required - Field key should be name, phoneNumber"})
    }
}