const mysqlConnection = require('../config/db')

exports.updateGarage = async (req, res) => {
    if(req.body.garageId){
    mysqlConnection.query("UPDATE GARAGE SET GARAGE_STATUS='ACTIVE' WHERE GARAGE_ID=" + req.body.garageId, (err, rows, fields) => {
        console.log(err + " " + rows);
        if (err) {
            res.status(400).json({ 'status': 400, 'message': 'Error while updating garage status'+err.message })
        } else {
            updateGarageDetails(req, res, req.body.garageId);
        }
    })} else {
        res.status(400).json({ 'status': 400, 'message': 'Garage id is required - Field key garageId' })
    }
}

exports.addGarage = async (req, res) => {
    if (req.body.garageName) {
        mysqlConnection.query('INSERT INTO GARAGE (GARAGE_NAME) VALUES ("' + req.body.garageName + '")', (err, rows, fields) => {
            if (err) {
                res.status(400).json({
                    "success": false,
                    "message": "Error while adding garage details" + err.message
                })
            } else {
                console.log(rows.insertId);
                updateGarageDetails(req, res, rows.insertId)
            }
        })
    } else {
        res.status(400).json({ "success": false, "message": "Garage name is required Field key garageName" })
    }
}

exports.getGarage = async (req, res) => {
    mysqlConnection.query('SELECT * FROM GARAGE', (err, rows, fields) => {
        res.status(200).send(rows)
    })
}

function updateGarageDetails(req, res, garageId) {
    mysqlConnection.query('SELECT * FROM BOOKINGS WHERE GARAGE_ID is NULL LIMIT 1;', (err, rows, fields) => {
        console.log("Select bookings " + err + " " + rows);
        if (err) {
            res.status(200).json({ 'success': true, 'message': 'Updated garage details! currently no bookings available' });
        }
        else {
            if (rows != null && rows.length > 0) {
                let bookingId = rows[0]['BOOKING_ID'];
                updateGarageIdToBookings(req, bookingId, res, garageId);
            }
            else {
                res.status(200).json({ 'success': true, 'message': 'Updated garage status successfully! No bookings mapped' });
            }
        }
    });
}
function updateGarageIdToBookings(req, bookingId, res, garageId) {
    mysqlConnection.query('UPDATE BOOKINGS SET GARAGE_ID="' + garageId + '" WHERE BOOKING_ID="' + bookingId + '"', (err, rows, fields) => {
        console.log("Update garage id to bookings " + err + " " + rows);
        if (err) {
            res.status(200).json({ 'success': true, 'message': 'No bookings mapped' });
        }
        else {
            bookGarge(req, res, garageId);
        }
    });
}

function bookGarge(req, res, garageId) {
    mysqlConnection.query("UPDATE GARAGE SET GARAGE_STATUS='INACTIVE' WHERE GARAGE_ID=" + garageId, (err, rows, fields) => {
        console.log("Update garage status to inactive after booking" + err + " " + rows);
        if (err) {
            res.status(400).json({ 'success': false, 'message': 'Error While Updating garage status' });
        }
        else {
            res.status(200).json({ 'success': true, 'message': 'Bookings mapped and garage status updated' });
        }
    });
}

