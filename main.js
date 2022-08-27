// this has to stay at the top of the file
require('dotenv').config();

const TodoistAPI = require('./api/todoist');
const CanvasAPI = require('./api/canvas');
const { DateTime } = require('luxon');
const delay = require('delay');

main();

async function createProjectTask(projectId, task) 
{
    const refinedTask =
    {
        project_id: projectId.id,
        content: task.name,
        due_datetime: task.due_at || null
    };

    console.log(refinedTask);

    // eslint-disable-next-line no-unused-vars
    const wait = await delay(5000);

    return TodoistAPI.createTask(refinedTask);
}

async function main() 
{
    try
    {
        // get all my courses
        const { data: courses } = await CanvasAPI.getCurrentCourses();

        console.log(`Found ${courses.length} courses`);

        // create courses as projects in todoist
        for (const course of courses)
        {
            const { data: project } = await TodoistAPI.createProject({ name: course.courseCode });

            console.log(`Created project ${project.name}`);

            // get all assignments for each course
            const { data: assignments } = await CanvasAPI.getCourseAssignments(course.id);

            console.log(`Found ${assignments.length} assignments for ${course.courseCode}`);

            await Promise.all(assignments.map(assignment =>
            {
                if (DateTime.fromISO(assignment.due_at).toMillis() > DateTime.local().toMillis())
                    return createProjectTask(project, assignment);
                else
                    return console.log(`${assignment.name} is not due`);
            }));
        }
    }
    catch (err)
    {
        console.error(err?.response?.data || err);
    }
}
