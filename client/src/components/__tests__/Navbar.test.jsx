import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  afterEach, beforeEach, expect, test,
} from '@jest/globals';

import Navbar from '../Navbar';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('back button visible when needed', () => {
  act(() => {
    render(<Navbar back title="test" />, container);
  });

  let backButtons = Array.from(container.querySelectorAll('.backButton'));
  expect(backButtons.length).toBe(1);

  act(() => {
    render(<Navbar back={false} title="test" />, container);
  });

  backButtons = Array.from(container.querySelectorAll('.backButton'));
  expect(backButtons.length).toBe(0);
});
