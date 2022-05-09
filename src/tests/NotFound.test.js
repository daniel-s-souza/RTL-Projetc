import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it(
    'Teste se a página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/*');
      const notFoundText = screen.getByRole('heading',
        { name: /Page requested not found/i });
      const emoji = screen.getByRole('img', { name: 'Crying emoji' });
      expect(notFoundText).toBeInTheDocument();
      expect(emoji).toBeInTheDocument();
    },
  );
  it('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/*');
    const imageNotFound = screen.getAllByRole('img');
    expect(imageNotFound[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
