import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { Types, Pokemons } from './mocks';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokedexTitle = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it(
    `Teste se é exibido o próximo pokémon da lista quando
     o botão Próximo pokémon é clicado.`,
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const pokeList = Pokemons;
      const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
      pokeList.forEach((pokemon) => {
        const index = screen.getByText(pokemon);
        userEvent.click(nextPokemonBtn);
        expect(index).toBeInTheDocument();
      });
    },
  );
  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText('Charmander');
    const caterpie = screen.queryByText('Caterpie');
    expect(charmander).not.toBeInTheDocument();
    expect(caterpie).not.toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const typesArray = Types;
    typesArray.forEach((button) => {
      const index = screen.getByRole('button', { name: button });
      expect(index).toBeInTheDocument();
    });
    const length = 7;
    const typeTestId = screen.getAllByTestId('pokemon-type-button');
    expect(typeTestId).toHaveLength(length);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextPokemonBtn);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(resetButton);
    expect(pikachu).toBeInTheDocument();
  });
});
