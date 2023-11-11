import styled from 'styled-components';

export const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight: 400;
    span{
      font-weight: bold;
    }
  }
  padding: .4rem;
  background-color: rgba(34, 34, 34, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9997;
  position: fixed; /* Agregado para hacer que el menú se quede fijo en la parte superior */
  top: 0; /* Alineado al borde superior */
  left: 0;
  right: 0; 

  a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    a{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
  .links.active{
    background-color: rgba(34, 34, 34, 0.8);
    width: 100%;
    display: block;
    z-index: 1;
    margin-top: 84px;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    a{
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
  .burguer{
    @media(min-width: 768px){
      display: none;
      z-index: 1;
    }
  }
`