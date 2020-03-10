<template>
	<div>
		<img id="plan-image" :src="require('@/assets/' + image)" v-show="false" />
		<canvas id="plan" :width="width" :height="height"></canvas>
	</div>
</template>

<script>
import store from "@/test.json";

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
			spaces: []
		};
	},
	mounted() {
		this.canvas = document.getElementById("plan");
		this.spaces = store;
		this.renderPlan();
		this.canvas.addEventListener("mousedown", e => {
			this.getMousePosition(this.canvas, e);
		});
	},
	methods: {
		renderPlan() {
			const context = this.canvas.getContext("2d");
			const img = document.getElementById("plan-image");
			if (img.complete) {
				context.drawImage(img, 0, 0, this.width, this.height);
				this.drawSpaces();
				this.drawLabels();
			} else {
				img.addEventListener("load", this.renderPlan);
				img.addEventListener("error", function() {
					alert("error");
				});
			}
		},
		drawSpaces() {
			const context = this.canvas.getContext("2d");
			this.spaces.map(space => {
				context.beginPath();
				context.fillStyle = "rgba(100,100,100,50)";
				space.points.map(point => {
					context.lineTo(point[0], point[1]);
					context.fill();
				});
				context.closePath();
			});
		},
		getMousePosition(canvas, event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const context = canvas.getContext("2d");
			context.beginPath();
			context.fillStyle = "red";
			context.ellipse(x, y, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
			context.fill();
		},
		drawLabels() {
			const context = this.canvas.getContext("2d");
			context.fillStyle = "red";
			this.spaces.map(space => {
				const center = this.getCenter(space.points);
				context.fillText(space.name, center[0], center[1]);
			});
		},
		getCenter(points) {
			let totalX = 0;
			let totalY = 0;
			for (const point of points) {
				totalX += point[0];
				totalY += point[1];
			}
			return [totalX / points.length, totalY / points.length];
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
