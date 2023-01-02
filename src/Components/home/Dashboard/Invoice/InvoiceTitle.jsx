import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 24,
    },
    reportTitle: {
        display: 'flex',
        color: '#1CE7CF',
        letterSpacing: 4,
        fontSize: 25,
        // textAlign: 'center',
        textTransform: 'uppercase',
    }
});

const InvoiceTitle = ({ title }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
);

export default InvoiceTitle;