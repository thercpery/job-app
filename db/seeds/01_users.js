/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {
      id: 1, 
      first_name: 'Admin',
      last_name: "Admin",
      mobile_number: "09123456789",
      city_address: "Pasig City",
      username: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", 10),
      is_admin: true
    },
    {
      id: 2, 
      first_name: 'John',
      last_name: "Dope",
      mobile_number: "09123456789",
      city_address: "Pasay City",
      username: "iamjohndope",
      email: "iamdope@admin.com",
      password: bcrypt.hashSync("dopeee", 10)
    },
    {
      id: 3, 
      first_name: 'Jamie',
      last_name: "Lannister",
      mobile_number: "09171234657",
      city_address: "City of Manila",
      username: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("thelannisterssendtheirregards", 10)
    },
    {
      id: 4, 
      first_name: 'Jon',
      last_name: "Snow",
      mobile_number: "09181234567",
      city_address: "Taguig City",
      username: "jonsnow",
      email: "jon@snow.com",
      password: bcrypt.hashSync("1234", 10)
    },
    {
      id: 5, 
      first_name: 'Sherlock',
      last_name: "Holmes",
      mobile_number: "09273456789",
      city_address: "London",
      username: "iamsherlock",
      email: "iamsherlock@mail.com",
      password: bcrypt.hashSync("iamsherlock", 10)
    }
  ]);
};
