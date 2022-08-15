import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useSelector } from 'react-redux';
import { fetchNotesList } from '../../common/api/notes';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../common/utils/dimensions';
import { ModalScreenProps } from '../../navigation/home';
import { getUserData, UserAuthState } from '../../redux/slices/UserAuthSlice';
import { formatDateTime } from '../../common/utils/dateFormatters';

type NoteData = {
  id: string,
  title: string,
  html: string,
  date_published: Date,
}

const NotesView = () => {

  const state = useSelector((state: UserAuthState) => state)
  const userSession = getUserData(state)

  const [notes, setNotes] = useState<NoteData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [refreshing, _] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<any>>()

  const processNotes = async () => {
    try {
      const data = await fetchNotesList();
      const _notes: NoteData[] = [];

      data.map((note: any) => {
        _notes.push({
          id: note.id,
          title: note.title,
          html: note.content,
          date_published: note.date_published
        })
      })
      setNotes(_notes)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }

  // fetch init & refetch data on navigate back from other screen.
  const isScreenFocussed = useIsFocused();
  useEffect(() => {
    if (userSession?.token && isScreenFocussed) {
      processNotes();
    }
  }, [isScreenFocussed, userSession?.token])


  return (
    <>
      {
        loading ?
          <View style={{ position: "absolute", top: SCREEN_HEIGHT / 3, alignSelf: "center" }}>
            <ActivityIndicator size={"large"} color="black" />
          </View> : null
      }

      {
        !loading && notes?.length === 0 ?
          <View style={{ position: "absolute", top: SCREEN_HEIGHT / 3, alignSelf: "center" }}>
            <Text style={{ fontSize: 20 }}>No Notes found</Text>
          </View> : null

      }

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={processNotes}
          />}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10 }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 8, paddingBottom: 35, borderRadius: 10 }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EditNoteModal", { noteID: item.id } as ModalScreenProps["EditNoteModal"])}
          >

            <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 10 }}>{item.title}</Text>
            <RenderHTML
              contentWidth={SCREEN_WIDTH}
              source={{ html: item.html.substring(0, 100) }}
            />


            <View style={{ position: "absolute", bottom: 5, right: 5 }}>
              <Text style={{ fontSize: 12, color: "gray" }}>{formatDateTime(new Date(item.date_published))}</Text>
            </View>
          </TouchableOpacity>

        )}

      />

    </>
  )
}

export default NotesView