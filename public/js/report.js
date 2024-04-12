function generateReport(){
     const  patient_id = document.getElementById('patient_id').value;
     if(patient_id == ""){
         Swal.fire({
               title: 'Error!',
               text: 'Parient ID is required!',
               icon: 'warning',
               confirmButtonText: 'OK'
         })
         return ;
     }
     else{
          fetch(`http://localhost:3000/generateReport?patient_id=${patient_id}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
               }
          }).then(response => response.json())
          .then(data => {
               if(data.message === "Patient not found"){
                    Swal.fire({
                         title: 'Error!',
                         text: 'Patient ID does not exist!',
                         icon: 'warning',
                         confirmButtonText: 'OK'
                    });
               }
               else{
                    const topay = parseInt(data[0].medication_charge)  +parseInt(data[0].service_charge ) +parseInt(data[0].room_charge)  ;
                    var left = topay - data[0].total_paid_amount;
                    var extra = 0;
                    if(left < 0){
                         extra = left;
                         left = 0;
                    }
                    var table= document.getElementById('summary-table');
                    table.innerHTML = `
                         <tr> 
                         <th>Patient ID</th><td>${data[0].patient_id}</td>
                         </tr>
                         <tr> 
                         <th>Patient Name</th><td>${data[0].patient_name}</td>
                         </tr>
                         <tr> 
                         <th>Appointment ID</th><td>${data[0].appointment_id}</td>
                         </tr>
                         <tr> 
                         <th>Appointment Timing</th><td>${data[0].appointment_timing}</td>
                         </tr>
                         <tr> 
                         <th>Appointment Reason</th><td>${data[0].reason}</td>
                         </tr>
                         <tr> 
                         <th>Diagnosis ID</th><td>${data[0].diagnosis_id}</td>
                         </tr>
                         <tr> 
                         <th>Diagnosis Date</th><td>${data[0].diagnosis_date}</td>
                         </tr>
                         <tr> 
                         <th>Diagnosis By Doctor</th><td>${data[0].diagnosis_by_doctor}</td>
                         </tr>
                         <tr> 
                         <th>Diagnosis Description</th><td>${data[0].diagnosis}</td>
                         </tr>
                         <tr>
                         <th>Prescription ID</th><td>${data[0].prescription_id}</td>
                         </tr>
                         <tr> 
                         <th>Prescription Date</th><td>${data[0].prescription_date}</td>
                         </tr>
                         <tr> 
                         <th>Prescription By Doctor</th><td>${data[0].prescription_by_doctor}</td>
                         </tr>
                         <tr> 
                         <th>Prescription Description</th><td>${data[0].prescription}</td>
                         </tr>
                         <tr>
                         <th>Medication Charge</th><td>${data[0].medication_charge}</td>
                         </tr>
                         <tr>
                         <th>Service Charge</th><td>${data[0].service_charge}</td>
                         </tr>
                         <tr>
                         <th>Room Type</th><td>${data[0].room_type}</td>
                         </tr>
                         <tr>
                         <th>Room Charge</th><td>${data[0].room_charge}</td>
                         </tr>
                         <tr>
                         <th>Total Amount To Pay</th><td>${topay}</td>
                         </tr>
                         <tr>
                         <th>Total Paid Amount</th><td>${data[0].total_paid_amount}</td>
                         </tr>
                         <tr>
                         <th>Left amount to be paid </th><td>${left}</td>
                         </tr>
                         <tr>
                         <th>Extra amount to be returned</th><td>${extra}</td>
                         </tr>
                    `;
                    Swal.fire({
                         title: 'Success!',
                         text: 'Report generated successfully!',
                         icon: 'success',
                         timer: 2000, // time in milliseconds (e.g., 2000ms = 2 seconds)
                         timerProgressBar: true, // enables progress bar
                         showConfirmButton: false // hides the "OK" button
                    });
               }
          });

     }
}