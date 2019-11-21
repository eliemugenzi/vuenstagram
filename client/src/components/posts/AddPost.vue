<template>
  <v-container text-xs-center mt-5 pt-5>

    <!-- Add Post Title -->

   <v-layout row wrap>
     <v-flex xs12 sm6 offset-sm3>
       <h1>Add Post</h1>
     </v-flex>
   </v-layout>

   <!-- Add Post form -->

   <v-layout row wrap>
     <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">
          <!-- Title Input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="titleRules" v-model="title" label="Post title"></v-text-field>
            </v-flex>
          </v-layout>
          <!-- Image URL Input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL"></v-text-field>
            </v-flex>
          </v-layout>

          <!-- Image Preview... -->
          <v-layout row>
           <v-flex xs12>
             <img :src="imageUrl" alt="" height="300px">
            </v-flex>
          </v-layout>

          <!-- Categories -->
          <v-layout row>
            <v-flex xs12>
              <v-select v-model="categories" :items="['Art','Education','Travel','Photography','Love','Technology','Code','Food','Furniture']" multiple label="Categories" :rules="categoriesRules"></v-select>
            </v-flex>
          </v-layout>

          <!-- Description Textarea -->

          <v-layout row>
            <v-flex xs12>
              <v-textarea :rules="descRules" v-model="description" label="Description"></v-textarea>
            </v-flex>
          </v-layout>

          <!-- Submit Button -->
          <v-layout row>
            <v-flex xs12>
              <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                <v-span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </v-span>
                Publish
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
     </v-flex>
   </v-layout>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AddPost',
  data(){
    return{
      isFormValid:true,
      title:'',
      categories:[],
      description:'',
      imageUrl:'',
      titleRules:[
        title=>!!title || 'Title is required',
        title=>title.length<20 || 'Title must have less than 20 characters'
      ],
      imageRules:[
        image=>!!image || 'Image is required'
      ],
      categoriesRules:[
        categories=>categories.length>=1 || 'At least one category is required'
      ],
      descRules:[
        desc=>!!desc || 'Description is required',
        desc=>desc.length<200 || 'Description must have less than 200 characters'
      ]
    }
  },
  methods:{
    ...mapActions(['addPost']),
    handleAddPost(){
       if(this.$refs.form.validate()){
          this.addPost({
            title:this.title,
            imageUrl:this.imageUrl,
            categories:this.categories,
            description:this.description,
            creatorId:this.user._id
          });
          this.$router.push('/');
       }
    },
  },
  computed:{
    ...mapGetters(['user','loading'])
  }
};
</script>
