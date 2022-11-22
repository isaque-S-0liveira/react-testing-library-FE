import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/hehe');
  });
  const textNFD = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(textNFD).toBeInTheDocument();
});

test('Teste se a página mostra a imagem', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/hehe');
  });
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(img.src).toBe(src);
});
