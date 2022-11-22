import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { act } from 'react-dom/test-utils';

test('testa se app possui os links corretos', () => {
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  const linkAbout = screen.getByRole('link', { name: 'About' });
  const linkFav = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFav).toBeInTheDocument();
});
describe('testa se a aplicação é redirecionada corretamente ao clicar em um dos links', () => {
  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFav);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act (() => {
  history.push('/hehe');
    })
    const textNF = screen.getByRole('heading', { name: /page requested not found/i });
    expect(textNF).toBeInTheDocument();
  });
});
