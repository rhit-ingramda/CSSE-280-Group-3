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