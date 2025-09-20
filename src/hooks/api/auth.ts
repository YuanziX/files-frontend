import { graphql } from "@/__generated__";

export const SIGNUP_USER_MUTATION = graphql(`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(input: { name: $name, email: $email, password: $password }) {
      user {
        name
      }
      token
    }
  }
`);

export const LOGIN_MUTATION = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        name
      }
      token
    }
  }
`);
