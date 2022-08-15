import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RichEditor } from "react-native-pell-rich-editor";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getTextEditorData, setTextEditorData, TextEditorState } from '../../redux/slices/TextEditorSlice';

import { useNavigation } from '@react-navigation/native';
import { createNote } from '../../common/api/notes';
import EditorTopBar from '../../modules/notes/components/EditorTopBar';
import TextEditor from '../../modules/notes/components/TextEditor';


const CreateNoteView = () => {
    const textEditor = useRef<RichEditor | null>(null);

    const dispatch = useDispatch();

    const state = useSelector((state: TextEditorState) => state);

    const { title, html } = getTextEditorData(state) || {}

    const [_textEditorHTML, setTextEditorHTML] = useState<string | undefined>(html);
    const [_title, setTitle] = useState<string | undefined>(title);

    const onSave = () => {
        if (!_title || !_textEditorHTML) return;

        dispatch(setTextEditorData({ title: _title, html: _textEditorHTML }))
    }

    const navigation = useNavigation()
    const onPost = async () => {
        try {
            if (!_title || !_textEditorHTML) return;

            dispatch(setTextEditorData(undefined));

            await createNote({ title: _title, content: _textEditorHTML })

            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <EditorTopBar
                titleSetter={setTitle}
                title={_title}
                textEditorRef={textEditor}
                otherBarTools={
                    <>
                        <TouchableOpacity
                            onPress={onSave}
                            style={{ alignItems: "center" }}
                        >

                            <AntDesign
                                name="save"
                                size={30}
                            />
                            <Text style={{ color: "gray", fontWeight: "bold" }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPost}
                            style={{ alignItems: "center" }}
                        >

                            <Feather
                                name="send"
                                size={30}
                            />
                            <Text style={{ color: "gray", fontWeight: "bold" }}>Post</Text>
                        </TouchableOpacity>
                    </>
                }
            />

            <TextEditor
                textEditorRef={textEditor}
                initHTML={_textEditorHTML}
                htmlSetter={setTextEditorHTML}
            />
        </>
    )
}

export default CreateNoteView