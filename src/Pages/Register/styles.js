import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .7rem;
  height: 100vh;
  background-color: #c6ddbc;
`

export const Form = styled.form`
  background-color: #98FB98;
  width: 400px;
  height: 250px;
  padding: 40px;
  border-radius: 8px;
  margin-bottom: 4rem;
`

export const LeftColumn = styled.div`
  background-image: url("./assets/newBornBaby.svg");
  background-size: cover;
  background-color: #98FB98;
  width: 400px;
  height: 350px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  img{
    transform: translate(20%, 12.5%);
  }
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #98FB98;
  width: 400px;
  height: 350px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  margin-top: -1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  font-family: "Montserrat";
`

export const Label = styled.label`
  margin-bottom: 8px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const RelationshipSelect = styled.div`
  margin-bottom: .6rem;
  font-size: 14px;
`

export const Button = styled.button`
  background-color: forestgreen;
  width: 320px;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  font-size: 13px;
;

  &:hover{
    background-color: #c6ddbc;
    color: #000;
  }
` 

export const LinkToLogin = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  font-size: 12px;
`