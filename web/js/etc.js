// chooses a random element from an array 
function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}

// chooses a random element from an array, return its index as well 
function argchoice(a) {
    var index = Math.floor(Math.random() * a.length)
    return [index, a[index]];
}

