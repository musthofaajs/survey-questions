import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import styled from 'styled-components';
import { Delete } from '@mui/icons-material';

interface Option {
  rule: string;
  answer: string;
}

interface QuestionFormProps {
  onSubmit: (formData: { question: string; options: Option[] }) => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<Option[]>([
    { rule: 'May Select', answer: '' },
  ]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleOptionChange = (
    index: number,
    field: 'rule' | 'answer',
    value: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, { rule: 'May Select', answer: '' }]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: string[] = [];

    if (question.trim() === '') {
      newErrors.push('Question field is required.');
    }

    options.forEach((option, index) => {
      if (option.answer.trim() === '') {
        newErrors.push(`Answer for option ${index + 1} is required.`);
      }
    });

    if (newErrors.length === 0) {
      const formData = { question, options };
      onSubmit(formData);
      setQuestion('');
      setOptions([{ rule: 'May Select', answer: '' }]);
      setErrors([]);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledTextField
        label="Question"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        margin="dense"
      />
      {options.map((option, index) => (
        <OptionContainer key={index}>
          <FormControl variant="outlined">
            <InputLabel>Options Rule</InputLabel>
            <Select
              value={option.rule}
              onChange={(e) =>
                handleOptionChange(index, 'rule', e.target.value as string)
              }
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
            required
            fullWidth
            margin="dense"
          />
          {options.length > 1 && (
            <IconButton onClick={() => handleRemoveOption(index)}>
              <Delete />
            </IconButton>
          )}
        </OptionContainer>
      ))}
      {errors.map((error, index) => (
        <FormHelperText key={index} error>
          {error}
        </FormHelperText>
      ))}
      <Button
        type="button"
        variant="outlined"
        color="primary"
        onClick={handleAddOption}
      >
        Add Option
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </FormContainer>
  );
};

export default QuestionForm;
