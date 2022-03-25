import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: String(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldtask: any) => [...oldtask, newTask]);
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

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
