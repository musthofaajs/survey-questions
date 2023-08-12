import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const handleDragEnd = (result: DropResult) => {
  console.log('DnD result : ', result)
};

ReactDOM.render(
  <React.StrictMode>
    <DragDropContext onDragEnd={handleDragEnd}>
      <App />
    </DragDropContext>
  </React.StrictMode>,
  document.getElementById('root')
);
