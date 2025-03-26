import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipante() {
    if (participants.includes(participantName)) {
      return Alert.alert("Already Existe!", "Duplicate name participant");
    }

    if (participantName === "") {
      return Alert.alert("Not allowed!", "Name not set");
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipanteRemove(name: string) {
    Alert.alert("Remover", `Remover participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => Alert.alert("Deletado!"),
      },

      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Lista do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipante}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* A ScrollView carrega todos os componentes de uma só vez, Diferente do
      FlatList que apenas carrega os componentes em exibição. */}

      {/* <ScrollView>
        {participants.map((participants) => (
          <Participant
            key={participants}
            name={participants}
            onRemove={() => handleParticipanteRemove("Bilua")}
          />
        ))}
      </ScrollView> */}
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipanteRemove(item)}
          />
        )}
      />
    </View>
  );
}
