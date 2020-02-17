import styled from 'styled-components';

export const ProfilePhoto = styled.div`
  position: relative;
  padding-bottom: 100%;
  border-radius: 50%;
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
