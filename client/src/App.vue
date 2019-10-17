<template>
  <v-app>
     <!-- Side navigation drawer -->
     <v-navigation-drawer app temporary fixed v-model="sideNav">
       <v-toolbar color="accent" dark flat>
         <v-app-bar-nav-icon @click="toggleSideNav">
         </v-app-bar-nav-icon>
         <router-link to="/" tag="span">
              <h3 class="title pl-3">Vuenstagram</h3>
          </router-link>
       </v-toolbar>
       <v-divider></v-divider>

       <!-- Sidebar links -->

       <v-list>
         <v-list-item ripple v-for="item in sideNavItems" :key="item.title" class="side__items" :to="item.link">
           <v-list-item-action>
             <v-icon>{{item.icon}}</v-icon>
           </v-list-item-action>
           <v-list-item-content>
             {{item.title}}
           </v-list-item-content>
         </v-list-item>

         <!-- Signout Button -->

         <v-list-item v-if="user" @click="handleSignout">
           <v-list-item-action>
             <v-icon>exit_to_app</v-icon>
           </v-list-item-action>
           <v-list-item-content>Signout</v-list-item-content>
         </v-list-item>

       </v-list>
     </v-navigation-drawer>
    <v-app-bar class="appBar">
    <v-toolbar fixed dark color="info">
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" class="link" tag="span" style="cursor:pointer">Vuenstagram</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search Input  -->

      <v-text-field flex prepend-icon="search" placeholder="Search posts" color="accent" single-line-hide-details></v-text-field>
      <v-spacer></v-spacer>

      <!-- Horizontal navbar links -->

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link" color="info">
           <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
           {{item.title}}
        </v-btn>

        <!-- Profile Button -->

        <v-btn flat to='/profile' v-if="user" color="info">
            <v-icon class="hidden-sm-only" left>account_box</v-icon>
            <v-badge right color="blue darken-2">
              <span slot="badge">1</span>
              Profile
            </v-badge>
        </v-btn>

        <!-- Signout Button -->

        <v-btn flat v-if="user" class="info" @click="handleSignout">
          <v-icon class="hidden-sm-only">exit_to_app</v-icon>
          Signout
        </v-btn>

      </v-toolbar-items>

    </v-toolbar>
    </v-app-bar>

    <!-- App component -->

   <main class="mt-5 main">
     <v-container>
       <transition name="fade">
         <router-view />
       </transition>
       <!-- Auth Snackbar -->
       <v-snackbar color="success" v-model="authSnackbar" :timeout="5000" bottom left>
         <v-icon class="mr-3">check_circle</v-icon>
         <h3>You are now signed in!</h3>
         <v-btn dark flat @click="authSnackbar=false">Close</v-btn>
       </v-snackbar>

       <!-- Auth Error Snackbar -->
       <v-snackbar v-if="authError" color="error" v-model="authErrorSnackbar" :timeout="5000" bottom left>
         <v-icon class="mr-3">cancel</v-icon>
         <h3>{authError.message}</h3>
         <v-btn dark flat to="/signin">Signin</v-btn>
       </v-snackbar>
     </v-container>
   </main>

  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  computed: {
    ...mapGetters(['user','authError']),
    horizontalNavItems(){
       let items=[
      {
        icon: 'chat',
        title: 'Posts',
        link: '/posts',
      },
      {
        icon: 'lock_open',
        title: 'Sign In',
        link: '/signin',
      },
      {
        icon: 'create',
        title: 'Sign Up',
        link: '/signup',
      },
    ];
      if(this.user){
         items=[
           {icon:'chat',title:'Posts',link:'/posts'},
          //  {icon:'stars',title:'New Post',link:'/posts/new'},
          //  {icon:'account_box',title:'Profile',link:'/profile'}
         ];
    }
    return items;
    },
    sideNavItems(){
      let items=[
      {
        icon: 'chat',
        title: 'Posts',
        link: '/posts',
      },
      {
        icon: 'lock_open',
        title: 'Sign In',
        link: '/signin',
      },
      {
        icon: 'create',
        title: 'Sign Up',
        link: '/signup',
      },
    ];
    if(this.user){
      items=[
           {icon:'chat',title:'Posts',link:'/posts'},
           {icon:'stars',title:'New Post',link:'/posts/add'},
           {icon:'account_box',title:'Profile',link:'/profile'}
         ];
    }

    return items;

    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignout(){
      this.signOut();
    },
    ...mapActions(['signOut'])
  },
  watch:{
    user(newValue,oldValue){
      // If we had no value for user before, show snackbar
      if(oldValue===null){
        this.authSnackbar=true;
      }
    },
    authError(value){
      // If !authError
      if(value!==null){
        this.authErrorSnackbar=true;
      }
    }
  }
};
</script>

<style lang="scss">
  .link{
    color:white;
  }
  .appBar{
    height: 40px;
    max-height: 0px;
    margin-bottom: 30px;
  }
  .fade-enter-active,.fade-leave-active{
    transition-property: all;
    transition-duration: 0.25s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
    transform:translateY(30px);
  }
  .fade-enter-active{
    transition-delay: 0.25s;
  }
</style>
