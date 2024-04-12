function nurseForm() {
     const first_name = document.getElementById("first_name");
     const last_name = document.getElementById("last_name");
     const shift_start = document.getElementById("shift_start").value;
     const shift_end = document.getElementById("shift_end").value;
     const room_no = document.getElementById("room_no");
   
     // Validate required fields
     if (first_name.value === "" || last_name.value === "" || shift_start === "" || shift_end === "" || room_no.value === "") {
       Swal.fire({
         title: 'Error!',
         text: 'Enter all required fields!',
         icon: 'warning',
         confirmButtonText: 'OK'
       });
       return; // Stop execution if any required field is empty
     }
   
     // Convert time strings to Date objects for comparison
     const startTime = new Date("2000-01-01T" + shift_start);
     const endTime = new Date("2000-01-01T" + shift_end);
   
     // Validate shift start time < shift end time
     if (startTime >= endTime) {
       Swal.fire({
         title: 'Error!',
         text: 'Shift start time should be less than shift end time!',
         icon: 'warning',
         confirmButtonText: 'OK'
       });
       return; // Stop execution if start time >= end time
     }
   
     // Prepare nurse data object
     const obj = {
       first_name: first_name.value,
       last_name: last_name.value,
       shift_start: shift_start,
       shift_end: shift_end,
       room_no: room_no.value
     };
   
     // Convert nurse data object to JSON string
     const jsonString = JSON.stringify(obj);
   
     // Send POST request to server
     fetch("http://localhost:3000/nurse-data", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json', // Specify JSON content type
       },
       body: jsonString,
     }).then(response => response.json())
       .then(data => {
         if (data.message === "Room ID does not exist") {
           Swal.fire({
             title: 'Error!',
             text: 'Room No. does not exist!',
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
           document.getElementById("nurseForm").reset();
           showNurseTable();
         }
       }).catch(error => {
         console.error('Error submitting form:', error);
       });
     // Reset form after submission
   }


   function allnurse(){
     fetch("http://localhost:3000/allnurse", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               console.log(data);
               const table = document.getElementById("nurseTable");
               table.innerHTML = "";
               table.innerHTML = "<tr><th>Nurse_Id</th><th>First Name</th><th>Last Name</th><th>Shift Start</th><th>Shift End</th><th>Room No.</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].nurse_id}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].shift_start}</td>
                    <td>${data[i].shift_end}</td>
                    <td>${data[i].room_no}</td>
                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error fetching data:', error);
          });
   }

  async function filterNurse(){
          showNurseTable();
          const roomNo = document.getElementById("roomNo")
          const firstName = document.getElementById("firstName");

          fetch('http://localhost:3000/filter-nurses?room_no=' + roomNo.value + '&first_name=' + firstName.value, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
               },
          }).then(response => response.json())
               .then(data => {
                    console.log(data);
                    const table = document.getElementById("nurseTable");
                    table.innerHTML = "";
                    table.innerHTML = "<tr><th>Nurse_Id</th><th>First Name</th><th>Last Name</th><th>Shift Start</th><th>Shift End</th><th>Room No.</th></tr>";
                    for (var i = 0; i < data.length; i++) {
                         var row = `<tr>
                         <td>${data[i].nurse_id}</td>
                         <td>${data[i].first_name}</td>
                         <td>${data[i].last_name}</td>
                         <td>${data[i].shift_start}</td>
                         <td>${data[i].shift_end}</td>
                         <td>${data[i].room_no}</td>
                         </tr>`;
                         table.innerHTML += row;
                    }
               }).catch(error => {
                    console.error('Error fetching data:', error);
               });
          }

function showNurseForm(){
     document.getElementById("nurseForm").style.display = "block";
     document.getElementById("nurseTable").style.display = "none";
}

async function showNurseTable(){
     document.getElementById("nurseForm").style.display = "none";
     document.getElementById("nurseTable").style.display = "block";
     allnurse();
}

function resetFilter(){
     allnurse();
}
   