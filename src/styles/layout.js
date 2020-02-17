import styled from 'styled-components'

const HeaderFooterWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-rows: max-content auto max-content;
  min-height: 100vh;
`
const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem 1rem;
`
const Page = styled.div`
  padding: 1rem;
`
const Footer = styled.div`
  padding: 1rem;
  text-align: center;
  opacity: .3;
`

export {
  HeaderFooterWrapper,
  Header,
  Page,
  Footer,
}
