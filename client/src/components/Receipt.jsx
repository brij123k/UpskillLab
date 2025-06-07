import { Page, Document, StyleSheet, View, Text, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 10,
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  col25: { width: '25%' },
  col15: { width: '15%' },
  col20: { width: '20%' },
  col30: { width: '30%' },
  col40: { width: '40%' },
  textRight: { textAlign: 'right' },
  textCenter: { textAlign: 'center' },
  bold: { fontWeight: 'bold' },
  sectionTitle: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 10,
  },
});

// Receipt Component
const PDFReceipt = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Upskillab®</Text>
      </View>
      
      <View style={styles.contactInfo}>
        <Text>Address : H-187, Lohia Rd, H Block, Sector 63, Noida, Uttar Pradesh 201301</Text>
        <Text>Contact No. - 9958958123  Email: ops@upskillab.com</Text>
        <Text>Website : upskillab.com</Text>
      </View>

      {/* Receipt Table */}
      <View style={styles.table}>
        {/* First Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Receipt</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>{order.receiptNumber}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Batch</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>{order.batchNumber}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Date</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>{order.date}</Text></View>
        </View>
        
        {/* Student Name Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Student Name:</Text></View>
          <View style={[styles.tableCol, styles.col45]} colSpan={3}><Text>{order.studentName}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Course Fee</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.courseFee}</Text></View>
        </View>
        
        {/* Contact Number Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Contact Number:</Text></View>
          <View style={[styles.tableCol, styles.col45]} colSpan={3}><Text>{order.contactNumber}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Total Paid</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.totalPaid}</Text></View>
        </View>
        
        {/* Email Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Email:</Text></View>
          <View style={[styles.tableCol, styles.col45]} colSpan={3}><Text>{order.email}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Fee Due</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.feeDue}</Text></View>
        </View>
        
        {/* Course Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Course:</Text></View>
          <View style={[styles.tableCol, styles.col45]} colSpan={3}><Text>{order.courseName}</Text></View>
          <View style={[styles.tableCol, styles.col15]}></View>
          <View style={[styles.tableCol, styles.col15]}></View>
        </View>
      </View>

      {/* Payment Details Section */}
      <Text style={styles.sectionTitle}>Payment Details</Text>
      
      <View style={styles.table}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text style={styles.textCenter}>Date</Text></View>
          <View style={[styles.tableCol, styles.col40]}><Text style={styles.textCenter}>Transaction ID</Text></View>
          <View style={[styles.tableCol, styles.col20]}><Text style={styles.textCenter}>Mode of Payment</Text></View>
          <View style={[styles.tableCol, styles.col20]}><Text style={styles.textCenter}>Amount</Text></View>
        </View>
        
        {/* Payment Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text style={styles.textCenter}>{order.paymentDate}</Text></View>
          <View style={[styles.tableCol, styles.col40]}><Text style={styles.textCenter}>{order.transactionId}</Text></View>
          <View style={[styles.tableCol, styles.col20]}><Text style={styles.textCenter}>UPI</Text></View>
          <View style={[styles.tableCol, styles.col20, styles.textRight]}><Text>{order.amountPaid}</Text></View>
        </View>
        
        {/* Total Paid Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}></View>
          <View style={[styles.tableCol, styles.col40]}></View>
          <View style={[styles.tableCol, styles.col20]}><Text style={[styles.textCenter, styles.bold]}>Total Paid</Text></View>
          <View style={[styles.tableCol, styles.col20, styles.textRight]}><Text>{order.totalPaid}</Text></View>
        </View>
      </View>

      {/* Amount in Words */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.bold}>Paid Amount in Words</Text>
        <Text>{order.amountInWords}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        This is a system-generated receipt and does not require a signature.
      </Text>
    </Page>
  </Document>
);

// Function to generate and download PDF
const generateReceiptPDF = async (orderData) => {
  // Transform your API data to match the expected format
    const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const amountInWords = (amount) => {
    const words = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
      'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (amount === 0) return 'Zero Rupees Only';
    if (amount < 20) return `${words[amount]} Rupees Only`;
    
    if (amount < 100) {
      return `${tens[Math.floor(amount / 10)]} ${words[amount % 10]} Rupees Only`.trim();
    }
    
    if (amount < 1000) {
      return `${words[Math.floor(amount / 100)]} Hundred ${amountInWords(amount % 100)}`;
    }
    
    if (amount < 100000) {
      return `${words[Math.floor(amount / 1000)]} Thousand ${amountInWords(amount % 1000)}`;
    }
    
    return `${amount} Rupees Only`;
  };


  const formattedData = {
    receiptNumber: orderData._id.slice(-3), // Last 3 characters of order ID
    batchNumber: orderData.order.batch.batchCode,
    date: new Date(orderData.createdAt).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    studentName: orderData.order.user.student.fullName,
    contactNumber: orderData.order.user.mobileNumber,
    email: orderData.order.user.email,
    courseName: orderData.order.batch.course.courseName,
    courseFee: orderData.order.totalAmount.toLocaleString('en-IN'),
    totalPaid: orderData.order.amountPaid.toLocaleString('en-IN'),
    feeDue: (orderData.order.totalAmount - orderData.order.amountPaid).toLocaleString('en-IN'),
    paymentDate: new Date(orderData.createdAt).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    transactionId: orderData.transactionId,
    amountPaid: orderData.order.amountPaid.toLocaleString('en-IN'),
    amountInWords: amountInWords(orderData.order.amountPaid) // You'll need to implement this function
  };

  // Generate the PDF blob
  const blob = await pdf(<PDFReceipt order={formattedData} />).toBlob();
  
  // Download the PDF
  saveAs(blob, `receipt-${formattedData.receiptNumber}.pdf`);
};

export default generateReceiptPDF;