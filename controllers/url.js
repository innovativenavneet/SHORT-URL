// We are using a library called 'shortid' to generate unique short IDs
const shortid = require("shortid");

// Importing the URL model
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    // Parse the request body
    const body = req.body;

    // Validation: Ensure the URL is provided
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Generate a unique short ID
    const shortId = shortid.generate(); // Use the correct method to generate the short ID

    // Create a new entry in the database
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    // Return the generated short ID
    return res.json({ id: shortId });
}

// a function to store the request or total visit in the website 

async function handleGetAnalytics( req,res){
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks : result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics};
