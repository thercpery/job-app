const knex = require("../db/config");
const auth = require("../auth");

/* 
    View all jobs
    Business Logic:
    1. Get all the jobs in the database.
    2. Display the data.
*/
module.exports.viewAllJobs = () => {
    return knex.select()
    .from("jobs")
    .then((jobs, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            return {
                statusCode: 200,
                response: jobs
            };
        }
    });
};

/* 
    View job by ID.
    Business Logic:
    1. Get the job ID from the request parameter ID.
    2. Find the job data that matches the ID.
    3. If found, display the data. Otherwise, return false
*/
module.exports.viewJobById = (id) => {
    return knex
    .select("jobs.*", "companies.company_name as company_name")
    .from("jobs")
    .leftJoin("companies", {"companies.id": "jobs.company_id"})
    .where({
        "jobs.id": id
    })
    .then((job, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(job !== 0){
                return {
                    statusCode: 200,
                    response: job
                };
            }
            else{
                return {
                    statusCode: 404,
                    response: false
                };
            }
        }
    })
};