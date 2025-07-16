import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import React from "react";

export default function AccountHome() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Bienvenue dans l’espace Compte</Text>
            <Button
                title="Mes favoris"
                onPress={() => router.push("/account/favoris")}
            />
            <Button
                title="Mes annonces"
                onPress={() => router.push("/account/annonces")}
            />
            <Button
                title="Paramètres"
                onPress={() => router.push("/account/settings")}
            />
        </View>
    );
}
