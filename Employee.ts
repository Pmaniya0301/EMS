import { gender, person } from "./person";

export enum status { pending = 1, approved = 2, rejected = 3 };

export class Employee implements person {

    id: number;
    name: string;
    email: string;
    gender: number;
    dob: Date;
    age: number;
    address: string;

    constructor() {

        let localdata: string | null = localStorage.getItem("localdata");

        const searchPrams = new URLSearchParams(window.location.search)
        let id = Number(searchPrams.get("id"))

        if (localdata != null) {
            let localdatainjSON = JSON.parse(localdata);
            localdatainjSON.forEach((element: { id: number; name: string; email: string; gender: string; dob: string; age: number; address: string }) => {
                if (element.id == id) {
                    console.log(element);
                    this.id = element.id;
                    this.name = element.name;
                    this.email = element.email;
                    this.gender = gender[element.gender];
                    this.dob = new Date(element.dob);
                    this.age = element.age;
                    this.address = element.address;
                }
            });
        }
    }

    login(id: number) {
        return true;
    }

}

let leaveModule: any = document.getElementById("leaveModule")
let dailyWorkModule: any = document.getElementById("dailyWorkModule")
let eventModule: any = document.getElementById("eventModule")
let dashboardModule: any = document.getElementById("dashboardModule")

let employee = new Employee()

if (leaveModule != null && dailyWorkModule != null && eventModule != null && dashboardModule != null) {
    document.addEventListener("DOMContentLoaded", () => {
        leaveModule.style.display = "block"
        dailyWorkModule.style.display = "none"
        eventModule.style.display = "none"
        dashboardModule.style.display = "none"

        let welcomeMsg: any = document.getElementById("welcomeMsg")
        welcomeMsg.innerHTML = `Howdy, ${employee.name}`;
    })

    document.getElementById("leaveBtn")?.addEventListener("click", () => {
        leaveModule.style.display = "block"
        dailyWorkModule.style.display = "none"
        eventModule.style.display = "none"
        dashboardModule.style.display = "none"
    })

    document.getElementById("workBtn")?.addEventListener("click", () => {
        leaveModule.style.display = "none"
        dailyWorkModule.style.display = "block"
        eventModule.style.display = "none"
        dashboardModule.style.display = "none"
    })
    document.getElementById("eventBtn")?.addEventListener("click", () => {
        leaveModule.style.display = "none"
        dailyWorkModule.style.display = "none"
        eventModule.style.display = "block"
        dashboardModule.style.display = "none"
    })
    document.getElementById("dashboardBtn")?.addEventListener("click", () => {
        leaveModule.style.display = "none"
        dailyWorkModule.style.display = "none"
        eventModule.style.display = "none"
        dashboardModule.style.display = "block"
    })

}

console.log(employee.id, employee.name, employee.email, employee.gender, employee.dob, employee.age, employee.address);


document.getElementById("leaveSubmitBtn")?.addEventListener("click", () => {
    let leaveTypeElement: any = document.getElementById("leaveType")
    let leaveTypeValue: string = leaveTypeElement.value

    let fromDateElement: any = document.getElementById("fromDate")
    let fromDateValue: Date = fromDateElement.value

    let toDateElement: any = document.getElementById("toDate")
    let toDateValue: Date = toDateElement.value

    let fromDate: Date = new Date(fromDateValue);
    fromDate.setHours(0)
    fromDate.setMinutes(0)

    let toDate: Date = new Date(toDateValue);
    toDate.setHours(0)
    toDate.setMinutes(0)

    let todayDate: Date = new Date();
    let newtodayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

    console.log(leaveTypeValue, fromDate, toDate, newtodayDate);


    let error: boolean = false;

    if (fromDate.toString() == "Invalid Date") {
        let fromDateError: any = document.getElementById("fromDate_error")
        fromDateError.innerHTML = "Invalid Date Format or Date is Empty";
        error = true
    } else {
        if (fromDate.getTime() < newtodayDate.getTime()) {
            let fromDateError: any = document.getElementById("fromDate_error")
            fromDateError.innerHTML = "Date is less than Today";
            error = true
        } else if ((fromDate.getTime() >= newtodayDate.getTime()) && (fromDate.getTime() < (newtodayDate.getTime() + (24 * 3600 * 1000)))) {
            let fromDateError: any = document.getElementById("fromDate_error")
            fromDateError.innerHTML = "You have to Must put leave one day before the start Day";
            error = true
        }
    }
    if (toDate.toString() == "Invalid Date") {
        let toDateError: any = document.getElementById("toDate_error")
        toDateError.innerHTML = "Invalid Date Format or Date is Empty";
        error = true
    } else {
        if (toDate.getTime() < newtodayDate.getTime()) {
            let toDateError: any = document.getElementById("toDate_error")
            toDateError.innerHTML = "Date is less than Today";
            error = true
        } else if ((toDate.getTime() >= newtodayDate.getTime()) && (toDate.getTime() < (newtodayDate.getTime() + (24 * 3600 * 1000)))) {
            let toDateError: any = document.getElementById("toDate_error")
            toDateError.innerHTML = "You can not select To Date as Today Date";
            error = true
        } else if (fromDate.getTime() > toDate.getTime()) {
            let toDateError: any = document.getElementById("toDate_error")
            toDateError.innerHTML = "To date is always bigger or equal to from Date";
            error = true
        }
        if ((leaveTypeValue == "HL" || leaveTypeValue == "CL") && (fromDate.getTime() != toDate.getTime())) {
            let toDateError: any = document.getElementById("toDate_error")
            toDateError.innerHTML = "in HL and CL you can take leave for only one Day";
            error = true
        }
        if ((leaveTypeValue == "PL") && ((fromDate.getTime() + (9 * 24 * 3600 * 1000)) < toDate.getTime())) {
            let toDateError: any = document.getElementById("toDate_error")
            toDateError.innerHTML = "in PL you can't take more than 10 leaves";
            error = true
        }
    }

    if (!error) {

        var leaveObject: { id: number, type: string, from: Date, to: Date, status: number }
        leaveObject = { id: employee.id, type: leaveTypeValue, from: fromDate, to: toDate, status: 1 }

        let leavedata: string | null = localStorage.getItem("leavedata");

        let leavedatainjSONPrase;
        if (leavedata == null) {
            let localdatainjSON = [];
            leavedatainjSONPrase = localdatainjSON
            leavedatainjSONPrase.push(leaveObject)
        } else {
            let localdatainjSON = JSON.parse(leavedata);
            leavedatainjSONPrase = localdatainjSON
            leavedatainjSONPrase.push(leaveObject)
        }

        localStorage.setItem("leavedata", JSON.stringify(leavedatainjSONPrase));
        console.log(JSON.stringify(leavedatainjSONPrase));

        showTable();
    }
})

function showTable(): void {
    let tbodyElement: any = document.getElementById("leaveTableTbody");
    let leavedata: string | null = localStorage.getItem("leavedata");
    let localdatainjSON: any;
    if (leavedata != null) {
        localdatainjSON = JSON.parse(leavedata);
        console.log("sgszgkjaw tabel", typeof localdatainjSON);
    }

    if (tbodyElement != null) {
        tbodyElement.innerHTML = ``;
    }

    if (localdatainjSON != undefined) {
        localdatainjSON.forEach(allLeave => {
            if (employee.id == allLeave.id) {

                let fromDatePrint = new Date(allLeave.from)
                let toDatePrint = new Date(allLeave.to)

                let toDateComparison = new Date(allLeave.to)
                let curruntDate = new Date();
                curruntDate.setHours(0);
                curruntDate.setMinutes(0);
                curruntDate.setSeconds(0);
                curruntDate.setMilliseconds(0);
                console.log(toDateComparison, curruntDate);

                if (toDateComparison.getTime() > curruntDate.getTime()) {
                    tbodyElement.innerHTML += `<tr><td>${allLeave.type}</td>
                    <td>${fromDatePrint.getFullYear()}-${(fromDatePrint.getMonth() + 1)}-${fromDatePrint.getDate()}</td>
                <td>${toDatePrint.getFullYear()}-${(toDatePrint.getMonth() + 1)}-${toDatePrint.getDate()}</td><td>${status[allLeave.status]}</td></tr>`
                }

            }
        });
    }


}

function showProjectDD(): void {
    let projectSelectElement: any = document.getElementById("selectProject");

    let projectName: string | null = localStorage.getItem("projectName");
    console.log(projectName);

    let projectNameinjSON;
    if (projectName != null) {
        projectNameinjSON = JSON.parse(projectName);
    }
    if (projectNameinjSON != undefined) {
        projectNameinjSON.forEach(element => {
            if (projectSelectElement != null) {
                projectSelectElement.innerHTML += `<option value='${element.pNames}'>${element.pNames}</option>`;
            }
        });
    }

}

document.getElementById("workSubmitBtn")?.addEventListener("click", () => {
    let projectElement: any = document.getElementById("selectProject")
    let projectValue: string = projectElement.value

    let dateElement: any = document.getElementById("date")
    let dateValue: Date = dateElement.value

    let hourElement: any = document.getElementById("hour")
    let hourValue: string = hourElement.value


    let subjectElement: any = document.getElementById("subject")
    let subjectValue: string = (subjectElement.value).trim()

    let error: boolean = false;

    if (dateValue.toString() == "") {
        let dateError: any = document.getElementById("date_error")
        dateError.innerHTML = "Invalid Date Format or Date is Empty";
        error = true
    }

    if (hourValue == "") {
        let hourError: any = document.getElementById("hour_error")
        hourError.innerHTML = "Time is Empty";
        error = true
    }

    if (subjectValue == "") {
        let subjectError: any = document.getElementById("subject_error")
        subjectError.innerHTML = "Subject is Empty";
        error = true
    }

    if (!error) {
        var workObject: { id: number, date: Date, hour: string, subject: string }

        workObject = { id: employee.id, date: dateValue, hour: hourValue, subject: subjectValue }
        console.log(workObject);

        let workdata: string | null = localStorage.getItem("workdata");

        let workdatainjSONPrase;
        if (workdata == null) {
            let workdatainjSON = [];
            workdatainjSONPrase = workdatainjSON
            workdatainjSONPrase.push(workObject)
        } else {
            let workdatainjSON = JSON.parse(workdata);
            workdatainjSONPrase = workdatainjSON
            workdatainjSONPrase.push(workObject)
        }

        localStorage.setItem("workdata", JSON.stringify(workdatainjSONPrase));
        console.log(JSON.stringify(workdatainjSONPrase));

    }

    showWorkTable()

})

function showWorkTable(): void {
    let tbodyElement: any = document.getElementById("workTableTbody");
    let workdata: string | null = localStorage.getItem("workdata");
    let workdatainjSON: any;
    if (workdata != null) {
        workdatainjSON = JSON.parse(workdata);
        console.log("sgszgkjaw auguisd", typeof workdatainjSON);
    }

    if (tbodyElement != null) {
        tbodyElement.innerHTML = ``;
    }

    if (workdatainjSON != undefined) {
        workdatainjSON.forEach(allWork => {
            if (employee.id == allWork.id) {
                tbodyElement.innerHTML += `<tr><td>${allWork.date}</td><td>${allWork.hour}</td>
                <td>${allWork.subject}</td></tr>`
            }
        });
    }

}

function showEventTable(): void {
    let tbodyElement: any = document.getElementById("eventTbody");
    let eventdata: string | null = localStorage.getItem("eventdata");
    let eventdatainjSON: any;
    if (eventdata != null) {
        eventdatainjSON = JSON.parse(eventdata);
    }

    if (tbodyElement != null) {
        tbodyElement.innerHTML = ``;
    }

    if (eventdatainjSON != undefined) {
        eventdatainjSON.forEach(event => {
            if (tbodyElement != null) {

                tbodyElement.innerHTML += `<tr><td>${event.eventDate}</td><td>${event.eventName}</td></tr>`
            }
        })
    }
}
showEventTable()

showProjectDD()

showWorkTable()

showTable();

function showUserDashboard(): void {
    let idElement: any = document.getElementById("id")
    let nameElement: any = document.getElementById("name");
    let emailElement: any = document.getElementById("email");
    let genderElement: any = document.getElementById("gender");
    let dobElement: any = document.getElementById("dob");
    let ageElement: any = document.getElementById("age");
    let addressElement: any = document.getElementById("address");

    let localdata: string | null = localStorage.getItem("localdata");
    let localdatainjSON: any;
    if (localdata != null) {
        localdatainjSON = JSON.parse(localdata);
    }

    localdatainjSON.forEach(person => {
        if (person.id == employee.id) {
            idElement.innerHTML = `ID : ${person.id}`
            nameElement.innerHTML = `Name : ${person.name}`
            emailElement.innerHTML = `Email : ${person.email}`
            genderElement.innerHTML = `Gender : ${person.gender}`
            dobElement.innerHTML = `Date Of Birth : ${person.dob}`
            ageElement.innerHTML = `Age : ${person.age}`
            addressElement.innerHTML = `Address : ${person.address}`
        }
    });

}

showUserDashboard()