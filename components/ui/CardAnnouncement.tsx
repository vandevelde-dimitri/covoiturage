import { profileStyles } from "@/styles/profile.styles";
import FeatherIcon from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CardAnnouncement({ item }) {
    const { id, users } = item;
    return (
        <TouchableOpacity
            key={id}
            onPress={() => {
                router.push({
                    pathname: "/(tabs)/home/announcement/[id]",
                    params: { id },
                });
            }}
            style={profileStyles.profile}
        >
            <Image
                alt=""
                source={{
                    uri: users.image_profile,
                }}
                style={profileStyles.profileAvatar}
            />

            <View style={profileStyles.profileBody}>
                <Text style={profileStyles.profileName}>
                    {users.firstname} {users.lastname}
                    {` (${users.team})`}
                </Text>

                <Text style={profileStyles.profileHandle}>{users.city}</Text>
            </View>

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={22} />
        </TouchableOpacity>
    );
}
