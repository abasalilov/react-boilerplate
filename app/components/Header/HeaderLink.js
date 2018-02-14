import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 7px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  background-color: white !important;
  font-family: 'Helvetica Neue', Helvetica, Veranda, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #fabd44 !important;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;
