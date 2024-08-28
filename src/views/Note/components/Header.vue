<template>
  <div class="w-100 d-flex rounded-top-5" style="height: 10vh; justify-content: center;">
    <div class="w-75 h-100 pt-3 position-relative">
      <input
        type="text"
        placeholder="جستوجو"
        @keyup="searching"
        v-model="search"
        class="w-100 h-75 p-3"
        style="border: none; background: #dfe6e9; border-radius: 4px;"
      />
      <i class="bi bi-search position-absolute" style=" top: 30%; left: 1%; font-size: 25px" @click="searching"></i>
    </div>
  </div>
</template>

<script lang="ts">
import EventBus from "@/views/Event/BusEvent"
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Home extends Vue {
  search: String = ""
  searching(){
    EventBus.emit("searching", this.search)
  }
}
</script>

<style>
</style>