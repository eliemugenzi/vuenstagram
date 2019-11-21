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

export const CREATE_POST = gql`
mutation($title:String!,$imageUrl:String!,$categories:[String]!,$description:String!,$creatorId:ID!) {
  addPost(title:$title,imageUrl:$imageUrl,categories:$categories,description:$description,creatorId:$creatorId){
    title
    imageUrl
    categories
    description
    createdDate
  }
}
`;

export const GET_POST = gql`
  query($postId:ID!){
    getPost(postId:$postId){
        _id
        title
        imageUrl
        categories
        description
        createdDate
        likes
        comments{
          _id
        }
        createdBy{
          _id
          username
          avatar
        }
      comments{
        _id
        commentBody
        commentDate
        commentUser{
          _id
          username
          avatar
        }
      }
    }
  }
`;

export const INFINITE_SCROLL_POSTS = gql`
  query($pageNum:Int!,$pageSize:Int!){
    infiniteScrollPosts(pageNum:$pageNum,pageSize:$pageSize){
      posts{
        _id
        title
        imageUrl
        categories
        description
        createdDate
        likes
        comments{
          _id
        }
        createdBy{
          _id
          username
          avatar
        }
      }
      hasMore
    }
  }
`;

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

/*
* Signup Mutation
*/

export const SIGNUP_USER = gql`
  mutation($username:String!,$email:String!,$password:String!){
    signupUser(username:$username,email:$email,password:$password){
      token
    }
  }
`;
