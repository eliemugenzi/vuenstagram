<template>
  <div>
    <h3>Home</h3>
    <div v-if="$apollo.loading">Loading...</div>
    <ul
      v-else
      v-for="post in getPosts"
      :key="post._id"
    >
      <li>
        {{post.title}} {{post.description}}
      </li>
      <li>{{post.likes}} likes</li>
    </ul>
  </div>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "home",
  apollo: {
    getPosts: {
      query: gql`
        {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,

      // Alternative way of getting the results from a query
      result({ data, loading, networkStatus }) {
        if (!loading) {
          this.posts = data.getPosts;
          console.log("Network status", networkStatus);
        }
      },
      error(err) {
        console.error(err);
      }
    }
  },
  data() {
    return {
      posts: []
    };
  }
};
</script>
