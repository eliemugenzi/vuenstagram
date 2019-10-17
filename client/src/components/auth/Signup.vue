<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get started here</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->

    <v-layout row wrap v-if="error">
      <v-flex xs12 sm16 offset-sm3>
        <form-alert :message="error.message">

        </form-alert>
      </v-flex>
    </v-layout>


    <!-- Signup Form -->

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="primary" dark>
           <v-container>
             <v-form class="form" @submit.prevent="handleSignupUser" v-model="isFormValid" lazy-validation ref="form">
               <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="username" prepend-icon="face" label="Username" type="text" :rules="usernameRules" required></v-text-field>
                  </v-flex>
               </v-layout>
                <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="email" prepend-icon="email" label="Email Address" type="email" :rules="emailRules" required></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" :rules="passwordRules" required></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                  <v-flex xs12>
                     <v-text-field v-model="passwordConfirmation" prepend-icon="gavel" label="Confirm Password" type="password" :rules="passwordRules" required></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                  <v-flex xs12>
                     <v-btn color="info" type="submit" :loading="loading" :disabled="!isFormValid || loading">
                       <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                       Signup
                       </v-btn>
                     <h3>Already have an account? &nbsp;
                       <v-btn color="error" to="/signin">Sign In</v-btn>
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
  name: 'Signup',
  computed:{
    ...mapGetters(['error','loading','user'])
  },
  data(){
    return{
      isFormValid:true,
      username:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      usernameRules:[
        username=>!!username || 'Username is required',
        username=>username.length>10 || 'Username can not be more than 10 characters'
      ],
      emailRules:[
        email=>!!email || 'Email is required',
        email=>/.@+./.test(email) || 'Email must be valid'
      ],
      passwordRules:[
        password=>!!password || 'Password is required',
        password=>password.length>=4 || 'Password must be at least 4 characters',
        confirmation=>confirmation===this.password || 'Passwords must match'
      ]
    }
  },
  methods:{
    handleSignupUser(){
      if(this.$refs.form.validate()){
         this.$store.dispatch('signupUser',{
           username:this.username,
           email:this.email,
           password:this.password
        });
      }
    }
  },
  watch:{
    user(value){
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
