<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand logo custom-logo">SkillSwap</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">O nama</router-link>
          </li>
          <li class="nav-item">
            <a href="https://github.com/leongalic" class="nav-link" target="_blank">GitHub</a>
          </li>
          <li class="nav-item">
            <button class="nav-link btn custom-btn btn-outline-light" @click="openModal">Prijavi se</button>
          </li>
          <li class="nav-item">
            <router-link to="/" class="btn custom-register-btn" >Registriraj se</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    methods: {
        openModal() {
            this.$emit('open');
        }
    }
  };
  </script>
  
  <style>
    .custom-logo {
        margin-left: 20px;
        color: white !important;
    }

    .custom-logo:hover {
        cursor: pointer; 
    }
    .custom-btn {
        background-color: transparent !important; 

    }
    .custom-register-btn{
      border: solid #eae9e9 2px !important;
      color: #eae9e9 !important;
      margin-right: 20px;
    }
    .custom-register-btn:hover {
      background-color: #eae9e9 !important;
      color: #212529 !important;
      border: 2px solid white;
    }
    .nav-link.router-link-active{
        border-bottom: solid 1px #eae9e9;
        color: #eae9e9;
    }

  </style>
  