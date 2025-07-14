import { supabase } from "@/utils/supabase";
import React from "react";
import { Button, Text, View } from "react-native";

export default function AccountHome() {
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erreur de déconnexion :", error.message);
        }
    };
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Bienvenue dans l’espace Compte</Text>
            <Button onPress={handleSignOut} title="Déconnexion" />
        </View>
    );
}
