import { gender, person } from "./person";
import { status } from "./Employee";

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

    if (leavedatainjSON != undefined) {
        leavedatainjSON.sort(function(a, b) {
            return a[1] - b[1];
        })
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

        if (toDateComparison.getTime() > curruntDate.getTime()) {
            if (tbodyElement != null) {
                tbodyElement.innerHTML += `<tr><td>${allLeave.id}</td><td>${allLeave.type}</td><td>${allLeave.from}</td>
        <td>${allLeave.to}</td><td>${status[allLeave.status]}</td></tr>`
            }
        }

    
});
   }
    
}
showTable()

var projectNameObject: {pNames : string} = {pNames: "Training"};

let adminProjectName:string = "project4"

let projectName: string | null = localStorage.getItem("peojectName");

let projectNameinjSONPrase;
if (projectName == null) {
    let projectNameinjSON = [];
    projectNameinjSONPrase = projectNameinjSON;
    projectNameinjSONPrase.push({pNames: adminProjectName})
}else{
    let projectNameinjSON = JSON.parse(projectName)
    projectNameinjSONPrase = projectNameinjSON;
    projectNameinjSONPrase.push({pNames : adminProjectName})
}

localStorage.setItem("peojectName", JSON.stringify(projectNameinjSONPrase));
console.log(JSON.stringify(projectNameinjSONPrase));
