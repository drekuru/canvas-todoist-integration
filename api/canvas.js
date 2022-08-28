const axios = require('axios');

const token = process.env.CANVAS_API_TOKEN;
const collegeSubDomain = process.env.CANVAS_COLLEGE_SUBDOMAIN;


if (!token)
    throw new Error('CANVAS_API_TOKEN environment variable is not set');

if (!collegeSubDomain)
    throw new Error('CANVAS_COLLEGE_SUBDOMAIN environment variable is not set');

const api = axios.create({
    baseURL: `https://${collegeSubDomain}.instructure.com`,
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