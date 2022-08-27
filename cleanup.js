require('dotenv').config();
const TodoistAPI = require('./api/todoist');

main();

async function main()
{
    try
    {
        // get all project
        const { data: projects } = await TodoistAPI.getProjects();

        // filter if they have 0100 or 0010 in the name
        const filteredProjects = projects.filter(
            (project) =>
            {
                console.log(project.name);
                if (project.name.includes('0100') || project.name.includes('0010'))
                    return project;
            });

        console.log(`Found ${filteredProjects.length} projects`);

        // delete projects
        await Promise.all(filteredProjects.map(
            (project) => TodoistAPI.deleteProject(project.id)));
    }
    catch (err)
    {
        console.log(err?.response?.data || err);
    }
}