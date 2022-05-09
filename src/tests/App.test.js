import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto "Home"', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLinkEl = screen.getByRole('link', { name: /Home/i });
      expect(homeLinkEl).toBeInTheDocument();
    });

    it('O segundo link deve possuir o texto "About"', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const aboutLinkEl = screen.getByRole('link', { name: /about/i });
      expect(aboutLinkEl).toBeInTheDocument();
    });

    it('O terceiro link deve possuir o texto "Favorite Pokémons".', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const favoriteLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favoriteLinkEl).toBeInTheDocument();
    });

    it('Teste se a aplicação é redirecionada para a página inicial', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/');
      const homeLinkEl = screen.getByRole('link', { name: /Home/i });
      expect(homeLinkEl).toBeInTheDocument();
      userEvent.click(homeLinkEl);
      const pokedexTitle = screen.getByRole('heading',
        { name: /Encountered pokémons/i, lvel: 2 });
      expect(pokedexTitle).toBeInTheDocument();
    });

    it('Testa se a aplicação é redirecionada  para a pagina About', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');
      const aboutLinkEl = screen.getByRole('link', { name: /about/i });
      expect(aboutLinkEl).toBeInTheDocument();
      userEvent.click(aboutLinkEl);
      const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, lvel: 2 });
      expect(aboutTitle).toBeInTheDocument();
    });

    it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/favorites');
        const favoriteLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
        expect(favoriteLinkEl).toBeInTheDocument();
        userEvent.click(favoriteLinkEl);
        const titleEl = screen.getByRole('heading',
          { name: /favorite pokémons/i, lvel: 2 });
        expect(titleEl).toBeInTheDocument();
      });

    it('Testa se a aplicação é redirecionada para a pagina Not Found', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/*');
      const notFoundText = screen.getByRole('heading',
        { name: /page requested not found/i, level: 2 });
      expect(notFoundText).toBeInTheDocument();
    });
  });
