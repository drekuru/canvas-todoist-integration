const axios = require('axios');

const token = process.env.TODOIST_API_TOKEN;

if (!token)
    throw new Error('TODOIST_API_TOKEN environment variable is not set');

const api = axios.create({
    baseURL: 'https://api.todoist.com',
    headers: { 'Authorization': `Bearer ${token}` }
});

class TodoistAPI
{
    static createProject(project)
    {
        if (!project.name)
            throw new Error('Project name is required to create a project');

        return api.post('/rest/v1/projects', project);
    }

    static createTask(task)
    {
        if (!task.project_id)
            throw new Error('Project id is required to create a task');

        if (!task.content)
            throw new Error('Task content is required to create a task');

        return api.post('/rest/v1/tasks', task);
    }

    static getProjects()
    {
        return api.get('/rest/v1/projects');
    }

    static deleteProject(projectId)
    {
        if (!projectId)
            throw new Error('Project id is required to delete a project');

        return api.delete(`/rest/v1/projects/${projectId}`);
    }
}

module.exports = TodoistAPI;