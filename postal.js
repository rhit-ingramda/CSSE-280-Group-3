const locationSearchBox = document.getElementById('postal');
let criterias = [];

postal.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const criteria = locationSearchBox.value;
        const newCriteriaBox = drawCriteriaRectangle(criteria);
        criterias.push({criteria: criteria,
                        element: newCriteriaBox});
        locationSearchBox.value = "";
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

