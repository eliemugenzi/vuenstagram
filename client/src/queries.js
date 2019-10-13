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

/**
 * Posts Mutations
 */

// export const CREATE_POST = gql`
// mutation {
//   addPost()
// }
// `;
