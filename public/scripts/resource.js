const resourcesFilePath = './data/realResources.json';

let resources = [];
let resourceCards = [];
const resourcesContainer = document.getElementById('resourcesContainer');

// Listener for printing, adds in categories and criteria for what is printed
exportButton.addEventListener('click', function () {
    hideUncheckedResources()
    window.print();
});

const readResources = async () => {
    console.log("reading");
    const response = await fetch(resourcesFilePath);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Need to catch the promises
    resources = await response.json();
    resources = filterResourcesByCriteria(resources);
    resources = filterResourcesByCategory(resources);
    console.log(resources);
    clearResources();
    createResourceCards(resources);
}

function filterResourcesByCriteria(resources) {
    console.log(criterias);
    if(criterias.length == 0){
        return resources;
    } else{
        resources = resources.filter(function(resource) {
            meetsCriteria = false;
            for(const criteria of criterias){
                if(parseInt(criteria.criteria)){
                    meetsCriteria = meetsCriteria || resource.zipcode == parseInt(criteria.criteria);
                } else{
                    meetsCriteria = meetsCriteria || resource.city == criteria.criteria;
                    meetsCriteria = meetsCriteria || resource.county == criteria.criteria;
                }
            }
            return meetsCriteria;
        })
        return resources;
    }
}

function filterResourcesByCategory(resources) {
    console.log(categories);
    if(categories.length == 0){
        // when no categories are selected, return all the resources
        return resources;
    } else{
        // filter resources based on criteria and categories
        resources = resources.filter(function(resource) {
            meetsCriteria = false;
            for(const category of categories){
                if(category.includes('Other')){
                    superCategory = category.split(' Other')[0];
                    let meetsOtherCriteria = true;
                    for (const category of populateTax.categories){
                        if(superCategory == 'OTHER'){
                            meetsOtherCriteria = meetsOtherCriteria && resource.taxonomy_category !== category.mainCategory;
                        } else{
                            if(category.mainCategory.toUpperCase() == superCategory.toUpperCase()){
                                for(const subCategory in category.subCategories){
                                    meetsOtherCriteria = meetsOtherCriteria && resource.taxonomy_name !== subCategory;
                                }
                                meetsOtherCriteria = meetsOtherCriteria && resource.taxonomy_category == category.mainCategory;
                            }
                        }
                    };
                    meetsCriteria = meetsCriteria || meetsOtherCriteria;
                } else{
                    meetsCriteria = meetsCriteria || resource.taxonomy_category == category;
                    meetsCriteria = meetsCriteria || resource.taxonomy_name == category;
                }
            }
            return meetsCriteria;
        })
        // return filtered resources
        return resources;
    }
}

function createResourceCards(resources) {
    if(resources.length == 0){
        const text = 'Sorry, no resources are available with the selected filters';

    }
    let i = 0;
    for (const resource of resources) {
        const resourceCard = createCard(resource);
        const seeMoreButton = resourceCard.childNodes[3].childNodes[5];
        seeMoreButton.innerText = 'See More';
        seeMoreButton.addEventListener('click', function() {
            resourceCard.childNodes[3].childNodes[1].childNodes[3].hidden = !resourceCard.childNodes[3].childNodes[1].childNodes[3].hidden; //service description
            resourceCard.childNodes[3].childNodes[3].childNodes[3].hidden = !resourceCard.childNodes[3].childNodes[3].childNodes[3].hidden; //application process and elgibility
            if(seeMoreButton.innerText == 'SEE MORE'){
                seeMoreButton.innerHTML = 'See Less';
            } else{
                seeMoreButton.innerHTML = 'See More';
            }
        })
        resourcesContainer.appendChild(resourceCard);
        i++;
        resourceCards.push(resourceCard);
    }
    
}

// Creates entire card using innerHTML
function createCard(resource, i) {
    const card = document.createElement('div');
    card.className = 'card resourceCard';
    card.innerHTML = `
        <div class="card-header row">
            <div id="subCategory" class="form-check">
                <input type="checkbox" class="form-check-input" value="" id="resourceCheckbox${i}">
                <label class="form-check-label" for="resourceCheckbox${i}">${resource.agency_name}</label>
            </div>
        </div>
        <div class="card-body row">
            <div class="col-lg-8">
                <p class="card-text agency-description" ><b>About the agency:</b> ${resource.agency_desc}</p>
                <p class="card-text service-description" hidden><b>Services:</b> ${resource.service_description}</p>
            </div>
            <div class="col-lg-4">
                <p><b>Schedule:</b> ${resource.site_schedule}</p>
                <ul hidden>
                    <li><b>Application process:</b> ${resource.site_details}</li>
                    <li><b>Eligibility:</b> ${resource.site_eligibility}</li>
                </ul>
            </div>

            <button href="#" class="btn btn-primary see-more">See More</button>
        </div>
    `;
    return card;
}

function clearResources() {
    console.log(resourcesContainer.childNodes);
    while (resourcesContainer.firstChild) {
        resourcesContainer.removeChild(resourcesContainer.firstChild);
      }
      resourceCards = [];
    console.log('After removing:', resourcesContainer.childNodes);
}

function hideUncheckedResources() {
    let i = 0;
    for (const resource of resourceCards) {
        if (!document.getElementById(`resourceCheckbox${i}`).checked) {
            resource.className = 'card resourceCard hideOnPrint';
        } else {
            resource.className = 'card resourceCard';
        }
        i++;
    }
}