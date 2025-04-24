import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TaskState = {
  tasks: Task[];
  filter: 'all' | 'completed' | 'notCompleted';
};

const initialState: TaskState = {
  tasks: [],
  filter: 'all'
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'notCompleted'>) => {
        state.filter = action.payload;
    },
  }
});

export const { setTasks, addTask, deleteTask, toggleTask, setFilter } = taskSlice.actions;

export default taskSlice.reducer;
