import CardAnnouncement from "@/components/ui/CardAnnouncement";
import { announcements } from "@/data/announcementMock";
import { contentStyles } from "@/styles/contentStyles";
import { inputSearchStyles } from "@/styles/inputSearch.styles";
import { sectionStyles } from "@/styles/section.styles";
import FeatherIcon from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [input, setInput] = useState<string>("");
    const filteredRows = useMemo(() => {
        const rows = [];
        const query = input.toLowerCase();
        for (const item of announcements) {
            const nameIndex = item.user_id.toLowerCase().search(query);
            if (nameIndex !== -1) {
                rows.push({
                    ...item,
                    index: nameIndex,
                });
            }
        }
        return rows.sort((a, b) => a.index - b.index);
    }, [input]);
    console.log("Filtered Rows:", filteredRows.length);

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
                    <Text style={sectionStyles.sectionTitle}>Recherche</Text>
                    <View style={inputSearchStyles.searchWrapper}>
                        <View style={inputSearchStyles.search}>
                            <View style={inputSearchStyles.searchIcon}>
                                <FeatherIcon
                                    color="#848484"
                                    name="search"
                                    size={17}
                                />
                            </View>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={(val) => setInput(val)}
                                placeholder="rechercher une annonce"
                                placeholderTextColor="#848484"
                                returnKeyType="done"
                                style={inputSearchStyles.searchControl}
                                value={input}
                            />
                        </View>
                    </View>
                </View>
                <View style={sectionStyles.section}>
                    <Text style={sectionStyles.sectionTitle}>Les annonces</Text>
                    <View style={sectionStyles.sectionBody}>
                        <View
                            style={[
                                sectionStyles.rowWrapper,
                                sectionStyles.rowFirst,
                                sectionStyles.rowLast,
                            ]}
                        >
                            {filteredRows.map((announce, index) => {
                                return (
                                    <CardAnnouncement
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
