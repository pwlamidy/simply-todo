import { combineComponents } from '../utils/combineComponents';
import { ToDoContextProvider } from './ToDo.context'

const providers = [ToDoContextProvider]

export const AppContextProvider = combineComponents(...providers);
