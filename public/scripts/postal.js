const locationSearchBox = document.getElementById('postal');
const searchButton = document.getElementById('searchButton');
let criterias = [];

const categoryElements = document.querySelectorAll("div#categoryDropdown div#subCategory");
let categoryObjects = [];
for (const elem of categoryElements){
    categoryObjects.push({
        elem: elem,
        isChecked: false
    })
}
let categories = [];

for (const obj of categoryObjects){
    checkBox = obj.elem.children[0];
    checkBox.addEventListener('click', function() {
        //change the state of the checkBox
        obj.isChecked = !obj.isChecked;
        console.log(obj.isChecked);
        console.log(obj.elem);
        //get the plain text of the category whose checkBox has been clicked
        text = obj.elem.childNodes[2].data.trim();
        //if the checkBox has been checked...
        if (obj.isChecked){
            text = obj.elem.childNodes[2].data.trim();
            console.log(text);
            //push this string onto the list of checked categories
            categories.push(text);
        } else  {
            // if the checkbox has been unclicked, remove the category from the list
            // the category should be guaranteed to already be in the list.
            removeCategory(text);
        }
        console.log(categories);
    })
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
    for (const category of categories){
        console.log(`Category: ${category}`);
    }
    readResources();
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
    newCriteriaX.src = "images/X.png";
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

function removeCategory(categoryToRemove) {
    console.log(`removing category: ${categoryToRemove}`);
    categories = categories.filter(function(category) {
        console.log(category);
        return category !== categoryToRemove;
    })
}


