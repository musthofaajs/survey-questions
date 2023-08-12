import React, { useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/system';
import QuestionForm from './components/QuestionForm';

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 40px;
`;

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Array<{ id: number; question: string; options: Array<{ rule: string; answer: string }> }>>([]);

  const handleQuestionSubmit = (formData: { question: string; options: Array<{ rule: string; answer: string }> }) => {
    setQuestions([...questions, { id: Date.now(), ...formData }]);
  };

  return (
    <AppContainer>
      <CssBaseline />
      <Typography variant="h4">Survey Questions</Typography>
      <QuestionForm onSubmit={handleQuestionSubmit} />
    </AppContainer>
  );
};

export default App;
