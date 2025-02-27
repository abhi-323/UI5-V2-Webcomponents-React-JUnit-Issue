import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render the App component with a Button', () => {
    render(<App />);
    
    const buttonElement = screen.getByText(/Button Text/i);
    expect(buttonElement).toBeInTheDocument();
  });

});