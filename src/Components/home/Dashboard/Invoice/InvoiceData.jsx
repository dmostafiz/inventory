import { Document, Image, Page, PDFViewer, StyleSheet, View } from '@react-pdf/renderer';
import React from 'react'
import BillTo from './BillTo';
import InvoiceBusiness from './InvoiceBusiness';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceNo from './InvoiceNo';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import InvoiceTitle from './InvoiceTitle';


const styles = StyleSheet.create({
    page: {
        display: 'flex',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 12,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});




export default function InvoiceData({invoice}) {

    return (
        <Document>
            <Page size="A4" style={styles.page} >
                {/* <Image style={styles.logo} src={'https://www.mostafiz.dev/mostafiz.png'} /> */}
                <InvoiceBusiness business={invoice?.business} />
                <InvoiceTitle title={'Invoice'} />
                <View style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                }}>
                    <BillTo invoice={invoice} />
                    <InvoiceNo invoice={invoice} />
                </View>
                <InvoiceItemsTable invoice={invoice} />
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    )
}
