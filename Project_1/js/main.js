/*

 <!--James Jackson->
 <!--MIU1304-->
 <!--Project 1-->

*/

window.addEventListener("DOMContentLoaded", function () {

// getting element by id
    function main(i) {
        var theElement = document.getElementById(i);
        return theElement;
    }

    function createOptions() {
        var formTag = document.getElementsByTagName("form");
        makeSelect = document.createElement("select");
        var	selectLi = main("select");
        makeSelect.setAttribute("id", "groups");
        for (var i = 0; i < printGroups.length; i++) {
            var makeOption = document.createElement("option");
            var optText = printGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

// find value of selected radio button
    function retrieveRadioValue() {
        var radios = document.forms[0].school;
        for (var i=0; i < radios.length; i++){
            if (radios[i].checked) {
                schoolValue = radios[i].value;
            }
        }
    }

//turn links on and off
    function switchControls(n) {
        switch(n) {
            case "on":
                main("printForm").style.display = "none";
                main("clear").style.display = "inline";
                main("displayLink").style.display = "none";
                main("addNew").style.display = "inline";
                break;
            case "off":
                main("printForm").style.display = "block";
                main("clear").style.display = "inline";
                main("displayLink").style.display = "inline";
                main("addNew").style.display = "none";
                main("items").style.display = "none";
                break;
            default:
                return false;
        }
    }

// retireve checkbox value
    function retrieveCheckbox(){
        if(main('recordComplete').checked) {
            recordCompleteValue = 'Yes';
        }else{
            recordCompleteValue = 'No'
        }
    }

// function for storing input data from form
    function storeData(key) {
        if(!key) {
            var id = Math.floor(Math.random() * 19760110);
        } else {
            id = key;
        }
        retrieveRadioValue();
        retrieveCheckbox();
        var item             = {};
        item.group = ["Artist:", main("groups").value];
        item.printName = ["Print Name:", main("printName").value];
        item.approxDateOfPrint = ["Approximate Date:", main("approxDateOfPrint").value];
        item.school = ["Version:", schoolValue];
        item.approxValue = ["Cost:", main("approxValue").value];
        item.datePrint = ["Date Printed:", main("datePrint").value];
        item.dateAdded = ["Date Acquired:", main("dateAdded").value];
        item.additionalComments = ["Comments:", main("additionalComments").value];
        item.recordComplete = ["Completed Record?", recordCompleteValue];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Japanese print record saved");
    }

//retrieve JSON records
    function retireveRecords() {
        switchControls("on");
        if (localStorage.length === 0) {
            alert("I automagically added some records for you!");
            automagicRecords();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id","items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        main("items").style.display = "block";
        for (var i = 0; i < localStorage.length; i++) {
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSublist = document.createElement("ul");
            makeli.appendChild(makeSublist);
            getPicture(obj.group[1], makeSublist);
            for (var n in obj) {
                var makeSubli = document.createElement("li");
                makeSublist.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSublist.appendChild(linksLi);
            }
            linkTogether(localStorage.key(i), linksLi);
        }
    }

//Get image for the right category

    function getPicture(printGroups,makeSublist){
        var imageLi = document.createElement('li');
        makeSublist.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "images/"+ printGroups + ".png");
        imageLi.appendChild(newImg);
    }

//generate records

    function automagicRecords () {
        for(var n in json) {
            var id = Math.floor(Math.random() * 19760110);
            localStorage.setItem(id, JSON.stringify(json[n]));	}
    }

    function linkTogether(key, linksLi) {
        var editLink       = document.createElement("a");
        editLink.href      = "#";
        editLink.key       = key;
        var editText       = "Edit Print Record";
        editLink.addEventListener("click", editPrintRecords);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);
        var deleteLink       = document.createElement("a");
        deleteLink.href      = "#";
        deleteLink.key       = key;
        var deleteText       = "Delete Print Record";
        deleteLink.addEventListener("click", deletePrintRecords);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

//edit existing records
    function editPrintRecords() {
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        switchControls("off"); // show the for

        var radios = document.forms[0].school;
        for (i = 0; i < radios.length; i++){
            if (radios[i].value == "Kaigetsudō" && item.school[1] == "Kaigetsudō") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Torii" && item.school[1] == "Torii") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Katsukawa" && item.school[1] == "Katsukawa") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Utagawa" && item.school[1] == "Utagawa") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Sōsaku" && item.school[1] == "Sōsaku") {
                radios[i].setAttribute("checked", "checked");
            }
            if (radios[i].value == "Shin" && item.school[1] == "Shin") {
                radios[i].setAttribute("checked", "checked");
            }
        }

        var checkBoxValue = document.forms[0].recordComplete;
        for (i = 0; i  < checkBoxValue.length; i++){
            if (checkBoxValue[i].value == "Yes" && item.recordComplete[1] == "Yes") {
            checkBoxValue[1].setAttribute("checked", "checked");
            }
        }

        main("groups").value   = item.group[1];
        main("printName").value = item.printName[1];
        main("approxDateOfPrint").value = item.approxDateOfPrint[1];
        main("school").value    = item.group[1];
        main("approxValue").value   = item.approxValue[1];
        main("datePrint").value    = item.datePrint[1];//not working
        main("dateAdded").value    = item.dateAdded[1];//not working
        main("additionalComments").value    = item.additionalComments[1];

        save.removeEventListener("click", storeData);

     // change Submit button value to say edit
        main("submit").value = "Edit Print Record";
        var editSubmit = main("submit");

     // save the key value established in this function as a property
        editSubmit.addEventListener("click", validateInput);
        editSubmit.key = this.key;

    }

//confirm delete records
    function deletePrintRecords () {
        var ask = confirm("This is about to delete this entry?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Print record was deleted.");
            window.local.reload();
        } else {
            alert("Print record not deleted.");
        }
    }

//delete local records
    function clearLocalStorage() {
        if(localStorage.length === 0) {
            alert("There is no data to clear.")
        } else {
            localStorage.clear();
            alert("All records have been deleted.");
            window.location.reload();
            return false;
        }
    }

//input validation rules
    function validateInput(e) {
        var getGroup = main("groups");
        var getprintName = main("printName");
        var getapproxValue = main("approxValue");
        var getdatePrint = main("datePrint");
        var getdateAdded = main("dateAdded");
        var recordComplete = main("recordComplete");
        var messageAry = [];
        if (getGroup.value === "--Choose One--") {
            var groupError = "Please select a Japanese print artist.";
            getGroup.style.border = "1px solid red";
            messageAry.push(groupError);
        }

        if (getprintName.value === "") {
            var printNameError = "Please enter a new print into the catalogue.";
            getprintName.style.border = "1px solid red";
            messageAry.push(printNameError);
        }

        if (getapproxValue.value === "") {
            var approxValueError = "Please enter an approximate value.";
            getapproxValue.style.border = "1px solid red";
            messageAry.push(approxValueError);
        }

        if (getdatePrint.value === "") {
            var datePrintError = "Please enter the date printed.";
            getdatePrint.style.border = "1px solid red";
            messageAry.push(datePrintError);
        }

        if (getdateAdded.value === "") {
            var dateAddedError = "Please enter the date acquired.";
            getdateAdded.style.border = "1px solid red";
            messageAry.push(dateAddedError);
        }

        if (recordComplete.value === "") {
            var recordCompleteError = "Please check if record complete.";
            recordCompleteAdded.style.border = "1px solid red";
            messageAry.push(recordCompleteError);
        }

        if (messageAry.length >= 1) {
            for(i = 0; i < messageAry.length; i++) {
                var txt = document.createElement("li");
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        }

    }

//Search function
    /*
    function getSearch(e) {
        toggleControls("search");
        var printGroups = main("group").value;
        var term = main("search").value;
        if (printGroups != "--Choose One--" && term === "") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                if (printGroups === obj.group[1]) {
                    for (n in obj) {
                        console.log(obj [n][1]);
                    }
                }
            }
        }
        if (term != "" & printGroups === "--Choose One--") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                for (n in obj) {
                    if (term === obj [n][1]) {
                        for(q in obj) {
                            console.log(obj[q][1]);
                        }
                    }
                }
            }
        }
        if (term === obj[n][1] && printGroups === obj.group[1]) {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                if (printGroups === obj.group[1]) {
                    for (g in obj) {
                        console.log(obj[g][1]);
                    }
                }
            }
        }
     }
*/





// variable for drop down
    var printGroups = ["--Choose One--", "Hokusai", "Yoshitoshi", "Kuniyoshi"],
        schoolValue;
    recordCompleteValue = 'No';
    errMsg = main("errors");
    createOptions();

// set link and submit click events
    var displayLink = main("displayLink");
    displayLink.addEventListener("click", retireveRecords);
    var clearLink = main("clear");
    clearLink.addEventListener("click", clearLocalStorage);

//var searchLink = main("searchLink");
//searchLink.addEventListener("click", getSearch);
    var save = main("submit");
    save.addEventListener("click", validateInput);

});
