
// Fetch the data using criterias (list of locations) and categories (taxonomy)
function readResources() {
    try {
        // Add criteria and categories
        const data = fs.readFile(resourcesFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading resources:', error);
        return [];
    }
}

// function/for look to create a bunch of cards
function createCardsList() {
    readResources();
    
}

// function to create a single card and populate it

// function to append all cards to html

// function to put all selected into document to export
    // if none are selected, have text be to export all
    // if some are selected, have text be to export only the selected

// button listener to select all/none



