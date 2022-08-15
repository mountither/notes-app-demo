import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, Text, Alert, ActivityIndicator, View } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import EditorTopBar from '../../modules/notes/components/EditorTopBar';
import TextEditor from '../../modules/notes/components/TextEditor';
import { ModalScreenProps } from '../../navigation/home';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteNote, fetchNote, updateNote } from '../../common/api/notes';
import { SCREEN_HEIGHT } from '../../common/utils/dimensions';
import { StackNavigationProp } from '@react-navigation/stack';

const EditNoteView = () => {

    const route = useRoute<RouteProp<ModalScreenProps, "EditNoteModal">>();

    const { noteID } = route.params

    const textEditor = useRef<RichEditor | null>(null);

    const navigation = useNavigation<StackNavigationProp<any>>();

    const [textEditorHTML, setTextEditorHTML] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(true)

    const processNote = async () => {
        try {
            if (!noteID) throw Error();

            const data = await fetchNote({ noteID });

            setTitle(data.title)
            setTextEditorHTML(data.content)

            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        processNote()
    }, [])

    const onConfirmEdit = async () => {
        try {

            if (!title || !textEditorHTML) throw Error("required-fields")

            await updateNote({ noteID, title, content: textEditorHTML })

            navigation.goBack();

        } catch (error) {
            console.log(error)
        }
    }


    const onDelete = () => {
        Alert.alert(
            "Are you sure?",
            "This note will be deleted permanently?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: async () => {
                        try {
                            await deleteNote({ noteID });

                            navigation.goBack();
                        } catch (error) {
                            console.log(error)
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    }

    return (
        <>
            {
                loading ?
                    <View style={{ position: "absolute", top: SCREEN_HEIGHT / 3, alignSelf: "center" }}>
                        <ActivityIndicator size={"large"} color="black" />
                    </View>
                    :
                    <>
                        <EditorTopBar
                            titleSetter={setTitle}
                            title={title}
                            textEditorRef={textEditor}
                            otherBarTools={
                                <>
                                    <TouchableOpacity
                                        onPress={onDelete}
                                        style={{ alignItems: "center" }}
                                    >

                                        <AntDesign
                                            name="delete"
                                            size={25}
                                        />
                                        <Text style={{ color: "gray", fontWeight: "bold", marginTop: 2 }}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={onConfirmEdit}
                                        style={{ alignItems: "center" }}
                                    >

                                        <Feather
                                            name="check"
                                            size={25}
                                        />
                                        <Text style={{ color: "gray", fontWeight: "bold", marginTop: 2 }}>Confirm</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        />

                        <TextEditor
                            textEditorRef={textEditor}
                            initHTML={textEditorHTML}
                            htmlSetter={setTextEditorHTML}
                        />
                    </>
            }

        </>
    )
}

export default EditNoteView