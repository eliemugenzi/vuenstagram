<template>
  <v-container
    text-xs-center
    v-if="posts"
  >
    <v-layout row class="spinner__layout">
       <v-dialog v-model="loading" persistent fullscreen>
          <v-container full-height>
             <v-layout row justify-center align-center>
               <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
             </v-layout>
          </v-container>
       </v-dialog>
    </v-layout>
    <v-flex xs12>
      <v-carousel
        v-if="!loading && posts.length > 0"
        v-bind="{'cycle':true}"
        interval="3000"
      >
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
          @click.native="goToPost(post._id)"
        >
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data() {},
  methods: {
    handleGetCarouselPosts() {
      // Reach out to Vuex store, fire action that gets posts for carousel
      this.$store.dispatch('getPosts');
    },
    goToPost(postId){
      this.$router.push(`/posts/${postId}`);
    },

    // Alternative way of mapping the actions to be like `this.getPosts()`
    ...mapActions(['getPosts']),
  },
  created() {
    this.handleGetCarouselPosts();
  },
  computed: {

    // The first possible way of getting data from Vuex store
    posts() {
      return this.$store.getters.posts;
    },

    // Another way of getting data from Vuex store
    ...mapGetters(['loading']),
  },
};
</script>

<style lang="scss" scoped>
#carousel__title {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}

.spinner__layout{
  position:absolute;
  width: 100vw;
  height:100vh;
  display: grid;
  place-content: center;
}
</style>
