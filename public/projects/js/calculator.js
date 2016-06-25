'use strict'

var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');

var buttons = document.getElementsByClassName('button');
var operator = document.getElementsByClassName('operator');
var clear = document.getElementById('clear');
var negative = document.getElementById('negative');
var completed = false;

left.value = null;
middle.value = null;
right.value = null;

function numbers() {
	var dataValue = this.getAttribute('data-value');

	if (middle.value == '') {
		left.value += dataValue;
	} else if (middle.value != null && (right.value !== "" || (dataValue > 0 && dataValue < 10))) {
		right.value += dataValue;
		if(completed == true) {
			clearInputs();
			left.value += dataValue;
		}
	} else if(dataValue == '=')
		operate(); 
};

function operatorClick() {
	var dataValue = this.getAttribute('data-value');

	if (middle.value != '' && left.value != '' && right.value != '') {
		operate();
		right.value = '';
		middle.value = dataValue;
		completed = false;
	}
	if (dataValue === 'x' || dataValue === '+' || dataValue === '-' || dataValue === '/') {
		middle.value = '';
		middle.value = dataValue;
	} 
};

function operate() {
	var left_number = parseFloat(left.value);
	var right_number = parseFloat(right.value);
	var answer = '';

	if(middle.value == '+') {
		answer = left_number + right_number;
	} else if(middle.value == '-') {
		answer = left_number - right_number;
	} else if(middle.value == '/') {
		answer = left_number / right_number;
	} else if(middle.value == 'x') {
		answer = left_number * right_number;
	}
	left.value = answer;
	completed = true;
};

function clearInputs() {
	left.value = '';
	middle.value = '';
	right.value = '';
	completed = false;
};

function plusMinus() {
	if(right.value == '' && middle.value == '' && left.value != '') {
		left.value = left.value * -1;
	} else if(left.value != '' && middle.value != '') {
		right.value = right.value * -1;
	}
};

negative.addEventListener('click', plusMinus, false);
clear.addEventListener('click', clearInputs, false);

for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', operatorClick, false);
};

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', numbers, false);
};