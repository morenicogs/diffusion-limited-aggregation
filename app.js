let walker
let dla

let capture

const sliders = {}

function setup() {
	let myCanvas = createCanvas(1080, 1920);
	myCanvas.id("myCanvas")
	dla = new DLA()
	dla.init()
	capture = new CCapture({
		format: "jpg",
		name: "frames"
	})
	

}

function draw() {
	frameRate(60)
	// quickContinue(dla)
	// noLoop()
	background(0);
	
	if(dla.walkers.length < 1) {
		noLoop()
		if(settings.recordingMode) {
			capture.stop()
			capture.save()
		}
		
		console.log("done")
	}
	
	dla.update()
	dla.showTree()
	// noLoop()
	if(settings.recordingMode) {
		capture.capture(document.getElementById("myCanvas"))
	}
	


}

function mouseClicked() {
	const newTreePoint = new Walker(mouseX, mouseY, settings.walkersRadius)
	dla.tree.push(newTreePoint)
}


function quickContinue(_dla) {
	let count = _dla.walkers.length
	do {
		_dla.update()
		if(count - _dla.walkers.length > 100) {
			count = _dla.walkers.length
			console.log("Current Count: ", _dla.walkers.length)
			_dla.showTree()
		}
	} while (_dla.walkers.length > 1000)
	console.log("done")
}

function startRecording() {
	settings.recordingMode = true
	capture.start()
}