const knex = require("../db/config");

/* 
    View all jobs
    Business Logic:
    1. Get all the jobs in the database.
    2. Display the data.
*/
module.exports.viewAllJobs = () => {
    return knex
    .select("jobs.*", "companies.company_name as company_name")
    .from("jobs")
    .leftJoin("companies", {
        "companies.id": "jobs.company_id"
    })
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
            if(job.length !== 0){
                return {
                    // If job exists
                    statusCode: 200,
                    response: job
                };
            }
            else{
                return {
                    // If job does not exist.
                    statusCode: 404,
                    response: false
                };
            }
        }
    })
};

/* 
    Create a job
    Business Logic:
    1. Check if there is an authenticated user.
    2. If the authenticated user is an admin and is hired to any company, get the company ID from the authenticated user and the job data from the request body. If there is no authenticated user or if the user is unemployed, return false.
    3. Save the job data in the database.
*/
module.exports.createJob = (sessionData, jobData) => {
    return knex("users")
    .first()
    .where({
        id: sessionData.id
    })
    .then((user, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(user !== undefined){
                if(user.is_admin && user.is_hired){
                    if(
                        jobData.hasOwnProperty("job_title") &&
                        jobData.hasOwnProperty("job_description") &&
                        jobData.hasOwnProperty("salary") &&
                        jobData.hasOwnProperty("location")
                    ){
                        const newJob = {
                            job_title: jobData.job_title,
                            job_description: jobData.job_description,
                            salary: jobData.salary,
                            is_remote: jobData.is_remote || false,
                            location: jobData.location,
                            company_id: sessionData.company_id
                        };
                        return knex("jobs")
                        .insert(newJob)
                        .then((saved, err) => {
                            if(err){
                                return {
                                    statusCode: 500,
                                    response: false
                                };
                            }
                            else{
                                return {
                                    statusCode: 201,
                                    response: true
                                };
                            }
                        });
                    }
                    else{
                        return {
                            statusCode: 403,
                            response: false
                        };
                    }
                }
                else{
                    return {
                        statusCode: 403,
                        response: false
                    };
                }
            }
            else{
                return {
                    statusCode: 403,
                    response: false
                };
            }
        }
    });
};

/* 
    Search Job By Title
    Business Logic: 
    1. Get the search data from the request body.
    2. Check the database that matches or close to the search data from the search body.
    3. If no data found, return false. Otherwise, return true.
*/
module.exports.searchJobs = (filter) => {
    return knex
    .select()
    .from("jobs")
    .where((builder) => {
        builder
        .where({ is_offered: true })
        .where("job_title", "ilike", `%${filter.jobData}%`)
        .orWhere("job_description", "ilike", `%${filter.jobData}%`)
        .orWhere("location", "ilike", `%${filter.jobData}%`)
        // .orWhere({
        //     is_remote: filter.is_remote
        // })
    })
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
    Change offer status
    Business Logic:
    1. Check if the authenticated user is an admin. If user is not an admin, return false.
    2. Get the job ID from the request parameters.
    3. Check the job data that matches the job ID. If found, change offer status, otherwise, return false.
*/
module.exports.changeOfferStatus = (sessionData, jobId) => {
    return knex("users")
    .first()
    .where({
        id: sessionData.id
    })
    .then((user, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(user.is_admin){
                // If user is an admin
                return knex("jobs")
                .first()
                .where({
                    id: jobId,
                    company_id: sessionData.company_id
                })
                .then((job, err) => {
                    if(err){
                        return {
                            statusCode: 500,
                            response: false
                        };
                    }
                    else{
                        if(job !== undefined){
                            return knex("jobs")
                            .update({
                                is_offered: !job.is_offered
                            })
                            .where({
                                id: job.id,
                                company_id: job.company_id
                            })
                            .then((saved, err) => {
                                if(err){
                                    return {
                                        statusCode: 500,
                                        response: false
                                    };
                                }
                                else{
                                    return {
                                        statusCode: 201,
                                        response: true
                                    };
                                }
                            });
                        }
                        else{
                            // If job is not found.
                            return {
                                statusCode: 404,
                                response: false
                            };
                        }
                    }
                })
            }
            else{
                // User is not an admin
                return {
                    statusCode: 403,
                    response: false
                };
            }   
        }
    })
};

/* 
    Edit a job offer
    Business Logic:
    1. 
*/
module.exports.editJob = (sessionData, jobData) => {};