#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
while (true) {
    const todoActions = await inquirer.prompt([{
            message: chalk.blue("Select The Following Action"),
            name: "action",
            type: "list",
            choices: ["Add Item", "Remove Item", "Update Item", "Check Items"]
        }]);
    // For Add Item In The List
    if (todoActions.action === "Add Item") {
        const addItem = await inquirer.prompt([{
                message: chalk.green("What Do You Want To Add In A List?"),
                type: "input",
                name: "item"
            }, {
                message: chalk.green(`Are You Sure Want To Add`),
                type: "confirm",
                name: "confirmation",
            }]);
        if (addItem.confirmation === true) {
            if (addItem.item.length >= 2) {
                todoList.push(addItem.item);
            }
            else {
                console.log(chalk.red("Cannot Be Empty ,Please Enter An Item To Add In Your List"));
            }
        }
    }
    // For Remove Item In The List
    else if (todoActions.action === "Remove Item") {
        if (todoList.length === 0) {
            console.log(chalk.red("Nothing To Remove"));
            continue;
        }
        const removeItem = await inquirer.prompt([{
                message: chalk.rgb(255, 165, 0)("Which Item Do You Want To Remove?"),
                type: "list",
                name: "item",
                choices: todoList,
            }]);
        const index = todoList.indexOf(removeItem.item);
        if (index > -1) {
            todoList.splice(index, 1);
        }
    }
    // For Update Item In The List
    else if (todoActions.action === "Update Item") {
        if (todoList.length === 0) {
            console.log(chalk.red("Nothing To Update"));
            continue;
        }
        const updateItem = await inquirer.prompt([{
                message: chalk.cyanBright("Which Item Do You Want To Update?"),
                type: "list",
                name: "item",
                choices: todoList,
            }]);
        const updateIndex = todoList.indexOf(updateItem.item);
        if (updateIndex > -1) {
            const newItem = await inquirer.prompt([{
                    message: chalk.magenta("What's The New Item?"),
                    type: "input",
                    name: "newItem"
                }]);
            todoList[updateIndex] = newItem.newItem;
        }
    }
    // For Check Items In The List
    else if (todoActions.action === "Check Items") {
        if (todoList.length === 0) {
            console.log(chalk.red("Nothing To Check"));
            continue;
        }
        console.log(chalk.green("Your Items: "));
        todoList.forEach((val) => {
            console.log(val);
        });
        break;
    }
}
