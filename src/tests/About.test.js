import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente about', () => {
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/about');
    });
    const infoPokedex1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const infoPokedex2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    expect(infoPokedex1).toBeInTheDocument();
    expect(infoPokedex2).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/about');
    });
    const tituloPk = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(tituloPk).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/about');
    });
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
