import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task if it's not empty    

    if (newTaskTitle === '') {
      Alert.alert('Digite um título válido! \u{1F9D0}');
      return
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data]); //Adds the task to the list without altering old values
  }

  function handleMarkTaskAsDone(id: number) {
    //TODO - mark task as done if exists

    // Searches for the task that matches the id(parameter)
    const task = tasks.filter(item => item.id === id)[0];

    task.done = !task.done;

    setTasks(oldState => [...oldState]);
  }


  function handleRemoveTask(id: number) {
    //TODO - remove task from state
/*
    let oldTasks = tasks;

    const taskToDelete = tasks.findIndex(item => {
      return item.id === id;
    });

    let updatedTasks = oldTasks.splice(taskToDelete, 1);

    setTasks(updatedTasks);*/

    setTasks(oldState => oldState.filter(
      task => task.id !== id // Shows only the tasks that don't have the same id as the parameter
    ));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}