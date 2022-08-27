const axios = require('axios');

const token = process.env.CANVAS_API_TOKEN;

if (!token)
    throw new Error('CANVAS_API_TOKEN environment variable is not set');

const api = axios.create({
    baseURL: 'https://sierra.instructure.com',
    headers: { 'Authorization': `Bearer ${token}` }
});

class CanvasAPI
{
    static getCurrentCourses()
    {
        return api.get('/api/v1/dashboard/dashboard_cards');
    }

    static getCourseAssignments(courseId)
    {
        return api.get(`/api/v1/courses/${courseId}/assignments`);
    }
}

module.exports = CanvasAPI;