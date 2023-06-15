import BadRequest from '../error/BadRequest.js';

export default async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, ordernation = 'title:1'  } = req.query;

    let [orderField, order] = ordernation.split(':');

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const resultFiltered = await result.find()
        .sort({ [orderField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(resultFiltered);
    } else {
      next(new BadRequest());
    }

  } catch (err) {
    next(err);
  }

}