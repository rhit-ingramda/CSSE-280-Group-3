const resourcesFilePath = './data/realResources.json';

let resources = [];
let resourceCards = [];
const resourcesContainer = document.getElementById('resourcesContainer');
let checkedResources = 0;

// Listener for printing, adds in categories and criteria for what is printed
exportButton.addEventListener('click', function () {
    if(checkedResources == 0){
        for(const resource of resourceCards){
            resource.className = 'card resourceCard';
        }
        window.print();
        for(const resource of resourceCards){
            resource.className = 'card resourceCard hideOnPrint';
        }
    } else{
        window.print();
    }
});

expandAllButton.addEventListener('click', function(){
    const seeMoreButtons = document.querySelectorAll('.see-more');
    for(btn of seeMoreButtons){
        btn.dispatchEvent(new Event('click'));
    }

});

exportAsCSVButton.addEventListener('click', function() {
    let csv = resources.map(function(d){
        return JSON.stringify(Object.values(d));
    })
    .join('\n') 
    .replace(/(^\[)|(\]$)/mg, '');
    const headers = 'agency_id,site_id,agency_name,agency_desc,site_name,address_1,address_2,city,zipcode,county,state_province,latitude,longitude,site_number,service_id,service_name,service_description,taxonomy_code,taxonomy_name,taxonomy_category,nameLevel2,nameLevel3,nameLevel4,nameLevel5,service_email,service_website,status,site_details,site_schedule,site_eligibility,createdon,lastupdated,lastVerified'
    csv = headers + csv;
    console.log(csv);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

});

const readResources = async (criterias, categories) => {
    console.log("reading");
    const response = await fetch(resourcesFilePath);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Need to catch the promises
    resources = await response.json();
    resources = filterResourcesByCriteria(resources, criterias);
    resources = filterResourcesByCategory(resources, categories);
    console.log(resources);
    clearResources();
    createResourceCards(resources);
}

function filterResourcesByCriteria(resources, criterias) {
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

function filterResourcesByCategory(resources, categories) {
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
    const resourceNames = new Set();
    if(resources.length == 0){
        const text = 'Sorry, no resources are available with the selected filters';
        resourcesContainer.innerHTML = text;
    }
    let i = 0;
    for (const resource of resources) {
        if(!resourceNames.has(resource.agency_name)){
            resourceNames.add(resource.agency_name);
            const resourceCard = createCard(resource, i);
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
            createResourceCheckboxListener(document.getElementById(`resourceCheckbox${i}`), resourceCard);
            i++;
            resourceCards.push(resourceCard);
        }
    }
}

function createResourceCheckboxListener(checkBox, resource){
    checkBox.addEventListener('click', function() {
        if(checkBox.checked){
            if(checkedResources == 0){
                exportButton.innerHTML = 'Export Selected';
            }
            checkedResources++;
            resource.className = 'card resourceCard';
        } else{
            checkedResources--;
            if(checkedResources == 0){
                exportButton.innerHTML = 'Export All';
            }
            resource.className = 'card resourceCard hideOnPrint';
        }
    });
}

// Creates entire card using innerHTML
function createCard(resource, i) {
    const card = document.createElement('div');
    card.className = 'card resourceCard hideOnPrint';
    card.innerHTML = `
        <div class="card-header row">
            <div id="subCategory" class="form-check">
                <input type="checkbox" class="form-check-input" value="" id="resourceCheckbox${i}">
                <label class="form-check-label" for="resourceCheckbox${i}">${resource.agency_name}</label>
                <a id="row" href="${resource.service_website}" target="_blank">${resource.service_website}</a>
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

            <button href="#" class="btn btn-primary see-more d-print-none">See More</button>
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