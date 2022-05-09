import { render, screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutTitleEl = screen.getByRole('heading',
      { name: /About Pokédex/i, level: 2 });
    expect(aboutTitleEl).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex,/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type,/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imageEl = screen.getByRole('img');
    expect(imageEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
