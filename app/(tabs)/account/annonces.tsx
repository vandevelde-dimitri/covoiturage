import { useAuth } from "@/hooks/authContext";
import { useAnnouncementByUserId } from "@/hooks/useAnouncement";
import React from "react";
import { Text, View } from "react-native";

export default function AnnonceScreen() {
    const { session } = useAuth();
    const {
        data: annonces,
        isLoading,
        error,
    } = useAnnouncementByUserId(session?.user.id || "");
    console.log("mon Annonces:", annonces);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Mes annonces</Text>
        </View>
    );
}
