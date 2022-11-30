import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log("getHomePage ~ user", data);
        return res.render("homePage.ejs", { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
};

const getCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    console.log(req.body);
    return res.render("crud.ejs");
};
const postCRUD = (req, res) => {
    return res.send(req.body);
};

export { getHomePage, getCRUD, postCRUD };
