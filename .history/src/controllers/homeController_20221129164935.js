// import db from "../models/index";

const getHomePage = async (req, res) => {
    return res.render("homePage.ejs");
};

export { getHomePage };
