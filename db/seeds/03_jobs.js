/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('jobs').del()
  await knex('jobs').insert([
    {
      id: 1, 
      job_title: 'Node JS Developer',
      job_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet alias sed ex doloremque fuga, aperiam enim rem aspernatur, tenetur libero suscipit incidunt reprehenderit consequatur! Consectetur officia vitae laboriosam asperiores aspernatur, fuga eius doloribus voluptatibus laudantium ipsam quis optio aliquam quam inventore, at facere suscipit. Corporis repellendus eum recusandae ipsam repudiandae hic minima vero, neque quis fugit sint similique accusamus facere quaerat, quisquam laborum nulla, placeat consectetur iusto. Sunt hic ea aut aperiam eveniet nulla non nostrum quidem, tenetur voluptate iste voluptates blanditiis, libero quod illo autem ullam officiis laborum soluta harum, veniam nobis? Odio blanditiis in, optio aut accusamus dignissimos consequuntur saepe tempora iusto placeat facilis corrupti corporis officia at animi rerum hic ab cupiditate fugit cumque ducimus aliquam praesentium quidem omnis. Cupiditate nulla minima at odit repudiandae exercitationem a soluta sint suscipit, ipsum nihil, excepturi quisquam aliquam! Labore, architecto voluptatum. Ut cupiditate nemo vitae molestiae excepturi! Debitis, aliquam laudantium.",
      salary: 21000.00,
      location: "Pasig City",
      company_id: 1
    },
    {
      id: 2, 
      job_title: 'React JS Developer',
      job_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed doloribus quo eius temporibus tempore eveniet consectetur fugit officiis harum vitae!",
      salary: 30000.00,
      is_remote: true,
      location: "Stockholm",
      company_id: 4
    },
    {
      id: 3, 
      job_title: 'Junior Developer',
      job_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed doloribus quo eius temporibus tempore eveniet consectetur fugit officiis harum vitae!",
      salary: 15000.00,
      is_remote: false,
      location: "Quezon City",
      company_id: 2
    },
    {
      id: 4, 
      job_title: 'Web Developer',
      job_description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates impedit, error qui, beatae eveniet aspernatur ullam quod libero dolor nostrum deserunt quae sed laboriosam consequuntur non, dolorum ipsum dicta doloremque tenetur repudiandae facere odit possimus minima! Quae consectetur provident ipsa ut doloremque numquam nemo eius sapiente est? Incidunt, iure hic!",
      salary: 15000.00,
      is_remote: false,
      location: "Quezon City",
      company_id: 2
    },
    {
      id: 5, 
      job_title: 'Front-end Developer',
      job_description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed doloribus quo eius temporibus tempore eveniet consectetur fugit officiis harum vitae!",
      salary: 18000.00,
      is_remote: true,
      location: "Taguig City",
      company_id: 5
    }
  ]);

  await knex.raw("select setval('jobs_id_seq', max(jobs.id)) from jobs");
};
