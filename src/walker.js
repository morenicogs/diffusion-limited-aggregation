class Walker {
	constructor(_x, _y, _r) {
		this.position = createVector(_x, _y)
		this.path = [this.position]
		this.radius = _r
		this.edges = []
		this.angle = random(Math.PI * 2)
	}

	show() {
		noFill()
		stroke(255)
		circle(this.position.x, this.position.y, this.radius)
	}

	update() {
		
	}

	walk() {
		this.angle += random(-Math.PI/12, Math.PI/12)
		let newX = Math.cos(this.angle) * this.radius * 5 + this.position.x
		let newY = Math.sin(this.angle) * this.radius * 5+ this.position.y
		if(newX < 0) {
			newX += width
		}
		if(newX > width) {
			newX -= width
		}
		if(newY <= 0) {
			newY += height
		}
		if(newY > height) {
			newY -= height
		}
		this.position.set(newX, newY)
	}

}