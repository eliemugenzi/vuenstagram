<template>
  <div>
    <h3>Home</h3>
    <ApolloQuery :query="getPostsQuery">
      <!-- <template slot-scope="{result:{ loading, error, data, networkStatus }}"> -->
       <template slot-scope="{result:{ loading, error, data }}">
         <div v-if="loading">Loading...</div>
         <div v-else-if="error">{{error}}</div>
         <!-- <div v-else-if="networkStatus">Network status: {{networkStatus}} </div> -->
         <ul v-else v-for="post in data.getPosts" :key="post._id">
           <li>
             {{post.title}}
             {{post.description}}
             {{post.likes}}

           </li>
         </ul>
       </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "home",
  // apollo: {
  //   getPosts: {
  //     query: gql`
  //       {
  //         getPosts {
  //           _id
  //           title
  //           imageUrl
  //           description
  //           likes
  //         }
  //       }
  //     `,

  //     // Alternative way of getting the results from a query
  //     result({ data, loading, networkStatus }) {
  //       if (!loading) {
  //         this.posts = data.getPosts;
  //         console.log("Network status", networkStatus);
  //       }
  //     },
  //     error(err) {
  //       console.error(err);
  //     }
  //   }
  // },
  data() {
    return {
      posts: [],
      getPostsQuery:gql`
        {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `
    };
  }
};
</script>
