import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/favorites');
  });
  const semFv = screen.getByText(/no favorite pokémon found/i);
  expect(semFv).toBeInTheDocument();
});
