<template>
  <Navbar @open="modalOpenCloseHandler"/>
  <div v-if="prikaziModal">
    <Modal @close="modalOpenCloseHandler" @submit="handleFormSubmit"/>
  </div>
  <div class="position-relative">
  <img id="naslovna-slika" src="../../usluge/Naslovna.jpg" alt="Slika" />
  <div class="position-absolute top-50 start-50 translate-right">
    <h1 class="tekst-naslovna-slika">Izrazite vlastitu</h1>
    <h1 class="tekst-naslovna-slika">kreativnost u svojim</h1>
    <h1 class="tekst-naslovna-slika">uvjetima rada</h1>
  </div>
</div>

  <h1 class="my-5">Popularne usluge:</h1>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 col-lg-3" v-for="usluga in Usluge" :key="usluga.id">
        <div class="card my-3 shadow slike-usluga">
          <img :src="BASE_URL + '/storage/' + usluga.image" class="card-img-top rounded" alt="Slika" />
          <h3 class="mt-3">{{ usluga.title }}</h3>
          <p>{{ usluga.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <h1 class="my-5">Što nudimo:</h1>
  <div class="sekcija-sto-nudimo-obrub">
    <div class="sekcija-sto-nudimo">
      <img class="slika-sto-nudimo" src="../../usluge/slika_sto_nudimo.jpg" alt="Slika">
      <div class="tekst-sto-nudimo">
        <ul>
          <li>Sam biraj što te zanima i što želiš raditi</li>
          <li>Radi od kuće kada ti odgovara</li>
          <li>Pronađi uslugu koja ti treba i olakšaj si posao</li>
        </ul>
      </div>
  </div>
</div>
<Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '../plugins/api';
import Modal from '@/components/Modal.vue'

export default {
    name: 'HomeView',
    components: {
        Navbar,
        Footer,
        Modal
    },
    data(){
      return {
      prikaziModal: false,
      BASE_URL: process.env.VUE_APP_BASE_URL,
      Usluge: [
          { id: 1, image: '', title: '', description: '' },
          { id: 2, image: '', title: '', description: '' },
          { id: 3, image: '', title: '', description: '' },
          { id: 4, image: '', title: '', description: '' },
        ],
    }
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
  },
  mounted() {
    // Dohvatite podatke i postavite putanja kad se komponenta montira
    api.get('/api/services')
      .then(response => {
        const usluge = response.data;
        usluge.sort((a,b) => b.posts_count - a.posts_count)
        usluge.splice(4);
        for(let i=0;i<4;i++){
          this.Usluge[i].image = usluge[i].image_path;
          this.Usluge[i].title = usluge[i].name;
          this.Usluge[i].description = usluge[i].short_description;
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
}
</script>

<style>
#naslovna-slika{
  width: 98.9vw;
  height: 100vh;
}
.tekst-naslovna-slika{
  color: white;
  margin-left: 10vw;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.sekcija-sto-nudimo {
  margin-top: 10vh;
  width: 98.9vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212529;
}
.sekcija-sto-nudimo-obrub {
  background-color: #212529;
  padding-top: 20px;
  padding-bottom: 20px;
}

.slika-sto-nudimo {
  object-fit:fill;
  width: 50%;
  height: 100%;
  border: 2px solid white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.tekst-sto-nudimo {
  color: white;
  width: 50%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-bottom: 50px;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 50px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tekst-sto-nudimo li{
  font-size: 26px;
  margin-bottom: 40px;
}
.slike-usluga .card-img-top {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
</style>