import { User } from "@/types/user.type";
import { supabase } from "@/utils/supabase";
import FeatherIcon from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: true,
        to_convey: false,
        is_available: false,
    });

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erreur de déconnexion :", error.message);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#f8f8f8",
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <View style={styles.header}>
                <View style={styles.headerAction}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                    >
                        <FeatherIcon color="#000" name="arrow-left" size={24} />
                    </TouchableOpacity>
                </View>

                <Text numberOfLines={1} style={styles.headerTitle}>
                    Compte
                </Text>

                <View style={[styles.headerAction, { alignItems: "flex-end" }]}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                    >
                        <FeatherIcon
                            color="#000"
                            name="more-vertical"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.container}>
                    <Image
                        alt=""
                        source={{
                            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
                        }}
                        style={styles.avatarXL}
                    />
                    <View style={styles.badge}>
                        <FeatherIcon color="#bcbcbc" name="camera" size={22} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        information personelle
                    </Text>

                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Nom</Text>

                                <View style={styles.rowSpacer} />

                                <Text style={styles.rowValue}>
                                    {user?.lastname || "A changer"}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <TextInput
                                                style={styles.modalText}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                clearButtonMode="while-editing"
                                                keyboardType="email-address"
                                                placeholder="john@example.com"
                                                placeholderTextColor="#6b7280"
                                                value={user?.lastname}
                                            ></TextInput>
                                            <Pressable
                                                style={[
                                                    styles.button,
                                                    styles.buttonClose,
                                                ]}
                                                onPress={() =>
                                                    setModalVisible(
                                                        !modalVisible
                                                    )
                                                }
                                            >
                                                <Text style={styles.textStyle}>
                                                    Valider
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Prénom</Text>

                                <View style={styles.rowSpacer} />

                                <Text style={styles.rowValue}>
                                    {user?.firstname || "A changer"}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Notification par e-mail
                                </Text>

                                <View style={styles.rowSpacer} />

                                <Switch
                                    onValueChange={(emailNotifications) =>
                                        setForm({ ...form, emailNotifications })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={form.emailNotifications}
                                />
                            </View>
                        </View>

                        <View style={[styles.rowWrapper]}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>
                                    Notification push
                                </Text>

                                <View style={styles.rowSpacer} />

                                <Switch
                                    onValueChange={(pushNotifications) =>
                                        setForm({ ...form, pushNotifications })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={form.pushNotifications}
                                />
                            </View>
                        </View>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Equipe</Text>

                                <View style={styles.rowSpacer} />

                                <Text style={styles.rowValue}>
                                    {user?.team}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Ville</Text>

                                <View style={styles.rowSpacer} />

                                <Text style={styles.rowValue}>
                                    {user?.city}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Contrat</Text>

                                <View style={styles.rowSpacer} />

                                <Text style={styles.rowValue}>
                                    {user?.contract}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.rowWrapper]}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Véhiculer</Text>

                                <View style={styles.rowSpacer} />

                                <Switch
                                    onValueChange={(to_convey) =>
                                        setForm({ ...form, to_convey })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user?.to_convey}
                                />
                            </View>
                        </View>
                        <View style={[styles.rowWrapper, styles.rowLast]}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Disponible</Text>

                                <View style={styles.rowSpacer} />

                                <Switch
                                    onValueChange={(is_available) =>
                                        setForm({ ...form, is_available })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user?.is_available}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Information de connexion
                    </Text>

                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>Email</Text>

                                <View style={styles.rowSpacer} />
                                <Text style={styles.rowValue}>A changer</Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.rowWrapper, styles.rowLast]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.rowLabel}>
                                    Modifier le mot de passe
                                </Text>

                                <View style={styles.rowSpacer} />

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionBody}>
                        <View
                            style={[
                                styles.rowWrapper,
                                styles.rowFirst,
                                styles.rowLast,
                                { alignItems: "center" },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={handleSignOut}
                                style={styles.row}
                            >
                                <Text
                                    style={[
                                        styles.rowLabel,
                                        styles.rowLabelLogout,
                                    ]}
                                >
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={styles.contentFooter}>
                    App Version 2.24 #50491
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /** Header */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 16,
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: "600",
        color: "#000",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "center",
    },
    /** Content */
    content: {
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        color: "#a69f9f",
    },
    /** Section */
    section: {
        paddingVertical: 12,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: "500",
        color: "#a69f9f",
        textTransform: "uppercase",
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    /** Profile */
    profile: {
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileBody: {
        marginRight: "auto",
    },
    profileName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#292929",
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "400",
        color: "#858585",
    },
    /** Row */
    row: {
        height: 44,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: "#000",
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ababab",
        marginRight: 4,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: "100%",
        textAlign: "center",
        fontWeight: "600",
        color: "#dc2626",
    },
    /** Avatar */
    container: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarXL: {
        width: 64,
        height: 64,
        borderRadius: 9999,
    },
    badge: {
        position: "absolute",
        // bottom: 32,
        // right: 14,
        backgroundColor: "white",
        borderRadius: 9999,
        padding: 2,
    },

    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#2196F3",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
