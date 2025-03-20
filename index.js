    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('customForm');
        const tableContainer = document.getElementById('tableContainer');
        let table;
        let isEditing = false;
        let editIndex = -1;
        const departmentData = {
            Developer: ["IT", "Blockchain", "Digital"],
            Manager: ["Marketing", "HR", "Operations"],
            "Team Lead": ["Software", "Design", "Development"],
            Intern: ["Training", "Support", "QA"]
        };
        // function updateDepartments() {
        //     let designation = document.getElementById("designation").value;
        //     let departmentDropdown = document.getElementById("department");
        
        //     // departmentDropdown.innerHTML = '<option value="" disabled selected>Select Department</option>';
        
        //     if (departmentData[designation]) { // Fix: Using departmentData
        //         departmentData[designation].forEach(dept => {
        //             let option = document.createElement("option");
        //             option.value = dept;
        //             option.innerText = dept;
        //             departmentDropdown.appendChild(option); 
        //         });
        //     }
        // }
        updateDepartments();    
        // document.getElementById("designation").addEventListener("change", updateDepartments);
    // Event Listener for Designation Change
    document.getElementById("designation").addEventListener("change", updateDepartments);
        const validateName = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);   

            if (value === '') {
                errorElement.innerText = 'This field is required';
                return false;
            }

            if (/\s/.test(value)) {
                errorElement.innerText = 'No spaces allowed';
                return false;
            }

            if (!/^[A-Z][a-z]*$/.test(value)) {
                errorElement.innerText = 'First letter must be capital and only small alphabets allowed';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };

        const validateEmail = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);


            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (value === '') {
                errorElement.innerText = 'This field is required';
                return false;
            }

            if (!emailRegex.test(value)) {
                errorElement.innerText = 'Invalid email format';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };

        const validatePhone = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);
            const phoneRegex = /^[6-9][0-9]{9}$/;

            if (value === '') {
                errorElement.innerText = 'This field is required';
                return false;
            }

            if (!phoneRegex.test(value)) {
                errorElement.innerText = 'Please enter a valid 10-digit number starting with 6-9';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };

        const validateDOB = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);

            if (value === '') {
                errorElement.innerText = 'This field is required';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };

        const validateAddress = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);

            if (value === '') {
                errorElement.innerText = 'This field is required';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };

        const validateGender = (errorElementId) => {
            const genderValue = document.getElementById('gender');
            const errorElement = document.getElementById(errorElementId);

            if (genderValue.value === '') {
                errorElement.innerText = 'Please select a gender';
                return false;
            }

            errorElement.innerText = '';
            return true;
        };
        const validateDesignation = (input, errorElementId) => {
            const value = input.value.trim();
            const errorElement = document.getElementById(errorElementId);
        
            if (value === '') {
                errorElement.innerText = 'Please select a designation';
                return false;
            }
        
            errorElement.innerText = '';
            return true;
        };
        
       const validateDepartment = (input, errorElementId) => {
    const value = input.value.trim();
    const errorElement = document.getElementById(errorElementId);
    const designationDropdown = document.getElementById("designation"); // ✅ Declare the element

    if (!designationDropdown.value) {
        errorElement.innerText = 'Please select a designation first';
        input.disabled = true;
        return false;
    }

    if (value === '') {
        errorElement.innerText = 'Please select a department';
        return false;
    }

    errorElement.innerText = '';    
    return true;
};

        function updateDepartments() {
            let designation = document.getElementById("designation").value;
            let departmentDropdown = document.getElementById("department");
        
            departmentDropdown.innerHTML = '<option value="" disabled selected>Select Department</option>';
        
            if (!designation) {
                departmentDropdown.disabled = true;
                return;
            }
        
            if (departmentData[designation]) {
                departmentDropdown.disabled = false;
                departmentData[designation].forEach(dept => {
                    let option = document.createElement("option");
                    option.value = dept;    
                    option.innerText = dept;
                    departmentDropdown.appendChild(option);
                });
            }
        }
        
        // validateDesignation.addEventListener('change', () => {
        //     updateDepartments();
        //     validateDepartment(document.getElementById('department'), 'departmentError');
        // })
        const validateSkills = (errorElementId) => {
            const skills = document.querySelectorAll('input[name="skills"]:checked');
            const errorElement = document.getElementById(errorElementId);
        
            if (skills.length === 0) {
                errorElement.innerText = 'Please select at least one skill';
                return false;
            }
        
            errorElement.innerText = '';
            return true;
        };
        

        form.addEventListener('focusout', (event) => {
            // if (isEditing) return;  // ✅ Edit Mode में focusout validation को disable करें

            const target = event.target;
        
            if (target.id === 'fname') validateName(target, 'fnameErr');
            if (target.id === 'sname') validateName(target, 'lnameErr');
            if (target.id === 'email') validateEmail(target, 'emailError');
            if (target.id === 'phoneNumber') validatePhone(target, 'phoneError');
            if (target.id === 'dob') validateDOB(target, 'dobError');
            if (target.id === 'address') validateAddress(target, 'addressError');
            if (target.id === 'gender') validateGender('genderError');
            if (target.id === 'designation') validateDesignation(target, 'designationError');
            if (target.id === 'department') validateDepartment(target, 'departmentError');
            if (target.name === 'skills') validateSkills('skillsError'); 
        }, true);
        
        
        const validateFormOnSubmit = () => {
            const isFnameValid = validateName(document.getElementById('fname'), 'fnameErr');
            const isSnameValid = validateName(document.getElementById('sname'), 'lnameErr');
            const isEmailValid = validateEmail(document.getElementById('email'), 'emailError');
            const isPhoneValid = validatePhone(document.getElementById('phoneNumber'), 'phoneError');
            const isGenderValid = validateGender('genderError');
            const isDOBValid = validateDOB(document.getElementById('dob'), 'dobError');
            const isAddressValid = validateAddress(document.getElementById('address'), 'addressError');
            const isDesignationValid = validateDesignation(document.getElementById('designation'), 'designationError');
            const isDepartmentValid = validateDepartment(document.getElementById('department'), 'departmentError');
            const isSkillsValid = validateSkills('skillsError'); 
        
            return isFnameValid && isSnameValid && isEmailValid && isPhoneValid && isGenderValid && isDOBValid && 
                isAddressValid && isDesignationValid && isDepartmentValid && isSkillsValid;
        };
        

        const createTable = () => {
            table = document.createElement('table');
            table.id = 'dataTable';
            table.border = "1";
            table.style.width = "100%";     
            table.style.borderCollapse = "collapse";

            const headerRow = document.createElement('tr');
            const headers = ["First Name", "Last Name", "Email", "Phone", "Gender", "DOB", "Designation", "Department", "Skills", "Address", "Actions"];
            headers.forEach(headerText => {
                const th = document.createElement("th");
                th.textContent = headerText;
                th.style.border = "1px solid black";
                th.style.padding = "5px";
                headerRow.appendChild(th);
            });

            table.appendChild(headerRow);
            tableContainer.innerHTML = "";
            tableContainer.appendChild(table);
        };

        const addDataToTable = (formData, index) => {
            if (!table) createTable();
            const dataRow = document.createElement('tr');

            Object.values(formData).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                td.style.border = "1px solid black";
                td.style.padding = "5px";
                dataRow.appendChild(td);
            });

            const actionsTd = document.createElement('td');
            const editButton = document.createElement('edit');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editEntry(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteEntry(index);

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            dataRow.appendChild(actionsTd);

            table.appendChild(dataRow);
        };

        const loadTableData = () => {
            let storedData = JSON.parse(localStorage.getItem('formData')) || [];
            if (!storedData.length) return;
            createTable();
            storedData.forEach((data, index) => addDataToTable(data, index));
        };
        const editEntry = (index) => {
            let storedData = JSON.parse(localStorage.getItem('formData')) || [];
            let entry = storedData[index];
            
                Object.keys(entry).forEach(key => {
                    // let input = document.getElementById(key); //error :- skilll is a id ma aaapyu aetle 
                    // let input = document.getElementById(key);
                    let input =  document.querySelectorAll(`#${key} `); //  Use class selector for skills
                    console.log( input); 
                    
                    // let skill = document.querySelectorAll('skills');
                    // let input2 = document.getElementById(key);
                    console.log();
                    // input2=input
                    if ( input  ) {
                    // console.log(key);

                        if (key === "skills") {
                        
                            console.log(entry.skills);
                            document.querySelectorAll('input[name="skills"]').forEach(skill => {
                                skill.checked = entry.skills.includes(skill.value);
                            });
                        } else {
                            console.log("no entry");
                            // input.value = entry[key]; //error :- nodelist  not 
                            input.forEach(el => el.value = entry[key]);
                        }
                    }
                });
        
            // Update Department Dropdown Based on Designation
            updateDepartments(); 
        
            // Set the Department after updating the dropdown
            document.getElementById("department").value = entry.department;
        
            // Remove error messages in Edit Mode
            document.querySelectorAll('.error-message').forEach(err => err.innerText = '');
        
            isEditing = true;
            editIndex = index;
        };


        const deleteEntry = (index) => {
            let storedData = JSON.parse(localStorage.getItem('formData')) || [];
            storedData.splice(index, 1);
        
            localStorage.setItem('formData', JSON.stringify(storedData));
            
            tableContainer.innerHTML = "";
            loadTableData();
            showToast('Entry deleted successfully!', "success");
        };
        

        const showToast = (message, type = "success") => {
            Toastify({
                text: message,
                duration: 3000, 
                close: true, 
                gravity: "top", 
                position: "right", 
                backgroundColor: type === "error" ? "red" : "green",
                stopOnFocus: true
            }).showToast();
        };
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        
            let storedData = JSON.parse(localStorage.getItem('formData')) || [];
            const newFname = document.getElementById('fname').value;
            const newSname = document.getElementById('sname').value;
        
            if (!validateFormOnSubmit()) {
                showToast('Please fill all the fields correctly', "error");
                return;
            }
        
            const isDuplicate = storedData.some((entry, index) => 
                entry.fname === newFname && 
                entry.sname === newSname && 
                index !== editIndex 
            );
        
            if (isDuplicate) {
                showToast('Duplicate entry not allowed.', "error");
                return;
            }
        
            const formData = {
                fname: newFname,
                sname: newSname,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                gender: document.getElementById('gender').value,
                dob: document.getElementById('dob').value,
                designation: document.getElementById('designation').value,
                department: document.getElementById('department').value,
                skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.value),
                address: document.getElementById('address').value
            };
        
            if (isEditing) {
                storedData[editIndex] = formData;
                showToast('Entry updated successfully!', "success");
                isEditing = false;
                editIndex = -1;
                tableContainer.innerHTML = ""; // Re-render the table
                loadTableData();
            } else {
                storedData.push(formData);
                showToast('Entry added successfully!', "success");
                addDataToTable(formData, storedData.length - 1); // ✅ Add data to the table
            }
        
            localStorage.setItem('formData', JSON.stringify(storedData));
            
            form.reset();
        });
        
        loadTableData();
        
    
    });
