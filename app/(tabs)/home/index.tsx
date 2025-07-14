import { announcements } from "@/data/announcementMock";
import { users } from "@/data/userMock";
import { contentStyles } from "@/styles/contentStyles";
import { inputSearchStyles } from "@/styles/inputSearch.styles";
import { profileStyles } from "@/styles/profile.styles";
import { sectionStyles } from "@/styles/section.styles";
import FeatherIcon from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
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
                            {filteredRows.map(({ id, user_id }) => {
                                return (
                                    <TouchableOpacity
                                        key={id}
                                        onPress={() => {
                                            router.push({
                                                pathname:
                                                    "/(tabs)/home/announcement/[id]",
                                                params: { id },
                                            });
                                        }}
                                        style={profileStyles.profile}
                                    >
                                        <Image
                                            alt=""
                                            source={{
                                                uri: users.find(
                                                    (u) => u.id === user_id
                                                )?.image_profile,
                                            }}
                                            style={profileStyles.profileAvatar}
                                        />

                                        <View style={profileStyles.profileBody}>
                                            <Text
                                                style={
                                                    profileStyles.profileName
                                                }
                                            >
                                                {
                                                    users.find(
                                                        (u) => u.id === user_id
                                                    )?.firstname
                                                }{" "}
                                                {
                                                    users.find(
                                                        (u) => u.id === user_id
                                                    )?.lastname
                                                }
                                                {` (${
                                                    users.find(
                                                        (u) => u.id === user_id
                                                    )?.team
                                                })`}
                                            </Text>

                                            <Text
                                                style={
                                                    profileStyles.profileHandle
                                                }
                                            >
                                                {
                                                    users.find(
                                                        (u) => u.id === user_id
                                                    )?.city
                                                }
                                            </Text>
                                        </View>

                                        <FeatherIcon
                                            color="#bcbcbc"
                                            name="chevron-right"
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
