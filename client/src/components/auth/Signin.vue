<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->

    <v-layout row wrap v-if="error">
      <v-flex xs12 sm16 offset-sm3>
        <form-alert :message="error.message">

        </form-alert>
      </v-flex>
    </v-layout>


    <!-- Signin Form -->

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
           <v-container>
             <v-form class="form" @submit.prevent="handleSigninUser" v-model="isFormValid" lazy-validation ref="form">
               <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="username" prepend-icon="face" label="Username" type="text" :rules="usernameRules" required></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" :rules="passwordRules" required></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                  <v-flex xs12>
                     <v-btn color="accent" type="submit" :loading="loading" :disabled="!isFormValid || loading">
                       <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                       Signin
                       </v-btn>
                     <h3>Don't have an account? &nbsp;
                       <router-link to="/signup">Signup</router-link>
                     </h3>
                  </v-flex>
               </v-layout>
             </v-form>
           </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Signin',
  data(){
    return{
      username:'',
      password:'',
      usernameRules:[
        // Check if username in input
        username => !!username || 'Username is required',
        // Make sure username is less than 10 characters
        username => username.length < 12 || 'Username must be less than 12 characters'
      ],
      passwordRules:[
        password => !!password || 'Password is required',
        password=>password.length>=5 || 'Password must be at least 5 characters'
      ],
      isFormValid:true
    }
  },
  methods:{
    handleSigninUser(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('signinUser',{
        username:this.username,
        password:this.password
      });
      }
    }
  },
  computed:{
    ...mapGetters(['user', 'error','loading'])
  },
  watch:{
    user(value){
      console.log('object', 'Hello watch');
      // If user value changes, redirect to the homepage
      if(value){
        this.$router.push('/');
      }
    }
  }
};
</script>

<style lang="scss">
  .form{
    margin:auto 10%;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
