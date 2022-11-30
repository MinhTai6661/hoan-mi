import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();

        return res.render("homePage.ejs", { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
};

const getCRUD = async (req, res) => {
    return res.render("crud.ejs");
};
const postCRUD = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log("postCRUD  message", message);
    return res.send(req.body);
};
const displayCRUD = async (req, res) => {
    const users = await CRUDService.getAllUsers();
    console.log("displayCRUD  users", users);

    return res.render("displayallUser.ejs", { users });
};

const getEditUser = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        // const message = await CRUDService.getEditUser(userId);
        // console.log("editUser  message", message);
        return res.send("founduser");
    } else {
        return res.send("<h1>user not found</h1>");
    }
};

export { getHomePage, getCRUD, postCRUD, displayCRUD, getEditUser };
