import { Document, Image, Page, PDFViewer, StyleSheet, View } from '@react-pdf/renderer';
import React from 'react'
import BillTo from './BillTo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceNo from './InvoiceNo';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import InvoiceTitle from './InvoiceTitle';


const styles = StyleSheet.create({
    page: {
        display: 'flex',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 14,
        // paddingTop: 30,
        // paddingLeft: 30,
        // paddingRight: 30,
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
