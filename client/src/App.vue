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
      </v-toolbar-items>

    </v-toolbar>
    </v-app-bar>

    <!-- App component -->

   <main class="mt-5 main">
     <v-container>
       <transition name="fade">
         <router-view />
       </transition>
     </v-container>
   </main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      sideNav:false
    }
  },
  computed:{
    horizontalNavItems:()=>{
      return[
        {
          icon:'chat',
          title:'Posts',
          link:'/posts'
        },
        {
          icon:'lock_open',
          title:'Sign In',
          link:'/signin'
        },
        {
          icon:'create',
          title:'Sign Up',
          link:'/signup'
        }
      ]
    },
    sideNavItems:()=>{
      return[
        {
          icon:'chat',
          title:'Posts',
          link:'/posts'
        },
        {
          icon:'lock_open',
          title:'Sign In',
          link:'/signin'
        },
        {
          icon:'create',
          title:'Sign Up',
          link:'/signup'
        }
      ]
    }
  },
  methods:{
    toggleSideNav(){
      this.sideNav=!this.sideNav;
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
