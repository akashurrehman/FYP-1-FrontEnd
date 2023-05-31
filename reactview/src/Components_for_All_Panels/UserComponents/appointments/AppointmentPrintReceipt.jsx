export const AppointmentReceipt = (centre,user,bookingDate,bookingTime) => {
  let printContent = '<html><head><style>';
  printContent += 'h2, h4 { padding: 8px; text-align: center;color:red }';
  printContent += 'h5 { float: right; padding: 0 }';
  printContent += 'body { -webkit-print-color-adjust: exact; }';
  printContent += '@media print {';
  printContent += '  #content { margin-top: 20px; margin-bottom: 12px }';
  printContent += '  #body { margin-top: 8px; text-align: left }';
  printContent += '}';
  printContent += '</style></head><body>';

  printContent += '<div id="content">';
  printContent += `<div id="h2"><h2>${centre?.Name?.value}</h2></div>`;
  printContent += `<div id="h4"><h4>(${centre?.Location?.value})</h4></div>`;
  printContent += '<div id="h5"><h5>Appointment# 1234567890</h5></div>';
  printContent += '<div id="h5"><h5>Date: 02/12/2022</h5></div>';
  printContent += `<div id="h3"><h3>Booked By:${user?.Name?.value}</h3></div>`;
  printContent += '<div id="h6"><h6><strong>' + user?.Email?.value + '</strong></h6></div>';
  printContent += '<div id="h6"><h6><strong>' + user?.ContactNo?.value + '</strong></h6></div>';
  printContent += '<div id="h6"><h6><strong>' + user?.Address?.value + '</strong></h6></div>';

  printContent += '<div id="content"><h1>Appointment Details</h1></div>';

  // Display appointment details with entry on one side and result on the other side
  printContent += '<div style="display: flex; justify-content: space-between">';
  printContent += '<div style="width: 50%; text-align: left;">Donor Gender:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${user?.Gender?.value}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Donated Blood Group:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${user?.BloodGroup?.value}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Booking Date:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${bookingDate}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Booking Time:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${bookingTime}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Centre Contact No:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${centre?.ContactNo?.value}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Centre Email:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${centre?.Email?.value}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Centre Opening Days:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${centre?.Opening_Days?.value}</div>`;
  printContent += '</div>';
  printContent += '<div style="display: flex; justify-content: space-between;">';
  printContent += '<div style="width: 50%; text-align: left;">Centre Timings:</div>';
  printContent += `<div style="width: 50%; text-align: left;">${centre?.Timings?.value}</div>`;
  printContent += '</div>';

  printContent += '</div>';
  printContent += '</body></html>';

  // Create a new window with the printable HTML and print it
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};
