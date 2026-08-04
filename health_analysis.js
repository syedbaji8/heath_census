const addPatient = document.getElementById('addPatient');
const searchResult = document.getElementById('result');
const report = document.getElementById('report');
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatientFn() {
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const condition = document.getElementById('condition').value;
    patients.push({ name, gender: gender.value, age, condition });
    // resetFormFn();
    generateReport();
}
addPatient.addEventListener('click', addPatientFn)

function resetFormFn() {
    document.getElementById('name').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById('age').value = '';
    document.getElementById('condition').value = ''
}

function searchCondition() {
    const conditionInput = document.getElementById('conditionInput').value.toLowerCase();
    if (conditionInput) {
        fetch('./health_analysis.json')
            .then((response) => {
                const result = response.json();
                return result;
            })
            .then((data) => {
                console.log(data.conditions)
                const foundCondition = data.conditions.find((condition) => {
                    const conditionName = condition.name.toLowerCase()
                    return conditionName === conditionInput;
                });
                showAboutFoundConditionFn(foundCondition);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function showAboutFoundConditionFn(foundCondition) {
        const symptoms = foundCondition.symptoms.join(', ')
        const prevention = foundCondition.prevention.join(', ')
        searchResult.innerHTML = `
        <h2 class="text-50 text-bold">${foundCondition.name}</h2>
        <div class="w-full h-[300px] overflow-hidden"><img src="./images/${foundCondition['imagesrc']}" alt=""></div>
        <p><strong>Symptoms:</strong> ${symptoms}</p> <br /><br />
        <p><strong>Prevention:</strong> ${prevention}</p> <br /><br />
        <p><strong>Treatment:</strong> ${foundCondition.treatment}</p> <br /><br />
        `
    }
}
btnSearch.addEventListener('click', searchCondition);

function generateReport() {
    const numberOfPatients = patients.length;
    const numOfPatientsByCondionCount = {
        Diabetes: 0,
        Thyroid: 0,
        'High Blood Pressure': 0
    }
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0
        },
    };
    for (const patient of patients) {
        numOfPatientsByCondionCount[patient['condition']]++;
        genderConditionsCount[patient.gender][patient['condition']]++
    }
    // console.log(numOfPatientsByCondionCount)
    // console.log(genderConditionsCount)
    report.innerHTML = `
    <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 class="text-3xl font-bold text-blue-700 border-b pb-3">
            Analysis Report
        </h1>
        <div class="bg-blue-50 rounded-lg p-4">
            <h2 class="text-xl font-semibold text-gray-800">
                Number of Patients:
                <span class="text-blue-600 font-bold">${numberOfPatients}</span>
            </h2>
        </div>
        <!-- Conditions Breakdown -->
        <div>
            <h4 class="text-xl font-semibold text-gray-700 mb-4">
                Conditions Breakdown
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p class="font-medium text-red-700">
                        Diabetes:
                        <span class="font-bold">${numOfPatientsByCondionCount.Diabetes}</span>
                    </p>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p class="font-medium text-yellow-700">
                        Thyroid:
                        <span class="font-bold">${numOfPatientsByCondionCount.Thyroid}</span>
                    </p>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p class="font-medium text-green-700">
                        High Blood Pressure:
                        <span class="font-bold">${numOfPatientsByCondionCount["High Blood Pressure"]}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- Gender Based Conditions -->
        <div>
            <h4 class="text-xl font-semibold text-gray-700 mb-4">
                Gender Based Conditions
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Male -->
                <div class="bg-slate-50 border rounded-xl p-5 shadow-sm">
                    <h6 class="text-lg font-bold text-blue-600 mb-4">
                        👨 Male
                    </h6>
                    <div class="space-y-2">
                        <p>Diabetes: <span class="font-bold">${genderConditionsCount.Male.Diabetes}</span></p>
                        <p>Thyroid: <span class="font-bold">${genderConditionsCount.Male.Thyroid}</span></p>
                        <p>High Blood Pressure: <span class="font-bold">${genderConditionsCount.Male["High Blood Pressure"]}</span></p>
                    </div>
                </div>
                <!-- Female -->
                <div class="bg-slate-50 border rounded-xl p-5 shadow-sm">
                    <h6 class="text-lg font-bold text-pink-600 mb-4">
                        👩 Female
                    </h6>
                    <div class="space-y-2">
                        <p>Diabetes: <span class="font-bold">${genderConditionsCount.Female.Diabetes}</span></p>
                        <p>Thyroid: <span class="font-bold">${genderConditionsCount.Female.Thyroid}</span></p>
                        <p>High Blood Pressure: <span class="font-bold">${genderConditionsCount.Female["High Blood Pressure"]}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

}