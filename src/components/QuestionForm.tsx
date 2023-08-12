import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import styled from 'styled-components';

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
  gap: 10px;
`;

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<Option[]>([{ rule: 'May Select', answer: '' }]);

  const handleOptionChange = (
    index: number,
    field: 'rule' | 'answer',
    value: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = { question, options };
    onSubmit(formData);
    setQuestion('');
    setOptions([{ rule: 'May Select', answer: '' }]);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        label="Question"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <div key={index}>
          <FormControl variant="outlined">
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
          <TextField
            label="Options Answer"
            variant="outlined"
            value={option.answer}
            onChange={(e) => handleOptionChange(index, 'answer', e.target.value)}
            required
          />
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </FormContainer>
  );
};

export default QuestionForm;
