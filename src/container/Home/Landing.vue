<template lang="html">
  <div class="landing">

    <div class="columns is-multiline">

      <div class="column is-one-third" v-for="resume,i in userResumes">
        <div class="card">
          <div class="card-content">
            <figure class="image is-square">
              <img :src=getImage(resume.id)>
            </figure>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <router-link :to="{ name: 'Dashboard', params: { resume_id: resume.id } }">
                Edit
              </router-link>
            </p>
            <p class="card-footer-item">
              <a @click="deleteResume(resume.id)">
                Delete
              </a>
            </p>
          </footer>
        </div>
      </div>

      <div class="column is-one-third flex-apply">
        <div class="card add-button">
          <a class="button is-large" @click="redirect()">
            <span class="icon is-large">
              <i class="fa fa-2x fa-plus-circle"></i>
            </span>
            <span class="add title is-2">Add</span>
          </a>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ViewTemplates from '@/components/ViewTemplates';
import api from '@/api/main';
export default {
  name: 'landing',
  created() {
    this.userTemplates();
    this.display();
  },
  data() {
    return {
      showViewtemplate: false,
      userResumes: [],
      data: {

      }
    }
  },
  methods: {

    redirect() {
      this.$router.push({ name: 'SelectTemplates' });
    },

    userTemplates() {
      api.userTemplates()
      .then(response => {
        console.log("userTemplates", response);
        if(response.data == "No templates") {
          this.$toasted.show('Please select a template to continue!', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000,
            icon: 'add_circle'
          });
        }
        else if(response.data == "user data not found") {
          this.$toasted.show('Please select a template to continue!', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000,
            icon: 'add_circle'
          });
        }
        else {
          this.userResumes = response.data;
        }
      })
      .catch(error => {
        console.log("user template error");
        console.log(error);
        console.log(error.response.status, error.response.statusText);
      });
    },

    deleteResume(resume_id) {
      for (var i = 0; i < this.data.template.length; i++) {
        if(this.data.template[i].id == resume_id) {
          this.data.template.splice(i, 1);
        }
      }
      this.update();
      this.userTemplates();
    },

    display() {
      api.display()
      .then(response => {
        console.log("Display: ", response);
        if(response.data.length == 0) {
          //do nothing
        }
        else {
          this.data = response.data[0].data;
          console.log("Display", this.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
    },

    update() {
      api.update(this.data)
      .then(response => {
        console.log(response);
        if(response.data == "update successful") {
          this.$toasted.success('Updation Successful!', {
            theme: "outline",
            position: "top-center",
            duration : 3000,
          });
        }
        else {

        }
      })
      .catch(error => {
        console.log(error.response);
      })
    },

    getImage(i) {
      return '../../../static/resume/DA' + i + '.png';
    }
  },
  components: {
    ViewTemplates
  }
}
</script>

<style lang="scss">
.landing {

  // margin: 1rem;

  .add-button {
    box-shadow: none;
  }

  .button.is-large {
    padding: 5rem;
    border: solid 2px #ddd;
  }

  .flex-apply {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .column.is-one-third {
    margin-bottom: 1rem;
  }
}
</style>
