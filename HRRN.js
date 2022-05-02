var Arrival_Time;
var Burst_Time;
var completed = [];
var Turn_Around_Time = [];
var Waiting_Time = [];
var Completion_Time = [];
var Ctime = -1;
var avgtt = 0;
var avgwt = 0;
var sum_bt = 0;
var t;
var Rp = [];
var Run_time = [];
var burst = [];

function Nonpreemptive() {
    completed = [];
    Turn_Around_Time = [];
    Waiting_Time = [];
    Completion_Time = [];
    avgtt = 0;
    avgwt = 0;
    sum_bt = 0;
    //Arrival_Time input
    Arrival_Time = document.querySelector('.Arrival_Time').value;
    Arrival_Time = Arrival_Time.split(" ").map(Number);

    //Burst_Time input
    Burst_Time = document.querySelector('.Burst_Time').value;
    Burst_Time = Burst_Time.split(" ").map(Number);

    //quantum time
    Ctime = document.querySelector('.Ctime').value;
    console.log(Ctime);
    sortByArrival();

    for (i = 0; i < Burst_Time.length; i++) {
        // Variable for sum of all Burst Times
        Run_time[i] = Burst_Time[i];
        sum_bt += Burst_Time[i];
    }

    for (t = Arrival_Time[0]; t < sum_bt;) {

        // Set lower limit to response ratio
        var hrr = -9999;

        // Response Ratio Variable
        var temp;

        // Variable to store next process selected
        var loc;
        for (i = 0; i < Arrival_Time.length; i++) {

            // Checking if process has arrived and is Incomplete
            if (Arrival_Time[i] <= t && completed[i] != 1) {

                // Calculating Response Ratio
                temp = (Burst_Time[i] + (t - Arrival_Time[i])) / Burst_Time[i];

                // Checking for Highest Response Ratio
                if (hrr < temp) {

                    // Storing Response Ratio
                    hrr = temp;

                    // Storing Location
                    loc = i;
                }
            }
        }
        // Updating time value
        t += Burst_Time[loc];
        Completion_Time[loc] = t;

        // Calculation of waiting time
        Waiting_Time[loc] = t - Arrival_Time[loc] - Burst_Time[loc];

        // Calculation of Turn Around Time
        Turn_Around_Time[loc] = t - Arrival_Time[loc];

        // Sum Turn Around Time for average
        avgtt += Turn_Around_Time[loc];

        // Updating Completion Status
        completed[loc] = 1;

        // Sum Waiting Time for average
        avgwt += Waiting_Time[loc];

        console.log("P" + loc);
        console.log(Arrival_Time[loc]);
        console.log(Burst_Time[loc]);
        console.log(Waiting_Time[loc]);
        console.log(Turn_Around_Time[loc]);
    }
    tableCreate();
    // Preemptive();
    hidden();
}

//hidden
const hidtime = document.querySelector('#hden');
const hidtable = document.querySelector('.hidden');
const showavgwt = document.querySelector('#Avgwt');
const showavgtt = document.querySelector('#Avgtt');
function hidden() {
    // const Object1 = Event.currentTarget;
    hidtable.classList.remove('hidden');
    hidtime.classList.remove('hidden');
    showavgwt.classList.remove('hidden');
    showavgtt.classList.remove('hidden');
}

function tableCreate() {
    //body reference 
    var body = document.getElementsByTagName("body")[0];

    // create elements <table> and a <tr>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tr");

    // table head
    var row = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.appendChild(document.createTextNode("Process"));
    row.appendChild(head1);
    var head2 = document.createElement("th");
    head2.appendChild(document.createTextNode("Arrival Time"));
    row.appendChild(head2);
    var head3 = document.createElement("th");
    head3.appendChild(document.createTextNode("Burst Time"));
    row.appendChild(head3);
    var head4 = document.createElement("th");
    head4.appendChild(document.createTextNode("Waiting Time"));
    row.appendChild(head4);
    var head5 = document.createElement("th");
    head5.appendChild(document.createTextNode("Turn Around Time"));
    row.appendChild(head5);
    var head6 = document.createElement("th");
    head6.appendChild(document.createTextNode("Completion Time"));
    row.appendChild(head6);
    tblBody.appendChild(row);

    // cells creation
    for (var i = 0; i <= Arrival_Time.length - 1; i++) {
        // table row creation
        var row = document.createElement("tr");

        // create element <td> and text node 
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        var cellText1 = document.createTextNode("P" + i);
        var cellText2 = document.createTextNode(Arrival_Time[i]);
        var cellText3 = document.createTextNode(Burst_Time[i]);
        var cellText4 = document.createTextNode(Waiting_Time[i]);
        var cellText5 = document.createTextNode(Turn_Around_Time[i]);
        var cellText6 = document.createTextNode(Completion_Time[i]);

        var cell1 = document.createElement("th");
        cell1.appendChild(cellText1);
        row.appendChild(cell1);

        var cell2 = document.createElement("th");
        cell2.appendChild(cellText2);
        row.appendChild(cell2);

        var cell3 = document.createElement("th");
        cell3.appendChild(cellText3);
        row.appendChild(cell3);

        var cell4 = document.createElement("th");
        cell4.appendChild(cellText4);
        row.appendChild(cell4);

        var cell5 = document.createElement("th");
        cell5.appendChild(cellText5);
        row.appendChild(cell5);

        var cell6 = document.createElement("th");
        cell6.appendChild(cellText6);
        row.appendChild(cell6);

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    // tbl border attribute to 
    tbl.setAttribute("border", "2");

    const nonavgwtc = document.querySelector('#Avgwt');
    nonavgwtc.innerHTML = "Average waiting time : " + parseInt(avgwt)/Burst_Time.length;
    const nonavgttc = document.querySelector('#Avgtt');
    nonavgttc.innerHTML = "Average Turn Around time : " + parseInt(avgtt)/Burst_Time.length;

    nonavgwtc.classList.remove('hidden');
    nonavgttc.classList.remove('hidden');
}

// var Bn;
// function Preemptive() {
//     document.getElementById("Ctime").innerHTML = "At time " + Ctime;
//     for (i = 0; i < Rp.length; i++) {
//         if (Rp[i] !== undefined) {
//             const rapro = document.createElement("li");
//             const Ratio_process = document.createTextNode("P" + i + " " + Rp[i]);
//             rapro.appendChild(Ratio_process);
//             document.getElementById("pree").appendChild(rapro);
//         }
//         if (Bn !== 2 && Rp[i] !== undefined) {
//             let text = "Next process"
//             document.getElementById("Nextprocess").innerHTML = "P" + i + text;
//             Bn = 2;
//         }
//     }
// }

function sortByArrival() {
    for (i = 0; i < Arrival_Time.length; i++) {
        for (j = i + 1; j < Arrival_Time.length; j++) {
            var temp;
            // Check for lesser arrival time
            if (Arrival_Time[i] > Arrival_Time[j]) {

                // Swap earlier process to front
                temp = Arrival_Time[i];
                Arrival_Time[i] = Arrival_Time[j];
                Arrival_Time[j] = temp;
                // Swap burst Time
                temp = Burst_Time[i];
                Burst_Time[i] = Burst_Time[j];
                Burst_Time[j] = temp;
            }
        }
        completed[i] = 0;
    }
}

function Preemptive() {
    burst = [];
    completed = [];
    Waiting_Time = [];
    Completion_Time = [];
    avgtt = 0;
    avgwt = 0;
    sum_bt = 0;
    //Arrival_Time input
    Arrival_Time = document.querySelector('.Arrival_Time').value;
    Arrival_Time = Arrival_Time.split(" ").map(Number);

    //Burst_Time input
    Burst_Time = document.querySelector('.Burst_Time').value;
    Burst_Time = Burst_Time.split(" ").map(Number);

    burst = document.querySelector('.Burst_Time').value;
    burst = burst.split(" ").map(Number);
    // console.log(burst);
    // console.log(burst[0]);
    // console.log(burst[1]);
    // console.log(burst[2]);
    // console.log(burst[3]);
    // console.log(burst[4]);

    //quantum time
    Ctime = document.querySelector('.Ctime').value;
    // console.log(Ctime);
    sortByArrival();

    //body reference 
    var body = document.getElementsByTagName("body")[0];

    // create elements <table> and a <tr>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tr");

    // table head
    var row = document.createElement("tr");
    var headT = document.createElement("th");
    headT.appendChild(document.createTextNode("Time"));
    row.appendChild(headT);

    var head1 = document.createElement("th");
    head1.appendChild(document.createTextNode("Process"));
    row.appendChild(head1);

    var head2 = document.createElement("th");
    head2.appendChild(document.createTextNode("Arrival Time"));
    row.appendChild(head2);

    var head3 = document.createElement("th");
    head3.appendChild(document.createTextNode("Burst Time"));
    row.appendChild(head3);

    var head4 = document.createElement("th");
    head4.appendChild(document.createTextNode("Waiting Time"));
    row.appendChild(head4);
    
    var head5 = document.createElement("th");
    head5.appendChild(document.createTextNode("Completion Time"));
    row.appendChild(head5);

    var head6 = document.createElement("th");
    head6.appendChild(document.createTextNode("Turn Around Time"));
    row.appendChild(head6);
    
    tblBody.appendChild(row);

    for (i = 0; i < Burst_Time.length; i++) {
        // Variable for sum of all Burst Times
        // Run_time[i] = Burst_Time[i];
        sum_bt += Burst_Time[i];
        // completed[i] = 0;
    }

    for (t = Arrival_Time[0]; t < sum_bt;) {

        // Set lower limit to response ratio
        var hrr = -9999;

        // Response Ratio Variable
        var temp;

        // Variable to store next process selected
        var loc;
        var nub = 0;
        var x = 1;
        for (i = 0; i < Arrival_Time.length; i++) {

            // Checking if process has arrived and is Incomplete
            if (Arrival_Time[i] <= t && completed[i] < 1) {

                // Calculating Response Ratio
                temp = (Burst_Time[i] + (t - Arrival_Time[i])) / Burst_Time[i];

                // Checking for Highest Response Ratio
                if (hrr < temp) {

                    // Storing Response Ratio
                    hrr = temp;

                    // Storing Location
                    loc = i;
                }
            }
        }
        while (x) {
            Burst_Time[loc]--;
            // Run_time[loc]--;
            nub++;
            if (nub == Ctime || Burst_Time[loc] == 0) {
                x = 0;
            }
        }
        // Updating time value
        t += nub;
        console.log(loc);
        console.log(Waiting_Time[loc]);
        console.log(t);
        console.log(Arrival_Time[loc]);
        console.log(burst[loc]);
        console.log(Burst_Time[loc]);
        // Calculation of waiting time
        Waiting_Time[loc] = (parseInt(t) - parseInt(Arrival_Time[loc])) - ((parseInt(burst[loc]) - parseInt(Burst_Time[loc])));
        console.log(Waiting_Time[loc]);
        if (Burst_Time[loc] <= 0) {
            completed[loc] = 1;
        }

        // console.log("P" + loc);
        // console.log(Arrival_Time[loc]);
        // console.log(Burst_Time[loc]);
        // console.log(Waiting_Time[loc]);
        // console.log(Turn_Around_Time[loc]);

        // table row creation
        var row = document.createElement("tr");

        // create element <td> and text node 
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        var cellTextTime = document.createTextNode(t - nub + "-" + t);
        var cellText1 = document.createTextNode("P" + loc);
        var cellText2 = document.createTextNode(Arrival_Time[loc]);
        var cellText3 = document.createTextNode(parseInt(Burst_Time[loc]) + parseInt(nub) + " --> " + (Burst_Time[loc]));
        var cellText4 = document.createTextNode(Waiting_Time[loc]);
        if (completed[loc] == 1) {
            var cellText5 = document.createTextNode(t);
            var cellText6 = document.createTextNode(t - parseInt(Arrival_Time[loc]));
            completed[loc] = 2;

            // Sum Waiting Time for average
            avgwt += Waiting_Time[loc];

            // Sum Turn Around Time for average
            avgtt += t - Arrival_Time[loc];
        }
        else {
            var cellText5 = document.createTextNode(" ");
            var cellText6 = document.createTextNode(" ");
        }

        var cellTime = document.createElement("th");
        cellTime.appendChild(cellTextTime);
        row.appendChild(cellTime);

        var cell1 = document.createElement("th");
        cell1.appendChild(cellText1);
        row.appendChild(cell1);

        var cell2 = document.createElement("th");
        cell2.appendChild(cellText2);
        row.appendChild(cell2);

        var cell3 = document.createElement("th");
        cell3.appendChild(cellText3);
        row.appendChild(cell3);

        var cell4 = document.createElement("th");
        cell4.appendChild(cellText4);
        row.appendChild(cell4);

        var cell5 = document.createElement("th");
        cell5.appendChild(cellText5);
        row.appendChild(cell5);

        var cell6 = document.createElement("th");
        cell6.appendChild(cellText6);
        row.appendChild(cell6);

        //row added to end of table body
        tblBody.appendChild(row);
    }
    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    // tbl border attribute to 
    tbl.setAttribute("border", "2");

    const avgwtc = document.querySelector('#Avgwt');
    avgwtc.innerHTML = "Average waiting time : " + parseInt(avgwt)/Burst_Time.length;
    const avgttc = document.querySelector('#Avgtt');
    avgttc.innerHTML = "Average Turn Around time : " + parseInt(avgtt)/Burst_Time.length;

    hidden();
}

function show() {
    if (x == 1) {
        // const Object1 = Event.currentTarget;
        time.classList.add('grob');
        Notime.classList.remove('grob');
        timeinput.classList.remove('hidden');
        b1.classList.add('hidden');
        b2.classList.remove('hidden');
        x = 0;
    }
    else if (x == 0) {
        time.classList.remove('grob');
        Notime.classList.add('grob');
        timeinput.classList.add('hidden');
        b2.classList.add('hidden');
        b1.classList.remove('hidden');
        x = 1;
    }
}

const Object1 = document.querySelector('.case');
Object1.addEventListener('click', show);
const time = document.querySelector('#time');
const Notime = document.querySelector('#Notime');
const timeinput = document.querySelector('#timeinput');
const choosecal = document.querySelector('.preem');
const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
let x = 1;