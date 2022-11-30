import db from "../server/index";

const getHomePage = async (req, res) => {
    return res.render("homePage.ejs");
};

export { getHomePage };
