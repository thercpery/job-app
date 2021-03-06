const knex = require("../db/config");
const bcrypt = require("bcrypt");
const auth = require("../auth");

/* 
    Check if email exists
    Business Logic:
    1. Get the email from the request body.
    2. Check if the given email exists in the users database.
    3. If the email exists, return true.
    4. If not, return false.
*/
module.exports.checkEmailExists = (email) => {
    return knex("users")
    .first()
    .where({
        email: email
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
                // If email exists
                return {
                    statusCode: 200,
                    response: true
                };
            }
            else{
                // If email does not exist
                return {
                    statusCode: 200,
                    response: false
                };
            }
        }
    });
};

/* 
    Check if username exists
    Business logic:
    1. Get the username from the request body.
    2. Check if the username exists in the database.
    3. If the username exists, return true.
    4. If not, return false.
*/

module.exports.checkUsernameExists = (username) => {
    return knex("users")
    .first()
    .where({
        username: username
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
                // IF username exists
                return {
                    statusCode: 200,
                    response: true
                };
            }
            else{
                // If username does not exist
                return {
                    statusCode: 200,
                    response: false
                };
            }
        }
    });
};

/* 
    Register a user
    Business Logic:
    1. Get the user data from the request body.
    2. Check if one of the fields (first_name, last_name, mobile_number, city_address, username, email, password) is empty or missing.
    3. If one of them is missing, return false, otherwise go through the process. 
    4. Make sure that the password is encrypted.
    5. Check if the username or email does not exist.
    6. If one of those exist, do not save the data.
    7. If they do not exist, save the data as new user.
*/

module.exports.registerUser = async (reqBody) => {
    // Check if one or more fields is missing or empty
    if(
        reqBody.hasOwnProperty("first_name") &&
        reqBody.hasOwnProperty("last_name") &&
        reqBody.hasOwnProperty("mobile_number") &&
        reqBody.hasOwnProperty("city_address") &&
        reqBody.hasOwnProperty("username") &&
        reqBody.hasOwnProperty("email") &&
        reqBody.hasOwnProperty("password") && 
        reqBody.first_name !== "" && 
        reqBody.last_name !== "" && 
        reqBody.mobile_number !== "" && 
        reqBody.city_address !== "" && 
        reqBody.username !== "" && 
        reqBody.email !== "" && 
        reqBody.password !== ""  
    ){
        // If there are no missing fields
        const userData = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            mobile_number: reqBody.mobile_number,
            city_address: reqBody.city_address,
            username: reqBody.username,
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 10), // ENCRYPT PASSWORD!!
            is_private: reqBody.is_private || false,
            is_hired: reqBody.is_hired || false,
            company_id: reqBody.company_id || null
        };
        // Check if there are duplicate username/email
        const ifEmailExists = await this.checkEmailExists(userData.email);
        const ifUsernameExists = await this.checkUsernameExists(userData.username);
        if(ifEmailExists.response && ifUsernameExists.response){
            // If username and email exists
            return {
                statusCode: 401,
                response: false
            };
        }
        else{
            // If username and email does not exist
            return knex("users")
            .insert(userData)
            .then((saved, err) => {
                if(err){
                    // Error-handling
                    return {
                        statusCode: 500,
                        response: false
                    };
                }
                else{
                    // Successfully saved
                    return {
                        statusCode: 201,
                        response: true
                    };
                }
            });
        }
    }

    else{
        // If there are missing fields
        return {
            statusCode: 401,
            response: false
        };
    }  
};

/* 
    Login a user
    Business Logic:
    1. Get the username/email and password from the request body.
    2. Check if username/email exist in the database.
    3. If it is, compare the password provided in the login form with the password stored in the database.
    4. Generate/return a jsonwebtoken if the user is successfully logged in and return false if not.
    5. If username/email does not exist, return false.
*/
module.exports.loginUser = async (userData) => {
    if(userData.hasOwnProperty("username")){
        // If username is typed.
        const doesUsernameExists = await this.checkUsernameExists(userData.username);
        if(doesUsernameExists.response){
            // If username exists
            return knex("users")
            .first()
            .where({
                username: userData.username
            })
            .then((user, err) => {
                if(err){
                    return {
                        statusCode: 500,
                        response: false
                    };
                }
                else{
                    const isPasswordCorrect = bcrypt.compareSync(userData.password, user.password);
                    if(isPasswordCorrect){
                        return {
                            statusCode: 200,
                            response: {
                                accessToken: auth.createAccessToken(user)
                            }
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
        }
        else{
            // If username does not exist
            return {
                statusCode: 401,
                response: false
            };
        }
    }
    else if(userData.hasOwnProperty("email")){
        // If email is typed.
        const doesEmailExists = await this.checkEmailExists(userData.email);
        if(doesEmailExists.response){
            return knex("users")
            .first()
            .where({
                email: userData.email
            })
            .then((user, err) => {
                if(err){
                    return {
                        statusCode: 500,
                        response: false
                    };
                }
                else{
                    const isPasswordCorrect = bcrypt.compareSync(userData.password, user.password);
                    if(isPasswordCorrect){
                        return {
                            statusCode: 200,
                            response: {
                                accessToken: auth.createAccessToken(user)
                            }
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
        }
        else{
            return {
                statusCode: 401,
                response: false
            };
        }
    }
    else{
        return {
            statusCode: 401,
            response: false
        };
    }
};


/* 
    View profile
    Business Logic:
    1. Get the user from the username from the request parameters.
    2. If username exists and user is public, display the data excluding the password.
    3. If user is private and there is an authenticated user, return the user.
    4. If user is private and there is no authenticated user, return false.
    5. Return false if username does not exists.
*/
module.exports.viewProfile = (sessionUser, username) => {
    return knex("users")
    .first()
    .select("id", "first_name", "last_name", "mobile_number", "city_address", "username", "email", "created_at", "updated_at")
    .where({
        username: username
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
                // Username exist.
                if(user.is_private){
                    // User is private
                    if(sessionUser){
                        // There is an authenticated user
                        return knex("users_followers")
                        .first()
                        .where({
                            follower_id: sessionUser.id,
                            following_id: user.id,
                            is_approved: true
                        })
                        .then((data, err) => {
                            if(err){}
                            else{
                                if(data !== undefined){
                                    return {
                                        statusCode: 200,
                                        response: user
                                    };
                                }
                                else{
                                    return {
                                        statusCode: 403,
                                        response: false
                                    };
                                }
                            }
                        })
                    }
                    else{
                        // There is no authenticated user.
                        return {
                            statusCode: 401,
                            response: false
                        };
                    }
                }
                else{
                    // User is not private
                    return {
                        statusCode: 200,
                        response: user
                    };
                }
            }
            else{
                // Username does not exist.
                return {
                    statusCode: 404,
                    response: false
                };
            }
        }
    });
};

/* 
    Change password
    Business Logic:
    1. Get the session data from the JSON web token decoded.
    2. Get the user that matches the session's id in the database.
    3. Compare the old password in the request body to the password in the database.
    4. If it matches, save the new password.
*/
module.exports.changePassword = (sessionData, reqBody) => {
    if(sessionData){
        // If there is an authenticated user
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
                const isPasswordCorrect = bcrypt.compareSync(reqBody.oldPassword, user.password);
                if(isPasswordCorrect){
                    // If password is correct.
                    return knex("users")
                    .update({
                        password: bcrypt.hashSync(reqBody.newPassword, 10)
                    })
                    .where({
                        id: user.id
                    })
                    .then((saved, err) => {
                        if(err){
                            return {
                                statusCode: 500,
                                response: false
                            };
                        }
                        else{
                            // New password successfully saved.
                            return {
                                statusCode: 201,
                                response: true
                            };
                        }
                    });
                }
                else{
                    // If password is not correct
                    return {
                        statusCode: 400,
                        response: false
                    };
                }
            }
        });
    }
    else{
        // If there is no user authenticated
        return {
            statusCode: 403,
            response: false
        };
    }
};

/* 
    Make user as an admin
    Business Logic:
    1. Check if the session user is an admin.
    2. If the logged in user is an admin, check if the username given in the request body exist.
    3. If the username give exists, 
    4. If the logged in user is not an admin, return false.
*/
module.exports.makeUserAsAdmin = async (sessionData, userData) => {
    if(sessionData.is_admin){
        const doesUsernameExists = await this.checkUsernameExists(userData.username);
        if(doesUsernameExists.response){
            return knex("users")
            .update({
                is_admin: true
            })
            .where({
                username: userData.username
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
            return {
                statusCode: 200,
                response: false
            };
        }
    }
    else{
        // If logged in user is not an admin.
        return {
            statusCode: 403,
            response: false
        };
    }
};

/* 
    Change user details
    Business Logic:
    1. Check the request body data if the username/email exists
    2. If username and/or email exists, return false.
    3. If not, update the user data into the database.
*/

module.exports.changeUserDetails = (sessionData, userData) => {
    if(sessionData){
        return knex("users")
        .update(userData)
        .where({
            id: sessionData.id
        })
        .then((updated, err) => {
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
};

/* 
    Search users by name/username
    Business Logic:
    1. Get the search data from request body.
    2. Search the user from the search data.
    3. If there is user data found, determine if the user found is public and if there is a user authenticated. Otherwise return false.
    4. If the user is public, return user data. If the user is private and there is an authenticated user, return user data. Otherwise return false.
*/

module.exports.searchUser = (searchData, sessionData) => {
    const data = searchData.searchData;
    return knex
    .select("id", "first_name", "last_name", "middle_name", "suffix_name", "gender", "civil_status", "mobile_number", "city_address", "company_id", "is_private")
    .from("users")
    .where((builder) => {
        builder
        .where("first_name", "ilike", `%${data}%`)
        .orWhere("last_name", "ilike", `%${data}%`)
        .orWhere("middle_name", "ilike", `%${data}%`)
        .orWhere("username", "ilike", `%${data}%`)
    })
    .then((users, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(sessionData){
                return {
                    statusCode: 200,
                    response: users
                };
            }
            else{
                return {
                    statusCode: 200,
                    response: users.filter(user => user.is_private === false)
                };
            }
        }
    });
};

/* 
    Follow a user
    Business Logic:
    1. Get the user ID from the request parameter (the authenticated user that will be following) and the authenticated user ID.
    2. Search user data of the user ID that will be followed and determine if the user has the same ID as the authenticated user ID.
    3. If it's the same, return false.
*/
module.exports.followUser = (sessionData, userId) => {
    return knex("users")
    .first()
    .where({
        id: userId
    })
    .then((user, err) => {
        if(err){
            return {
                statusCode: 500,
                response: false
            };
        }
        else{
            if(sessionData){
                if(user !== undefined){
                    if(user.id !== sessionData.id){
                        const users_followers_data = {
                            follower_id: sessionData.id,
                            following_id: user.id,
                            is_approved: (user.is_private) ? false : true
                        };
                        // Check if there are duplicate data
                        return knex("users_followers")
                        .first()
                        .where({
                            follower_id: users_followers_data.follower_id,
                            following_id: users_followers_data.following_id
                        })
                        .then((data, err) => {
                            if(err){
                                return {
                                    statusCode: 500,
                                    response: false
                                };
                            }
                            else{
                                if(data === undefined){
                                    // If there is no duplicate data.
                                    return knex("users_followers")
                                    .insert(users_followers_data)
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
                                    // If there is duplicate data.
                                    return {
                                        statusCode: 403,
                                        response: false
                                    };
                                }
                            }
                        })
                    }
                    else{
                        // If the authenticated user ID is the same as the user ID
                        return {
                            statusCode: 403,
                            response: false
                        };
                    }
                }
                else{
                    return {
                        statusCode: 404,
                        response: false
                    };
                }
            }
            else{
                // If there is no JWT token. 
                return {
                    statusCode: 403,
                    response: false
                }
            }
        }
    })
};

/* 
    Approve follow request for private users.
    Business Logic:
    1. Get the authenticated user data and user ID from the request parameters.
    2. Check the "users_followers" table with the authenticated user ID and user ID from the req parameters.
    3. If data exists, approve follow request.
*/
module.exports.approveFollowRequest = (sessionData, userId) => {
    const users_followers_data = {
        follower_id: userId,
        following_id: sessionData.id
    };
    console.log(users_followers_data)
    return knex("users_followers")
    .update({
        is_approved: true
    })
    .where({
        follower_id: users_followers_data.follower_id,
        following_id: users_followers_data.following_id,
        is_approved: false
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
};

/* 
    Deny follow request for private users
    Business Logic:
    1. Get the authenticated user data and user ID from the request parameters.
    2. Check the "users_followers" table with the authenticated user ID and user ID from the req parameters.
    3. If data exists, delete follow request.
*/
module.exports.denyFollowRequest = (sessionData, userId) => {
    const users_followers_data = {
        follower_id: userId,
        following_id: sessionData.id
    };
    return knex("users_followers")
    .del()
    .where({
        follower_id: users_followers_data.follower_id,
        following_id: users_followers_data.following_id
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
    })
};

/* 
    Make authenticated user public/private
    Business Logic:
    1. Get the data from the authenticated user.
    2. Check the authenticated user on the database.
    3. Set the user to public/private.
*/
module.exports.changeProfileVisibility = (sessionData) => {
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
            return knex("users")
            .update({
                is_private: !user.is_private
            })
            .where({
                id: sessionData.id
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
            })
        }
    });
};