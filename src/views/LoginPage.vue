<template>
    <v-container fluid class="login-wrapper fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-5 elevation-2 text-center">
            <v-card-title class="center">Workspace</v-card-title>
            <v-img
              contain
              src="@/assets/manufacturing_workspace.png"
              max-width="64"
              class="mx-auto mb-4"
            />
            <div class="text-subtitle-1 font-weight-medium mb-2">
              Log In to continue
            </div>
  
            <!-- STEP 1: Username -->
            <v-form v-if="step == 1" @submit.prevent="nextStep">
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                dense
                autofocus
                required
              />
              <v-btn
                type="submit"
                color="indigo lighten-2"
                class="white--text mt-3"
                block
              >
                CONTINUE
              </v-btn>
            </v-form>
  
            <!-- STEP 2: Password -->
            <v-form v-else @submit.prevent="login">
              <div class="text-caption grey--text mb-2">
                Log in as: <strong>{{ username }}</strong>
              </div>
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                dense
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
              />
              <v-btn
                type="submit"
                color="indigo lighten-2"
                class="white--text mt-3"
                block
              >
                CONTINUE
              </v-btn>
              <v-btn
                color="transparent"
                class="mt-2 text-caption font-weight-medium"
                @click="resetStep"
                block
                >
                <v-icon left small>mdi-arrow-left</v-icon> BACK
            </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        step: 1,
        username: '',
        password: '',
        showPassword: false
      }
    },
    methods: {
        resetStep() {
            this.step = 1;
            this.username = '';
            this.password = '';
            this.showPassword = false;
        },
      nextStep() {
        if (this.username.trim()) {
          this.step = 2;
        }
      },
      async login() {
        const result = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
  
        if (result.success) {
          this.$router.push('/Editor');
        } else {
          alert(result.message || 'Login failed');
        }
      }
    }
  }
  </script>