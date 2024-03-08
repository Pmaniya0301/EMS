import { admin } from "./Admin";


document.getElementById("loginTab")?.addEventListener("click", () => {
    document.getElementById("signupForm")?.classList.add("hide");
    document.getElementById("signupForm")?.classList.remove("show");
    document.getElementById("loginForm")?.classList.add("show");
})

document.getElementById("signupTab")?.addEventListener("click", () => {
    document.getElementById("loginForm")?.classList.add("hide");
    document.getElementById("loginForm")?.classList.remove("show");
    document.getElementById("signupForm")?.classList.add("show");
})

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm")?.classList.add("hide");
    // document.getElementById("signupForm")?.classList.add("show");

})


document.getElementById("signupSubmitBtn")?.addEventListener("click", () => {

    if (!validation()) {

        var id: number = Math.floor((Math.random()) * 1000000)

        let nameElement: any = document.getElementById("name")
        let nameValue: string = nameElement.value.trim()
        let emailElement: any = document.getElementById("email")
        let emailValue: string = emailElement.value.trim()
        let genderElement: any = document.querySelector("[name='gender']:checked")
        let genderValue: string = genderElement.value
        let dobElement: any = document.getElementById("dob")
        let dobValue: string = dobElement.value

        let dateParts: string[] = dobValue.split("-");
        let employeeDob: Date = new Date(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]));
        let todayDate: Date = new Date();
        let newtodayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        let age: number = Math.floor((newtodayDate.getTime() - employeeDob.getTime()) / (1000 * 3600 * 24 * 365));

        let addrssElement: any = document.getElementById("address")
        let addressValue: string = addrssElement.value.trim()

        var object: { id: number, name: string, email: string, gender: string, dob: string, age: number, address: string }


        object = { id: id, name: nameValue, email: emailValue, gender: genderValue, dob: dobValue, age: age, address: addressValue }
        console.log(object);



        let localdata: string | null = localStorage.getItem("localdata");

        let localdatainjSONPrase;
        if (localdata == null) {
            let localdatainjSON = [];
            localdatainjSONPrase = localdatainjSON
            localdatainjSONPrase.push(object)
        } else {
            let localdatainjSON = JSON.parse(localdata);
            localdatainjSONPrase = localdatainjSON
            localdatainjSONPrase.push(object)
        }

        localStorage.setItem("localdata", JSON.stringify(localdatainjSONPrase));
        console.log(JSON.stringify(localdatainjSONPrase));


        alert(`Hello ${nameValue}, Your Id is ${id} Now You have to Login with This ID`)
    }

})

function validation(): boolean {

    let nameElement: any = document.getElementById("name")
    let nameValue: string = nameElement.value.trim()
    let emailElement: any = document.getElementById("email")
    let emailValue: string = emailElement.value.trim()
    let genderElement: any = document.querySelector("[name='gender']:checked")
    let genderValue: string = genderElement.value
    let dobElement: any = document.getElementById("dob")
    let dobValue: string = dobElement.value

    let dateParts: string[] = dobValue.split("-");
    let employeeDob: Date = new Date(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]));
    let todayDate: Date = new Date();
    let newtodayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    let age: number = Math.floor((newtodayDate.getTime() - employeeDob.getTime()) / (1000 * 3600 * 24 * 365));

    let addrssElement: any = document.getElementById("address")
    let addressValue: string = addrssElement.value.trim()


    let error: boolean = false;

    if (nameValue == "") {
        let nameError: any = document.getElementById("name_error")
        nameError.innerHTML = "Name Is Empty";
        error = true;
    } else {
        if (!(/^[a-zA-Z\s]/.test(nameValue))) {
            let nameError: any = document.getElementById("name_error")
            nameError.innerHTML = "Name Formate Is Wrong";
            error = true;
        }
    }

    if (emailValue == "") {
        let emailError: any = document.getElementById("email_error")
        emailError.innerHTML = "Email Is Empty";
        error = true;
    } else {
        if (!(/^[a-zA-Z-_\d]+@[a-zA-Z-_]+\.[a-zA-Z]/.test(emailValue))) {
            let emailError: any = document.getElementById("email_error")
            emailError.innerHTML = "Email Formate Is Wrong";
            error = true;
        }
    }

    if (dobValue == "") {
        let dobError: any = document.getElementById("date_error")
        dobError.innerHTML = "DOB Is Empty";
        error = true;
    }
    // else {
    //     if (age < 18) {
    //         let dobError: any = document.getElementById("date_error")
    //         dobError.innerHTML = "Age Is less than 18";
    //         error = true;
    //     }
    // }

    if (addressValue == "") {
        let addressError: any = document.getElementById("address_error")
        addressError.innerHTML = "Address Is Empty";
        error = true;
    }

    return error;
}


document.getElementById("loginSubmitBtn")?.addEventListener("click", () => {

    let idElement: any = document.getElementById("userid")
    let idValue: number = idElement.value.trim()
    let userRole: any = document.getElementById("userRole")
    let userRoleValue: string = userRole.value

    console.log(idValue, userRoleValue);


    if ((idValue.toString()).length != 6) {
        let idError: any = document.getElementById("id_error")
        idError.innerHTML = "ID Is Wrong";
    }

    if ((userRoleValue == "Admin") && ((idValue.toString()).length == 6)) {        
        let adminClass = new admin()
        if (adminClass.id == idValue) {
            let baseUrl: string = location.origin;
            let newUrl: string = baseUrl + "/admin.html"
            location.assign(newUrl)
        }
    }
    if ((userRoleValue == "Employee") && ((idValue.toString()).length == 6)) {

        let localdata: string | null = localStorage.getItem("localdata");

        if (localdata == null) {
            alert("No User Found")
        } else {

            let flagForCheck: boolean = false;
            let localdatainjSON = JSON.parse(localdata);
            localdatainjSON.forEach((element: { id: number; name: string; email: string; gender: string; dob: string; age: number; address: string }) => {
                if (element.id == idValue) {
                    let baseUrl: string = location.origin;
                    let newUrl: string = baseUrl + `/Employee.html?id=${idValue}`
                    location.assign(newUrl)
                    flagForCheck = true;
                }
            });

            if (!flagForCheck) {
                alert("User Not Found")
            }
        }
    }
})