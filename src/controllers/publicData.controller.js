import { Organization } from "../models";
import { Links } from "../models";

export const publicDataController = async (req, res) => {
  try {
    const organization = await Organization.findByPk(
      process.env.ORGANIZATION_ID,
      {
        include: Links,
      }
    );
    res.json({
      error: false,
      status: "200",
      message: "success",
      result: organization.dataValues,
    });
  } catch (error) {
    res.json({
      error: true,
      errorCode: "SRV001",
      status: "500",
      message: `An unexpected error ocurred when retrieving data from database. Details:  ${error.message}`,
    });
  }
};
