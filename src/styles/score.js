import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

export const Par = styled.h3`
  position: relative;
  margin: 0;
  color: ${Colors.FONT_SECONDARY};
  font-size: 1.5em;
  font-weight: bold !important;
  font-style: normal !important;
  line-height: 1;
  text-align: center;

  &:before {
    content: 'Par';
    display: block;
    position: absolute;
    top: 50%;
    left: -1.5rem;
    transform: translate(-100%, -40%);
    color: ${Colors.FONT_BASE};
    font-size: 0.8em;
    font-weight: normal !important;
    line-height: 1;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${Colors.GREEN_50};
    border-radius: 50%;
    z-index: -1;
  }
`;

export const NumberScore = styled.h3`
  margin: 0;
  color: ${Colors.FONT_BASE};
  font-size: 1.5em;
  font-style: normal !important;
  line-height: 1;
`;

export const ParScore = styled.h3`
  position: relative;
  margin: 0;
  color: ${Colors.GREEN_BASE};
  font-size: 1.5em;
  font-weight: bold !important;
  font-style: normal !important;
  line-height: 1;
  text-align: center;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 2em;
    height: 2em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${Colors.GREEN_20};
    border-radius: 50%;
    z-index: -1;
  }

  &:under1 {
    color: ${Colors.FONT_SECONDARY};
    &:before {
      background: ${Colors.GREEN_50};
    }
  }

  &:over1 {
    color: ${Colors.FONT_BASE};
    &:before {
      background: ${Colors.GOLD_BASE};
    }
  }

  &.over2 {
    color: ${Colors.FONT_SECONDARY};
    &:before {
      background: ${Colors.RED_BASE};
    }
  }
`;
