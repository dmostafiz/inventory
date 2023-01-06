import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    reportTitle: {
        // display: 'flex',
        color: '#DADBE0',
        letterSpacing: 2,
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

const InvoiceTitle = ({ title }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
);

export default InvoiceTitle;