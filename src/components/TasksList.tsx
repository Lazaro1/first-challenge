import React, { useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ModalRemove } from "../components/Modal";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  handleEditTask,
}: TasksListProps) {
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function removeItem(id: number) {
    removeTask(id);
    closeModal();
  }
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  {item.done && <Icon name="check" size={12} color="#FFF" />}
                </View>

                <Text style={item.done ? styles.taskTextDone : styles.taskText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={openModal}
              // onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>

            <ModalRemove visible={modalVisible}>
              <View style={styles.containerModal}>
                <Text style={styles.Title}>
                  Tem certeza que você deseja remover esse item?
                </Text>
                <View style={styles.underline} />
                <View style={styles.containerButton}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.TextButton}>SIM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#E4E4E4" }]}
                    onPress={closeModal}
                  >
                    <Text style={[styles.TextButton, { color: "#7A7A7A" }]}>
                      NÂO
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalRemove>
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  containerModal: {
    flex: 1,
    padding: 25,
    alignItems: "center",
  },
  containerButton: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: 150,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8257E5",
    marginLeft: 14,
    borderRadius: 15,
  },
  underline: {
    width: 250,
    height: 2,
    margin: 10,
    backgroundColor: "#8257E5",
  },
  TextButton: {
    color: "#FFF",
    fontWeight: "bold",
  },
  Title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#7A7A7A",
    fontFamily: "Inter-Regular",
  },
});
