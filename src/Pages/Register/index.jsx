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
  LinkToLogin,
  RelationshipSelect
} from "./styles";

export const Register = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Type a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    relationship: Yup.string()
      .oneOf(
        ["parent", "grandparent", "sibling", "other"],
        "Invalid relationship"
      )
      .required("Relationship is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Lógica de registro aqui
    console.log("Dados do formulário:", data);
  };

  return (
    <Container>
      <LeftColumn>
        <img
          classname="babyImg"
          src={newBornBaby}
          width={250}
          height={250}
          alt=""
        />
      </LeftColumn>

      <RightColumn>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Register</Title>
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
          <RelationshipSelect>
            <label>Relationship with the baby: </label>
            <select name="relationship" {...register("relationship")}>
              <option value="parent">Parent</option>
              <option value="grandparent">Grandparent</option>
              <option value="sibling">Sibling</option>
              <option value="other">Other</option>
            </select>
            {errors.relationship && <p>{errors.relationship.message}</p>}
          </RelationshipSelect>

          <Button type="submit">Sign Up</Button>
          <LinkToLogin>
            <a href="/login">Already registered? Log in here!</a>
          </LinkToLogin>
        </Form>
      </RightColumn>
    </Container>
  );
};
