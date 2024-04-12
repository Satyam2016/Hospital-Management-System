function bill() {
     const form = document.getElementById('billingForm');
     const patient_id = document.getElementById('patient_id').value;
     const medication_charge = document.getElementById('medication_charge').value;
     const service_charge = document.getElementById('service_charge').value;

     if (patient_id === '' || medication_charge === '' || service_charge === '') {
          Swal.fire({
               title: 'Error!',
               text: 'Enter the required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          });
     } else {
          fetch('http://localhost:3000/billing-data', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                    patient_id: patient_id,
                    medication_charge: medication_charge,
                    service_charge: service_charge
               })
          }).then(response => response.json())
               .then(data => {
                    if (data.message === 'Patient ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Patient ID does not exist!',
                              icon: 'error',
                              confirmButtonText: 'OK'
                         });
                    } else if (data.message === 'Billing data added successfully') {
                         Swal.fire({
                              icon: 'success',
                              title: 'Success',
                              text: 'Form submitted successfully!',
                         });
                         form.reset();
                         billing_payment()
                    }

               }).catch(error => {
                    console.error('Error submitting form:', error);
               });
     }
}

function pay() {
     const form= document.getElementById('paymentsForm')
     const billing_id = document.getElementById('billing_id').value;
     const amount = document.getElementById('amount').value;
     if (billing_id === '' || amount === '') {
          Swal.fire({
               title: 'Error!',
               text: 'Enter the required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          });
     } else {
          fetch('http://localhost:3000/payment-data', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                    billing_id: billing_id,
                    amount: amount
               })
          }).then(response => response.json())
               .then(data => {
                    if (data.message === 'Billing ID does not exist') {
                         Swal.fire({
                              title: 'Error!',
                              text: 'Billing ID does not exist!',
                              icon: 'error',
                              confirmButtonText: 'OK'
                         });
                    } else if (data.message === 'Payment data added successfully') {
                         Swal.fire({
                              icon: 'success',
                              title: 'Success',
                              text: 'Form submitted successfully!',
                         });
                         form.reset();
                         billing_payment()
                    }
               }).catch(error => {
                    console.error('Error submitting form:', error);
               });
     }
}


function pay_table() {
     fetch("http://localhost:3000/all_payment", {
          method: "GET",
          headers: {
               'Content-Type': 'application/json'
          }
     }).then(res => res.json())
          .then(data => {
               const tableHeader = `
               <tr>
               <th>Billing ID</th>
               <th>Patient ID</th>
               <th>Patient Name</th>
               <th>Medication Charge</th>
               <th>Service Charge</th>
               <th>Room Charge</th>
               <th>Total Amount</th>
               <th>Payment ID</th>
               <th>Paid Amount</th>
               <th>Payment Date</th>
               </tr>
               `;
               var table= document.getElementById('pay-table')
               // Set the innerHTML of the table with the table header
               table.innerHTML = tableHeader;

               // Iterate over the data array and generate table rows
               data.forEach((item) => {
                    // Create a new row element
                    const row = document.createElement('tr');
                    // Set the innerHTML of the row with the data values
                    row.innerHTML = `
                    <td>${item.billing_id}</td>
                    <td>${item.patient_id}</td>
                    <td>${item.patient_name}</td>
                    <td>${item.medication_charge}</td>
                    <td>${item.service_charge}</td>
                    <td>${item.room_charge}</td>
                    <td>${item.total_amount}</td>
                    <td>${item.payment_id}</td>
                    <td>${item.paid_amount}</td>
                    <td>${item.payment_date}</td>
                     `;
                    // Append the row to the table
                    table.appendChild(row);
               });
          }).catch(error => {
               console.error('Error fetching data:', error);
          });
}

function bill_table() {
     fetch("http://localhost:3000/all_billing", {
          method: "GET",
          headers: {
               'Content-Type': 'application/json'
          }
     }).then(res => res.json())
          .then(data => {
               const tableHeader = `
               <tr>
               <th>Billing ID</th>
               <th>Patient ID</th>
               <th>Patient Name</th>
               <th>Medication Charge</th>
               <th>Service Charge</th>
               <th>Room Charge</th>
               <th>Total Amount to Pay</th>
               </tr>
               `;
               var table= document.getElementById('bill-table')
               // Set the innerHTML of the table with the table header
               table.innerHTML = tableHeader;

               // Iterate over the data array and generate table rows
               data.forEach((item) => {
                    // Create a new row element
                    const row = document.createElement('tr');
                    // Set the innerHTML of the row with the data values
                    row.innerHTML = `
                    <td>${item.billing_id}</td>
                    <td>${item.patient_id}</td>
                    <td>${item.patient_name}</td>
                    <td>${item.medication_charge}</td>
                    <td>${item.service_charge}</td>
                    <td>${item.room_charge}</td>
                    <td>${item.total_amount}</td>
                     `;
                    // Append the row to the table
                    table.appendChild(row);
               });
          }).catch(error => {
               console.error('Error fetching data:', error);
          });
}



function billForm(){
     document.getElementById('formBill').style.display='block';
     document.getElementById('formPay').style.display='none';
     document.getElementById('bill-table').style.display='none';
     document.getElementById('pay-table').style.display='none';
}

function payForm(){
     document.getElementById('formBill').style.display='none';
     document.getElementById('formPay').style.display='block';
     document.getElementById('bill-table').style.display='none';
     document.getElementById('pay-table').style.display='none';
}

async function billing(){
     document.getElementById('formBill').style.display='none';
     document.getElementById('formPay').style.display='none';
     document.getElementById('bill-table').style.display='block';
     document.getElementById('pay-table').style.display='none';
     bill_table();
}

async function payment(){
     document.getElementById('formBill').style.display='none';
     document.getElementById('formPay').style.display='none';
     document.getElementById('bill-table').style.display='none';
     document.getElementById('pay-table').style.display='block';
     pay_table();
}

async function filterBillPayment(){
     if(document.getElementById('bill-table').style.display == 'block'){
          console.log('bill table');
          billing();
          const patient_id = document.getElementById('patient_Id');
          var table= document.getElementById('bill-table');
          fetch(`http://localhost:3000/all_billing?patient_id=${patient_id.value}`, {
          method: "GET",
          headers: {
               'Content-Type': 'application/json'
          }
          }).then(res => res.json())
          .then(data => {
               const tableHeader = `
               <tr>
               <th>Billing ID</th>
               <th>Patient ID</th>
               <th>Patient Name</th>
               <th>Medication Charge</th>
               <th>Service Charge</th>
               <th>Room Charge</th>
               <th>Total Amount to Pay</th>
               </tr>
               `;
               table.innerHTML = tableHeader;

               // Iterate over the data array and generate table rows
               data.forEach((item) => {
                    // Create a new row element
                    const row = document.createElement('tr');
                    // Set the innerHTML of the row with the data values
                    row.innerHTML = `
                    <td>${item.billing_id}</td>
                    <td>${item.patient_id}</td>
                    <td>${item.patient_name}</td>
                    <td>${item.medication_charge}</td>
                    <td>${item.service_charge}</td>
                    <td>${item.room_charge}</td>
                    <td>${item.total_amount}</td>
                     `;
                    // Append the row to the table
                    table.appendChild(row);
               });
          }).catch(error => {
               console.error('Error fetching data:', error);
          });
     }
     if(document.getElementById('pay-table').style.display == 'block'){
         pay_table();
          const patient_id = document.getElementById('patient_Id');
          
          var table= document.getElementById('pay-table');
          fetch(`http://localhost:3000/all_payment?patient_id=${patient_id.value}`, {
          method: "GET",
          headers: {
               'Content-Type': 'application/json'
          }
          }).then(res => res.json())
          .then(data => {
               const tableHeader = `
               <tr>
               <th>Billing ID</th>
               <th>Patient ID</th>
               <th>Patient Name</th>
               <th>Medication Charge</th>
               <th>Service Charge</th>
               <th>Room Charge</th>
               <th>Total Amount</th>
               <th>Payment ID</th>
               <th>Paid Amount</th>
               <th>Payment Date</th>
               </tr>
               `;
               table.innerHTML = tableHeader;

               // Iterate over the data array and generate table rows
               data.forEach((item) => {
                    // Create a new row element
                    const row = document.createElement('tr');
                    // Set the innerHTML of the row with the data values
                    row.innerHTML = `
                    <td>${item.billing_id}</td>
                    <td>${item.patient_id}</td>
                    <td>${item.patient_name}</td>
                    <td>${item.medication_charge}</td>
                    <td>${item.service_charge}</td>
                    <td>${item.room_charge}</td>
                    <td>${item.total_amount}</td>
                    <td>${item.payment_id}</td>
                    <td>${item.paid_amount}</td>
                    <td>${item.payment_date}</td>
                     `;
                    // Append the row to the table
                    table.appendChild(row);
               });
          }).catch(error => {
               console.error('Error fetching data:', error);
          });
     }
}




