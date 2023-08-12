import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/system';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 40px;
`;

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [draggedQuestionId, setDraggedQuestionId] = useState<number | null>(null);

  const handleQuestionSubmit = (formData: { question: string; options: Option[] }) => {
    setQuestions([...questions, { id: Date.now(), ...formData }]);
  };

  const handleQuestionDelete = (id: number) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleQuestionEdit = (id: number) => {
    // 
  };

  const handleDragStart = (id: number) => {
    setDraggedQuestionId(id);
  };

  const handleDragEnd = () => {
    setDraggedQuestionId(null);
  };

  return (
    <AppContainer>
      <CssBaseline />
      <Typography variant="h4">Survey Questions</Typography>
      <QuestionForm onSubmit={handleQuestionSubmit} />
      <QuestionList
        questions={questions}
        onDelete={handleQuestionDelete}
        onEdit={handleQuestionEdit}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </AppContainer>
  );
};

export default App;

interface Option {
  rule: string;
  answer: string;
}

interface QuestionItem {
  id: number;
  question: string;
  options: Option[];
}
