import { Text, View, StyleSheet, TouchableOpacity, Linking, ScrollView, Image, ToastAndroid } from "react-native";
import { ButtonTemplate, AlternateLogin, FormTemplate } from "@/components";
import { router, Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import CApi from "@/lib/CApi";
import React from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const routeToLogin = () => {
        router.push('/')
    }

    const github = () => {
        Linking.openURL('/');
    }
    const gitlab = () => {
        Linking.openURL('/');
    }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const [toggle, SetToggle] = React.useState(false);
    const toggleActive = () => {
        SetToggle(!toggle);
    }

    const setVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
            return;
        }

        try {
            const request = {
                email: email,
                password: password,
            };

            const { data } = await CApi.post('/login', request, {
                headers: { 'Content-Type': 'text/plain' }
            });

            console.log('Login berhasil:', data);
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userEmail', data.data.email);
            await AsyncStorage.setItem('userName', data.data.name);

            router.push('/dashboard');
        } catch (err) {
            console.log('Login gagal:', err);
            const msg = err?.response?.data?.message || 'Terjadi kesalahan';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };

    return (
        <ScrollView style={style.scroll}>
            <View style={style.section}>
                <View style={style.container}>
                    {/* Tambahkan gambar di sini */}
                    {/* <Image 
                        source={require('./assets/images/logo.png')}  
                        style={style.logoImage} 
                        resizeMode="contain" 
                    /> */}

                    {/* Pindahkan "Docu" dan "Sign In" ke sebelah kiri */}
                    <View style={style.textContainer}>
                        <Text style={[style.first, style.logoFont]}>Hi, Welcome Back!</Text>
                        <Text style={style.signText}>Hello again, you've been missed</Text>
                    </View>
                </View>
                <View>
                    <FormTemplate
                        label='Email'
                        placeholder='Enter Your Email'
                        change={setEmail}
                        value={email}
                    />
                    <View>
                        <FormTemplate
                            label='Password'
                            placeholder='Enter Your Password'
                            change={setPassword}
                            value={password}
                            max={8}
                            secure={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={setVisibility} style={style.eyeIcon}>
                            <Feather
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="#989CA8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Container untuk Remember Me dan Forgot Password */}
                <View style={style.rememberForgotContainer}>
                    {/* Checkbox Remember Me */}
                    <View style={style.rememberMeContainer}>
                        <TouchableOpacity onPress={toggleActive}>
                            <Fontisto name={toggle ? 'checkbox-active' : 'checkbox-passive'} size={18} color="black" />
                        </TouchableOpacity>
                        <Text style={style.rememberMeText}>Remember Me</Text>
                    </View>

                    {/* Forgot Password Text */}
                    <Text style={style.forgot}>Forgot Password ?</Text>
                </View>

                <ButtonTemplate
                    title="Login"
                    onPress={handleLogin}
                    style={style.button} />

                <View style={style.lineContainer}>
                    <View style={style.hairline} />
                    <Text style={style.orText}>Or With</Text>
                    <View style={style.hairline} />
                </View>

                {/* Layout sejajar kanan kiri untuk Github dan Gitlab dengan space */}
                <View style={style.loginOptionsContainer}>
                    <AlternateLogin title="Continue with Github"
                        onPress={github}
                        logo='github'
                        style={style.loginButton}  // Gaya tombol
                    />
                    <AlternateLogin title="Continue with Gitlab"
                        onPress={gitlab}
                        logo='gitlab'
                        color='orange'
                        style={style.loginButton}  // Gaya tombol
                    />
                </View>

                {/* Container untuk teks "Don't have an account?" dan "Sign Up" */}
                <View style={style.signupContainer}>
                    <Text style={style.signupText}>Don't have an account? </Text>
                    <Link href='/register' style={style.createAcc}>Sign Up</Link>
                </View>
            </View>
        </ScrollView >
    );
}

const style = StyleSheet.create({
    scroll: {
        backgroundColor: "#FFFFFF",
    },
    section: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        padding: 20,
        marginTop: 50
    },

    container: {
        alignItems: "center",
    },

    textContainer: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    logoFont: {
        fontSize: 32,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    first: {
        color: '#1B243C',
    },

    signText: {
        fontSize: 16,
        color: '#1E2842',
        fontWeight: '500',
        marginTop: 8,
    },

    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 42,
    },

    rememberForgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },

    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rememberMeText: {
        marginLeft: 10,
        fontSize: 14,
    },

    forgotPassword: {
        color: '#5E62DB',
        fontSize: 14,
    },


    forgot: {
        color: '#5E62DB',
    },

    button: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },

    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hairline: {
        borderColor: '#B9BCC4',
        width: 153,
        borderTopWidth: 1,
    },

    orText: {
        fontSize: 14,
        color: '#4B5368',
    },

    createAcc: {
        color: '#5E62DB',
        fontSize: 14,
        textAlign: 'center',  // Teks "Sign Up" berada di tengah
    },

    logoImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },

    loginOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },

    loginButton: {
        width: '45%',  // Batasi lebar tombol jadi 45% dari lebar container
        marginHorizontal: 10,  // Tambahkan margin horizontal agar ada space antara tombol
    },

    signupContainer: {
        flexDirection: 'row',  // Letakkan teks di sebelah "Sign Up"
        justifyContent: 'center',  // Posisikan di tengah secara horizontal
        marginTop: 20,
    },

    signupText: {
        fontSize: 14,
        color: '#1E2842',
    }
});
