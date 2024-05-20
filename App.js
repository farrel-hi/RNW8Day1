import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Input from "./src/components/shared/Input";
// import { collection, addDoc } from "firebase/firestore";

import { db, collection, addDoc, getDocs, doc, deleteDoc } from "./firebaseConfig";
// import {  } from "firebase/firestore";

export default function App() {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  // GET ALL DATA from a single Collection
  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
    });
  };

  // ADD DATA to FIRESTORE DATABASE
  const addData = async (enteredText) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        createdAt: Date.now(),
        text: `${enteredText}`,
      });

      console.log("Document written with ID: ", docRef.id);
      console.log("Document: ", docRef);
      setNote("");
      fetchData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      //console.log("Document deleted with ID: ", id);
      fetchData();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const queryNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(queryNotes);
      setNotesList(queryNotes);
    } catch (error) {
      console.log(error);
    }
  };
  const saveHandler = () => {
    addData(note);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const NotesItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.notes}>{item.text}</Text>
      <TouchableOpacity style={styles.delete} onPress={() => deleteData(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <Input placeholder="Add a note ..." value={note} onChangeText={setNote} />
      <TouchableOpacity onPress={saveHandler} style={styles.btnContainer}>
        <Text style={styles.btn}>Add</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={notesList}
          renderItem={NotesItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  btnContainer: {
    height: 50,
    width: 350,
    marginBottom: 25,
    backgroundColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  notes:{
    fontWeight: 'bold',
    fontSize: 16
  },
  itemContainer:{
    width: 350,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
  },
  delete:{
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
  deleteText:{
    color: 'white'
  }
});
