export const adaptRoute = (handler) => {
  return async (req, res, next) => {
    try {
      const httpRequest = {
        body: req.body,
        params: req.params,
      };
      const httpResponse = await handler(httpRequest);

      res.status(httpResponse.status).json(httpResponse.body);
    } catch (err) {
      next(err);
    }
  };
};
