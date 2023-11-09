const resourcesFilePath = './data/realResources.json';

let resources = [];
const resourcesContainer = document.getElementById('resourcesContainer');

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
        return resources;
    } else{
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
        return resources;
    }
}

function createResourceCards(resources) {
    for (const resource of resources) {
        const resourceCard = createCard(resource)
        resourcesContainer.appendChild(resourceCard);
    }
}

// Creates entire card using innerHTML
function createCard(resource) {
    const card = document.createElement('div');
    card.className = 'card resourceCard';
    card.innerHTML = `
        <div class="card-header row">
            <div class="col-sm-1">
                <input class="form-check-input" type="checkbox" value="">
            </div>
            <div class="col-sm-11">
                <h2 class="resource-name">${resource.agency_name}</h2>
            </div>
        </div>
        <div class="card-body row">
            <div class="col-lg-8">
                <p class="card-text agency-description"><b>About the agency:</b> ${resource.agency_desc}</p>
                <p class="card-text service-description"><b>Services:</b> ${resource.service_description}</p>
            </div>
            <div class="col-lg-4">
                <p><b>Schedule:</b> ${resource.site_schedule}</p>
                <ul>
                    <li><b>Application process:</b> ${resource.site_details}</li>
                    <li><b>Eligibility:</b> ${resource.site_eligibility}</li>
                </ul>
            </div>

            <button href="#" class="btn btn-primary see-more">See less</button>
        </div>
    `;
    return card;
}


function clearResources() {
    console.log(resourcesContainer.childNodes);
    while (resourcesContainer.firstChild) {
        resourcesContainer.removeChild(resourcesContainer.firstChild);
      }

    console.log('After removing:', resourcesContainer.childNodes);
}