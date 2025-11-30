import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import InputField from '../components/InputField';
import CommonButton from '../components/CommonButton';
import { COLORS } from '../utils/constants';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const { login, signup, isLoading } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!isLogin && !name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            if (isLogin) {
                login(email, password);
            } else {
                signup(name, email, password);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/login_image.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.overlay} />

                    <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                        <Ionicons name="language" size={20} color="#fff" />
                        <Text style={styles.langText}>{language === 'en' ? 'English' : 'हिंदी'}</Text>
                    </TouchableOpacity>

                    <View style={styles.headerTextContainer}>
                        <Text style={styles.welcomeText}>{t('welcome')}</Text>
                        <Text style={styles.appName}>{t('appName')}</Text>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>{isLogin ? t('loginTitle') : t('signupTitle')}</Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? t('loginSubtitle') : t('signupSubtitle')}
                    </Text>

                    {!isLogin && (
                        <InputField
                            label={t('fullName')}
                            placeholder={t('enterName')}
                            value={name}
                            onChangeText={setName}
                            error={errors.name}
                            icon="person-outline"
                        />
                    )}

                    <InputField
                        label={t('email')}
                        placeholder="email@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        error={errors.email}
                        icon="mail-outline"
                    />

                    <InputField
                        label={t('password')}
                        placeholder="******"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        error={errors.password}
                        icon="lock-closed-outline"
                    />

                    <CommonButton
                        title={isLogin ? t('loginButton') : t('signupButton')}
                        onPress={handleSubmit}
                        loading={isLoading}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            {isLogin ? t('noAccount') : t('haveAccount')}
                        </Text>
                        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                            <Text style={styles.linkText}>
                                {isLogin ? t('signupButton') : t('loginButton')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        height: height * 0.4,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerTextContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
    },
    langButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
        gap: 6,
    },
    langText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
    },
    appName: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingTop: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 32,
    },
    button: {
        marginTop: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    footerText: {
        color: COLORS.textLight,
        fontSize: 14,
    },
    linkText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
