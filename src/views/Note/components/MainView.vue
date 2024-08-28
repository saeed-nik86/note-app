<template>
  <div style="height: 83vh; background: #dfe6e9;" class="w-100 rounded-bottom-5 p-4">
    <div>
      <h1 class="text-center text-lg-end">یاداشت های شما</h1>
    </div>
    <div class="mt-4 text-center text-lg-end">
      <router-link to="/" class="p-2 btn-custom" style="text-decoration: none;">خانه</router-link>
      <router-link to="addNote" class="p-2 btn-custom" style="text-decoration: none;">اضافه کردن</router-link>
    </div>
    <div class="container-fluid p-5 mt-2" style="height: 60vh; overflow: auto;">
      <div class="row g-2">
        <div class="col-12 text-center" v-if="!notes.length">
          شما هیچ یاداشتی ندارید
        </div>
        <div
          v-else
          class="col-12 col-md-3 col-lg-2 mx-2 rounded-4 p-3 shadow-lg"
          style="height: 11em; overflow: hidden;"
          v-for="note in notes"
          :key="note.id"
          @dblclick="goEdit(note.id)"
        >
          <div class="d-flex w-100" style="justify-content: space-between;">
            <div
              style="font-size: 20px; overflow: hidden; text-overflow: ellipsis;"
              class="w-50 rounded"
              :class="note.bg"
            >{{note.Title}}</div>
            <div class="w-25 d-flex" style="justify-content: space-between;">
              <div>
                <i
                  class="bi bi-trash text-danger"
                  style="font-size: 20px;"
                  @click="deleteNote(note.id)"
                ></i>
              </div>
              <div>
                <i class="bi bi-pencil text-info" style="font-size: 20px;" @click="goEdit(note.id)"></i>
              </div>
            </div>
          </div>
          <div class="mt-3 w-100" style="overflow: hidden;">
            <span
              class="w-100"
              style="word-wrap: break-word; text-overflow: ellipsis;"
            >{{note.Description}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-start">
      <router-link to="addNote" type="button" class="btn btn-outline-primary" style="text-decoration: none;">
        <i class="bi bi-plus-lg"></i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EventBus from "@/views/Event/BusEvent";
import axios from "axios";
interface Note {
  id: number;
  Title: string;
  Description: string;
  bg: string;
}
@Options({})
export default class Home extends Vue {
  notes: Note[] = [];
  loadInfo() {
    axios
      .get("http://localhost:3000/note")
      .then(res => (this.notes = res.data));
  }
  mounted(): void {
    this.loadInfo();
    EventBus.on("searching", (data: any) => {
      if (data === "") {
        this.loadInfo();
      } else {
        this.notes = this.notes.filter((item: Note) => {
          if (typeof item.Title === "string") {
            return item.Title.includes(data);
          }
        });
      }
    });
  }
  deleteNote(id: string): void {
    axios.delete(`http://localhost:3000/note/${id}`);
    setInterval(() => {
      this.loadInfo();
    }, 200);
  }
  goEdit(id: string): void {
    this.$emit("goEdit", id);
  }
}
</script>

<style>
.btn-custom {
  background: transparent;
  border: none;
  border-bottom: 2px solid gray;
  color: gray;
  font-weight: bold;
  cursor: pointer;
}
.router-link-active {
  color: rgb(0, 136, 255);
  border: none;
  background: transparent;
  border-bottom: 2px solid rgb(0, 136, 255);
  cursor: pointer;
}
</style>