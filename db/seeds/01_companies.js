/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('companies').del()
  await knex('companies').insert([
    {
      id: 1, 
      company_name: 'Acme Consulting Services',
      city_address: "Pasig City",
      country: "PH"
    },
    {
      id: 2, 
      company_name: 'Hand, Kerluke and Considine',
      city_address: "Quezon City",
      country: "PH"
    },
    {
      id: 3, 
      company_name: 'Klutch Sports Inc',
      city_address: "Pasig City",
      country: "PH"
    },
    {
      id: 4, 
      company_name: 'IKEA',
      city_address: "Stockholm",
      country: "SE"
    },
    {
      id: 5, 
      company_name: 'Stokes Inc',
      city_address: "Taguig City",
      country: "PH"
    }
  ]);

  await knex.raw("select setval('companies_id_seq', max(companies.id)) from companies");
};
