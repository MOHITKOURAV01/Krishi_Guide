import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground,
    Modal,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CommonButton from '../components/CommonButton';

/**
 * Profile Screen Component
 * Displays user profile and settings
 */
export default function ProfileScreen() {
    const { user, logout, updateUser } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');

    const handleLogout = () => {
        Alert.alert(
            t('logout'),
            t('logoutConfirm'),
            [
                { text: t('cancel'), style: 'cancel' },
                { text: t('logout'), onPress: logout, style: 'destructive' },
            ]
        );
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            updateUser({ profileImage: result.assets[0].uri });
        }
    };

    const handleSaveProfile = () => {
        if (newName.trim()) {
            updateUser({ name: newName });
            setEditModalVisible(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require('../../assets/profile_bg.jpg')}
                style={styles.header}
                imageStyle={styles.headerBgImage}
            >
                <View style={styles.headerOverlay} />
                <View style={styles.profileImageContainer}>
                    <Image
                        source={user?.profileImage ? { uri: user.profileImage } : { uri: 'https://via.placeholder.com/150' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.name || 'Farmer'}</Text>
                <Text style={styles.userLocation}>{user?.email || 'farmer@example.com'}</Text>
            </ImageBackground>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('accountSettings')}</Text>

                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    setNewName(user?.name || '');
                    setEditModalVisible(true);
                }}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="person-outline" size={24} color={COLORS.text} />
                        <Text style={styles.menuItemText}>{t('editProfile')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                        <Text style={styles.menuItemText}>{t('notifications')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="language-outline" size={24} color={COLORS.text} />
                        <Text style={styles.menuItemText}>{t('language')}</Text>
                    </View>
                    <View style={styles.menuItemRight}>
                        <Text style={styles.valueText}>{language === 'en' ? 'English' : 'हिंदी'}</Text>
                        <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('support')}</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="help-circle-outline" size={24} color={COLORS.text} />
                        <Text style={styles.menuItemText}>{t('helpFaq')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="information-circle-outline" size={24} color={COLORS.text} />
                        <Text style={styles.menuItemText}>{t('aboutApp')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                <Text style={styles.logoutText}>{t('logout')}</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Version 1.0.0</Text>

            {/* Edit Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('editProfile')}</Text>

                        <Text style={styles.label}>{t('fullName')}</Text>
                        <TextInput
                            style={styles.input}
                            value={newName}
                            onChangeText={setNewName}
                            placeholder={t('enterName')}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSaveProfile}
                            >
                                <Text style={styles.saveButtonText}>{t('save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 32,
        alignItems: 'center',
        paddingBottom: 48,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    headerBgImage: {
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#fff',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    userLocation: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 12,
        marginLeft: 4,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    valueText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        margin: 24,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
    },
    versionText: {
        textAlign: 'center',
        color: COLORS.textLight,
        fontSize: 12,
        marginBottom: 32,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.text,
    },
    label: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 24,
        color: COLORS.text,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f3f4f6',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
    },
    cancelButtonText: {
        color: COLORS.text,
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
