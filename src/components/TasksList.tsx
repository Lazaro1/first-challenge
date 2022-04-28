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
import { ModalRemove } from "../components/Modal";
import { EditTaskArgs } from "../pages/Home";

import { ItemWrapper } from "./ItemWrapper";
import { TaskItem } from "./taskItem";
import { TaskItem2 } from "./TaskItem2";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksProps) {
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
            <TaskItem
              task={item}
              editTask={editTask}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
            />
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
