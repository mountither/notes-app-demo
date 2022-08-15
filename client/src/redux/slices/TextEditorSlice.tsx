import { createSlice } from '@reduxjs/toolkit';


export type TextEditorProps = {
    data: {
        title: string | undefined,
        html: string | undefined,
    } | undefined
}

const init: TextEditorProps = {
    data: undefined
};

export const TextEditorSlice = createSlice({
    name: 'textEditor',
    initialState: init,
    reducers: {
        setTextEditorData: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
        resetTextEditor: () => {
            return {
                ...init,
            }
        }
    },
});

export const {
    setTextEditorData,
    resetTextEditor,
} = TextEditorSlice.actions;

export type TextEditorState = {
    textEditor: TextEditorProps
}

export const getTextEditorData = (state: TextEditorState) => state.textEditor.data;

export default TextEditorSlice.reducer;
