const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const previousValue = document.querySelector(".previous-value");
const currentValue = document.querySelector(".current-value");

class Calculator {
	constructor(previous, current) {
		this.previousText = previous;
		this.currentText = current;
		this.clear();
	}

	clear() {
		this.previousValue = "";
		this.currentValue = "";
		this.operation = undefined;
	}

	addNumber(num) {
		if (num === "." && this.currentValue.includes(".")) {
			return;
		}
		this.currentValue = this.currentValue.toString() + num.toString();
	}

	chooseOperation(operation) {
		if (!this.currentValue) {
			return;
		}
		if (this.previousValue !== "") {
			this.compute();
		}
		this.previousValue = this.currentValue;
		this.currentValue = "";
		this.operation = operation;
	}

	compute() {
		let result;
		let prev = parseFloat(this.previousValue);
		let curr = parseFloat(this.currentValue);
		if (isNaN(prev) || isNaN(curr)) {
			return;
		}

		switch (this.operation) {
			case "+":
				result = prev + curr;
				break;
			case "-":
				result = prev - curr;
				break;
			case "×":
				result = prev * curr;

				break;
			case "÷":
				result = prev / curr;
				break;
			default:
				return;
		}
		this.currentValue = result;
		this.operation = undefined;
		this.previousValue = "";
	}

	getDisplayNumber(num) {
		let stringNum = num.toString();
		let arr = stringNum.split(".");
		let integerDigits = parseFloat(arr[0]);
		let decimalDigits = parseFloat(arr[1]);
		let displayNum;
		if (isNaN(integerDigits)) {
			displayNum = "";
		} else {
			displayNum = integerDigits.toLocaleString("en");
		}
		if (!isNaN(decimalDigits)) {
			return `${displayNum}.${decimalDigits}`;
		}
		return displayNum;
	}

	update() {
		this.getTextWidth(this.currentText.innerText);
		this.currentText.innerText = this.getDisplayNumber(this.currentValue);
		if (this.operation != null) {
			this.previousText.innerText = `${this.getDisplayNumber(
				this.previousValue
			)} ${this.operation}`;
		} else {
			this.previousText.innerText = "";
		}
	}
}

const calc = new Calculator(previousValue, currentValue);

clearBtn.addEventListener("click", () => {
	calc.clear();
	calc.update();
});

for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener("click", () => {
		calc.addNumber(numbers[i].innerText);
		calc.update();
	});
}

for (let i = 0; i < operands.length; i++) {
	operands[i].addEventListener("click", () => {
		calc.chooseOperation(operands[i].innerText);
		console.log(operands[i].innerText);
		calc.update();
	});
}

equalBtn.addEventListener("click", () => {
	calc.compute();
	calc.update();
});
