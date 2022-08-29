class Task
{
    constructor(data)
    {

    }

    static fromCanvasJSON(data, project)
    {
        if (!project.id)
            throw new Error('project.id is required');

        if (!data.name)
            throw new Error('data.name is required');

        // clean up the name - remove * and - and make sure string is less than 75 characters
        const name = data.name.replace(/[*-]/g, '').substring(0, 75);

        return {
            content: name,
            due_datetime: data.due_at || null,
            project_id: project.id
        };
    }
}

module.exports = Task;