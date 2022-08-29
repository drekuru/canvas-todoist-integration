const main = require('../main');

module.exports = async function (context)
{
    try
    {
        await main(context);
    }
    catch (err)
    {
        context.log(err);
    }

};