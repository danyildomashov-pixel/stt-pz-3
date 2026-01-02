import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Импорт без фигурных скобок!

test("Matches DOM Snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test('renders learn anapioficeandfire link', () => {
  render(<App />);
  // Ищем заголовок или ссылку с этим текстом
  const linkElement = screen.getByText(/Learn An API of Ice And Fire/i);
  expect(linkElement).toBeInTheDocument();
});