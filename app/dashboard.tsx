import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
    const [userData, setUserData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedEmail = await AsyncStorage.getItem('userEmail');

                if (!token || !storedEmail) {
                    ToastAndroid.show('User data not found', ToastAndroid.SHORT);
                    return;
                }
                const name = await AsyncStorage.getItem('userName');
                setUserData({
                    name: name || '',
                    email: storedEmail
                });

            } catch (err) {
                console.log('Error fetching user data:', err);
                ToastAndroid.show('Failed to fetch user data', ToastAndroid.SHORT);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {userData.name}!</Text>
            <Text style={styles.subtitle}>Email: {userData.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1B243C',
    },
    subtitle: {
        fontSize: 16,
        color: '#4B5368',
        marginTop: 8,
    },
});
