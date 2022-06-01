<template>
  <div id="app">
    <header class="header">
      <h1>An app that translates Japanese into English and generates a URL</h1>
    </header>

    <div class="main">
      <h3>日本語</h3>

      <textarea id="japanese" class="japanese" cols="80" rows="2"></textarea>

      <div>
        <button @click="translate()" class="btn">翻訳</button>
      </div>

      <h3>English</h3>

      <textarea id="english" class="english" cols="80" rows="2"></textarea>

      <p id="err"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    translate() {
      const text = document.getElementById("japanese").value;
      this.$api
        .post(this.$apiName, "/translate", { body: text })
        .then((res) => {
          document.getElementById("english").value = res;
        })
        .catch((err) => {
          console.log(err);
          document.getElementById("err").innerHTML = err;
        });
    },
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}
#app {
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.header {
  background-color: #f59032;
  padding: 0.1rem;
  color: #ffffff;
}

.main {
  margin-top: 1rem;
}

.japanese {
  font-size: 120%;
  line-height: 1.5rem;
}

.btn {
  text-decoration: none;
  height: 2rem;
  color: #000000;
  border: solid 2px #000000;
  border-radius: 3px;
  transition: 0.4s;
  font-size: 15px;
  background-color: #e8f6f7;
  outline: none;
  margin-top: 0.5rem;
}

.btn:hover {
  background: #f59032;
  cursor: pointer;
}

.english {
  font-size: 120%;
  line-height: 1.5rem;
}

#err {
  color: #ff0000;
}
</style>
