import { Page, Document, StyleSheet, View, Text, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  mainContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'black',
  },
  lastTableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    padding: 5,
  },
  logoImage: {
    width: 100, // Increased from 50
    height: 100, // Increased from 50
    marginBottom: -4,
  },
  col100: { width: '100%' },
  col25: { width: '25%' },
  col15: { width: '15%' },
  col20: { width: '20%' },
  col30: { width: '30%' },
  col35: { width: '35%' },
  col40: { width: '40%' },
  col45: { width: '45%' },
  textRight: { textAlign: 'right' },
  textCenter: { textAlign: 'center' },
  bold: { fontWeight: 'bold' },
  sectionTitle: {
    marginVertical: 5,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  logoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
  },
  footer: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
    padding: 10,
  },
  verticalLine: {
    borderRightWidth: 0.5,
    borderRightStyle: 'solid',
    borderRightColor: 'black',
    height: '100%',
  },


 
logoImage: {
  width: '40%',
  objectFit: 'contain',
  marginBottom: -4,
   alignSelf: 'center', // Center the image
},

});

// Receipt Component
const PDFReceipt = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Main Container with border that contains the entire receipt */}
      <View style={styles.mainContainer}>
        {/* Header with Logo and Contact Info */}
        
        <View style={[styles.tableRow, { padding: 10 }]}>
           
          <View style={[styles.tableCol, styles.col100]}>
             <Image
                src="/images/Logo.png"
                style={styles.logoImage}
              />
            <View style={styles.logoContainer}>
            
              <Text style={[styles.contactInfo, { textAlign: 'center' }]}>
                Address: H-187, Lohia Rd, H Block, Sector 63, Noida, Uttar Pradesh 201301
              </Text>
              <Text style={[styles.contactInfo, { textAlign: 'center' }]}>
                Contact No. - 9319427070 Email: info@upskillab.com
              </Text>
              <Text style={[styles.contactInfo, { textAlign: 'center' }]}>
                Website: upskillab.com
              </Text>
            </View>
          </View>
        </View>

        {/* Receipt Info Section */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text>Receipt</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>{order.receiptNumber || '712'}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Batch</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>{order.batchNumber || '2'}</Text></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Date {order.date || '25 Apr 2025'}</Text></View>
        </View>

        {/* Student Name Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text>Student Name:</Text></View>
          <View style={[styles.tableCol, styles.col30]}><Text>{order.studentName || 'Harshit Sinha'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Course Fee</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.courseFee || '74,999'}</Text></View>
        </View>

        {/* Contact Number Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text>Contact Number:</Text></View>
          <View style={[styles.tableCol, styles.col30]}><Text>{order.contactNumber || '8881043033'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Total Paid</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.totalPaid || '1'}</Text></View>
        </View>

        {/* Email Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text>Email:</Text></View>
          <View style={[styles.tableCol, styles.col30]}><Text>{order.email || 'sinha.sg111@gmail.com'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col15]}><Text>Fee Due</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.textRight]}><Text>{order.feeDue || '74,998'}</Text></View>
        </View>

        {/* Course Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col20]}><Text>Course:</Text></View>
          <View style={[styles.tableCol, styles.col30]}><Text>{order.courseName || 'Post Graduate Program in Counselling Psychology'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col15]}></View>
          <View style={[styles.tableCol, styles.col15]}></View>
        </View>

        {/* Payment Details Section Header */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col100]}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
          </View>
        </View>

        {/* Payment Details Header Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>Date</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col35]}><Text>Transaction ID</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col20]}><Text>Mode of Payment</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col20, styles.textRight]}><Text>Amount</Text></View>
        </View>

        {/* Payment Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}><Text>{order.paymentDate || '21 Apr 2025'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col35]}><Text>{order.transactionId || '511163572037'}</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col20]}><Text>UPI</Text></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col20, styles.textRight]}><Text>{order.amountPaid || '1'}</Text></View>
        </View>

        {/* Total Paid Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col25]}></View>
          <View style={[styles.tableCol, styles.col35]}></View>
          <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
          <View style={[styles.tableCol, styles.col20, styles.bold]}><Text>Total Paid</Text></View>
          <View style={[styles.tableCol, styles.col20, styles.textRight]}><Text>{order.totalPaid || '1'}</Text></View>
        </View>

        {/* Amount in Words Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.col100, { flexDirection: 'row' }]}>
            <Text style={[styles.bold, { marginRight: 5 }]}>Paid Amount in Words:</Text>
            <View style={[styles.tableCol, styles.col15, styles.verticalLine]}></View>
            <Text>{order.amountInWords || 'One Rupee Only'}</Text>
          </View>
        </View>

        {/* Footer Row */}
        <View style={styles.lastTableRow}>
          <View style={[styles.tableCol, styles.col100]}>
            <Text style={styles.footer}>
              This is a system-generated receipt and does not require a signature.
            </Text>
          </View>
        </View>
      </View>
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
    receiptNumber: orderData._id?.slice(-3) || '712',
    batchNumber: orderData.order?.batch?.batchCode || '2',
    date: orderData.createdAt ? formatDate(orderData.createdAt) : '25 Apr 2025',
    studentName: orderData.order?.user?.student?.fullName || 'Harshit Sinha',
    contactNumber: orderData.order?.user?.mobileNumber || '8881043033',
    email: orderData.order?.user?.email || 'sinha.sg111@gmail.com',
    courseName: orderData.order?.batch?.course?.courseName || 'Post Graduate Program in Counselling Psychology',
    courseFee: orderData.order?.totalAmount?.toLocaleString('en-IN') || '74,999',
    totalPaid: orderData.order?.amountPaid?.toLocaleString('en-IN') || '1',
    feeDue: orderData.order ? (orderData.order.totalAmount - orderData.order.amountPaid).toLocaleString('en-IN') : '74,998',
    paymentDate: orderData.createdAt ? formatDate(orderData.createdAt) : '21 Apr 2025',
    transactionId: orderData.transactionId || '511163572037',
    amountPaid: orderData.order?.amountPaid?.toLocaleString('en-IN') || '1',
    amountInWords: amountInWords(orderData.order?.amountPaid || 1)
  };

  // Generate the PDF blob
  const blob = await pdf(<PDFReceipt order={formattedData} />).toBlob();

  // Download the PDF
  saveAs(blob, `receipt-${formattedData.receiptNumber}.pdf`);
};

export default generateReceiptPDF;
