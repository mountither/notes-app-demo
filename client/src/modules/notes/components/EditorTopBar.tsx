import React, { MutableRefObject, ReactNode } from 'react'
import { Text, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import InputBox from '../../../common/components/form/InputBox'
import { SCREEN_WIDTH } from '../../../common/utils/dimensions'


type EditorTopBarProps = {
    titleSetter: React.Dispatch<React.SetStateAction<string | undefined>>,
    title: string | undefined,
    textEditorRef: MutableRefObject<RichEditor | null>,
    otherBarTools: ReactNode
}

const EditorTopBar = ({ title, titleSetter, textEditorRef, otherBarTools }: EditorTopBarProps) => {
    return (
        <>
            <InputBox
                onChangeText={titleSetter}
                placeholder="Add a note title"
                value={title}
                style={{
                    backgroundColor: "#e2e2e2",
                    width: SCREEN_WIDTH - 20,
                    alignSelf: "center",
                    borderRadius: 10,
                    height: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 10
                }}
            />

            <View style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: "#e2e2e2", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <RichToolbar
                    editor={textEditorRef}
                    style={{ backgroundColor: "#e2e2e2", borderRadius: 10, width: SCREEN_WIDTH / 2, alignSelf: "center" }}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.heading1,
                        actions.heading2
                    ]}
                    iconMap={{
                        [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>),
                        [actions.heading2]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H2</Text>)
                    }}
                />
                {otherBarTools}
            </View>

        </>
    )
}

export default EditorTopBar