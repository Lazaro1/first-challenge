import React, { useState } from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const verifyTask = tasks.find((task) => task.title === newTaskTitle);

    if (verifyTask) {
      Alert.alert("Tarefa Já adicionada");
      return;
    } else {
      const newTask = {
        id: String(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      };
      setTasks((oldtask: any) => [...oldtask, newTask]);
    }
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function handleToggleTaskDone(id: number) {
    const update = tasks.map((task) => ({ ...task }));
    const searchItem = update.find((task) => task.id === id);

    if (!searchItem) {
      return;
    }
    searchItem.done = !searchItem.done;
    setTasks(update);
  }

  function handleRemoveTask(id: number) {
    const newTaskArray = tasks.filter((task) => task.id !== id);
    setTasks(newTaskArray);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const update = tasks.map((task) => ({ ...task }));
    const searchItem = update.find((task) => task.id === taskId);

    if (!searchItem) {
      return;
    }
    searchItem.title = taskNewTitle;
    setTasks(update);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
