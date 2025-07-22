import CustomModal from "@/components/ui/Modal";
import { useGetAuth, useUpdateAuth } from "@/hooks/auth/useAuth";
import { useAuth } from "@/hooks/authContext";
import { useUpdateUser, useUserById } from "@/hooks/useUsers";
import { contentStyles } from "@/styles/contentStyles";
import { headerStyles } from "@/styles/header.styles";
import { modalStyles } from "@/styles/modalStyles";
import { profileStyles } from "@/styles/profile.styles";
import { sectionStyles } from "@/styles/section.styles";
import { UpdateAuthBody } from "@/types/auth.interface";
import { Contract } from "@/types/contract.enum";
import { Team } from "@/types/team.enum";
import { User } from "@/types/user.type";
import { supabase } from "@/utils/supabase";
import FeatherIcon from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingScreen() {
    const insets = useSafeAreaInsets();
    const { session } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [userAuth, setUserAuth] = useState<UpdateAuthBody | null>(null);
    const [initialUser, setInitialUser] = useState<User | null>(null);
    const [initialAuth, setInitialAuth] = useState<UpdateAuthBody | null>(null);
    const router = useRouter();
    const [activeField, setActiveField] = useState<
        | null
        | "lastname"
        | "firstname"
        | "city"
        | "team"
        | "contract"
        | "email_notification"
        | "push_notification"
        | "to_convey"
        | "is_available"
        | "email"
        | "password"
    >(null);

    const { data, isLoading, error } = useUserById(session?.user?.id || "");
    const { mutate: updateAuth, isPending: pendingAuth } = useUpdateAuth();
    const { mutate: updateUser, isPending: pendingUser } = useUpdateUser();
    const {
        data: auth,
        isLoading: authLoading,
        error: authError,
    } = useGetAuth();

    useEffect(() => {
        if (data) {
            setUser(data);
            setInitialUser(data);
        }
    }, [data]);

    useEffect(() => {
        if (auth) {
            setUserAuth(auth);
            setInitialAuth(auth);
        }
    }, [auth]);

    console.log("auth:", auth);

    if (!session?.user.id) {
        return <Text>Chargement de la session...</Text>;
    }

    if (isLoading) {
        return <Text>Chargement...</Text>;
    }
    if (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
        );
        return (
            <Text>Erreur lors de la récupération des données utilisateur.</Text>
        );
    }

    if (!data || !user) {
        return <Text>Aucun utilisateur trouvé.</Text>;
    }

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erreur de déconnexion :", error.message);
            return;
        }
        showToast("Déconnexion réussie !");
    };

    const handleChanges = async () => {
        if (!user) return;
        if (userAuth?.email !== initialAuth?.email) {
            updateAuth(
                { email: userAuth?.email, password: userAuth?.password },
                {
                    onSuccess: () => {
                        ToastAndroid.show(
                            "Authentification mise à jour",
                            ToastAndroid.SHORT
                        );
                    },
                }
            );
            setInitialAuth({ ...userAuth, email: userAuth?.email });
        }
        updateUser(
            { ...user, id: user.id },
            {
                onSuccess: () => {
                    ToastAndroid.show(
                        "Information mise à jour",
                        ToastAndroid.SHORT
                    );
                },
            }
        );
        setInitialUser(user);
    };

    const hasChanges =
        JSON.stringify(user) !== JSON.stringify(initialUser) ||
        JSON.stringify(userAuth) !== JSON.stringify(initialAuth);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#f8f8f8",
                paddingTop: insets.top,
                // paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <View style={headerStyles.header}>
                <View style={headerStyles.headerAction}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <FeatherIcon color="#000" name="arrow-left" size={24} />
                    </TouchableOpacity>
                </View>

                <Text numberOfLines={2} style={headerStyles.headerTitle}>
                    Mes annonces
                </Text>

                <View
                    style={[
                        headerStyles.headerAction,
                        { alignItems: "flex-end" },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                            //+ add more options if needed
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

            <ScrollView contentContainerStyle={contentStyles.container}>
                <View style={contentStyles.container}>
                    <Image
                        alt=""
                        source={{
                            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
                        }}
                        style={profileStyles.profileAvatar}
                    />
                </View>

                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>
                        information personelle
                    </Text>

                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                            ]}
                        >
                            <TouchableOpacity
                                style={sectionStyles.row}
                                onPress={() => setActiveField("lastname")}
                            >
                                <Text style={sectionStyles.rowLabel}>Nom</Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.lastname || "A changer"}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                            <CustomModal
                                visible={activeField === "lastname"}
                                onClose={() => setActiveField(null)}
                            >
                                <TextInput
                                    style={modalStyles.modalText}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="while-editing"
                                    placeholder="Entrez votre nom"
                                    placeholderTextColor="#6b7280"
                                    value={user.lastname}
                                    onChangeText={(text) =>
                                        setUser({
                                            ...user,
                                            lastname: text,
                                        })
                                    }
                                />
                            </CustomModal>
                        </View>

                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => setActiveField("firstname")}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Prénom
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.firstname || "A changer"}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <CustomModal
                                    visible={activeField === "firstname"}
                                    onClose={() => setActiveField(null)}
                                >
                                    <TextInput
                                        style={modalStyles.modalText}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        clearButtonMode="while-editing"
                                        placeholder="Entrez votre prénom"
                                        placeholderTextColor="#6b7280"
                                        value={user.firstname}
                                        onChangeText={(text) =>
                                            setUser({
                                                ...user,
                                                firstname: text,
                                            })
                                        }
                                    />
                                </CustomModal>
                            </TouchableOpacity>
                        </View>

                        <View style={sectionStyles.rowWrapper}>
                            <View style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Notification par e-mail
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Switch
                                    onValueChange={(email_notification) =>
                                        setUser({ ...user, email_notification })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user.email_notification}
                                />
                            </View>
                        </View>

                        <View style={[sectionStyles.rowWrapper]}>
                            <View style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Notification push
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Switch
                                    onValueChange={(push_notification) =>
                                        setUser({ ...user, push_notification })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user.push_notification}
                                />
                            </View>
                        </View>
                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => setActiveField("team")}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Equipe
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.team}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <CustomModal
                                    visible={activeField === "team"}
                                    onClose={() => setActiveField(null)}
                                >
                                    <View style={styles.container}>
                                        <Text style={styles.label}>
                                            Votre équipe :
                                        </Text>
                                        <Picker
                                            selectedValue={user.team}
                                            onValueChange={(team) =>
                                                setUser({ ...user, team })
                                            }
                                            style={styles.picker}
                                        >
                                            {Object.values(Team).map((team) => (
                                                <Picker.Item
                                                    key={team}
                                                    label={team}
                                                    value={team}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </CustomModal>
                            </TouchableOpacity>
                        </View>
                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => setActiveField("city")}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Ville
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.city}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <CustomModal
                                    visible={activeField === "city"}
                                    onClose={() => setActiveField(null)}
                                >
                                    <TextInput
                                        style={modalStyles.modalText}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        clearButtonMode="while-editing"
                                        placeholder="Indiquer votre ville"
                                        placeholderTextColor="#6b7280"
                                        value={user.city}
                                        onChangeText={(text) =>
                                            setUser({
                                                ...user,
                                                city: text,
                                            })
                                        }
                                    />
                                </CustomModal>
                            </TouchableOpacity>
                        </View>
                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity
                                onPress={() => setActiveField("contract")}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Contrat
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.contract}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <CustomModal
                                    visible={activeField === "contract"}
                                    onClose={() => setActiveField(null)}
                                >
                                    <View style={styles.container}>
                                        <Text style={styles.label}>
                                            Votre contrat :
                                        </Text>
                                        <Picker
                                            selectedValue={user.contract}
                                            onValueChange={(contract) =>
                                                setUser({ ...user, contract })
                                            }
                                            style={styles.picker}
                                        >
                                            {Object.values(Contract).map(
                                                (contract) => (
                                                    <Picker.Item
                                                        key={contract}
                                                        label={contract}
                                                        value={contract}
                                                    />
                                                )
                                            )}
                                        </Picker>
                                    </View>
                                </CustomModal>
                            </TouchableOpacity>
                        </View>
                        <View style={[sectionStyles.rowWrapper]}>
                            <View style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Véhiculer
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Switch
                                    onValueChange={(to_convey) =>
                                        setUser({ ...user, to_convey })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user.to_convey}
                                />
                            </View>
                        </View>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowLast,
                            ]}
                        >
                            <View style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Disponible
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Switch
                                    onValueChange={(is_available) =>
                                        setUser({ ...user, is_available })
                                    }
                                    style={{
                                        transform: [
                                            { scaleX: 0.95 },
                                            { scaleY: 0.95 },
                                        ],
                                    }}
                                    value={user.is_available}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>
                        Information de connexion
                    </Text>

                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => setActiveField("email")}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Email
                                </Text>

                                <View style={sectionStyles.rowSpacer} />
                                <Text style={sectionStyles.rowValue}>
                                    {userAuth?.email}
                                </Text>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                                <CustomModal
                                    visible={activeField === "email"}
                                    onClose={() => setActiveField(null)}
                                >
                                    <TextInput
                                        style={modalStyles.modalText}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        clearButtonMode="while-editing"
                                        placeholder="Entrez votre email"
                                        placeholderTextColor="#6b7280"
                                        value={userAuth?.email}
                                        onChangeText={(text) =>
                                            setUserAuth({
                                                ...userAuth,
                                                email: text,
                                            })
                                        }
                                    />
                                </CustomModal>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowLast,
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname:
                                            "/(tabs)/account/resetPassword",
                                    });
                                }}
                                style={sectionStyles.row}
                            >
                                <Text style={sectionStyles.rowLabel}>
                                    Modifier le mot de passe
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={19}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={sectionStyles.section}>
                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                                sectionStyles.rowLast,
                                { alignItems: "center" },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={handleSignOut}
                                style={sectionStyles.row}
                            >
                                <Text
                                    style={[
                                        sectionStyles.rowLabel,
                                        sectionStyles.rowLabelLogout,
                                    ]}
                                >
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {hasChanges && (
                    <View style={sectionStyles.section}>
                        <View style={sectionStyles.sectionBody}>
                            <View
                                style={[
                                    sectionStyles.rowWrapper,
                                    sectionStyles.rowFirst,
                                    sectionStyles.rowLast,
                                    { alignItems: "center" },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={handleChanges}
                                    style={sectionStyles.row}
                                >
                                    <Text
                                        style={[
                                            sectionStyles.rowLabel,
                                            sectionStyles.rowLabelLogout,
                                        ]}
                                    >
                                        Enregistrer les modifications
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                <Text style={contentStyles.contentFooter}>
                    App Version 2.24 #50491
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: "#be0909ff",
    },
    value: {
        marginTop: 10,
        color: "#555",
    },
});
