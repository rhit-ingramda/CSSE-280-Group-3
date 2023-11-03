let resources = [];

const readResources = async () => {
    console.log("reading");
    const response = await fetch('./data/realResources.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    resources = await response.json();
    resources = filterResources(resources);
    console.log(resources);
}


function filterResources(resources) {
    console.log(criterias);
    for(const criteria of criterias){
        resources = resources.filter(function(resource) {
            console.log(resource.zipcode, criteria.criteria);
            return resource.zipcode == parseInt(criteria.criteria);
        })
    }
    return resources;
}