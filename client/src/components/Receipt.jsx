import { Page, Document, StyleSheet, View, Text, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Professional color palette (purple primary + orange accent)
const colors = {
  primary: '#4D2C5E',
  primaryLight: '#F4F0F7',
  primaryDark: '#3A1F49',
  accent: '#F58220',       // orange accent
  accentLight: '#FFF4E8',
  border: '#D9D2E0',
  text: '#2A2A2A',
  textMuted: '#6B6B6B',
  white: '#FFFFFF',
  success: '#2E7D5B',
  rowAlt: '#FAFAFB',
};

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.white,
  },

  mainContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  // Orange accent strip at the very top
  topAccent: {
    height: 4,
    backgroundColor: colors.accent,
  },

  // ===== HEADER (logo left, title right) =====
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoBox: {
    width: 120,
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoImage: {
    width: 100,
    height: 40,
    objectFit: 'contain',
  },
  headerRight: {
    flex: 1,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: colors.white,
    fontSize: 8.5,
    opacity: 0.85,
    marginBottom: 6,
  },
  headerContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerContact: {
    color: colors.white,
    fontSize: 8,
    opacity: 0.9,
    marginRight: 10,
  },
  // Small orange badge in header
  headerBadge: {
    backgroundColor: colors.accent,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  headerBadgeText: {
    color: colors.white,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  // ===== META BAR =====
  metaBar: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 7.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  metaValue: {
    fontSize: 10.5,
    color: colors.primary,
    fontFamily: 'Helvetica-Bold',
  },
  metaDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  // Orange highlighted meta item
  metaItemHighlight: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    paddingVertical: 4,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  metaValueAccent: {
    fontSize: 10.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },

  // ===== SECTION =====
  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  // Orange marker before section title
  sectionMarker: {
    width: 4,
    height: 14,
    backgroundColor: colors.accent,
    marginRight: 8,
    borderRadius: 1,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },

  // ===== TWO COLUMN DETAILS =====
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailsLeft: {
    flex: 1.2,
    paddingRight: 18,
  },
  detailsRight: {
    flex: 1,
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  detailLabel: {
    width: 82,
    fontSize: 9,
    color: colors.textMuted,
    fontFamily: 'Helvetica-Bold',
  },
  detailValue: {
    flex: 1,
    fontSize: 9.5,
    color: colors.text,
  },
  detailValueAccent: {
    flex: 1,
    fontSize: 9.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },

  // ===== SUMMARY CARDS =====
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.rowAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  // Orange border on discount card
  summaryCardAccent: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
  },
  summaryCardHighlight: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  summaryLabel: {
    fontSize: 7.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  summaryValue: {
    fontSize: 12.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.text,
  },
  summaryValueAccent: {
    fontSize: 12.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.accent,
  },
  summaryValuePrimary: {
    fontSize: 12.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },

  // ===== PAYMENT TABLE =====
  table: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeaderCell: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowAlt: {
    backgroundColor: colors.rowAlt,
  },
  tableCell: {
    fontSize: 9.5,
    color: colors.text,
  },
  tableCellAccent: {
    fontSize: 9.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
  },

  colDate: { width: '22%' },
  colTxn: { width: '33%' },
  colMode: { width: '22%' },
  colAmount: { width: '23%', textAlign: 'right' },

  // ===== TOTAL ROW =====
  totalRow: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderTopWidth: 1.5,
    borderTopColor: colors.accent,
  },
  totalLabel: {
    flex: 1,
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textAlign: 'right',
    paddingRight: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  totalValue: {
    width: '23%',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textAlign: 'right',
  },

  // ===== AMOUNT IN WORDS =====
  wordsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: colors.accentLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: 2,
  },
  wordsLabel: {
    fontSize: 7.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  wordsValue: {
    fontSize: 9.5,
    color: colors.text,
    fontStyle: 'italic',
  },

  // ===== FOOTER =====
  footer: {
    marginTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryLight,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 3,
  },
  footerBrand: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    letterSpacing: 1.5,
    marginTop: 6,
  },
  // Small orange rule above the brand
  footerRule: {
    width: 30,
    height: 2,
    backgroundColor: colors.accent,
    marginTop: 6,
    marginBottom: 4,
    borderRadius: 1,
  },
});

// Receipt Component
const PDFReceipt = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainContainer}>

        {/* ===== TOP ORANGE ACCENT STRIP ===== */}
        <View style={styles.topAccent} />

        {/* ===== HEADER (Logo left, title right) ===== */}
        <View style={styles.header}>
          {/* Logo box on the left */}
          <View style={styles.logoBox}>
            <Image src="/images/Logo.png" style={styles.logoImage} />
          </View>

          {/* Title + contact on the right */}
          <View style={styles.headerRight}>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>Payment Receipt</Text>
            </View>
            <Text style={styles.headerTitle}>UPSKILLAB</Text>
            <Text style={styles.headerSubtitle}>
              Empowering Skills, Enabling Careers
            </Text>
            <View style={styles.headerContactRow}>
              <Text style={styles.headerContact}>
                H-187, Lohia Rd, Sector 63, Noida, UP 201301
              </Text>
            </View>
            <View style={styles.headerContactRow}>
              <Text style={styles.headerContact}>+91 9319427070</Text>
              <Text style={styles.headerContact}>info@upskillab.com</Text>
              <Text style={styles.headerContact}>upskillab.com</Text>
            </View>
          </View>
        </View>

        {/* ===== META BAR ===== */}
        <View style={styles.metaBar}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Receipt No.</Text>
            <Text style={styles.metaValue}>{order.receiptNumber}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{order.date}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItemHighlight}>
            <Text style={styles.metaLabel}>Batch</Text>
            <Text style={styles.metaValueAccent}>{order.batchNumber}</Text>
          </View>
        </View>

        {/* ===== STUDENT & COURSE DETAILS ===== */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionMarker} />
            <Text style={styles.sectionTitle}>Student Details</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsLeft}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{order.studentName}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{order.email}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Contact</Text>
                <Text style={styles.detailValue}>{order.contactNumber}</Text>
              </View>
            </View>

            <View style={styles.detailsRight}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Course</Text>
                <Text style={styles.detailValue}>{order.courseName}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Payment Mode</Text>
                <Text style={styles.detailValue}>{order.mode}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValueAccent}>{order.status || 'COMPLETED'}</Text>
              </View>
            </View>
          </View>

          {/* ===== SUMMARY CARDS ===== */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Course Fee</Text>
              <Text style={styles.summaryValue}>₹ {order.courseFee}</Text>
            </View>
            <View style={[styles.summaryCard, styles.summaryCardAccent]}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValueAccent}>− ₹ {order.discount}</Text>
            </View>
            <View style={[styles.summaryCard, styles.summaryCardHighlight]}>
              <Text style={styles.summaryLabel}>Total Paid</Text>
              <Text style={styles.summaryValuePrimary}>₹ {order.totalPaid}</Text>
            </View>
          </View>
        </View>

        {/* ===== PAYMENT TABLE ===== */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionMarker} />
            <Text style={styles.sectionTitle}>Payment Details</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colDate]}>Date</Text>
              <Text style={[styles.tableHeaderCell, styles.colTxn]}>Transaction ID</Text>
              <Text style={[styles.tableHeaderCell, styles.colMode]}>Mode</Text>
              <Text style={[styles.tableHeaderCell, styles.colAmount]}>Amount</Text>
            </View>

            <View style={[styles.tableRow, styles.tableRowAlt]}>
              <Text style={[styles.tableCell, styles.colDate]}>{order.paymentDate}</Text>
              <Text style={[styles.tableCell, styles.colTxn]}>{order.transactionId}</Text>
              <Text style={[styles.tableCell, styles.colMode]}>{order.mode}</Text>
              <Text style={[styles.tableCellAccent, styles.colAmount]}>₹ {order.amountPaid}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalValue}>₹ {order.totalPaid}</Text>
            </View>
          </View>
        </View>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This is a system-generated receipt and does not require a signature.
          </Text>
          <Text style={styles.footerText}>
            For any queries, please contact info@upskillab.com
          </Text>
          <View style={styles.footerRule} />
          <Text style={styles.footerBrand}>UPSKILLAB</Text>
        </View>

      </View>
    </Page>
  </Document>
);

// Function to generate and download PDF
const generateReceiptPDF = async (orderData) => {
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
      const remainder = amount % 100;
      return `${words[Math.floor(amount / 100)]} Hundred${remainder ? ' ' + amountInWords(remainder).replace(' Rupees Only', '') : ''} Rupees Only`;
    }

    if (amount < 100000) {
      const remainder = amount % 1000;
      return `${words[Math.floor(amount / 1000)]} Thousand${remainder ? ' ' + amountInWords(remainder).replace(' Rupees Only', '') : ''} Rupees Only`;
    }

    if (amount < 10000000) {
      const remainder = amount % 100000;
      return `${words[Math.floor(amount / 100000)]} Lakh${remainder ? ' ' + amountInWords(remainder).replace(' Rupees Only', '') : ''} Rupees Only`;
    }

    return `${amount} Rupees Only`;
  };

  const formattedData = {
    receiptNumber: orderData.serialNumber || 'N/A',
    batchNumber: orderData.batchId?.batchCode || 'N/A',
    date: orderData.createdAt ? formatDate(orderData.createdAt) : formatDate(new Date()),
    studentName: orderData.user?.fullName || 'N/A',
    contactNumber: orderData?.user?.mobileNumber || 'N/A',
    email: orderData.user?.email || 'N/A',
    courseName: orderData?.courseTitle || 'N/A',
    courseFee: orderData?.totalAmount?.toLocaleString('en-IN') || '0',
    totalPaid: orderData?.amountPaid?.toLocaleString('en-IN') || '0',
    discount: (orderData?.discount ?? 0).toLocaleString('en-IN'),
    paymentDate: orderData.paymentDate ? formatDate(orderData.paymentDate) : formatDate(new Date()),
    mode: orderData.mode || 'Cash',
    status: orderData.status || 'COMPLETED',
    transactionId: orderData.orderId || orderData.serialNumber || 'N/A',
    amountPaid: orderData?.amountPaid?.toLocaleString('en-IN') || '0',
    amountInWords: amountInWords(orderData?.amountPaid || 0)
  };

  const blob = await pdf(<PDFReceipt order={formattedData} />).toBlob();
  saveAs(blob, `receipt-${formattedData.receiptNumber}.pdf`);
};

export default generateReceiptPDF;