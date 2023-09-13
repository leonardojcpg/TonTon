import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import newBornBaby from "./assets/newBornBaby.svg";
import {
  Input,
  Container,
  Form,
  Title,
  Label,
  Button,
  LeftColumn,
  RightColumn,
  LinkToLogin
} from "./styles";

export const Login = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Type a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
  };

  return (
    <Container>
      <LeftColumn>
        <img
          className="babyImg"
          src={newBornBaby}
          width={250}
          height={250}
          alt=""
        />
      </LeftColumn>

      <RightColumn>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          <div>
            <Label>Email: </Label>
            <Input
              name="email"
              type="email"
              placeholder="Type your email"
              {...register("email")}
              {...errors.password?.message}
            />
          </div>
          <div>
            <label>Password: </label>
            <Input
              name="password"
              type="password"
              placeholder="Type your password"
              {...register("password")}
              {...errors.password?.message}
            />
          </div>
          <Button type="submit">Sign In</Button>
          <LinkToLogin>
            <a href="/">Register here!</a>
          </LinkToLogin>
        </Form>
      </RightColumn>
    </Container>
  );
};
