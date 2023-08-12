import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Draggable, Droppable, DraggableProvided } from 'react-beautiful-dnd';
import QuestionEditModal from './QuestionEditModal';

const DraggableListItem = styled(ListItem)`
  cursor: grab;
`;

export interface QuestionItem {
  id: number;
  question: string;
  options: Array<{ rule: string; answer: string }>;
}

interface QuestionListProps {
  questions: QuestionItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedQuestion: QuestionItem) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onDelete,
  onEdit,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);

  const handleEditClick = (id: number) => {
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setEditingQuestion(questionToEdit);
      setEditModalOpen(true);
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingQuestion(null);
  };

  const handleEditModalSave = (updatedQuestion: QuestionItem) => {
    onEdit(updatedQuestion.id, updatedQuestion);
    handleEditModalClose();
  };

  return (
    <>
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
                >
                  <ListItemText primary={question.question} />
                  <IconButton onClick={() => handleEditClick(question.id)}>
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
    <QuestionEditModal
      open={editModalOpen}
      question={editingQuestion}
      onClose={handleEditModalClose}
      onSave={handleEditModalSave}
    />
    </>
  );
};

export default QuestionList;
