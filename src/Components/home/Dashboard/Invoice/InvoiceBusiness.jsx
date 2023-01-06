import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 0,
        textAlign: 'center',
    },
    businessName: {
        // display: 'flex',
        color: '#20272F',
        // letterSpacing: 4,
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        // textTransform: 'uppercase',
    },

    businessAddress: {
        // display: 'flex',
        color: '#20272F',
        // letterSpacing: 4,
        fontSize: 10,
        textAlign: 'center',
        // textTransform: 'uppercase',
    }
});

const InvoiceBusiness = ({ business }) => (
    <>
        <View style={styles.titleContainer}>
            <Text style={styles.businessName}>{business?.name}</Text>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.businessAddress}>{business?.location}, {business?.city}</Text>
        </View>
    </>
);

export default InvoiceBusiness;