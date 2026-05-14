
//字符串类型
let username: string = 'itcast'

//数字类型
let age: number = 20

//布尔类型
let isTrue: boolean = true

console.log(username)
console.log(age)
console.log(isTrue)

//字面量类型
function printText(s: string, alignment: 'left'|'right'|'center'){
    console.log(s,alignment)
}

printText('hello', 'left')

//定义一个接口，名字为Cat
interface Cat {
    name: string,
    age?: number  //当前属性为可选
}

//定义变量为Cat类型
const c1: Cat = { name: '小白', age: 1 }
//const c2: Cat = { name: '小花' }           // 错误: 缺少 age 属性
//const c3: Cat = { name: '小黑', age: 1, sex: '公' } // 错误: 多出 sex 属性

console.log(c1)

//定义一个类，名称为User
class User {
    name: string; //属性
    constructor(name: string) { //构造方法
        this.name = name
    }
    //方法
    study() {
        console.log(`[${this.name}]正在学习`)
    }
}

const u = new User('张三')

console.log(u.name)
u.study()

interface Animal {
    name: string
    eat(): void
}

//定义一个类Bird, 实现上面的 Animal 接口
class Bird implements Animal{
    name: string
    constructor(name: string){
        this.name = name
    }
    eat(): void {
        console.log(this.name + ' eat')
    }
}

//创建类型为Bird的对象
const b1 = new Bird('杜鹃')
console.log(b1.name)
b1.eat()

class Parrot extends Bird {
    say() {
        console.log(this.name + ' say hello')
    }
}
const myParrot = new Parrot('Polly')
myParrot.eat()
myParrot.say()
console.log(myParrot.name)