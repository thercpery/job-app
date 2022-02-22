/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      first_name: 'Admin',
      last_name: "Admin",
      middle_name: "Admin",
      gender: "male",
      civil_status: "single",
      mobile_number: "09123456789",
      city_address: "Pasig City",
      username: "admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", 10),
      is_admin: true,
      is_private: false,
      is_hired: true,
      company_id: 1
    },
    {
      id: 2, 
      first_name: 'John',
      last_name: "Dope",
      gender: "male",
      civil_status: "single",
      mobile_number: "09123456789",
      city_address: "Pasay City",
      username: "iamjohndope",
      email: "iamdope@mail.com",
      password: bcrypt.hashSync("dopeee", 10),
      is_private: true,
      is_hired: true,
      company_id: 1
    },
    {
      id: 3, 
      first_name: 'Jamie',
      last_name: "Lannister",
      gender: "male",
      civil_status: "single",
      mobile_number: "09171234657",
      city_address: "City of Manila",
      username: "jamielannister",
      email: "jami@lannister.com",
      password: bcrypt.hashSync("thelannisterssendtheirregards", 10),
      is_private: false,
      is_hired: false
    },
    {
      id: 4, 
      first_name: 'Jon',
      last_name: "Snow",
      gender: "male",
      civil_status: "single",
      mobile_number: "09181234567",
      city_address: "Taguig City",
      username: "jonsnow",
      email: "jon@snow.com",
      password: bcrypt.hashSync("1234", 10),
      is_private: false,
      is_hired: false
    },
    {
      id: 5, 
      first_name: 'Sherlock',
      last_name: "Holmes",
      gender: "male",
      civil_status: "single",
      mobile_number: "09273456789",
      city_address: "London",
      username: "iamsherlock",
      email: "iamsherlock@mail.com",
      password: bcrypt.hashSync("iamsherlock", 10),
      is_private: true,
      is_hired: true,
      company_id: 4
    },
    {
      id: 6, 
      first_name: 'Alice',
      last_name: "Martinez",
      middle_name: "Cooper",
      gender: "female",
      civil_status: "married",
      mobile_number: "09521234567",
      city_address: "Mandaluyong City",
      username: "al1cemartinez",
      email: "alice_martinez@mail.com",
      password: bcrypt.hashSync("al!!ce", 10),
      is_private: false,
      is_hired: false
    },
    {
      id: 7, 
      first_name: 'Bob',
      last_name: "Smith",
      gender: "male",
      civil_status: "married",
      mobile_number: "09157894561",
      city_address: "Taguig City",
      username: "bobsmith",
      email: "bobsmith@mail.com",
      password: bcrypt.hashSync("bobsmith", 10),
      is_private: true,
      is_hired: false
    },
    {
      id: 8, 
      first_name: 'Charlie',
      last_name: "Jones",
      gender: "male",
      civil_status: "single",
      mobile_number: "09157894561",
      city_address: "Quezon City",
      username: "jones_charlie",
      email: "charlie_jones_97@mail.com",
      password: bcrypt.hashSync("j--nes", 10),
      is_private: false,
      is_hired: false,
    },
    {
      id: 9, 
      first_name: 'Chris',
      last_name: "Walker",
      middle_name: "Harrison",
      gender: "male",
      civil_status: "annulled",
      mobile_number: "09167895463",
      city_address: "Urdaneta",
      username: "walker_chrisss",
      email: "walker_chris@mail.com",
      password: bcrypt.hashSync("chri!1s", 10),
      is_private: true,
      is_hired: true,
      company_id: 3
    },
    {
      id: 10, 
      first_name: 'Devon',
      last_name: "Walker",
      middle_name: "Percy",
      gender: "male",
      civil_status: "single",
      mobile_number: "09264445557",
      city_address: "Quezon City",
      username: "devonwalker",
      email: "devonwalker@mail.com",
      password: bcrypt.hashSync("devonwalks", 10),
      is_private: false
    }
  ]);

  await knex.raw("select setval('users_id_seq', max(users.id)) from users");
};
