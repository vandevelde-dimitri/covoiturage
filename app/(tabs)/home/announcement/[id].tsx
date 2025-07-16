import { useAnnouncementById } from "@/hooks/useAnouncement";
import { contentStyles } from "@/styles/contentStyles";
import { headerStyles } from "@/styles/header.styles";
import { profileStyles } from "@/styles/profile.styles";
import { sectionStyles } from "@/styles/section.styles";
import { Contract } from "@/types/contract.enum";
import FeatherIcon from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnnouncementDetail() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [isMatch, setIsMatch] = useState(false);

    const {
        data: annoucenement,
        isLoading,
        error,
    } = useAnnouncementById(id as string);

    if (isLoading) {
        return <Text>Chargement...</Text>;
    }
    if (error) {
        return <Text>Erreur de chargement de l'annonce.</Text>;
    }
    if (!annoucenement) {
        return <Text>Aucune annonce trouvée.</Text>;
    }

    if (!annoucenement.users || annoucenement.users.length === 0) {
        return <Text>Aucune information utilisateur trouvée.</Text>;
    }
    const { user } = annoucenement;

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
                    Annonce
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
                <View style={[sectionStyles.section, { paddingTop: 4 }]}>
                    <Text style={sectionStyles.sectionTitle}>Le covoit de</Text>

                    <View style={sectionStyles.sectionBody}>
                        <TouchableOpacity style={[profileStyles.profile]}>
                            <Image
                                alt=""
                                source={{
                                    uri:
                                        user.image_profile ||
                                        "https://via.placeholder.com/150",
                                }}
                                style={[
                                    profileStyles.profileAvatar,
                                    {
                                        borderColor:
                                            user.contract === Contract.CDI
                                                ? "#0530f0ff"
                                                : "#24f808ff",
                                        borderWidth: 2,
                                    },
                                ]}
                            />

                            <View style={profileStyles.profileBody}>
                                <Text style={profileStyles.profileName}>
                                    {user.firstname} {user.lastname}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>Detail</Text>

                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                            ]}
                        >
                            <TouchableOpacity style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Ville de départ
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.city}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Equipe
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.team}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={sectionStyles.rowWrapper}>
                            <TouchableOpacity style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Place restante
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>5</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowLast,
                            ]}
                        >
                            <TouchableOpacity style={sectionStyles.row}>
                                <Text style={sectionStyles.rowLabel}>
                                    Véhiculer
                                </Text>

                                <View style={sectionStyles.rowSpacer} />

                                <Text style={sectionStyles.rowValue}>
                                    {user.to_convey ? "Oui" : "Non"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>Description</Text>

                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                                sectionStyles.rowLast,
                            ]}
                        >
                            <TouchableOpacity style={sectionStyles.textArea}>
                                <Text>{annoucenement.title}</Text>
                                <Text style={sectionStyles.rowLabel}>
                                    {annoucenement.content}
                                </Text>
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
                                style={sectionStyles.row}
                                onPress={() => {
                                    if (isMatch) {
                                        // handle propose action
                                        console.log("Proposition envoyée");
                                    } else {
                                        console.log(
                                            "Impossible de se proposer"
                                        );
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        sectionStyles.rowLabel,
                                        isMatch
                                            ? sectionStyles.rowLabelLogout
                                            : sectionStyles.disabled,
                                    ]}
                                >
                                    Se proposer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
