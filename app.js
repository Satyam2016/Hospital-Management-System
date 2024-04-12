import express from 'express';
import bodyParser from 'body-parser';
import db from './Database/connect.js';
import cors from 'cors';

// Create an Express application
const app = express();
const port = 3000;

app.set('view engine', 'ejs');


// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var patient;
db.query('select * from patients', (err, result) => {
  if (err) {
    console.log(err);
  }
  patient = result.length;
})

var doctor;
db.query('select * from doctors', (err, result) => {
  if (err) {
    console.log(err);
  }
  doctor = result.length;
}
)

var nurse;
db.query('select * from nurses', (err, result) => {
  if (err) {
    console.log(err);
  }
  nurse = result.length;
}
)

var room;
db.query('select * from rooms', (err, result) => {
  if (err) {
    console.log(err);
  }
  room = result.length;
}
)
var prescription;
db.query('select * from prescriptions', (err, result) => {
  if (err) {
    console.log(err);
  }
  prescription = result.length;
}
)

var diagnoses;
db.query('select * from diagnoses', (err, result) => {
  if (err) {
    console.log(err);
  }
  diagnoses = result.length;
}
)

var appointment;
db.query('select * from appointments', (err, result) => {
  if (err) {
    console.log(err);
  }
  appointment = result.length;
}
)

var billing
db.query('select * from billing', (err, result) => {
  if (err) {
    console.log(err);
  }
  billing = result.length;
}
)

var payment;
db.query('select * from payments', (err, result) => {
  if (err) {
    console.log(err);
  }
  payment = result.length;
}
)


app.get('/', (req, res) => {
  res.render('dashboard.ejs',
    {
      patient: patient,
      doctor: doctor,
      nurse: nurse,
      room: room,
      prescription: prescription,
      diagnoses: diagnoses,
      appointment: appointment,
      billing: billing,
      payment: payment
    });
});

app.get('/patient', (req, res) => {
  res.render('patient.ejs');
});

app.get('/doctor', (req, res) => {
  res.render('doctor.ejs');
});

app.get('/nurse', (req, res) => {
  res.render('nurse.ejs');
})

app.get('/room', (req, res) => {
  res.render('room.ejs');
});

app.get('/prescription_diagnoses', (req, res) => {
  res.render('prescription_diagnoses.ejs');
});

app.get('/appointment', (req, res) => {
  res.render('appointment.ejs');
});

app.get('/billing_payment', (req, res) => {
  res.render('billing_payment.ejs');
});

app.get('/report', (req, res) => {
  res.render('report.ejs');
})


//for posting Patient-data api
app.post("/patient-data", (req, res) => {
  console.log("Patient data received");
  let roomno;
  db.query(`INSERT INTO patients ( first_name, last_name, age, gender, address, admission_date, room_no) values ("${req.body.firstname}", "${req.body.lastname}", ${req.body.age}, "${req.body.gender}", "${req.body.address}", " ${req.body.admitdate}", ${req.body.roomno});`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ m: "Internal Server Error" });
    }
    else {
      console.log("Patient data inserted successfully");
      res.status(200).json({ m: "Patient data inserted successfully" });
    }
  })
});

//for getting all patient data
app.get("/allpatient", (req, res) => {
  db.query(`SELECT * FROM patients;`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ m: "Internal Server Error" });
    }
    else {
      console.log("Patient data fetched successfully");
      res.status(200).json(result);
    }
  })
})

//filtering patient data
app.get("/filterPatient", (req, res) => {
  const patient_id = req.query.patient_id;
  console.log(patient_id);
  const first_name = req.query.firstName;
  console.log(first_name);
  if (patient_id == "" && first_name == "") {
    db.query(`SELECT * FROM patients;`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ m: "Internal Server Error" });
      }
      else {
        console.log("Patient data fetched successfully");
        res.status(200).json(result);
      }
    })
  }
  else if (patient_id != "" && first_name == "") {
    db.query(`SELECT * FROM patients WHERE patient_id = ${patient_id};`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ m: "Internal Server Error" });
      }
      else {
        console.log("Patient data fetched successfully");
        res.status(200).json(result);
      }
    })
  }
  else if (patient_id == "" && first_name != "") {
    db.query(`SELECT * FROM patients WHERE LOWER(first_name )= LOWER("${first_name}");`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ m: "Internal Server Error" });
      }
      else {
        console.log("Patient data fetched successfully");
        res.status(200).json(result);
      }
    })
  }
  else {
    db.query(`SELECT * FROM patients WHERE patient_id = ${patient_id} AND LOWER(first_name) = LOWER("${first_name}");`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ m: "Internal Server Error" });
      }
      else {
        console.log("Patient data fetched successfully");
        res.status(200).json(result);
      }
    })
  }

});

//for posting Doctor-data api
app.post("/doctor-data", (req, res) => {
  console.log("Doctor data received");
   
  const room_no = req.body.room_no;
  const checkRoomQuery = 'SELECT * FROM rooms WHERE room_no = ?';

  db.query(checkRoomQuery, [room_no], (err, roomResult) => {
    if (err) {
      console.error('Error checking room ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    if(roomResult.length === 0){
      res.status(400).json({ message: 'Room No does not exist' });
      return;
    }
  db.query(`INSERT INTO doctors ( first_name, last_name, department, specialty, room_no) values ("${req.body.first_name}", "${req.body.last_name}", "${req.body.deparment}", "${req.body.specialty}", ${req.body.room_no});`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    else {
      console.log("Doctor data inserted successfully");
      res.status(200).json({ message: "Doctor data inserted successfully" });
    }
  })
})
})

//for getting all doctor data
app.get("/alldoctor", (req, res) => {
  db.query(`SELECT * FROM doctors;`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    else {
      console.log("Doctor data fetched successfully");
      res.status(200).json(result);
    }
  })
})

//filtering doctor data
app.get('/filterdoctors', (req, res) => {
  // Base SQL query
  let sql = 'SELECT * FROM doctors WHERE 1=1';

  // Array to store query parameters
  const params = [];

  // Check if doctor_id is provided
  if (req.query.doctor_id) {
    sql += ' AND doctor_id = ?';
    params.push(req.query.doctor_id);
  }

  // Check if first_name is provided
  if (req.query.first_name) {
    sql += ' AND first_name LIKE ?';
    params.push('%' + req.query.first_name + '%');
  }

  // Check if department is provided
  if (req.query.department) {
    sql += ' AND department = ?';
    params.push(req.query.department);
  }

  // Execute the SQL query with parameters
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Doctor data fetched successfully');
      res.status(200).json(results);
    }
  });
});




//for adding room new room
app.post("/room-data", (req, res) => {
  console.log("Room data received");
  db.query(`INSERT INTO rooms ( room_type, bed_count, price) values ("${req.body.roomtype}", "${req.body.bedcount}", ${req.body.roomprice});`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ m: "Internal Server Error" });
    }
    else {
      console.log("Room data inserted successfully");
      res.status(200).json({ m: "Room data inserted successfully" });
    }
  })
});

//for getting all room data
app.get("/allroom", (req, res) => {
  db.query(`SELECT * FROM rooms;`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ m: "Internal Server Error" });
    }
    else {
      console.log("Room data fetched successfully");
      res.status(200).json(result);
    }
  })
});

// filtering room data
app.get("/filterroom", (req, res) => {
  const roomType = req.query.roomtype;
  const price = req.query.price;

  let sql = "SELECT * FROM rooms WHERE 1=1";

  const params = [];

  if (roomType && roomType !== "all") {
    sql += " AND room_type = ?";
    params.push(roomType);
  }

  if (price) {
    sql += " AND price <= ?";
    params.push(price);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Room data fetched successfully");
      res.status(200).json(result);
    }
  });
});


//for posting Nurse-data api
app.post("/nurse-data", (req, res) => {
  console.log("Nurse data received");
  const { first_name, last_name, shift_start, shift_end, room_no } = req.body;

  // Check if room ID exists
  const checkRoomQuery = 'SELECT * FROM rooms WHERE room_no = ?';
  db.query(checkRoomQuery, [room_no], (err, roomResult) => {
    if (err) {
      console.error('Error checking room ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (roomResult.length === 0) {
      // Room ID does not exist
      res.status(400).json({ message: 'Room ID does not exist' });
      return;
    }

    // Room ID exists, proceed to add nurse data
    const addNurseQuery = 'INSERT INTO nurses (first_name, last_name, shift_start, shift_end, room_no) VALUES (?, ?, ?, ?, ?)';
    db.query(addNurseQuery, [first_name, last_name, shift_start, shift_end, room_no], (err, result) => {
      if (err) {
        console.error('Error adding nurse data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      console.log('Nurse data added successfully');
      res.status(200).json({ message: 'Nurse data added successfully' });
    });
  });
});

//for getting all nurse data
app.get("/allnurse", (req, res) => {
  db.query(`SELECT * FROM nurses;`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ m: "Internal Server Error" });
    }
    else {
      console.log("Nurse data fetched successfully");
      res.status(200).json(result);
    }
  })
});

//filtering nurse data
app.get('/filter-nurses', (req, res) => {
  // Retrieve query parameters
  const firstName = req.query.first_name;
  const roomNo = req.query.room_no;

  let sql = 'SELECT * FROM nurses WHERE 1=1';

  // Add conditions based on query parameters
  const conditions = [];
  const params = [];

  if (firstName) {
    conditions.push('first_name = ?');
    params.push(firstName);
  }

  if (roomNo) {
    conditions.push('room_no = ?');
    params.push(roomNo);
  }

  if (conditions.length > 0) {
    sql += ' AND ' + conditions.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error filtering nurses:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});


// for posting prescription data
app.post("/prescription-data", (req, res) => {
  console.log("Prescription data received");

  // Check if patient ID exists
  const checkPatientQuery = 'SELECT * FROM patients WHERE patient_id = ?';
  db.query(checkPatientQuery, [req.body.patient_id], (err, patientResult) => {
    if (err) {
      console.error('Error checking patient ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (patientResult.length === 0) {
      // Patient ID does not exist
      res.status(400).json({ message: 'Patient ID does not exist' });
      return;
    }

    const checkPrescriptionQuery= 'SELECT * FROM prescriptions WHERE patient_id = ?';
    db.query(checkPrescriptionQuery, [req.body.patient_id], (err, prescriptionResult) => {
      if (err) {
        console.error('Error checking prescription data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (prescriptionResult.length > 0) {
        // Prescription already exists
        res.status(400).json({ message: 'Prescription already exists' });
        return;
      }
    // Check if doctor ID exists
    const checkDoctorQuery = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(checkDoctorQuery, [req.body.doctor_id], (err, doctorResult) => {
      if (err) {
        console.error('Error checking doctor ID:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (doctorResult.length === 0) {
        // Doctor ID does not exist
        res.status(400).json({ message: 'Doctor ID does not exist' });
        return;
      }

      // Add prescription data
      const addPrescriptionQuery = 'INSERT INTO prescriptions (patient_id, doctor_id, prescription,  prescription_date) VALUES (?, ?, ?, ?)';
      db.query(addPrescriptionQuery, [req.body.patient_id, req.body.doctor_id, req.body.prescription, req.body.prescription_date], (err, result) => {
        if (err) {
          console.error('Error adding prescription data:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        console.log('Prescription data added successfully');
        res.status(200).json({ message: 'Prescription data added successfully' });
      });
    });
  });
  });
});


app.post("/diagnoses-data", (req, res) => {
  console.log("Diagnoses data received");

  // Check if patient ID exists
  const checkPatientQuery = 'SELECT * FROM patients WHERE patient_id = ?';
  db.query(checkPatientQuery, [req.body.patient_id], (err, patientResult) => {
    if (err) {
      console.error('Error checking patient ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (patientResult.length === 0) {
      // Patient ID does not exist
      res.status(400).json({ message: 'Patient ID does not exist' });
      return;
    }

    const checkDiagnosisQuery = 'SELECT * FROM diagnoses WHERE patient_id = ?';
    db.query(checkDiagnosisQuery, [req.body.patient_id], (err, diagnosisResult) => {
      if (err) {
        console.error('Error checking diagnosis data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (diagnosisResult.length > 0) {
        // Diagnosis already exists
        res.status(400).json({ message: 'Diagnosis already exists' });
        return;
      }

    // Check if doctor ID exists
    const checkDoctorQuery = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(checkDoctorQuery, [req.body.doctor_id], (err, doctorResult) => {
      if (err) {
        console.error('Error checking doctor ID:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (doctorResult.length === 0) {
        // Doctor ID does not exist
        res.status(400).json({ message: 'Doctor ID does not exist' });
        return;
      }

      // Add diagnoses data
      const addDiagnosisQuery = 'INSERT INTO diagnoses (patient_id, doctor_id, diagnosis, diagnosis_date) VALUES (?, ?, ?, ?)';
      db.query(addDiagnosisQuery, [req.body.patient_id, req.body.doctor_id, req.body.diagnosis, req.body.date], (err, result) => {
        if (err) {
          console.error('Error adding diagnoses data:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        console.log('Diagnoses data added successfully');
        res.status(200).json({ message: 'Diagnoses data added successfully' });
      });
    });
  });
  });
});



app.get('/diagnoses_data', (req, res) => {
  const patient_id = req.query.patient_id;
  const doctor_id = req.query.doctor_id;
  let sql = `SELECT patients.patient_id as patient_id,
  CONCAT(patients.first_name, ' ', patients.last_name) as patient_name,
  doctors.doctor_id as doctor_id,
  CONCAT(doctors.first_name, ' ', doctors.last_name) as doctor_name,
  d.diagnosis_id as diagnosis_id,
  d.diagnosis as diagnosis,
  d.diagnosis_date as diagnosis_date
 from diagnoses as d
  JOIN patients ON d.patient_id = patients.patient_id
  JOIN doctors ON d.doctor_id = doctors.doctor_id where 1=1`
  if (patient_id) {
    sql += ` AND patients.patient_id = ${db.escape(patient_id)}`
  }
  if (doctor_id) {
    sql += ` AND doctors.doctor_id = ${db.escape(doctor_id)}`
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch prescription and diagnosis data" });
    } else {
      console.log("Diagnoses data fetched successfully");
      res.status(200).json(result);
    }
  });
});

app.get('/prescription_data', (req, res) => {
  const patient_id = req.query.patient_id;
  const doctor_id = req.query.doctor_id;
  let sql = `SELECT patients.patient_id as patient_id,
  CONCAT(patients.first_name, ' ', patients.last_name) as patient_name,
  doctors.doctor_id as doctor_id,
  CONCAT(doctors.first_name, ' ', doctors.last_name) as doctor_name,
  p.prescription_id as prescription_id,
  p.prescription as prescription,
  p.prescription_date as prescription_date
  FROM prescriptions as p
  JOIN patients ON p.patient_id = patients.patient_id
  JOIN doctors ON p.doctor_id = doctors.doctor_id where 1=1`

  if (patient_id) {
    sql += ` AND patients.patient_id = ${db.escape(patient_id)}`
  }
  if (doctor_id) {
    sql += ` AND doctors.doctor_id = ${db.escape(doctor_id)}`
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch prescription and diagnosis data" });
    } else {
      console.log("Prescription data fetched successfully");
      res.status(200).json(result);
    }
  });
});


app.post("/appointment-data", (req, res) => {
  console.log("Appointment data received");


  // Check if patient ID exists
  const checkPatientQuery = 'SELECT * FROM patients WHERE patient_id = ?';
  db.query(checkPatientQuery, [req.body.patient_id], (err, patientResult) => {
    if (err) {
      console.error('Error checking patient ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (patientResult.length === 0) {
      // Patient ID does not exist
      res.status(400).json({ message: 'Patient ID does not exist' });
      return;
    }
    const checkAppointmentQuery = 'SELECT * FROM appointments WHERE patient_id = ?';
    db.query(checkAppointmentQuery, [req.body.patient_id], (err, appointmentResult) => {
      if (err) {
        console.error('Error checking appointment data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (appointmentResult.length > 0) {
        // Appointment already exists
        res.status(400).json({ message: 'Appointment already exists' });
        return;
      }

    // Check if doctor ID exists
    const checkDoctorQuery = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(checkDoctorQuery, [req.body.doctor_id], (err, doctorResult) => {
      if (err) {
        console.error('Error checking doctor ID:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (doctorResult.length === 0) {
        // Doctor ID does not exist
        res.status(400).json({ message: 'Doctor ID does not exist' });
        return;
      }

      // Add appointment data
      const addAppointmentQuery = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, start_time, end_time, reason) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(addAppointmentQuery, [req.body.patient_id, req.body.doctor_id, req.body.appointment_date, req.body.start_time, req.body.end_time, req.body.reason], (err, result) => {
        if (err) {
          console.error('Error adding appointment data:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        console.log('Appointment data added successfully');
        res.status(200).json({ message: 'Appointment data added successfully' });
      });
    });
  });
});
})

app.get('/all-appointments', (req, res) => {
  let sql = `SELECT patients.patient_id as patient_id,
  CONCAT(patients.first_name, ' ', patients.last_name) as patient_name,
  doctors.doctor_id as doctor_id,
  CONCAT(doctors.first_name, ' ', doctors.last_name) as doctor_name,
  a.appointment_id as appointment_id,
  a.appointment_date as appointment_date,
  a.start_time as start_time,
  a.end_time as end_time,
  a.reason as reason
  FROM appointments as a
  JOIN patients ON a.patient_id = patients.patient_id
  JOIN doctors ON a.doctor_id = doctors.doctor_id;`
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json(result);
  });
})

app.get('/filter-appointments', (req, res) => {
  // Retrieve query parameters
  console.log("filter-appointments")
  const patient_id = req.query.patient_id;
  const doctor_id = req.query.doctor_id;
  const appointment_id = req.query.appointment_id;
  // Construct the SQL query
  let sql = `SELECT patients.patient_id as patient_id,
  CONCAT(patients.first_name, ' ', patients.last_name) as patient_name,
  doctors.doctor_id as doctor_id,
  CONCAT(doctors.first_name, ' ', doctors.last_name) as doctor_name,
  a.appointment_id as appointment_id,
  a.appointment_date as appointment_date,
  a.start_time as start_time,
  a.end_time as end_time,
  a.reason as reason
  FROM appointments as a
  JOIN patients ON a.patient_id = patients.patient_id
  JOIN doctors ON a.doctor_id = doctors.doctor_id  where 1=1`;

  // Add conditions based on provided parameters
  if (patient_id) {
    sql += ` AND patients.patient_id = ${db.escape(patient_id)}`;
  }
  if (doctor_id) {
    sql += ` AND doctors.doctor_id = ${db.escape(doctor_id)}`;
  }
  if (appointment_id) {
    sql += ` AND a.appointment_id = ${db.escape(appointment_id)}`;
  }

  // Execute the SQL query
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    // Send the results back to the client
    res.status(200).json(results);
  });
})


// billing and payment
//posting a billing data
app.post("/billing-data", (req, res) => {
  console.log("Billing data received");
  const { patient_id, medication_charge, service_charge } = req.body;
  // Check if patient ID exists
  const checkPatientQuery = 'SELECT * FROM patients WHERE patient_id = ?';
  db.query(checkPatientQuery, [patient_id], (err, patientResult) => {
    if (err) {
      console.error('Error checking patient ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (patientResult.length === 0) {
      // Patient ID does not exist
      res.status(400).json({ message: 'Patient ID does not exist' });
      return;
    }

    const sql = `SELECT rooms.price FROM patients   join rooms on patients.room_no = rooms.room_no  WHERE patient_id =${patient_id};`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching billing data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      console.log(result);
      const room_charge = result[0].price;
      const total_amount = parseInt(medication_charge) + parseInt(service_charge) + parseInt(room_charge);

      // Add billing data
      const addBillingQuery = 'INSERT INTO billing (patient_id,  medication_charge, service_charge, room_charge, total_amount) VALUES (?, ?, ?, ?,?)';
      db.query(addBillingQuery, [patient_id, medication_charge, service_charge, room_charge, total_amount], (err, result) => {
        if (err) {
          console.error('Error adding billing data:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        console.log('Billing data added successfully');
        res.status(200).json({ message: 'Billing data added successfully' });
      });
    });
  });
})

app.post('/payment-data', (req, res) => {
  console.log("Payment data received");
  const { billing_id, amount } = req.body;
  // Check if patient ID exists
  const checkBillingQuery = 'SELECT * FROM billing WHERE billing_id = ?';
  db.query(checkBillingQuery, [billing_id], (err, billing) => {
    if (err) {
      console.error('Error checking patient ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (billing.length === 0) {
      // Patient ID does not exist
      res.status(400).json({ message: 'Billing ID does not exist' });
      return;
    }

    // Add payment data
    const addPaymentQuery = 'INSERT INTO payments (billing_id ,amount) VALUES (?, ?)';
    db.query(addPaymentQuery, [billing_id, amount], (err, result) => {
      if (err) {
        console.error('Error adding payment data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      console.log('Payment data added successfully');
      res.status(200).json({ message: 'Payment data added successfully' });
    });
  });
})


app.get('/all_billing', (req, res) => {
  const patient_id = req.query.patient_id;

  let sql = `SELECT billing.billing_id as billing_id,
  billing.patient_id as patient_id,
  concat(patients.first_name, ' ' ,  patients.last_name) as patient_name,
  billing.medication_charge as medication_charge,
  billing.service_charge as service_charge,
  billing.room_charge as room_charge,
  billing.total_amount as total_amount
  FROM billing
   JOIN patients ON billing.patient_id = patients.patient_id where 1=1`

  if (patient_id) {
    sql += ` AND patients.patient_id = ${db.escape(patient_id)}`
  }


  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching billing and payment data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json(result);
  });
}
)

app.get('/all_payment', (req, res) => {
  const patient_id = req.query.patient_id;

  // const doctor_id = req.query.doctor_id;
  let sql = `SELECT billing.billing_id as billing_id,
  billing.patient_id as patient_id,
  concat(patients.first_name, ' ' ,  patients.last_name) as patient_name,
  billing.medication_charge as medication_charge,
  billing.service_charge as service_charge,
  billing.room_charge as room_charge,
  billing.total_amount as total_amount,
  payments.payment_id as payment_id,
  payments.amount as paid_amount,
  payments.payment_date as payment_date
  FROM billing
   JOIN payments ON billing.billing_id = payments.billing_id
   JOIN patients ON billing.patient_id = patients.patient_id where 1=1`

  if (patient_id) {
    sql += ` AND patients.patient_id = ${db.escape(patient_id)}`
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching billing and payment data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json(result);
  });
}
)

app.get('/generateReport', (req, res) => {
  const patient_id = req.query.patient_id;
    const sql = `SELECT p.patient_id as patient_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    a.appointment_id as appointment_id,
    a.appointment_date ,
    concat( a.start_time, ' ', 'to' , ' ', a.end_time ) as appointment_timing,
    a.reason as reason,
    di.diagnosis_id,
    di.diagnosis_date,
    di.doctor_id diagnosis_doctor_id,
    (select concat(first_name , ' ' ,last_name) from doctors where doctor_id=di.doctor_id) as diagnosis_by_doctor,
    di.diagnosis,
    pr.prescription_id,
    pr.prescription_date,
    pr.doctor_id prescription_doctor_id,
    (select concat(first_name , ' ' ,last_name) from doctors where doctor_id=pr.doctor_id) as prescription_by_doctor,
    pr.prescription,
    (select sum(medication_charge) from  billing  where bi.patient_id=p.patient_id) as medication_charge,
    (select sum(service_charge) from billing where bi.patient_id=p.patient_id) as service_charge,
    (select room_type from rooms where room_no=p.room_no ) as room_type,
    (select price from rooms where room_no=p.room_no ) as room_charge,
	(select sum(amount) from payments where  bi.billing_id=pt.billing_id ) as total_paid_amount
    FROM patients p
     left JOIN prescriptions pr ON p.patient_id = pr.patient_id
    left JOIN diagnoses di ON p.patient_id = di.patient_id
     left join appointments a on p.patient_id = a.patient_id
     left join billing bi on p.patient_id = bi.patient_id
    left join payments pt on bi.billing_id=pt.billing_id
    WHERE p.patient_id = ?`;

  db.query(sql, [patient_id], (err, result) => {
    if (err) {
      console.error('Error fetching report data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(result);
  });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
