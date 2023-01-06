import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#DADBE0'
const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#DADBE0',
        borderBottomWidth: 0,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 0,
        paddingRight: 8,
        fontWeight: 'bold'

    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
        fontWeight: 'bold'
    },
});

const InvoiceTableFooter = ({ items }) => {
    const total = items?.map(item => item.qty * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <>
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL</Text>
                <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>DISCOUNT (-)</Text>
                <Text style={styles.total}>{0.00}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>SUBTOTAL</Text>
                <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
            </View>
        </>
    )
};

export default InvoiceTableFooter;