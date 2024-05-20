import { StyleSheet, TextInput } from "react-native";

function Input({ value, onChangeText, placeholder, secureText,multiline }) {
  //   const auth = getAuth(Firebase);
  // const [email, setEmail] = useState("testing@gmail.com");

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, multiline && styles.multiline]}
      secureTextEntry={secureText}
      multiline={multiline}
      numberOfLines={multiline?4:1}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 56,
    width: "90%",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'grey',
    fontWeight: "600",
  },
  multiline:{
    height:170,
    fontWeight:'400',
    textAlignVertical: 'top',
    textAlign: 'left',
    color: 'grey'
  }
});
