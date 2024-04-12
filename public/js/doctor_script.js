 function addDoctor() {
     const form = document.getElementById('doctorForm');
     const first_name = document.getElementById('firstName');
     const last_name = document.getElementById('lastName');
     const deparment = document.getElementById('department');
     const specialty = document.getElementById('specialty');
     const room_no = document.getElementById('roomNo');

     if (first_name.value == "" || last_name.value == "" || deparment.value == "" || specialty.value == "" || room_no.value == "") {
          Swal.fire({
               title: 'Error!',
               text: 'Enter the required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          })
     }
     else {
          const obj = {
               first_name: first_name.value,
               last_name: last_name.value,
               deparment: deparment.value,
               specialty: specialty.value,
               room_no: room_no.value
          };
          console.log(obj);
          const jsonString = JSON.stringify(obj);
          console.log(jsonString);

            fetch("http://localhost:3000/doctor-data", {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
               },
               body: jsonString,
          }).then(response => response.json())
               .then(data => {
                   if(data.message=='Room No does not exist'){
                    Swal.fire({
                         title: 'Error!',
                         text: 'Room No does not exist!',
                         icon: 'warning',
                         confirmButtonText: 'OK'
                    })
                   }
                   else if(data.message=='Doctor data inserted successfully'){
                    Swal.fire({
                         title: 'Success!',
                         text: 'Form submitted successfully!',
                         icon: 'success',
                         confirmButtonText: 'OK'
                    })
                    form.reset();
                    showtable();
                   }

               }).catch(error => {
                    console.error('Error submitting form:', error);
               });
     }
}

function showalldoctor(){
     fetch("http://localhost:3000/alldoctor", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("doctorTable");
               table.innerHTML = "<tr><th>Doctor_Id.</th><th>First_Name</th><th>LastName</th><th>Department</th><th>Room_No</th><th>Specialty</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].doctor_id}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].department}</td>
                    <td>${data[i].room_no}</td>
                    <td>${data[i].specialty}</td>
                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
}

async function filterDoctor(){
     showtable();
     const doctor_id = document.getElementById('doctorId');
     const first_name = document.getElementById('doctorfirstname');
     const department = document.getElementById('doctordepartment');

     fetch(`http://localhost:3000/filterdoctors?doctor_id=${doctor_id.value}&first_name=${first_name.value}&department=${department.value}`,{
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("doctorTable");
               table.innerHTML = "<tr><th>Doctor_Id.</th><th>First_Name</th><th>LastName</th><th>Department</th><th>Room_No</th><th>Specialty</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].doctor_id}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].department}</td>
                    <td>${data[i].room_no}</td>
                    <td>${data[i].specialty}</td>
                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
}

async function showtable(){
     document.getElementById("doctorTable").style.display = "block";
     document.getElementById("doctorForm").style.display = "none";
     showalldoctor();
}

function showform(){
     document.getElementById("doctorTable").style.display = "none";
     document.getElementById("doctorForm").style.display = "block";
}

function filterReset(){
     showtable();
}


// showalldoctor();