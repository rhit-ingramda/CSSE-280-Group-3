var populateTax = {
    categories: [{mainCategory: 'Basic Needs', subCategories: ['Electric Service Payment Assistance',
                                                                  'Gas Service Payment Assistance',
                                                                  'Water Service Payment Assistance',
                                                                  'Rent Payment Assistance',
                                                                  'Heating Fuel Payment Assistance',
                                                                  'Food Vouchers',
                                                                  'Mortgage Payment Assistance',
                                                                  'Clothing Vouchers',
                                                                  'Transportation Expense Assistance',
                                                                  'Food Pantries',
                                                                  'Other']},
                    {mainCategory: 'Organizational/Community/International Services', subCategories: ['Local Officials Offices',
                                                                         'Public Internet Access Sites',
                                                                         'Public Libraries',
                                                                         'Construction/Development Permits',
                                                                         'Government Information Services',
                                                                         'Wastewater Collection/Processing',
                                                                         'Zoning',
                                                                         'Building Code Enforcement/Appeals',
                                                                         'Weed Abatement/Brush Control',
                                                                         'Other']},
                  {mainCategory:'Health Care', subCategories: ['Medical Care Expense Assistance',
                                                              'Prescription Expense Assistance',
                                                              'Prescription Drugs for Specific Health Conditions',
                                                              'Community Clinics',
                                                              'Family Planning',
                                                              'Hospitals',
                                                              'Emergency Room Care',
                                                              'Flu Vaccines',
                                                              'Childhood Immunization',
                                                              'Adult Immunization',
                                                              'Other']},
                    {mainCategory:'Individual and Family Life', subCategories: ['Burial/Cremation Expense Assistance',
                                                                                'Case/Care Management',
                                                                                'Youth Enrichment Programs',
                                                                                'City/County Parks',
                                                                                'City/County Parks',
                                                                                'Parenting Education',
                                                                                'Health/Disability Related Support Groups',
                                                                                'Animal Adoption',
                                                                                'Animal Shelters',
                                                                                'Drug Use Disorder Support Groups',
                                                                                'Other']},
                  {mainCategory:'Other', subCategories:['Criminal Justice and Legal Services',
                                                         'Income Support and Employment',
                                                         'Education',
                                                         'Mental Health and Substance Use Disorder Services',
                                                         'Consumer Services',
                                                         'Environment and Public Health/Safety',
                                                         'Other']}
                  ],
    dropdownElem: document.getElementById('dropdownRow'),
    populate: function () {for(const category of populateTax.categories){
        let htmlString = `<div id="categoryDropdown" class="dropdown col">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                          ${category.mainCategory}
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">`
        for(const subCategory of category.subCategories){
            htmlString = htmlString + `<li class="row dropdown-item">
                                       <div id="subCategory" class="col-sm-1">
                                            <input type="checkbox" class="form-check-input" value="" id="${subCategory}Checkbox">
                                            <label class="form-check-label" for="${subCategory}Checkbox">${subCategory}</label>
                                       </div>
                                       </li>`
        }
        htmlString = htmlString + '</ul></div>';
        populateTax.dropdownElem.insertAdjacentHTML('beforeend',htmlString);
    }}
}