import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

export const Logo = styled.div`
  position: relative;
  width: 3px;
  height: 60px;
  margin: 0 1rem;
  background: ${Colors.SILVER_50};
  border-radius: 1.5px;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
  }

  &:before {
    width: 25px;
    height: 15px;
    border: 10px solid transparent;
    border-right: 25px solid ${Colors.RED_120};
    top: 3px;
    right: calc(100% - 1.5px);
  }

  &:after {
    width: 15px;
    height: 5px;
    background: ${Colors.BLACK_BASE};
    border-radius: 50%;
    bottom: -3px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
  }
`;
