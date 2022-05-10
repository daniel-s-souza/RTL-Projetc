import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { PokemonCard, Locations, urlLocations } from './mocks';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`
  Teste se as informações detalhadas do pokémon selecionado são mostradas na tela.`,
  () => {
    renderWithRouter(<App />);
    const pokemon = PokemonCard;
    const linkPokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkPokemonDetails);
    const pokemonNameEl = screen.getByText(`${pokemon.name} Details`);
    expect(pokemonNameEl).toBeInTheDocument();
    expect(linkPokemonDetails).not.toBeInTheDocument();
    const pokemonTitleEl = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(pokemonTitleEl).toBeInTheDocument();
    const pokemonParagraph = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity /i,
    );
    expect(pokemonParagraph).toBeInTheDocument();
  });
  it(`
  Teste se existe na página uma seção com os mapas contendo as localizações do pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = PokemonCard;
    const locations = Locations;
    const url = urlLocations;
    history.push('/pokemons/25');
    const pokemonLocationEl = screen.getByRole('heading',
      { name: `Game Locations of ${pokemon.name}`, level: 2 });
    expect(pokemonLocationEl).toBeInTheDocument();
    locations.forEach((location) => {
      const locationMapEl = screen.getByText(location);
      expect(locationMapEl).toBeInTheDocument();
    });
    const imageLocation = screen.getAllByRole('img',
      { name: `${pokemon.name} location` });
    expect(imageLocation[0]).toHaveAttribute('src', url[0]);
    expect(imageLocation[1]).toHaveAttribute('src', url[1]);
  });
  it(`
  Teste se o usuário pode favoritar um pokémon através da página de detalhes.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkBoxInput = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkBoxInput).toBeInTheDocument();
    userEvent.click(checkBoxInput);
    const favStar = screen.getByRole('img', { name: /pikachu is marked/i });
    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(checkBoxInput);
    expect(favStar).not.toBeInTheDocument();
  });
});
