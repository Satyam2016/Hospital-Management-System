function submitPrescription() {
     const form = document.getElementById('prescriptionForm');
     const patient_id = document.getElementById('prescription_patient_id');
     const doctor_id = document.getElementById('prescription_doctor_id');
     const prescription = document.getElementById('prescription_description');
     const date = document.getElementById('prescription_date');


     if (patient_id.value == "" || doctor_id.value == "" || prescription.value == "" || date.value == "") {
          Swal.fire({
               title: 'Error!',
               text: 'Enter the required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          })
     }
     else {
          const obj = {
               patient_id: patient_id.value,
               doctor_id: doctor_id.value,
               prescription: prescription.value,
               prescription_date: date.value
          };
          console.log(obj);
          const jsonString = JSON.stringify(obj);
          console.log(jsonString);

          fetch("http://localhost:3000/prescription-data", {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
               },
               body: jsonString,
          }).then(response => response.json())
               .then(data => {
                    if (data.message == 'Patient ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Patient ID does not exist! Enter a valid Patient ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         })
                    }
                    else if(data.message == 'Prescription already exists'){
                         Swal.fire({
                              title: 'Error!',
                              text: 'Patient is already prescribed!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         })
                    }
                    else if (data.message == 'Doctor ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Doctor ID does not exist! Enter a valid Doctor ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         })
                    }
                    else if (data.message == 'Nurse ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Nurse ID does not exist! Enter a valid Nurse ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         })
                    }
                    else if (data.message == 'Internal Server Error') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Internal Server Error! Please try again later!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         })
                    }
                    else {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Form submitted successfully!',
                              icon: 'success',
                              confirmButtonText: 'OK'
                         })
                         form.reset();
                         showTable2();
                    }

               }).catch(error => {
                    console.error('Error submitting form:', error);
               });
     }
}

function submitDiagnosis() {
     const patient_id = document.getElementById('diagnosis_patient_id');
     const doctor_id = document.getElementById('diagnosis_doctor_id');
     const diagnosis = document.getElementById('diagnosis_description');
     const date = document.getElementById('diagnosis_date');
     const form = document.getElementById('diagnosisForm'); // Added form variable

     if (patient_id.value == "" || doctor_id.value == "" || diagnosis.value == "" || date.value === "") { // Corrected comparison operator
          Swal.fire({
               title: 'Error!',
               text: 'Please fill out all required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          });
     } else {
          const obj = {
               patient_id: patient_id.value,
               doctor_id: doctor_id.value,
               diagnosis: diagnosis.value, // Changed to match key in SQL query
               date: date.value
          };
          console.log(obj);
          const jsonString = JSON.stringify(obj);
          console.log(jsonString);

          fetch("http://localhost:3000/diagnoses-data", {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
               },
               body: jsonString,
          }).then(response => response.json())
               .then(data => {
                    if (data.message === 'Patient ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Patient ID does not exist! Please enter a valid Patient ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         });
                    }
                    else if(data.message === 'Diagnosis already exists'){
                         Swal.fire({
                              title: 'Error!',
                              text: 'Patiend is alredy diagnosed!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         });
                    }
                    else if (data.message === 'Doctor ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Doctor ID does not exist! Please enter a valid Doctor ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         });
                    } else if (data.message === 'Nurse ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Nurse ID does not exist! Please enter a valid Nurse ID!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         });
                    } else if (data.message === 'Internal Server Error') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Internal Server Error! Please try again later!',
                              icon: 'warning',
                              confirmButtonText: 'OK'
                         });
                    } else {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Form submitted successfully!',
                              icon: 'success',
                              confirmButtonText: 'OK'
                         });
                         form.reset(); 
                         showTable1(); 
                    }
               }).catch(error => {
                    console.error('Error submitting form:', error);
                    Swal.fire({
                         title: 'Error!',
                         text: 'An unexpected error occurred! Please try again later!',
                         icon: 'error',
                         confirmButtonText: 'OK'
                    });
               });
     }
}



function diagnoses() {
     fetch("http://localhost:3000/diagnoses_data", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               console.log('Success:', data);
               var table = document.getElementById("diagnoses_table");
               table.innerHTML = "<tr><th>Patient_ID</th><th>Patient Name</th><th>Doctor_ID</th><th>Doctor Name</th><th>Diagnosis ID</th><th>Diagnosis</th><th>Diagnosis Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
               <td>${data[i].patient_id}</td>
                <td>${data[i].patient_name}</td>
                <td>${data[i].doctor_id}</td>
                <td>${data[i].doctor_name}</td>
                <td>${data[i].diagnosis_id}</td>
                <td>${data[i].diagnosis}</td>
                <td>${data[i].diagnosis_date}</td>
               </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
}

function prescription() {
     fetch("http://localhost:3000/prescription_data", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               console.log('Success:', data);
               var table = document.getElementById("prescription_table");
               table.innerHTML = "<tr><th>Patient_ID</th><th>Patient Name</th><th>Doctor_ID</th><th>Doctor Name</th><th>Prescription ID</th><th>Prescription</th><th>Prescription Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
               <td>${data[i].patient_id}</td>
                <td>${data[i].patient_name}</td>
                <td>${data[i].doctor_id}</td>
                <td>${data[i].doctor_name}</td>
                <td>${data[i].prescription_id}</td>
                <td>${data[i].prescription}</td>
                <td>${data[i].prescription_date}</td>
               </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
}



function showPrescriptionForm(){
     document.getElementById("prescription").style.display = "block";
     document.getElementById("diagnosis").style.display = "none";
     document.getElementById("prescription_table").style.display = "none";
     document.getElementById("diagnoses_table").style.display = "none";
    
}

function showDiagnosesForm(){
     document.getElementById("diagnosis").style.display = "block";
     document.getElementById("prescription").style.display = "none";
     document.getElementById("prescription_table").style.display = "none";
     document.getElementById("diagnoses_table").style.display = "none";
}

async function showTable1(){
     document.getElementById("diagnoses_table").style.display = "block";
     document.getElementById("prescription_table").style.display = "none";
     document.getElementById("prescription").style.display = "none";
     document.getElementById("diagnosis").style.display = "none";
     diagnoses();
}

async function showTable2(){
     document.getElementById("prescription_table").style.display = "block";
     document.getElementById("diagnoses_table").style.display = "none";
     document.getElementById("prescription").style.display = "none";
     document.getElementById("diagnosis").style.display = "none";
   
     prescription();
}

async function filterTable(){
     if(document.getElementById("diagnoses_table").style.display == "block"){
          var table= document.getElementById("diagnoses_table");
          showTable1();

          const patient_id = document.getElementById('patient_id');
     console.log(patient_id.value);
     const doctor_id = document.getElementById('doctor_id');
     console.log(doctor_id.value);
     fetch(`http://localhost:3000/diagnoses_data?patient_id=${patient_id.value}&doctor_id=${doctor_id.value}`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               console.log('Success:', data);
          
               table.innerHTML = "<tr><th>Patient_ID</th><th>Patient Name</th><th>Doctor_ID</th><th>Doctor Name</th><th>Diagnosis ID</th><th>Diagnosis</th><th>Diagnosis Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
               <td>${data[i].patient_id}</td>
                <td>${data[i].patient_name}</td>
                <td>${data[i].doctor_id}</td>
                <td>${data[i].doctor_name}</td>
                <td>${data[i].diagnosis_id}</td>
                <td>${data[i].diagnosis}</td>
                <td>${data[i].diagnosis_date}</td>
                
               </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });

     }
     else if(document.getElementById("prescription_table").style.display == "block"){
          var table= document.getElementById("prescription_table");
          showTable2();
          const patient_id = document.getElementById('patient_id');
     console.log(patient_id.value);
     const doctor_id = document.getElementById('doctor_id');
     console.log(doctor_id.value);
     fetch(`http://localhost:3000/prescription_data?patient_id=${patient_id.value}&doctor_id=${doctor_id.value}`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               console.log('Success:', data);
          
               table.innerHTML = "<tr><th>Patient_ID</th><th>Patient Name</th><th>Doctor_ID</th><th>Doctor Name</th><th>Prescription ID</th><th>Prescription</th><th>Prescription Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
               <td>${data[i].patient_id}</td>
                <td>${data[i].patient_name}</td>
                <td>${data[i].doctor_id}</td>
                <td>${data[i].doctor_name}</td>
                <td>${data[i].prescription_id}</td>
                <td>${data[i].prescription}</td>
                <td>${data[i].prescription_date}</td>
               </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
     }  
}



