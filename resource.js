const resourcesFilePath = './data/realResources.json';

let resources = [];
const resourcesContainer = document.getElementById('resourcesContainer');

const readResources = async () => {
    console.log("reading");
    const response = await fetch(resourcesFilePath);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    resources = await response.json();
    resources = filterResources(resources);
    createResourceCards(resources);
    console.log(resources);
}

function filterResources(resources) {
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

function createResourceCards(resources) {
    for (const resource of resources) {
        resourcesContainer.appendChild(createCard(resource));
        // const card = document.createElement('div');
        // card.className = 'card resourceCard';
        // createCardHeader(resource, card)
        // createCardBody(resource, card);
        // resourcesContainer.appendChild(card);
    }
}

// Creates entire card using innerHTML
function createCard(resource) {
    const card = document.createElement('div');
    card.className = 'card resourceCard';
    card.innerHTML = `
        <div class="card-header">
            <div id="resource-header" class="row">
                <div class="col-sm-1">
                    <input class="form-check-input" type="checkbox" value="">
                </div>
                <div class="col-sm-11">
                    <h2 class="resource-name">${resource.agency_name}</h2>
                </div>
            </div>
        </div>
        <div class="card-body row">
            <div class="col-lg-8">
                <p class="card-text agency-description">About the agency: ${resource.agency_description}</p>
                <p class="card-text service-description">Services: ${resource.service_description}</p>
                <ul>
                    <li>Application process: ${resource.site_details}</li>
                    <li>Elgibility: ${resource.site_eligibility}</li>
                    <li>Document: Photo ID -- Proof of resodency</li>
                </ul>
            </div>
            <div class="col-lg-4">
                <p>Schedule: ${resource.site_schedule}</p>
            </div>

            <a href="#" class="btn btn-primary see-more">See less</a>
        </div>
    `;
}

// Creates card header and appends it to the card (CURRENTLY UNUSED)
function createCardHeader(resource, card) {
    const header = document.createElement('div');
    header.className = 'card-header';
    card.appendChild(header);
    const resourceHeader  = document.createElement('div');
    resourceHeader.className = 'row resource-header';
    header.appendChild(resourceHeader);
    const resourceCheckboxContainer = document.createElement('div');
    resourceCheckboxContainer.className = 'col-sm-11';
    resourceHeader.appendChild(resourceCheckboxContainer);
    const checkboxInput = document.createElement('input');
    checkboxInput.className = 'form-check-input';
    checkboxInput.type = 'checkbox';
    checkboxInput.value = '';
    resourceCheckboxContainer.append(checkboxInput);
    const resourceNameContainer = document.createElement('div');
    resourceNameContainer.className = 'col-sm-11';
    resourceHeader.appendChild(resourceNameContainer);
    const resourceName = document.createElement('h2');
    resourceName.className = 'resource-name';
    resourceName.innerHTML = resource.agency_name;
    resourceNameContainer.appendChild(resourceName);
}

// Creates card header and appends it to the card (CURRENTLY UNUSED)
function createCardBody(resource, card) {
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body row';
    card.appendChild(cardBody);

    cardBody.innerHTML = `
    <div class="card-body row">
        <div class="col-lg-8">
            <p class="card-text">${resource.service_description}</p>
            <ul>
                <li>Application process: fill out online form</li>
                <li>Elgibility: Living in Delaware, Grant, Madison, or Tipton County </li>
                <li>Document: Photo ID -- Proof of resodency</li>
            </ul>
        </div>
        <div class="col-lg-4">
            <p>Schedule:</p>
            <p>Insert Schedule Here</p>
        </div>
        <a href="#" id="see-more" class="btn btn-primary">See less</a>
    </div>
    `;
    // const firstColumn = document.createElement('div');
    // firstColumn.className = 'col-lg-8';
    // cardBody.appendChild(firstColumn);

    // const secondColumn = document.createElement('div');
    // secondColumn.className = 'col-lg-8';
    // cardBody.appendChild(secondColumn);
}