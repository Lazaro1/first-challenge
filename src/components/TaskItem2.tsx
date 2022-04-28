import React from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { EditTaskArgs } from "../pages/Home";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TasksItemProps) {
  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <Text style={task.done ? styles.taskTextDone : styles.taskText}>
            {task.title}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ paddingHorizontal: 24 }}
        // onPress={openModal}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </View>
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
