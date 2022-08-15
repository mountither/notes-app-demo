import React from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

type CloseButtonProps = {
    onPress: () => void
}

const CloseButton = ({ onPress }: CloseButtonProps) => {
    return (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress}>
            <AntDesign name="close" size={25} />
        </TouchableOpacity>
    )
}

export default CloseButton