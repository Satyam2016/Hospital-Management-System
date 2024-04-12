
 function addroom() {
     const form = document.getElementById('newroom');

     const roomtype = document.getElementById('roomtype');
     const bedcount = document.getElementById('bedcount');
     const roomprice = document.getElementById('roomprice');

     if (roomtype.value == "" || bedcount.value == "" || roomprice.value == "") {
          Swal.fire({
               title: 'Error!',
               text: 'Enter the required fields!',
               icon: 'warning',
               confirmButtonText: 'OK'
          })
     }
     else {
          const obj = {
               roomtype: roomtype.value,
               bedcount: bedcount.value,
               roomprice: roomprice.value
          };

          const jsonString = JSON.stringify(obj);

          fetch("http://localhost:3000/room-data", {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
               },
               body: jsonString,
          }).then(response => response.json())
               .then(data => {
                    console.log('Success:', data);

               }).catch(error => {
                    console.error('Error submitting form:', error);
               });

          Swal.fire({
               title: 'Success!',
               text: 'Form submitted successfully!',
               icon: 'success',
               confirmButtonText: 'OK'
          })

          form.reset();
          allroom();
     }
}

function showallroom() {

     fetch("http://localhost:3000/allroom", {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("roomtable");
               table.innerHTML = "<tr><th>Room No.</th><th>Room Type</th><th>Bed Count</th><th>Price</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                    <td>${data[i].room_no}</td>
                    <td>${data[i].room_type}</td>
                    <td>${data[i].bed_count}</td>
                    <td>${data[i].price}</td>
                    </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
          });
}
// showallroom();
async function allroom(){
     document.getElementById('form').style.display = "none";
     document.getElementById('table').style.display = "block";
     showallroom();
}

async function filterRooms() {
     allroom();
     const roomtype = document.getElementById('roomType');
     const price = document.getElementById('roomPrice');
     console.log(roomtype.value);
     console.log(price.value);
     fetch(`http://localhost:3000/filterroom?roomtype=${roomtype.value}&price=${price.value}`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json', // Specify JSON content type
          },
     }).then(response => response.json())
          .then(data => {
               //console.log('Success:', data);
               var table = document.getElementById("roomtable");
               table.innerHTML = "<tr><th>Room No.</th><th>Room Type</th><th>Bed Count</th><th>Price</th></tr>";
               for (var i = 0; i < data.length; i++) {
                    var row = `<tr>
                         <td>${data[i].room_no}</td>
                         <td>${data[i].room_type}</td>
                         <td>${data[i].bed_count}</td>
                         <td>${data[i].price}</td>
                         </tr>`;
                    table.innerHTML += row;
               }
          }).catch(error => {
               console.error('Error:', error);
     });
}

function resetFilter(){
     showallroom();
}

function newroom(){
     document.getElementById('form').style.display = "block";
     document.getElementById('table').style.display = "none";
}







