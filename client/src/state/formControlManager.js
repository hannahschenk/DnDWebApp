import { createContext } from 'react';

const formControlContext = createContext({
  sectionIndex: 0,
  currentFormDone: false
});

export default formControlContext;