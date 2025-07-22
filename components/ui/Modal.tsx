import { modalStyles } from "@/styles/modalStyles";
import { Modal, Pressable, Text, View } from "react-native";

interface CustomModalProps {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
}

export default function CustomModal({
    children,
    visible,
    onClose,
}: CustomModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    {children}
                    <Pressable
                        style={[modalStyles.button, modalStyles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={modalStyles.textStyle}>Valider</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
