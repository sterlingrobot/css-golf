import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody tr {
    border-top: 1px solid ${Colors.SILVER_50};

    &:first-child {
      border: 0;
    }
  }

  th,
  td {
    padding: 1rem 0;
    text-align: left;
    vertical-align: top;
  }

  th small {
    display: block;
    font-weight: normal;
    font-style: italic;
  }

  h3 {
    margin: 0;
    color: ${Colors.GREEN_50};
    font-weight: 300;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
  }

  .score {
    font-size: 2rem;
    text-align: right;
  }
`;

export { ReportTable };
