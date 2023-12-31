const locationSearchBox = document.getElementById('postal');
const searchButton = document.getElementById('searchButton');
const introText = document.getElementById('introText');
const exportButton = document.getElementById('exportButton');
const exportAsCSVButton = document.getElementById('exportAsCSVButton');
const expandAllButton = document.getElementById('expandAllButton');
let criterias = [];
populateTax.populate();
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
        text = obj.elem.childNodes[3].innerHTML;
        console.log(text);
        //get the plain text of the category whose checkBox has been clicked
        //if the checkBox has been checked...
        if (obj.isChecked){
            console.log(obj.elem.childNodes[2]); // no clue what this is supposed to be
            if(text == 'Other'){
                // if this category is 'other', get the parent category and tag the category with it for filtering
                superCategory = obj.elem.parentNode.parentNode.parentNode.childNodes[1].innerText; // no clue how to get this back to working
                console.log(`Supercategory: ${superCategory}`);
                text = superCategory + text;
            }
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
    if(locationSearchBox.value != ''){
        criterias.push({criteria: locationSearchBox.value,
                        element: null});
    }
    for (const criteria of criterias){
        console.log(`Criteria: ${criteria.criteria}`);
    }
    for (const category of categories){
        console.log(`Category: ${category}`);
    }
    hideIntroText();
    showExportButton();
    updateSearchTerms();
    readResources(criterias, categories);
    criterias = criterias.filter(function(criteria) {
        return criteria.criteria != locationSearchBox.value;
    })
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

// Hides the introductory text when first search is performed.
function hideIntroText() {
    introText.hidden = true;
}

// Shows export button when first search is performed.
function showExportButton() {
    exportButton.hidden = false;
    exportAsCSVButton.hidden = false;
    expandAllButton.hidden = false;


}

function updateSearchTerms() {
    const printTextContainer = document.getElementById('printText');
    const criteriaList = [];
    for (const criteria of criterias){
        criteriaList.push(criteria.criteria);
    }
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const header = document.getElementById('header');
    printTextContainer.innerHTML = `<p><p>Search Locations: ${criteriaList}</p><p>Search Categories: ${categories}</p>`;
    header.innerHTML = `<b>Indiana 211 resource data as of ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}</b>`;
    footer.innerHTML = `<b>As of ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}, the list provided is the most up to date information available to Indiana 211 for the types and locations of resources selected.  Note that resource information updates are made regularly and it always best to go back to the source of truth for updated information</b>`
}
