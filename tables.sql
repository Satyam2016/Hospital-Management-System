CREATE TABLE patients (
  patient_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  address VARCHAR(255) NOT NULL,
  admission_date DATE NOT NULL,
  discharge_date DATE,
  room_no INT,
  FOREIGN KEY (room_no) REFERENCES rooms(room_no)
);


CREATE TABLE doctors(
  doctor_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  specialty VARCHAR(50) NOT NULL,
  room_no INT,
  FOREIGN KEY (room_no) REFERENCES rooms(room_no)
);

CREATE TABLE nurses (
  nurse_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  shift_start TIME NOT NULL,
  shift_end TIME NOT NULL,
  room_no INT,
  FOREIGN KEY (room_no) REFERENCES rooms(room_no)
);

CREATE TABLE rooms (
  room_no INT PRIMARY KEY AUTO_INCREMENT,
  room_type ENUM('private', 'semi-private', 'ward', 'cabin') NOT NULL,
  bed_count INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);


CREATE TABLE diagnoses (
  diagnosis_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  diagnosis VARCHAR(255) NOT NULL,
  diagnosis_date DATE NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE prescriptions (
  prescription_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  prescription VARCHAR(255) NOT NULL,
  prescription_date DATE NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE billing (
  billing_id INT PRIMARY KEY AUTO_INCREMENT,  
  patient_id INT,
  bill_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  medication_charge DECIMAL(10, 2) NOT NULL,
  room_charge DECIMAL(10, 2),
  service_charge DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  billing_id INT,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (billing_id) REFERENCES billing(billing_id)
);


CREATE TABLE appointments (
  appointment_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason VARCHAR(255) NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

