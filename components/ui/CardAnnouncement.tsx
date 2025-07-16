import { sectionStyles } from "@/styles/section.styles";
import { Text, TouchableOpacity, View } from "react-native";

export default function CardAnnouncement({ item }) {
    console.log("CardAnnouncement item:", item);
    const { users: user } = item;

    return (
        <>
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
                            <Text style={sectionStyles.rowLabel}>Equipe</Text>

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
                            <Text>{item.title}</Text>
                            <Text style={sectionStyles.rowLabel}>
                                {item.content}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}
