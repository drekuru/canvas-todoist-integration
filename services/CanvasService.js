const API = require('../api/canvas');

class CanvasService
{
    static async getCurrentCourses()
    {
        const { data } = await API.getCurrentCourses();

        return data;
    }

    static async getCourseAssignments(courseId)
    {
        const { data } = await API.getCourseAssignments(courseId);

        return data;
    }
}

module.exports = CanvasService;