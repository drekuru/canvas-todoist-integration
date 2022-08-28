// this has to stay at the top of the file
require('dotenv').config();

const TodoistService = require('./services/TodoistService');
const CanvasService = require('./services/CanvasService');
const { DateTime } = require('luxon');

syncAssignments();

async function syncAssignments() 
{
    try
    {
        // get all my courses
        const courses = await CanvasService.getCurrentCourses();

        console.log(`Found ${courses.length} courses`);

        // create courses as projects in todoist
        for (const course of courses)
        {
            const project = await TodoistService.upsertProject({ name: course.courseCode });

            // get all assignments for each course
            const assignments = await CanvasService.getCourseAssignments(course.id);

            console.log(`Found ${assignments.length} assignments for ${course.courseCode}`);

            // not using promise.all here because we want to create tasks in order and not overload the api
            for (const assignment of assignments)
            {
                if ((assignment.due_at && DateTime.fromISO(assignment.due_at).toMillis() > DateTime.local().toMillis()) || !assignment.due_at)
                    await TodoistService.upsertTask(assignment, project);
                else
                    console.log(`${assignment.name} is past due`);
            }
        }
    }
    catch (err)
    {
        console.error(err?.response?.data || err);
    }
}
