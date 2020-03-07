import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Colors } from '@wisetail/tokens';

const linkStyle = `
display: flex;
flex-flow: row nowrap;
justify-content: flex-start;
align-items: center;
margin: 1em 1em 0 0;
color: ${Colors.BLUE_BASE};
text-decoration: none;

&:hover,
&:active {
  text-decoration: none;
}

> wds-icon {
  margin-right: 0.25em;
  color: inherit;
  transform: translate(0, 0.025em);
  transition: 250ms transform;
}

&:hover > wds-icon {
  transform: translate(-0.2em, 0.025em);
}
`;
const InternalLink = styled(Link)`
  ${linkStyle}
`;
const ExternalLink = styled.a`
  ${linkStyle}
`;

const HeaderLink = styled(Link)`
  color: ${Colors.BLACK_BASE};
  text-decoration: none;
  font-size: 1.2rem;
`;

export { InternalLink, ExternalLink, HeaderLink };
