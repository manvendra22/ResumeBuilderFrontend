<template lang="html">
  <div class="home">
    <!-- navbar -->
    <Navbar :name="name" :email="email" class="nodisplay"></Navbar>
    <!-- router-view -->
    <div class="container is-widescreen">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import api from '@/api/main';
import jwt_decode from 'jwt-decode';
import Auth from '@/packages/auth/Auth';
export default {
  name: 'navbar',

  data() {
    return {
      name: '',
      email: '',
    };
  },

  mounted() {
    this.userProfile();
    // var decoded = jwt_decode(Auth.getToken());
    // console.log("Decode", decoded);
  },

  created() {
    this.$bus.$on('logout', () => {
      this.$auth.destroyToken();
      this.$toasted.success('Successfully Logged Out!', {
        theme: "outline",
        position: "bottom-center",
        duration : 3000,
      });
      this.redirect();
    });
  },

  methods: {
    userProfile() {
      api.userProfile()
      .then(response => {
        // console.log(response.data.user);
        this.name = response.data.user.name;
        this.email = response.data.user.email;
        this.$toasted.info('Welcome ' + this.name + '!', {
          theme: 'bubble',
          position: 'top-center',
          duration: 800,
          icon: 'perm_identity'
        })
      })
      .catch(error => {
        console.log(error);
        console.log(error.response.status, error.response.statusText);
        this.$toasted.error("Please Logout and Come back again to continue!", {
          theme: 'bubble',
          position: 'bottom-center',
          duration: 3000,
          icon: 'error_outline'
        });
        // this.$toasted.error("Please Logout and come back again to continue", {
        //   theme: 'bubble',
        //   position: 'bottom-center',
        //   duration: 3000,
        // })
      })
    },

    redirect() {
      this.$router.push('/');
    }
  },
  components: {
    Navbar
  },
}
</script>

<style lang="scss">
.home {
  .container {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

}
@media print {
  .nodisplay {
    display: none;
  }
  .container {
    margin: 0;
  }
}
</style>
