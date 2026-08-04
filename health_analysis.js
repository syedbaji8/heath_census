const addPatient = document.getElementById('addPatient');
const searchResult = document.getElementById('result');
const report = document.getElementById('report');
const patients = [];

function addPatientFn(){
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const condition = document.getElementById('condition').value;
    patients.push({name, gender: gender.value, age, condition});
    resetFormFn();
}
addPatient.addEventListener('click', addPatientFn)

function resetFormFn(){
    document.getElementById('name').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById('age').value = '';
    document.getElementById('condition').value = ''
}