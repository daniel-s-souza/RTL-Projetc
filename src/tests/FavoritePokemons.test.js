import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFoundMessage = screen.getByText('No favorite pokemon found');
    expect(noFoundMessage).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = 4;
    history.push('/pokemons/65');
    const pokemonCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(pokemonCheckbox);
    history.push('/pokemons/25');
    userEvent.click(pokemonCheckbox);
    history.push('/pokemons/148');
    userEvent.click(pokemonCheckbox);
    history.push('/pokemons/78');
    userEvent.click(pokemonCheckbox);
    history.push('/favorites');
    const favoritePokemons = screen.getAllByRole('link', { name: /more details/i });
    expect(favoritePokemons).toHaveLength(favorites);
  });
});
