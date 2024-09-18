<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modall">
        <h3>Log in</h3>
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="mb-3">
                <input placeholder="E-mail" type="email" id="email" v-model="formData.email" class="form-control bg-sky-500/75" required>
            </div>
            <div class="mb-3">
                <div class="d-flex">
                <input placeholder="Password" v-bind:type="passwordFieldType" id="password" v-model="formData.password" class="form-control" required>
                <button class="btn btn-link" @click="togglePasswordVisibility">
                  <i v-bind:class="passwordFieldType === 'password' ? 'far fa-eye' : 'far fa-eye-slash'"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-dark mb-3">Prijavi se</button>
        </form>
        <div class="text-start">
            <router-link to="/" @click.self="closeModal" class="p-1 text-decoration-none text-dark border border-dark rounded">Registriraj se</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            formData: {
                email: '',
                password: '',
            },
            passwordFieldType: 'password',
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitForm() {
            this.$emit('submit', { email: this.formData.email, password: this.formData.password });
        },
        togglePasswordVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        },
    }
}
</script>

<style>
    .modall{
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: black;
        border-radius: 10px;
        z-index: 99999;
    }
    .backdrop{
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        z-index: 99998;
    }
</style>