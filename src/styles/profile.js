import styled from 'styled-components';
import { Colors } from '@wisetail/tokens';

export const ProfilePhoto = styled.div`
  position: relative;
  padding-bottom: 100%;
  border-radius: 50%;
  background: ${Colors.SILVER_BASE};
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

export const ProfileIcon = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '100%',
  height: '100%',
  color: Colors.WHITE_BASE,
  transform: 'translate(-50%, -50%)'
};
