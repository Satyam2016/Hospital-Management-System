
function submitForm() {
     
    const form = document.getElementById('formsubmit');

    const first_name = document.getElementById('firstname');
    const last_name = document.getElementById('lastname');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const address = document.getElementById('address');
    const admitdate = document.getElementById('admitdate');
    const roomno = document.getElementById('roomno');


    
    console.log(first_name.value);
    if(first_name.value=="" || last_name.value=="" || age.value=="" || gender.value=="" || address.value=="" || admitdate.value=="" || roomno.value==""){
        Swal.fire({
            title: 'Error!',
            text: 'Enter the required fields!',
            icon: 'warning',
            confirmButtonText: 'OK'
       })
    }
    else{
    const obj = {
        firstname: first_name.value,
        lastname: last_name.value,
        age: age.value,
        gender: gender.value,
        address: address.value,
        admitdate: admitdate.value,
        roomno: roomno.value
    };
    console.log(obj);
    const jsonString = JSON.stringify(obj);
    console.log(jsonString);

     fetch("http://localhost:3000/patient-data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify JSON content type
        },
        body: jsonString,
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title: 'Success!',
                text: 'Form submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
           })
           form.reset();
           showtable();        
        }).catch(error => {
            console.error('Error submitting form:', error);
        });
    }
}

function showallpatient() {
    fetch("http://localhost:3000/allpatient", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("patienttable");
               table.innerHTML = "<tr><th>Patient_id</th><th>First_Name</th><th>Last_Name</th><th>Age</th><th>Gender</th><th>Room_No</th><th>Address</th><th>Admission_Date</th><th>Discharge_Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].patient_id}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].age}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].room_no}</td>
                    <td>${data[i].address}</td>
                    <td>${data[i].admission_date}</td>
                    <td>${data[i].discharge_date}</td>

                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
    });
}

function  showform(){
        document.getElementById("form").style.display = "block";
        document.getElementById("table").style.display = "none";
}



async function showtable(){
    document.getElementById("form").style.display = "none";
    document.getElementById("table").style.display = "block";
    showallpatient();
}


async function filterPatient(){
    showtable();
    const patient_id=document.getElementById('patient_id');
    console.log(patient_id.value);
    
    const firstName=document.getElementById('firstName');
    console.log(firstName.value);


    fetch(`http://localhost:3000/filterPatient?patient_id=${patient_id.value}&firstName=${firstName.value}`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("patienttable");
               table.innerHTML = "<tr><th>Patient_id</th><th>First_Name</th><th>Last_Name</th><th>Age</th><th>Gender</th><th>Room_No</th><th>Address</th><th>Admission_Date</th><th>Discharge_Date</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].patient_id}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].age}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].room_no}</td>
                    <td>${data[i].address}</td>
                    <td>${data[i].admission_date}</td>
                    <td>${data[i].discharge_date}</td>
                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
     });
}

function reset(){
    showtable();
}


  





