import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const page = '/pokemon/25';
test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  const fristPk = screen.getByText(/pikachu/i);
  expect(fristPk).toBeInTheDocument();
});
test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  const fristType = screen.getAllByTestId('pokemon-type');
  expect(fristType[0]).toHaveTextContent('Electric');
});
test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  const pkWeight = screen.getByText(/Average weight: 6.0 kg/i);
  expect(pkWeight).toBeInTheDocument();
});
test('A imagem do Pokémon deve ser exibida', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  const img = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(src);
  expect(img.alt).toBe('Pikachu sprite');
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails).toHaveAttribute('href', page);
});
test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(linkDetails);
  expect(history.location.pathname).toBe(page);
});
test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemon/25');
  });
  const checkBox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkBox);
  const starImg = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(starImg).toBeInTheDocument();
  expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
