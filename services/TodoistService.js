const Project = require('../models/Project');
const NodeCache = require('node-cache');
const Task = require('../models/Task');
const API = require('../api/todoist');
const delay = require('delay');

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

class TodoistService
{
    static async createProject(project)
    {
        const { data } = await API.createProject(project);

        return data;
    }

    static async createTask(task)
    {
        const { data } = await API.createTask(task);

        // eslint-disable-next-line no-unused-vars
        const wait = await delay(2500);

        return data;
    }

    static async upsertProject(project)
    {
        const TodoistProject = Project.fromCanvasJSON(project);

        const existingProjects = await TodoistService.getProjects();

        const existingProject = existingProjects.find(p => p.name === TodoistProject.name);

        if (existingProject)
        {
            console.log(`Project ${existingProject.name} already exists`);
            return existingProject;
        }
        else
        {
            console.log(`Creating project: ${TodoistProject.name}`);
            return TodoistService.createProject(TodoistProject);
        }
    }

    static async upsertTask(task, project)
    {
        const TodoistTask = Task.fromCanvasJSON(task, project);

        const existingTasks = await TodoistService.getTasks();

        const existingTask = existingTasks.find(t => t.content.replace(/\s/g, '') === TodoistTask.content.replace(/\s/g, ''));

        if (existingTask)
        {
            console.log(`Task '${existingTask.content}' already exists`);
            return existingTask;
        }
        else
        {
            console.log(`Creating task: ${TodoistTask.content}`);
            return TodoistService.createTask(TodoistTask);
        }
    }

    static async getProjects()
    {
        const cachedProjects = cache.get('projects');

        if (cachedProjects)
            return cachedProjects;
        else
        {
            const { data } = await API.getProjects();

            cache.set('projects', data);

            return data;
        }
    }

    static async getTasks()
    {
        const cachedTasks = cache.get('tasks');

        if (cachedTasks)
            return cachedTasks;
        else
        {
            const { data } = await API.getTasks();

            cache.set('tasks', data);

            return data;
        }
    }
}

module.exports = TodoistService;