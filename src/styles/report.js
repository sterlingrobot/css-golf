import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody tr {
    border-top: 1px solid ${Colors.SILVER_50};
  }

  th,
  td {
    padding: 1rem 0;
    text-align: left;
    vertical-align: middle;
  }

  .score {
    font-size: 2rem;
    text-align: right;
  }
`;

export { ReportTable };
