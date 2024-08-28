<template>
  <div class="w-100 rounded-5 shadow-lg" style="height: 93vh;">
    <Header v-if="main" />
    <MainView v-if="main" @goEdit="changeState" />
    <Edit-Note v-if="!main" :id="propInfo" @back="changeState"/>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
import MainView from "./components/MainView.vue";
import EditNote from "./components/EditNote.vue"
import { Options, Vue } from "vue-class-component";
@Options({
  components: {
    Header,
    MainView,
    EditNote
  }
})
export default class Home extends Vue {
  main: Boolean = true
  propInfo: string = ""
  changeState(id: string): void{
    this.propInfo = id
    this.main = !this.main
  }
}
</script>

<style>
</style>