class DLA {
	constructor() {
		this.walkers = []
		this.overallRadius = settings.walkersRadius
		this.tree = [new Walker(width/2, height/2, this.overallRadius),  new Walker(width/2, 0, this.overallRadius), new Walker(width, 0, this.overallRadius), new Walker(width, height, this.overallRadius), new Walker(width/2, height, this.overallRadius), new Walker(0, height, this.overallRadius), new Walker(0, height/2, this.overallRadius), new Walker(0, 0, this.overallRadius), new Walker(width, height/2, this.overallRadius)]
		this.treePairs = []
		this.stickyRadius = settings.stickyRadius
	}

	init() {
		for (let i = 0; i < settings.particlePopulation; i++) {
			const newWalker = new Walker(random(0, width-0), random(0,height-0), this.overallRadius)
			this.walkers.push(newWalker)
		}
	}

	update() {
		for (const walker of this.walkers) {
			let closest
			let distanceTo = Infinity
			const filteredTree = this.tree.filter( w => Math.hypot(walker.position.x - w.position.x, walker.position.y - w.position.y) <= this.stickyRadius)
			for (const stuckWalker of filteredTree) {
				const distance = Math.hypot(walker.position.x - stuckWalker.position.x, walker.position.y - stuckWalker.position.y)
				if(distance <= this.stickyRadius && distance < distanceTo) {
					distanceTo = distance
					closest = stuckWalker
					

				} else {
					
				}
			}

			if(closest) {
				const newPos = createVector(walker.position.x-closest.position.x, walker.position.y-closest.position.y)
				const angle = newPos.heading()
				newPos.setMag(closest.radius/2 + walker.radius/2)
				walker.position.set(newPos.x + closest.position.x, newPos.y + closest.position.y)
				this.addToTree(walker)
				// stroke("red")
				// noFill()
				// strokeWeight(.5)
				closest.edges.push(walker)
				// this.treePairs.push([closest, walker])
				// line(closest.position.x, closest.position.y, walker.position.x, walker.position.y)
					// this.walkers.push(new Walker(random(50, width-50), random(50,height-50), 1))
			} else {
				walker.walk()
				if(settings.walkersVisible) {
					walker.show()
				}
			}
			
			
		}

		// this.showTree()
	}

	addToTree(walker) {
		const walkerIndex = this.walkers.indexOf(walker)
		this.walkers.splice(walkerIndex, 1)
		this.tree.push(walker)
	}

	showTree() {
		// background(0)
		let count = 0
		for (const stuckWalker of this.tree) {
			
			const extra = (this.tree.length - count)/ this.tree.length
			noFill()
			stroke(255)
			strokeWeight(.25 + 1.5 * extra)
			stuckWalker.edges.forEach( edge => {
				line(stuckWalker.position.x, stuckWalker.position.y, edge.position.x, edge.position.y)
			});
			
			count++
		}
	}

}