import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';

const styles = StyleSheet.create({
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#DADBE0',
    },
});

const InvoiceItemsTable = ({ invoice }) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice?.items} />
        <InvoiceTableFooter items={invoice?.items} />
    </View>
);

export default InvoiceItemsTable;