import ListAnnouncement from "@/components/ui/ListAnnouncement";
import { useAuth } from "@/hooks/authContext";
import { usePublishAnnouncement } from "@/hooks/useAnouncement";
import { contentStyles } from "@/styles/contentStyles";
import { headerStyles } from "@/styles/header.styles";
import { sectionStyles } from "@/styles/section.styles";
import FeatherIcon from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnnonceScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const { session } = useAuth();
    const {
        data: annonces,
        isLoading,
        error,
    } = usePublishAnnouncement(session?.user.id || "");
    console.log("mon Annonces:", annonces);
    if (isLoading) {
        return <Text>Chargement...</Text>;
    }
    if (error) {
        return <Text>Erreur de chargement des annonces.</Text>;
    }
    if (!annonces || annonces.length === 0) {
        return <Text>Aucune annonce trouvée.</Text>;
    }

    console.log("Mes annonces:", annonces);

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
                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>Mes annonces</Text>
                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                                sectionStyles.rowLast,
                            ]}
                        >
                            {annonces.map((announce, index) => {
                                return (
                                    <ListAnnouncement
                                        key={index}
                                        item={announce}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
