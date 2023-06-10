import dbConnect from "../../../db/connect";
import Location from "../../../db/models/Location";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const locations = await Location.find();

    if (!locations) {
      response.status(404).json({ status: "Locations not found." });
      return;
    }

    response.status(200).json(locations);
    return;
  }

  if (request.method === "POST") {
    try {
      const location = request.body;
      await Location.create(location);

      response.status(201).json({ status: "Location Created" });
      return;
    } catch (error) {
      console.log(error);

      response.status(400).json({ error: error.message });
      return;
    }
  }
}
