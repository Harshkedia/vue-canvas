<template>
  <div>
    <img id="plan-image" src="placeHolder" v-show="false" />
    <canvas id="plan" :width="width" :height="height"></canvas>
    <button @click="queryImage">Download</button>
  </div>
</template>

<script>
import * as apiHandler from "@/lib/BackendHandler";
import * as geom from "@/lib/GeometryUtil";
const firebase = require("firebase/app");
require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "rhythm-day",
  storageBucket: "rhythm-day.appspot.com",
  messagingSenderId: "376005643552",
  appId: "1:376005643552:web:a9ac4ebeca7beca6e2db45",
  measurementId: "G-0N758Y7TKX"
};

export default {
  name: "CanvasClicker",
  props: {
    width: Number,
    height: Number,
    image: String
  },
  data() {
    return {
      canvas: null,
      spaces: [],
      dbStorage: null,
      project: null,
      selectedSpace: null
    };
  },
  mounted() {
    this.canvas = document.getElementById("plan");
    this.initializeFirebase();
    this.canvas.addEventListener("mousedown", e => {
      this.getMousePosition(this.canvas, e);
    });
  },
  methods: {
    initializeFirebase() {
      firebase.initializeApp(firebaseConfig);
      this.dbStorage = firebase.storage();
    },
    queryImage() {
      const name = window.prompt("Project Name");
      this.project = name;
      const storageRef = this.dbStorage.ref(name);
      storageRef.getDownloadURL().then(url => {
        const img = document.getElementById("plan-image");
        img.src = url;
        this.renderPlan();
      });
    },
    renderPlan() {
      const context = this.canvas.getContext("2d");
      const img = document.getElementById("plan-image");
      if (img.complete) {
        context.drawImage(img, 0, 0, this.width, this.height);
        this.drawSpaces();
      } else {
        img.addEventListener("load", this.renderPlan);
        img.addEventListener("error", function() {
          alert("error");
        });
      }
    },
    drawSpaces() {
      const context = this.canvas.getContext("2d");
      const queryString = apiHandler.getSpacesString(this.project);
      apiHandler.callAPI(queryString).then(res => {
        res.getSpaces.map(space => {
          this.spaces.push(space);
          this.drawLabels(space);
          context.beginPath();
          context.strokeStyle = "red";
          space.points.map(point => {
            context.lineTo(point.x, point.y);
          });
          context.stroke();
          context.closePath();
        });
      });
    },
    getMousePosition(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const context = canvas.getContext("2d");
      for (const space of this.spaces) {
        const points = space.points.map(point => {
          return { x: point.x, y: point.y };
        });
        if (geom.insidePolygon(space.name, { x: x, y: y }, points)) {
          this.selectedSpace = space;
          console.log(space.name);
        }
      }
      context.beginPath();
      context.fillStyle = "red";
      context.ellipse(x, y, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      context.fill();
    },
    drawLabels(space) {
      const context = this.canvas.getContext("2d");
      context.fillStyle = "red";
      const center = this.getCenter(space.points);
      context.fillText(space.name, center[0], center[1]);
    },
    getCenter(points) {
      let totalX = 0;
      let totalY = 0;
      for (const point of points) {
        totalX += point.x;
        totalY += point.y;
      }
      return [totalX / points.length, totalY / points.length];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
