<template>
  <div>
    <img id="plan-image" :src="require('@/assets/' + image)" v-show="false">
    <canvas id="plan" :width="width" :height="height"></canvas>
  </div>
</template>

<script>

export default {
  name: 'CanvasClicker',
  props: {
    width: Number,
    height: Number,
    image: String
  },
  mounted(){
    const canvas = document.getElementById('plan');
    const context = canvas.getContext('2d');
    const img = document.getElementById('plan-image');
    context.drawImage(img, 0, 0, this.width, this.height);

    canvas.addEventListener("mousedown", e => {
      this.getMousePosition(canvas, e);
    });
  },
  methods: {
    getMousePosition(canvas, event) { 
      const rect = canvas.getBoundingClientRect(); 
      const x = event.clientX - rect.left; 
      const y = event.clientY - rect.top; 
      const context = canvas.getContext('2d');
      context.beginPath();
      context.fillStyle="red";
      context.ellipse(x, y, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      context.fill();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
