import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    invoiceDateContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        // width: 80
        marginRight: 8
    }
});

const InvoiceNo = ({ invoice }) => (
    <View style={{display: 'flex', flexDirection: 'column',}}>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice:</Text>
            <Text style={styles.invoiceDate}>{invoice?.invoice_no}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{invoice?.trans_date}</Text>
        </View >
    </View>
);

export default InvoiceNo;