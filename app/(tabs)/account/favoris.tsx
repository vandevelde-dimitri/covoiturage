import ListAnnouncement from "@/components/ui/ListAnnouncement";
import { useAuth } from "@/hooks/authContext";
import { useFavoriteUser } from "@/hooks/useAnouncement";
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

export default function FavorisScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const { session } = useAuth();
    const {
        data: favoris,
        isLoading,
        error,
    } = useFavoriteUser(session?.user.id || "");

    console.log("Mes favoris:", favoris);

    if (isLoading) {
        return <Text>Chargement...</Text>;
    }
    if (error) {
        return <Text>Erreur de chargement des favoris.</Text>;
    }
    if (!favoris || favoris.length === 0) {
        return <Text>Aucun favori trouvé.</Text>;
    }

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
                    Mes favoris
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
                    <Text style={sectionStyles.sectionTitle}>Mes favoris</Text>
                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                                sectionStyles.rowLast,
                            ]}
                        >
                            {favoris.map((favori) => (
                                <ListAnnouncement
                                    key={favori.id}
                                    item={favori}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
