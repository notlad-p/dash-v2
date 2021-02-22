import styled from 'styled-components';

const Widget = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border-radius: 5px;
`;

export default Widget;