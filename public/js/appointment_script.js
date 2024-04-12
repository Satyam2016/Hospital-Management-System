function submitAppointment() {
     const form = document.getElementById('appointmentForm');
     const patient_id = document.getElementById('patient_id');
     const doctor_id = document.getElementById('doctor_id');
     const appointment_date = document.getElementById('appointment_date');
     const start_time = document.getElementById('start_time').value;
     const end_time = document.getElementById('end_time').value;
     const reason = document.getElementById('reason');

     if (patient_id.value === '' || doctor_id.value === '' || appointment_date.value === '' || start_time === '' || end_time === '' || reason.value === '') {
          Swal.fire({
               title: 'Error!',
               text: 'Enter all required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          });
          return; // Stop further execution if required fields are not filled
     }

     // Convert start time and end time strings to Date objects for comparison
     const startTime = new Date("2000-01-01T" + start_time);
     const endTime = new Date("2000-01-01T" + end_time);

     // Check if start time is greater than end time
     if (startTime >= endTime) {
          Swal.fire({
               title: 'Error!',
               text: 'Start time should be before end time!',
               icon: 'warning',
               confirmButtonText: 'OK'
          });
          return; // Stop further execution if start time is not before end time
     }
     // Make the fetch request to submit appointment data
     fetch('http://localhost:3000/appointment-data', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({
               patient_id: patient_id.value,
               doctor_id: doctor_id.value,
               appointment_date: appointment_date.value,
               start_time: start_time,
               end_time: end_time,
               reason: reason.value
          })
     })
          .then(res => res.json())
          .then(data => {
               if (data.message === 'Patient ID does not exist') {
                    Swal.fire({
                         title: 'Error!',
                         text: 'Patient ID does not exist!',
                         icon: 'error',
                         confirmButtonText: 'OK'
                    });
               } else if(data.message === 'Appointment already exists'){
                    Swal.fire({
                         title: 'Error!',
                         text: 'Appointment already exists for the entered Patient ID! ',
                         icon: 'error',
                         confirmButtonText: 'OK'
                    });
               }
               else if (data.message === 'Doctor ID does not exist') {
                    Swal.fire({
                         title: 'Error!',
                         text: 'Doctor ID does not exist!',
                         icon: 'error',
                         confirmButtonText: 'OK'
                    });
               } else if (data.message === 'Appointment data added successfully') {
                    Swal.fire({
                         title: 'Success!',
                         text: 'Appointment added successfully!',
                         icon: 'success',
                         confirmButtonText: 'OK'
                    });
                    form.reset();
                    appointmentTable();
               }
          })
          .catch(error => {
               console.error('Error submitting appointment:', error);
               Swal.fire({
                    title: 'Error!',
                    text: 'Failed to submit appointment. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
               });
          });
}

function allAppointments() {
     fetch('http://localhost:3000/all-appointments',{
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          }
          })
          .then(res => res.json())
          .then(data => {
               var table = document.getElementById('appointmentTable');
               // Initialize table HTML
               table.innerHTML = "<tr><th>Patient ID</th><th>Patient_Name</th><th>Doctor ID</th><th>Doctor_Name</th><th>Appointment ID</th><th>Appointment Date</th><th>Start Time</th><th>End Time</th><th>Reason</th></tr>";

               // Iterate over the data array and generate table rows
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].patient_id}</td>
                    <td>${data[i].patient_name}</td>
                    <td>${data[i].doctor_id}</td>
                    <td>${data[i].doctor_name}</td>
                    <td>${data[i].appointment_id}</td>
                    <td>${data[i].appointment_date}</td>
                    <td>${data[i].start_time}</td>
                    <td>${data[i].end_time}</td>
                    <td>${data[i].reason}</td>
                    </tr>`;
                    // Append the row to the table
                    table.innerHTML += row;
               }

          })
          .catch(error => {
               console.error('Error fetching appointment data:', error);
               Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch appointment data. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
               });
          });
}

// Fetch all appointments when the page loads

function appointmentForm(){
     document.getElementById('form').style.display = 'block';
     document.getElementById('table').style.display = 'none';
}



async function filterAppointment(){
     appointmentTable();
     const appointment_id = document.getElementById('appointment_id').value;
     const patient_id = document.getElementById('patient_Id').value;
     const doctor_id = document.getElementById('doctor_Id').value;

     fetch(`http://localhost:3000/filter-appointments?appointment_id=${appointment_id}&doctor_id=${doctor_id}&patient_id=${patient_id}`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json'
          }
     })
          .then(res => res.json())
          .then(data => {
               var table = document.getElementById('appointmentTable');
               // Initialize table HTML
               table.innerHTML = "<tr><th>Patient ID</th><th>Patient_Name</th><th>Doctor ID</th><th>Doctor_Name</th><th>Appointment ID</th><th>Appointment Date</th><th>Start Time</th><th>End Time</th><th>Reason</th></tr>";

               // Iterate over the data array and generate table rows
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].patient_id}</td>
                    <td>${data[i].patient_name}</td>
                    <td>${data[i].doctor_id}</td>
                    <td>${data[i].doctor_name}</td>
                    <td>${data[i].appointment_id}</td>
                    <td>${data[i].appointment_date}</td>
                    <td>${data[i].start_time}</td>
                    <td>${data[i].end_time}</td>
                    <td>${data[i].reason}</td>
                    </tr>`;
                    // Append the row to the table
                    table.innerHTML += row;
               }

          })
          .catch(error => {
               console.error('Error fetching appointment data:', error);
               Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch appointment data. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
               });
          });
}

function resetFilter(){
     appointmentTable();
}

async function appointmentTable(){
     document.getElementById('form').style.display = 'none';
     document.getElementById('table').style.display = 'block';
     allAppointments();
}