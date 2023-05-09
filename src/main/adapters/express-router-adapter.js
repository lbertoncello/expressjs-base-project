export const adaptRoute = (handler) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
    };
    const httpResponse = await handler(httpRequest);

    res.status(httpResponse.status).json(httpResponse.body);
  };
};
