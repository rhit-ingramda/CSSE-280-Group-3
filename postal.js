const locationSearchBox = document.getElementById('postal');
const searchButton = document.getElementById('searchButton');
let criterias = [];

const categoryElements = document.querySelectorAll("div#categoryDropdown div#subCategory");
let categories = [];
for (const elem of categoryElements){
    checkBox = elem.children[0];
    checkBox.addEventListener('click', function() {
        checkBox.checked = !checkBox.checked;
        console.log(checkBox.checked);
        if (checkBox.checked){
            text = elem.childNodes[2]
            console.log(text);
            categories.push(elem.childNodes[2])
        }
    })
    console.log(checkBox);
}

postal.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const criteria = locationSearchBox.value;
        const newCriteriaBox = drawCriteriaRectangle(criteria);
        criterias.push({criteria: criteria,
                        element: newCriteriaBox});
        locationSearchBox.value = "";
      }
});

searchButton.addEventListener('click', function() {
    for (const criteria of criterias){
        console.log(`Criteria: ${criteria.criteria}`);
    }
});

function drawCriteriaRectangle(criteria) {

    const newCriteriaBox = getNewCriteriaBox();
    const newCriteriaX = getNewCriteriaX();

    locationSearchBox.insertAdjacentElement('afterend',newCriteriaBox);
    newCriteriaBox.insertAdjacentElement('beforeend',newCriteriaX);
    newCriteriaBox.insertAdjacentHTML('beforeend',
    `<div id="locationCriteriaText" class="col-sm-11">${criteria}</div>`);

    newCriteriaX.addEventListener('click', function () {
        removeCriteria(criteria);
    });
    return newCriteriaBox;
}

function getNewCriteriaBox() {
    const newCriteriaBox = document.createElement("div");
    newCriteriaBox.classList.add("row");
    newCriteriaBox.id = "locationCriteriaRectangle";
    return newCriteriaBox;
}

function getNewCriteriaX() {
    const newCriteriaX = document.createElement("img");
    newCriteriaX.src = "public/images/X.png";
    newCriteriaX.id = "locationCriteriaX";
    newCriteriaX.classList.add("col-sm-1");
    return newCriteriaX;
}

function removeCriteria(criteriaToRemove) {
    criterias = criterias.filter(function(criteria) {
        if(criteria.criteria === criteriaToRemove){
            criteria.element.remove();
            return false;
        }
        return true;
    })
}

