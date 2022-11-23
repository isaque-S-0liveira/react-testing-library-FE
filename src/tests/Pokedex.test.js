import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa pokedex e...', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/');
    });
    const semFv = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(semFv).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/');
    });
    const bttPx = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(bttPx).toBeInTheDocument();
    userEvent.click(bttPx);
    const secondPk = screen.getByText(/charmander/i);
    expect(secondPk).toBeInTheDocument();
  });
  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const bttFilter = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(bttFilter[0]).toHaveTextContent(types[0]);
    expect(bttFilter[1]).toHaveTextContent(types[1]);
    expect(bttFilter[2]).toHaveTextContent(types[2]);
    expect(bttFilter[3]).toHaveTextContent(types[3]);
    expect(bttFilter[4]).toHaveTextContent(types[4]);
    expect(bttFilter[5]).toHaveTextContent(types[5]);
    expect(bttFilter[6]).toHaveTextContent(types[6]);
  });
  test('Testa se o botão All é clicavel', () => {
    renderWithRouter(<App />);
    const bttAll = screen.getByRole('button', { name: /all/i });
    expect(bttAll).toBeInTheDocument();
    userEvent.click(bttAll);
  });
});
