import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

export const Par = styled.h3`
  position: relative;
  margin: 0;
  color: ${Colors.GREEN_BASE};
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
    left: -1.25rem;
    transform: translate(-100%, -40%);
    font-size: 0.8em;
    line-height: 0;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-0.333em, -50%);
    border: 1em solid transparent;
    border-left: 2.5em solid ${Colors.GREEN_20};
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

  &.incomplete {
    font-size: 1.2em;
    color: ${Colors.GOLD_BASE};

    &:before {
      background: transparent;
    }
  }

  &.under1 {
    color: ${Colors.FONT_SECONDARY};

    &:before {
      background: ${Colors.GREEN_50};
    }
  }

  &.over1 {
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
