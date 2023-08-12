import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Draggable, Droppable, DraggableProvided } from 'react-beautiful-dnd';

const DraggableListItem = styled(ListItem)`
  cursor: grab;
`;

interface QuestionItem {
  id: number;
  question: string;
  options: Array<{ rule: string; answer: string }>;
}

interface QuestionListProps {
  questions: QuestionItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnd,
}) => {
  const handleDragStart = (id: number) => {
    onDragStart(id);
  };

  return (
    <Droppable droppableId="question-list" type="QUESTION">
      {(provided) => (
        <List
          ref={provided.innerRef}
          onDragOver={(e) => e.preventDefault()}
          {...provided.droppableProps}
        >
          {questions.map((question, index) => (
            <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
              {(providedDraggable: DraggableProvided) => (
                <DraggableListItem
                  ref={providedDraggable.innerRef}
                  {...providedDraggable.draggableProps}
                  {...providedDraggable.dragHandleProps}
                  onDragStart={() => handleDragStart(question.id)} // <-- Call handleDragStart
                  onDragEnd={onDragEnd} // <-- Pass onDragEnd directly
                >
                  <ListItemText primary={question.question} />
                  <IconButton onClick={() => onEdit(question.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(question.id)}>
                    <Delete />
                  </IconButton>
                </DraggableListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default QuestionList;
