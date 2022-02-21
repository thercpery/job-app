const knex = require("../db/config");
const auth = require("../auth");

/* 
    View all companies
    Business Logic:
    1. Get all the companies in the database (TODO:) including the job postings.
    2. Display the data.
*/
module.exports.viewAllCompanies = () => {
    return knex
    .select()
    .from("companies")
    .then((companies, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            return {
                statusCode: 200,
                response: companies
            };
        }
    });
};

/* 
    Add a company
    Business Logic:
    1. Make sure that the user is an admin.
    2. If the user is an admin, get the company data from the request body.
    3. If one of the fields (company_name, city_address, country) are not empty then save it to the database. Otherwise, return false.
    4. If user is not an admin, return false. 
*/

module.exports.addCompany = (sessionUser, companyData) => {
    if(sessionUser.is_admin){
        if(
            companyData.hasOwnProperty("company_name") &&
            companyData.hasOwnProperty("city_address") &&
            companyData.hasOwnProperty("country")
        ){
            return knex("companies")
            .insert(companyData)
            .then((saved, err) => {
                if(err){
                    return {
                        statusCode: 500,
                        response: false
                    };
                }
                else{
                    return {
                        statusCode: 200,
                        response: true
                    };
                }
            });
        }
        else{
            return {
                statusCode: 200,
                response: false
            };
        }
    }
    else{
        return {
            statusCode: 200,
            response: false
        };
    }
};

/* 
    View company by ID
    Business Logic:
    1. Get the company ID through the request parameter in the URL.
    2. Get the company data from the database that contains the ID.
    3. If the data exists, return the data. Otherwise, return false.
*/
module.exports.viewCompanyByID = (id) => {
    return knex("companies")
    .first()
    .where({
        id: id
    })
    .then(async (company, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(company !== undefined){
                const job_postings = await knex
                    .select()
                    .from("jobs")
                    .where({
                        company_id: company.id
                    })
                    .then(data => data);
                company.job_postings = job_postings;
                return {
                    statusCode: 200,
                    response: company
                };
            }
            else{
                return {
                    statusCode: 200,
                    response: false
                };
            }
        }
    });
};