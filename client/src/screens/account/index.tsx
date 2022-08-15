import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { signOutUser } from '../../common/api/auth'
import Button from '../../common/components/Button'
import ScreenContainer from '../../common/layout/ScreenContainer'
import { resetTextEditor } from '../../redux/slices/TextEditorSlice'
import { removeUser } from '../../redux/slices/UserAuthSlice'

const AccountView = () => {

    const [signingOut, setSigningOut] = useState<boolean>(false);

    const dispatch = useDispatch();
    const onSignOut = async () => {
        try {
            setSigningOut(true)
            await signOutUser();
            dispatch(removeUser())
            dispatch(resetTextEditor())
            setSigningOut(false)
        } catch (error) {
            console.log(error)
            setSigningOut(false)
        }
    }
    return (
        <ScrollView>
            <ScreenContainer>
                <Button title="Sign Out" onPress={onSignOut} isLoading={signingOut} />

            </ScreenContainer>


        </ScrollView>
    )
}

export default AccountView