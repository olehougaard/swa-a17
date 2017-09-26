function sum(a, b) {
    return a + b
}

const employees = [
    { name: 'A', age: 27, salary: 10000 },
    { name: 'B', age: 35, salary: 13000 },
    { name: 'C', age: 48, salary: 17000 }]



function reduce(sum, init_value, salaries) {
    var the_sum = init_value
    for(var i = 0; i < salaries.length; i++) {
        the_sum = sum(the_sum, salaries[i])
    }
    return the_sum
}

function get_salary(employee) { return employee.salary }
function get_name(employee) { return employee.name }

function map(getSalary, employees) {
    var names = []
    for(var i = 0; i < employees.length; i++) {
        names = names.concat(getSalary(employees[i]))
    }
    return names
}

function filter(p, employees) {
    var names = []
    for(var i = 0; i < employees.length; i++) {
        if (p(employees[i]))
            names = names.concat(employees[i])
    }
    return names
}

console.log(employees
    .map(employee => employee.salary)
    .reduce((a, b) => a + b, 0))
console.log(employees.filter(employee => employee.age > 40))
