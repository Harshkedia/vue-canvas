<template>
  <div id="app">
    <canvas-clicker
      :width="canvasWidth"
      :height="canvasHeight"
      :image="canvasImage"
    ></canvas-clicker>
  </div>
</template>

<script>
import CanvasClicker from "./components/CanvasClicker.vue";

export default {
  name: "App",
  components: {
    CanvasClicker
  },
  data: () => ({
    canvasWidth: 800,
    canvasHeight: 400,
    canvasImage: "floor-plan.png"
  })
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
