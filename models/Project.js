class Project
{
    constructor(data)
    {

    }

    static fromCanvasJSON(data)
    {
        return {
            name: data.name,
        };
    }
}

module.exports = Project;