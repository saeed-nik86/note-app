<template>
  <div class="w-100 h-100 d-flex" style="justify-content: center;">
    <div
      class="w-75 h-100 p-3 h-100 d-flex"
      style="background: #dfe6e9; flex-direction: column; justify-content: space-between;"
    >
      <div class="mt-4 d-flex text-lg-end" style="justify-content: space-between;">
        <div>
          <router-link to="/" class="p-2 btn-custom" style="text-decoration: none;">خانه</router-link>
          <router-link to="addNote" class="p-2 btn-custom" style="text-decoration: none;">اضافه کردن</router-link>
        </div>
        <div>
          <i class="bi bi-arrow-left text-danger" style="font-size: 25px; cursor: pointer;" @click="back"></i>
        </div>
      </div>
      <div>
        <label for="title" class="label-custom text-center text-lg-end w-100">موضوع:</label>
        <br />
        <input type="text" id="title" class="input-custom-title" v-model="title" />
      </div>
      <div class="mt-5">
        <label for="dic" class="label-custom text-center text-lg-end w-100">متن:</label>
        <br />
        <textarea class="input-custom-dic" id="dic" v-model="Description"></textarea>
      </div>
      <div class="text-center">
        <button class="btn-save-custom p-2" @click="save">ذخیره</button>
        <button class="btn-close-custom p-2" @click="back">انصراف</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
@Options({
  props: {
    id: {
      type: String,
      required: true
    }
  }
})
export default class Home extends Vue {
  id!: string;
  Description: string = "";
  title: string = "";
  mounted() {
    axios.get(`http://localhost:3000/note/${this.id}`).then(res => {
      this.title = res.data.Title;
      this.Description = res.data.Description;
    });
  }
  back(): void {
    this.$emit("back");
  }
  save() {
    axios.patch(`http://localhost:3000/note/${this.id}`, {
      Title: this.title,
      Description: this.Description
    });
    this.$emit("back");
  }
}
</script>

<style>
.input-custom-title {
  border: none;
  background: #fff;
  border-radius: 10px;
  width: 50%;
  height: 3em;
  color: rgb(0, 136, 255);
  font-size: 25px;
  outline: 1px solid rgb(0, 136, 255);
}
.label-custom {
  font-size: 25px;
  font-weight: bolder;
}
.input-custom-dic {
  border: none;
  background: #fff;
  width: 90%;
  height: 20em;
  border-radius: 10px;
  color: rgb(0, 136, 255);
  vertical-align: top;
  outline: 1px solid rgb(0, 136, 255);
  overflow: auto;
  font-size: 20px;
}
.btn-close-custom {
  border: 1px solid rgb(0, 136, 255);
  background: transparent;
  outline: none;
  border-radius: 10px;
}
.btn-save-custom {
  border: none;
  background: rgb(0, 136, 255);
  outline: none;
  border-radius: 10px;
  margin-left: 10px;
}
</style>