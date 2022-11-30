import db from "../server/index.js";

const getHomePage = async (req, res) => {
    return res.render("homePage.ejs");
};

export { getHomePage };
