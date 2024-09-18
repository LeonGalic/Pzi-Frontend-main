<template>
  <div class="about flex justify-center items-center h-screen">
    <Navbar @open="modalOpenCloseHandler" />
    <div v-if="prikaziModal">
      <Modal @close="modalOpenCloseHandler" @submit="handleFormSubmit" />
    </div>
    <div class="container my-4">
      <div class="row">
        <div class="col-lg-6 mb-4">
          <!-- Kartica o stranici -->
          <div class="card rounded bg-dark text-white shadow">
            <div class="card-body text-center">
              <h5 class="card-title">O SkillSwap-u</h5>
              <p class="card-text">
                SkillSwap je inovativna platforma koja omogućuje korisnicima razmjenu vještina i znanja. Bez obzira jesi li programer, dizajner ili majstor u nekom zanatu, na SkillSwap-u možeš pronaći ljude s kojima možeš dijeliti svoje vještine i učiti nove. Naša misija je povezati ljude, potaknuti učenje i osnažiti zajednicu kroz suradnju.
              </p>
              <button class="btn btn-light">
                <a href="https://github.com/tvoj-repozitorij" target="blank"><i class="fab fa-github"></i> Pogledaj kod</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import api from '../plugins/api';
import Modal from '@/components/Modal.vue'
import Footer from '@/components/Footer.vue'


export default {
    name: 'AboutView',
    components: {
        Navbar,
        Modal,
        Footer
    },
    data() {
    return {
      prikaziModal: false,
    };
  },
  methods: {
    modalOpenCloseHandler(){
      this.prikaziModal = !this.prikaziModal
    },
    handleFormSubmit(payload){
      const logInFormData = new URLSearchParams();
      logInFormData.append('email', payload.email);
      logInFormData.append('password', payload.password);
      const API_ENDPOINT2 = '/api/auth/login'
      api.post(API_ENDPOINT2, logInFormData)
      .then(response => {
        // Uspješno sačuvano
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        this.$router.push('/user');
      })
      .catch(error => {
        // Greška pri čuvanju
        console.error(error.response.data.message);
      });
    },
}
}

</script>

<style>
  .about {
    height: 100vh; /* Visina cijelog prozora */
  }
  .card-img-top {
    object-fit: cover;
  }
</style>
