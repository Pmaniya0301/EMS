import { gender, person } from "./person";
import { status } from "./Employee";

let designation: string[] = ["Senior Developer", "Junior Developer", "Q/A"]

export class admin implements person {

    id: number;
    name: string;
    email: string;
    gender: number;
    dob: Date;
    age: number;
    address: string;

    constructor() {
        this.id = 654321;
        this.name = "Admin";
        this.email = "admin@company.com";
        this.gender = gender.Male;
        this.dob = new Date(1995, 10, 10);
        let todayDate = new Date()
        todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
        this.age = Math.floor((todayDate.getTime() - this.dob.getTime()) / (1000 * 3600 * 24 * 365));
        this.address = "Company";
    }

    login(id: number) {


        return true;
    }

}

function showTable(): void {
    let tbodyElement: any = document.getElementById("leaveTableTbody");
    let leavedata: string | null = localStorage.getItem("leavedata");
    let leavedatainjSON: any;
    if (leavedata != null) {
        leavedatainjSON = JSON.parse(leavedata);
        console.log("sgszgkjaw tabel", typeof leavedatainjSON);
    }

    if (tbodyElement != null) {
        tbodyElement.innerHTML = ``;
    }

    if (leavedatainjSON != undefined) {
        leavedatainjSON.forEach(allLeave => {


            let toDateComparison = new Date(allLeave.to)
            let curruntDate = new Date();
            curruntDate.setHours(0);
            curruntDate.setMinutes(0);
            curruntDate.setSeconds(0);
            curruntDate.setMilliseconds(0);
            console.log(toDateComparison, curruntDate);

            let fromDatePrint = new Date(allLeave.from)
            let toDatePrint = new Date(allLeave.to)
            console.log(fromDatePrint.getFullYear(), (fromDatePrint.getMonth() + 1), fromDatePrint.getDate());
            console.log(toDatePrint.getFullYear(), (toDatePrint.getMonth() + 1), toDatePrint.getDate());


            if (toDateComparison.getTime() > curruntDate.getTime()) {
                if (tbodyElement != null) {
                    tbodyElement.innerHTML += `<tr><td>${allLeave.id}</td>
                    <td>${allLeave.type}</td>
                    <td>${fromDatePrint.getFullYear()}-${(fromDatePrint.getMonth() + 1)}-${fromDatePrint.getDate()}</td>
                    <td>${toDatePrint.getFullYear()}-${(toDatePrint.getMonth() + 1)}-${toDatePrint.getDate()}</td>
                    <td id="${status[allLeave.status]}">${status[allLeave.status]}</td>
                    <td><button id=btnApprove${allLeave.id} class="bg-secondary text-white rounded-3 border border-dark-subtle border-2 px-4 py-1" >Approve</button></td>
                    <td><button id=btnReject${allLeave.id} class="bg-secondary text-white rounded-3 border border-dark-subtle border-2 px-4 py-1" >Reject</button></td></tr>`

                    console.log(status[allLeave.status]);
                    
                    if (allLeave.status == 1 ) {
                        console.log("pending hai voh ek ki");
                        let statusTd:any = document.getElementById(`pending`)
                        if (statusTd != null && statusTd != undefined) {
                            statusTd.style.color = "red";
                        }
                        
                    }
                    document.getElementById(`btnApprove${allLeave.id}`)?.addEventListener("click", () => {
                        console.log(`btnApprove${allLeave.id}`);

                        let leavedata: string | null = localStorage.getItem("leavedata");

                        let leavedatainjSONPrase;
                        if (leavedata != null) {
                            let localdatainjSON = JSON.parse(leavedata)
                            leavedatainjSONPrase = localdatainjSON
                            leavedatainjSONPrase.forEach(element => {
                                if (element.id == allLeave.id) {
                                    element.status = 2;
                                }
                            });
                        }
                        localStorage.setItem("leavedata", JSON.stringify(leavedatainjSONPrase));
                        showTable();
                    })

                    document.getElementById(`btnReject${allLeave.id}`)?.addEventListener("click", () => {
                        console.log(`btnReject${allLeave.id}`);

                        let leavedata: string | null = localStorage.getItem("leavedata");

                        let leavedatainjSONPrase;
                        if (leavedata != null) {
                            let localdatainjSON = JSON.parse(leavedata)
                            leavedatainjSONPrase = localdatainjSON
                            leavedatainjSONPrase.forEach(element => {
                                if (element.id == allLeave.id) {
                                    element.status = 3;
                                }
                            });
                        }
                        localStorage.setItem("leavedata", JSON.stringify(leavedatainjSONPrase));
                        showTable();
                    })
                }
            }


        });
    }

}
showTable()



function showWorkTable(): void {

    let tbodyElement: any = document.getElementById("workTableTbody");
    let workdata: string | null = localStorage.getItem("workdata");
    let workdatainjSON: any;
    if (workdata != null) {
        workdatainjSON = JSON.parse(workdata);
    }

    if (tbodyElement != null) {
        tbodyElement.innerHTML = ``;
    }

    if (workdatainjSON != undefined) {
        workdatainjSON.forEach(allWork => {
            if (tbodyElement != null) {
                tbodyElement.innerHTML += `<tr><td>${allWork.id}</td><td>${allWork.date}</td><td>${allWork.hour}</td>
                    <td>${allWork.subject}</td></tr>`
            }
        });
    }

}
showWorkTable()


document.getElementById("addPnameBtn")?.addEventListener("click", () => {
    let projectNameElement: any = document.getElementById("pName")
    let projectNameValue: string = (projectNameElement.value).trim()

    if (projectNameValue == "") {
        let projectError: any = document.getElementById("pName_error")
        projectError.innerHTML = "Project Name is Empty";
    } else {
        let projectName: string | null = localStorage.getItem("projectName");

        let projectNameinjSONPrase;
        if (projectName == null) {
            let projectNameinjSON = [];
            projectNameinjSONPrase = projectNameinjSON;
            projectNameinjSONPrase.push({ pNames: projectNameValue })
        } else {
            let projectNameinjSON = JSON.parse(projectName)
            projectNameinjSONPrase = projectNameinjSON;
            projectNameinjSONPrase.push({ pNames: projectNameValue })
        }

        localStorage.setItem("projectName", JSON.stringify(projectNameinjSONPrase));
        console.log(JSON.stringify(projectNameinjSONPrase));
        showProjectName()
    }
})

function showProjectName(): void {
    let projectName: string | null = localStorage.getItem("projectName");
    let projectUL: any = document.getElementById("projectList")
    if (projectUL != null) {
        projectUL.innerHTML = ``
    }
    if (projectName != null) {
        let projectNameinjSON = JSON.parse(projectName)
        
        projectNameinjSON.forEach(element => {
            
            if (projectUL != null) {
                projectUL.innerHTML += `<li>${element.pNames}</li>`
            }
        });
    }
}
showProjectName()

document.getElementById("addEventBtn")?.addEventListener("click", () => {
    let eventNameElement: any = document.getElementById("eventName")
    let eventNameValue: string = (eventNameElement.value).trim()
    let eventDateElement: any = document.getElementById("eventDate")
    let eventDateValue: string = eventDateElement.value

    

    console.log(eventDateValue);

    let error: boolean = false;

    if (eventNameValue == "") {
        let projectError: any = document.getElementById("eventName_error")
        projectError.innerHTML = "Event Name is Empty";
        error = true
    }
    if (eventNameValue == "") {
        let projectError: any = document.getElementById("eventdate_error")
        projectError.innerHTML = "Event Date is Empty";
        error = true
    }

    if (!error) {

        var eventObject: { eventDate: string, eventName: string}
        eventObject = { eventDate: eventDateValue, eventName: eventNameValue}

        let eventdata: string | null = localStorage.getItem("eventdata");

                let eventdatainjSONPrase;
                if (eventdata == null) {
                    let eventdatainjSON = [];
                    eventdatainjSONPrase = eventdatainjSON
                    eventdatainjSONPrase.push(eventObject)
                } else {
                    let eventdatainjSON = JSON.parse(eventdata);
                    eventdatainjSONPrase = eventdatainjSON
                    eventdatainjSONPrase.push(eventObject)
                }

                localStorage.setItem("eventdata", JSON.stringify(eventdatainjSONPrase));
                console.log(JSON.stringify(eventdatainjSONPrase));
        showEventTable()

    }

})

function showEventTable(): void {
    let tbodyElement: any = document.getElementById("eventTbody");
    let eventdata: string | null = localStorage.getItem("eventdata");
    let eventdatainjSON: any;
    if (eventdata != null) {
        eventdatainjSON = JSON.parse(eventdata);    }

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

let selectEmployeeElement: any = document.getElementById("selectEmployee")
let localdata: string | null = localStorage.getItem("localdata");
    console.log(localdata);
    
    let localdatainjSON;
    if (localdata != null) {
        localdatainjSON = JSON.parse(localdata);
    }
    if(localdatainjSON != undefined){
        localdatainjSON.forEach(element => {
            if (selectEmployeeElement != null) {
                selectEmployeeElement.innerHTML += `<option value='${element.name}'>${element.name}</option>`;
            }
        });   
    }

    // approveapproveLeaveModule
    // addEventsModule
    // addProjectModule
    // seeaddEventsModule

    let approveLeaveModule: any = document.getElementById("approveLeaveModule")
    let addEventsModule: any = document.getElementById("addEventsModule")
    let addProjectModule: any = document.getElementById("addProjectModule")
    let seeDailyWorkModule: any = document.getElementById("seeDailyWorkModule")
    
    
    
    
    if (approveLeaveModule != null && addEventsModule != null && addProjectModule != null && seeDailyWorkModule != null) {
        document.addEventListener("DOMContentLoaded", () => {
            approveLeaveModule.style.display = "block"
            addEventsModule.style.display = "none"
            addProjectModule.style.display = "none"
            seeDailyWorkModule.style.display = "none"
        })
        
        document.getElementById("manageLeave")?.addEventListener("click", () => {
            approveLeaveModule.style.display = "block"
            addEventsModule.style.display = "none"
            addProjectModule.style.display = "none"
            seeDailyWorkModule.style.display = "none"
        })
        
        document.getElementById("addEvents")?.addEventListener("click", () => {
            approveLeaveModule.style.display = "none"
            addEventsModule.style.display = "block"
            addProjectModule.style.display = "none"
            seeDailyWorkModule.style.display = "none"
        })
        document.getElementById("addProject")?.addEventListener("click", () => {
            approveLeaveModule.style.display = "none"
            addEventsModule.style.display = "none"
            addProjectModule.style.display = "block"
            seeDailyWorkModule.style.display = "none"
        })
        document.getElementById("seeDailyWork")?.addEventListener("click", () => {
            approveLeaveModule.style.display = "none"
            addEventsModule.style.display = "none"
            addProjectModule.style.display = "none"
            seeDailyWorkModule.style.display = "block"
        })
        
    }