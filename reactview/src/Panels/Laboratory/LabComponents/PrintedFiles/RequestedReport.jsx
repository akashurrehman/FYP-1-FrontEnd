export const handleRequestReportsPrint = (props) => {
    let printContent = '<html><head><style>';
    printContent += 'table { border-collapse: collapse; width: 100%; }';
    printContent += 'th, td { border: 1px solid black; padding: 8px; text-align: left; }';
    printContent += 'th { background-color: #dddddd; }';
    printContent += 'h1 { padding:8px; text-align: center; }';
    printContent += '  body { -webkit-print-color-adjust: exact; }';
    printContent += '@media print {';
    printContent += '  #header { position: fixed; top: 0; left: 0; right: 0; height: 80px; background-color: #f5f5f5; border-bottom: 1px solid black; }';
    printContent += '  #footer { position: fixed; bottom: 0; left: 0; right: 0; height: 40px; background-color: #f5f5f5; border-top: 1px solid black; }';
    printContent += '  #content { margin-top: 80px; margin-bottom: 30px; }';
    printContent += '  #watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.5; }';
    printContent += '}';
    printContent += '</style></head><body>';
    printContent += '<div id="header"><h1>All Report Requests</h1></div>';
    printContent += '<div id="content">All the Report Details are shown here<table>';
    printContent += '<tr><th>UserName</th><th>Name</th><th>Email</th><th>Address</th><th>Blood Group</th><th>Contact Number</th><th>City</th><th>Status</th></tr>';
    props.forEach((row) => {
      printContent += `<tr><td>${row.UserName.value}</td><td>${row.Name.value}</td><td>${row.Email.value}</td><td>${row.Address.value}</td><td>${row.BloodGroup.value}</td><td>${row.ContactNo.value}</td><td>${row.City.value}</td><td>${row.Status.value}</td></tr>`;
    });
    printContent += '</table></div>';
    printContent += '<div id="footer"><p style="text-align: center; margin-top: 8px;"><p>For any inquiries please contact us at: Email: example@example.com Phone: 123-456-7890</p></div>';
    printContent += '<div id="watermark">Original File</div>';
    printContent += '</body></html>';
  
    // Create a new window with the printable HTML and print it
    const printWindow=window.open('','','width=800,height=900');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };