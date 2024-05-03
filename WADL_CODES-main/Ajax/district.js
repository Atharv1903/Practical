const districtData = {
    Maharashtra: ['Sangli', 'Satara', 'Kolhapur', 'Solapur'],
    Andhra_Pradesh: ['Guntur', 'Amravati', 'Vishakapatnam', 'Vijaywada'],
    Karnataka: ['Belagavi', 'Hubbali', 'Bengaluru', 'Dharwar', 'Gokak', 'Gokarna'],
    Goa: ['Panji', 'Madgaon', 'Vasco Da Gama'],
    Telangana: ['Hyderbad', 'Begumpet', 'Hafizpet', 'Rangareddy']
}

function updateDistricts() {
    const state = document.getElementById('state');
    const district = document.getElementById('districtSelect');
    const stateSelected = state.value;
    const districtOptions = districtData[stateSelected];

    district.innerHTML = "";

    districtOptions.forEach(dis => {
        const option = document.createElement('option');
        option.value = dis;
        option.text = dis;
        districtSelect.add(option);
    });
}

document.getElementById('state').addEventListener('change', updateDistricts);
updateDistricts();