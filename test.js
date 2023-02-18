const a = {
    name: "bob",
    password: "bobbo"
}

const arr = [a];

a.notname = "notbob";

console.log(arr.includes(a))