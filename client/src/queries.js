import { gql } from 'apollo-boost';

/**
 * Post Queries
 */
export const GET_POSTS = gql`
  query{
    getPosts {
      _id
      title
      imageUrl
    }
  }
`;

/* Users Queries */
export const GET_USERS = gql`
  query{
    getUsers {
      _id
      username
      email
      avatar
      joinDate
    }
  }
`;

export const GET_CURRENT_USER = gql`
  {
    getCurrentUser{
      _id
      username
      email
      avatar
      joinDate
      favorites{
        _id
        title
        imageUrl
      }
    }
  }
`;

/**
 * Posts Mutations
 */

// export const CREATE_POST = gql`
// mutation {
//   addPost()
// }
// `;

/**
 * Signin user mutation
 */
export const SIGNIN_USER = gql`
mutation($username:String!,$password:String!){
  signinUser(username:$username,password:$password){
    token
  }
}
`;

export const SIGNUP_USER = gql`
  mutation($username:String!,$email:String!,$password:String!){
    signupUser(username:$username,email:$email,password:$password){
      token
    }
  }
`;
