function sam1() {
	return "sam1";
}

console.log(sam1);
console.log(sam1());


var a = function sam2() {
	return "sam2";
}

var b = function() {
	return "sam3";
}

// (function sam4() {
// 	return "sam4";
// })();

console.log(a());
console.log(b());