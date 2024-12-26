import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Linking, ToastAndroid } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ButtonTemplate, FormTemplate, AlternateLogin } from "@/components";
import { router } from 'expo-router';
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData, resetData } from '../store/reducer/loginReducer';
import React from "react";
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Register() {

    const registerForm = useSelector((state : any) => state.login.loginInput);
    const dispatch = useDispatch();

    const onChangeValue = (payload: any) => {
        dispatch(setData({ ...registerForm, ...payload }));
    };

    const onSaveData = async () => {
        try {
            if (!registerForm.email || !registerForm.name || !registerForm.password) {
                //ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                return;
            }

            const { data } = await CApi.post('/register', registerForm, {
                headers: { 'Content-Type': 'text/plain' }
            });

            //ToastAndroid.show("Register Success", ToastAndroid.SHORT);
            console.log('success',data)
            dispatch(resetData());
            router.push('/login')
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
            //ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false); // Control visibility of password

    // Kondisi validasi password
    const isPasswordValid = password.length >= 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // // Arahkan kembali ke halaman sebelumnya (misalnya halaman login) setelah pengguna mendaftar
    // const handleSignUp = () => {
    //     // Logika pendaftaran (contohnya, validasi email, password, dll.)
    //     // Setelah proses selesai, arahkan kembali ke halaman sebelumnya:
    //     router.back(); // Back to previous page after signing up
    // };
    const [toggle, SetToggle] = React.useState(false);
    const toggleActive = () => {
        SetToggle(!toggle);
    }

    const github = () => {
        Linking.openURL('/');
    }
    const gitlab = () => {
        Linking.openURL('/');
    }


    return (
        <ScrollView style={style.scroll}>
            <View style={style.section}>

                <View style={style.container}>
                    {/* Ganti icon dengan gambar kustom */}
                    {/* <View style={style.shape}>
                        <Image
                            source={require('./assets/images/logo.png')}  // Ganti dengan jalur gambar kustom Anda
                            style={style.image}
                            resizeMode="contain"
                        />
                    </View> */}

                    {/* Memindahkan teks ke sebelah kiri */}
                    <View style={style.textContainer}>
                        <Text style={[style.title, style.fontFamily]}>Create An Account</Text>
                        <Text style={[style.subtitle, style.fontFamily, { marginBottom: 20 }]}>Connect with your friends today!.</Text>
                    </View>
                </View>

                {/* Name Number Input */}
                <FormTemplate
                    style={style.phone}
                    label='Your Name'
                    placeholder='Enter Your Name'
                    change={(val: any) => onChangeValue({ name: val })}
                    value={registerForm.name}
                />

                {/* Email Address Input */}
                <FormTemplate
                    style={{ borderRadius: 10, }}
                    label='Email Address'
                    placeholder='Enter Your Email Address'
                    change={(val: any) => onChangeValue({ email: val })}
                    value={registerForm.email}
                />

                {/* Label for Password */}
                <Text style={style.label}>Password</Text>

                {/* Password Input with Eye Icon */}
                <View style={style.passwordContainer}>
                    <TextInput
                        style={style.input}
                        placeholder='Enter Your Password'
                        secureTextEntry={!isPasswordVisible} // Toggling password visibility
                        onChangeText={(val: any) => onChangeValue({ password: val })}
                        value={registerForm.password}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <AntDesign
                            name={isPasswordVisible ? "eye" : "eyeo"}
                            size={20}
                            color="grey"
                            style={style.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={style.label}> Confirm Password</Text>

{/* Password Input with Eye Icon */}
<View style={style.passwordContainer}>
    <TextInput
        style={style.input}
        placeholder='Confirm Your Password'
        secureTextEntry={!isPasswordVisible} // Toggling password visibility
        onChangeText={(val: any) => onChangeValue({ confirm_password: val })}
        value={registerForm.confirm_password}
    />
    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <AntDesign
            name={isPasswordVisible ? "eye" : "eyeo"}
            size={20}
            color="grey"
            style={style.eyeIcon}
        />
    </TouchableOpacity>
</View>

                {/* Remember Me dan Forgot Password */}
                <View style={style.options}>
                    <View style={style.rememberMeContainer}>
                        <TouchableOpacity onPress={toggleActive}>
                            <Fontisto name={toggle ? 'checkbox-active' : 'checkbox-passive'} size={18} color="black" />
                        </TouchableOpacity>
                        <Text style={style.rememberMeText}>Remember Me</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push('/')}>
                        <Text style={style.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Button Sign Up */}
                <ButtonTemplate
                    style={style.button}
                    title='Sign Up'
                    onPress={onSaveData} // Panggil handleSignUp ketika tombol diklik
                />

                {/* Line separator */}
                <View style={[style.lineContainer, { marginVertical: 30 }]}>
                    <View style={style.hairline} />
                    <Text style={style.orText}>Or With</Text>
                    <View style={style.hairline} />
                </View>

                {/* Github and Gitlab login options */}
                <View style={style.loginOptionsContainer}>
                    <AlternateLogin title="Continue with Github"
                        onPress={github}
                        logo='github'
                        style={style.loginButton}
                    />
                    <AlternateLogin title="Continue with Gitlab"
                        onPress={gitlab}
                        logo='gitlab'
                        color='orange'
                        style={style.loginButton}
                    />
                </View>

                {/* Add a link back to login with accompanying text */}
                <View style={style.loginContainer}>
                    <Text style={style.alreadyHaveAccount}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={style.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    fontFamily: {
        fontFamily: 'sans-serif',
    },

    scroll: {
        backgroundColor: "#FFFFFF",
    },

    section: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: "#FFFFFF",
    },

    backButton: {
        left: -100,
    },

    container: {
        alignItems: 'center',
    },

    shape: {
        width: 100,
        height: 100,
        backgroundColor: '#EFEFFB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    image: {
        width: 80,
        height: 80,
    },

    textContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 24,
    },

    title: {
        fontSize: 20,
        color: '#505050',
        fontWeight: '600',
    },

    subtitle: {
        color: '#505050',
        fontSize: 14,
        textAlign: 'left',
        marginTop: 6,
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    input: {
        flex: 1,
        height: 40,
    },

    phone: {
        borderRadius: 10,

    },

    eyeIcon: {
        paddingLeft: 10,
    },

    check: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    checkStatus: {
        marginLeft: 10,
        fontSize: 12,
        color: '#242424',
    },

    label: {
        color: '#4B5368',
        fontSize: 16,
        fontWeight: '600',
    },

    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
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

    button: {
        padding: 15,
        borderRadius: 23,
        marginTop: 12,
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

    loginOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },

    loginButton: {
        width: '45%',
        marginHorizontal: 10,
    },

    loginContainer: {
        flexDirection: 'row',  // Align text and link horizontally
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,  // Space from the previous section
    },

    alreadyHaveAccount: {
        fontSize: 14,
        color: '#505050',  // Optional: change color if needed
    },

    loginLink: {
        color: '#5E62DB',  // Color of the link
        fontSize: 14,
        fontWeight: 'bold',
    },
});
