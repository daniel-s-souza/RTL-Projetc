import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { PokemonCard } from './mocks';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const card = PokemonCard;
    const pokemonName = screen.getByText(card.name);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getAllByText(card.type);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(card.type);
    expect(pokemonType[0]).toBeInTheDocument();
    const pokemonWeigth = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeigth).toBeInTheDocument();
    const pokemonImage = screen.getByRole('img', { name: `${card.name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it(`
  Teste se o card do pokémon indicado na 
  Pokédex contém um link de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const card = PokemonCard;
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toHaveProperty('href', `http://localhost/pokemons/${card.id}`);
  });
  it(`
    Teste se ao clicar no link de 
    navegação do pokémon, é feito o redirecionamento da aplicação para 
    a página de detalhes de pokémon.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const card = PokemonCard;
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${card.id}`);
  });
  it('', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const favoritePokemon = screen.getByRole('checkbox',
      { name: /pokémon favoritado?/i });
    userEvent.click(favoritePokemon);
    const favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
