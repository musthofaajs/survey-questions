import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { QuestionItem } from './QuestionList';

interface QuestionEditModalProps {
  open: boolean;
  question: QuestionItem | null;
  onClose: () => void;
  onSave: (updatedQuestion: QuestionItem) => void;
}

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OptionContainer = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const QuestionEditModal: React.FC<QuestionEditModalProps> = ({
  open,
  question,
  onClose,
  onSave,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<QuestionItem | null>(null);

  useEffect(() => {
    if (question) {
      setEditedQuestion({ ...question });
    }
  }, [question]);

  const handleOptionChange = (
    index: number,
    field: 'rule' | 'answer',
    value: string
  ) => {
    if (editedQuestion) {
      const updatedOptions = [...editedQuestion.options];
      updatedOptions[index][field] = value;
      setEditedQuestion((prev) => ({
        ...prev!,
        options: updatedOptions,
      }));
    }
  };

  const handleSave = () => {
    if (editedQuestion) {
      onSave(editedQuestion);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        {editedQuestion && (
          <FormContainer>
            <StyledTextField
              label="Question"
              variant="outlined"
              value={editedQuestion.question}
              onChange={(e) =>
                setEditedQuestion((prev) => ({ ...prev!, question: e.target.value }))
              }
              fullWidth
              margin="dense"
            />
            {editedQuestion.options.map((option, index) => (
              <OptionContainer key={index}>
                <FormControl variant="outlined" >
                  <InputLabel>Options Rule</InputLabel>
                  <Select
                    value={option.rule}
                    onChange={(e) => handleOptionChange(index, 'rule', e.target.value as string)}
                    label="Options Rule"
                  >
                    <MenuItem value="May Select">May Select</MenuItem>
                    <MenuItem value="Must Select">Must Select</MenuItem>
                  </Select>
                </FormControl>
                <StyledTextField
                  label="Options Answer"
                  variant="outlined"
                  value={option.answer}
                  onChange={(e) => handleOptionChange(index, 'answer', e.target.value)}
                  fullWidth
                  margin="dense"
                />
              </OptionContainer>
            ))}
          </FormContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionEditModal;
