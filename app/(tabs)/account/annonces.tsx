import ListAnnouncement from "@/components/ui/ListAnnouncement";
import { useAuth } from "@/hooks/authContext";
import { usePublishAnnouncement } from "@/hooks/useAnouncement";
import { contentStyles } from "@/styles/contentStyles";
import { sectionStyles } from "@/styles/section.styles";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnnonceScreen() {
    const insets = useSafeAreaInsets();

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
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
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
