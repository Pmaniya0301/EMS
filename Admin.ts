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
    let localdatainjSON: any;
    if (leavedata != null) {
        localdatainjSON = JSON.parse(leavedata);
        console.log("sgszgkjaw tabel", typeof localdatainjSON);
    }

    localdatainjSON.sort()

    tbodyElement.innerHTML = ``;
    localdatainjSON.forEach(allLeave => {
        

            let toDateComparison = new Date(allLeave.to)
            let curruntDate = new Date();
            curruntDate.setHours(0);
            curruntDate.setMinutes(0);
            curruntDate.setSeconds(0);
            curruntDate.setMilliseconds(0);
            console.log(toDateComparison, curruntDate);

            if (toDateComparison.getTime() > curruntDate.getTime()) {
                tbodyElement.innerHTML += `<tr><td>${allLeave.type}</td><td>${allLeave.from}</td>
            <td>${allLeave.to}</td><td>${status[allLeave.status]}</td></tr>`
            }

        
    });
}

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
