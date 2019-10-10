// chooses a random element from an array 
function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}

// chooses a random element from an array, return its index as well 
function argchoice(a) {
    var index = Math.floor(Math.random() * a.length)
    return [index, a[index]];
}

// warning: will chop off top bin if num_bins doesn't evenly divide array length
function binned_sample(array, num_bins, num_samples_per_bin) {
    var results = [];
    var bin_width = Math.floor(array.length / num_bins)
    var index;
    for (var bin_i = 0; bin_i < num_bins; bin_i ++) {
        for (var sample_i = 0; sample_i < num_samples_per_bin; sample_i ++) {
            index = Math.floor(Math.random() * bin_width) + bin_width * bin_i;
            results.push(array[index]);
        }
    }
    return results;
}

// Stolen from the internet, shuffles array in place
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
