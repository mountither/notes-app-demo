import React, { MutableRefObject, SetStateAction } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import { Dispatch } from 'redux';
import { SCREEN_HEIGHT } from '../../../common/utils/dimensions';


type TextEditorProps = {
    textEditorRef: MutableRefObject<RichEditor | null>,
    initHTML?: string | undefined,
    htmlSetter: React.Dispatch<React.SetStateAction<string | undefined>>
}

const TextEditor = ({ textEditorRef, initHTML, htmlSetter }: TextEditorProps) => {

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <RichEditor
                    hideKeyboardAccessoryView={false}
                    placeholder="What's on your mind?"
                    initialFocus={true}
                    ref={textEditorRef}
                    initialHeight={SCREEN_HEIGHT}
                    initialContentHTML={initHTML}
                    onChange={descriptionText => {
                        htmlSetter(descriptionText)
                    }}
                />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default TextEditor