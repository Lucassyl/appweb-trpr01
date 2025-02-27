<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
<div class="container mt-4">
  <div class="row mb-4 g-4">
      <div class="col-md-6">
          <div class="card">
              <div class="card-header bg-primary text-white">
                  <h5 class="card-title mb-0">Ajouter un nouveau jeu</h5>
              </div>
              <div class="card-body">
                  <div class="mb-3">
                      <label class="form-label">Nom du jeu</label>
                      <input
                          v-model="newGameName"
                          class="form-control"
                          placeholder="Entrer le nom du jeu"
                      />
                  </div>
                  <div class="mb-3">
                      <label class="form-label">Console</label>
                      <select v-model="newGameConsole" class="form-select">
                          <option
                              v-for="console in consoles"
                              :key="console"
                              :value="console"
                          >
                              {{ console }}
                          </option>
                      </select>
                  </div>
                  <button
                      @click="addGame"
                      class="btn btn-primary w-100"
                      :disabled="!newGameName.trim()"
                  >
                      Ajouter le jeu
                  </button>
              </div>
          </div>
          

  </div>
  <div class="col-md-6">
      <div class="card">
              <div class="card-header bg-success text-white">
                  <h5 class="card-title mb-0">Modifier un jeu</h5>
              </div>
              <div class="card-body">
                  <div class="mb-3">
                      <label class="form-label">Nom du jeu</label>
                      <input
                          v-model="newGameName"
                          class="form-control"
                          placeholder="Entrer le nom du jeu"
                      />
                  </div>
                  <div class="mb-3">
                      <label class="form-label">Console</label>
                      <select v-model="newGameConsole" class="form-select">
                          <option
                              v-for="console in consoles"
                              :key="console"
                              :value="console"
                          >
                              {{ console }}
                          </option>
                      </select>
                  </div>
                  <button
                      @click="addGame"
                      class="btn btn-success w-100"
                      :disabled="!newGameName.trim()"
                  >
                      Ajouter le jeu
                  </button>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
