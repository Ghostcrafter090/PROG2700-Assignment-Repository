const string0 = "hello from a potato"
const string1 = "the character at the start of this string will be the same as at the end... t"

function reverseString(string) {
    let i = 0;
    let newString = "";
    while (i < string.length) {
        newString = newString + string[string.length - (i + 1)];
        i = i + 1;
    }
    return newString
}

function replaceCharAtX(string, char, x) {
    let i = 0;
    let newString = "";
    while (i < string.length) {
        if (i == x) {
            newString = newString + char;
        } else {
            newString = newString + string[i];
        }
        i = i + 1;
    }
    return newString;
}

function weirdThing(string) {
    if (string[string.length - 1] == string[0]) {
        out = reverseString(string);
    } else {
        char0 = string[0];
        out = replaceCharAtX(string, string[string.length - 1], 0);
        out = replaceCharAtX(out, char0, string.length - 1);
    }
    return out;
}

console.log(weirdThing(string0));
console.log(weirdThing(string1));