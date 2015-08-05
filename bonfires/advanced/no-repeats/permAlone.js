function permAlone(str) {
    var noRepeatPermCount = 0,
        nextPerm = [],
        permStr = str.split(""),
        re = /(\w)\1/;

    permutate(permStr);
    return noRepeatPermCount;

    function permutate(permStr){
        if (permStr.length === 0) {
            if (!re.test(nextPerm.join(""))) noRepeatPermCount++;
        }
        for (var i = 0; i < permStr.length; i++){
            permStr.push(permStr.shift());  //rotate the characters
            nextPerm.push(permStr[0]);    //use the first char in the array
            permutate(permStr.slice(1));  //Recurse: array-less-one-char
            nextPerm.pop();             //clear for nextPerm (multiple pops)
        }
    }
}

console.log(permAlone('abfdefa'));
