import dbConnect from "../../../../db/connect";
import Location from "../../../../db/models/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const location = await Location.find({ id: id });

    if (!location) {
      response.status(400).json({ status: "Location not found." });
      return;
    }

    response.status(200).json(location);
    return;
  }

  if (request.method === "PATCH") {
    const location = request.body;
    await Location.findOneAndUpdate({ id: id }, location);

    if (!location) {
      response.status(400).json({ status: "Location not found." });
      return;
    }

    response.status(200).json({ status: "Location updated." });
    return;
  }

  if (request.method === "DELETE") {
    const location = await Location.findOneAndDelete({ id: id });

    if (!location) {
      response.status(400).json({ status: "Location not found." });
      return;
    }

    response.status(200).json({ status: "Location deleted." });
    return;
  }
}
